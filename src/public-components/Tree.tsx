import React, { useState } from 'react'
import { RichTreeElement } from '../models/treeElement';
import { mapTreeElementToRichTreeElement } from '../utilities/utilities';
import { useTreeState } from '../hooks/useTreeState';
import { TreeNodeList } from '../internal-components/treeNodeList';

(window as any).React2 = require('react');

type GetChildrenFunction = (id: string | null) => Promise<{id: string, name: string}[]>;

export interface TreeProps {
    getChildren: GetChildrenFunction;
}

const toggleExpandedState = async (treeElement: RichTreeElement, getChildren: GetChildrenFunction, setTreeElement: (treeElement: RichTreeElement) => void) => {
    if (treeElement.expandedState == null) {
        return;
    }

    if (treeElement.children == null) {
        const newChildren = await getChildren(treeElement.id);
        const newChildrenTreeElements: RichTreeElement[] = newChildren.map(newChild => mapTreeElementToRichTreeElement(newChild, treeElement));

        treeElement = {
            ...treeElement,
            children: newChildrenTreeElements
        }
    }

    treeElement.expandedState = treeElement.children != null && treeElement.children.length > 0 ? !treeElement.expandedState : null;
    setTreeElement(treeElement);
}

export const Tree: React.FunctionComponent<TreeProps> = props => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [rootTreeElements, setRootTreeElements, setTreeElement] = useTreeState([]);

    if (!isInitialized) {
        props.getChildren(null)
            .then(newTreeElements => {
                setRootTreeElements(newTreeElements.map(newTreeElement => mapTreeElementToRichTreeElement(newTreeElement, null)));
                setIsInitialized(true);
            });
    }

    return isInitialized ? (
        <div className="fancy-tree">
            <TreeNodeList
                treeElements={rootTreeElements}
                toggleExpandedState={treeElement => toggleExpandedState(treeElement, props.getChildren, setTreeElement)}
            />
        </div>
    ) : null;
};