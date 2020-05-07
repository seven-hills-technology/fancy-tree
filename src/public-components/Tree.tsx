import React, { useState } from 'react'
import { RichTreeElement, RichTreeElementExpandedState, TreeElement } from '../models/treeElement';
import { mapTreeElementToRichTreeElement } from '../utilities/utilities';
import { useTreeState } from '../hooks/useTreeState';
import { TreeNodeList } from '../internal-components/treeNodeList';

type GetChildrenFunction = (id: string | null) => Promise<TreeElement[]>;

export interface TreeProps {
    getChildren: GetChildrenFunction;
    onSelect?: (id: string) => void;
    selected?: string;
}

const toggleExpandedState = async (treeElement: RichTreeElement, getChildren: GetChildrenFunction, setTreeElement: (treeElement: RichTreeElement) => void) => {
    if (treeElement.expandedState == null) {
        return;
    }

    if (treeElement.children == null) {
        treeElement = {
            ...treeElement,
            expandedState: RichTreeElementExpandedState.loading
        };
        setTreeElement(treeElement);

        const newChildren = await getChildren(treeElement.id);
        const newChildrenTreeElements: RichTreeElement[] = newChildren.map(newChild => mapTreeElementToRichTreeElement(newChild, treeElement));

        treeElement = {
            ...treeElement,
            children: newChildrenTreeElements,
            expandedState: RichTreeElementExpandedState.collapsed
        };
    }

    treeElement = {
        ...treeElement,
        expandedState: treeElement.children == null || treeElement.children.length === 0 ? RichTreeElementExpandedState.empty : (
            treeElement.expandedState === RichTreeElementExpandedState.collapsed ? RichTreeElementExpandedState.expanded : RichTreeElementExpandedState.collapsed
        )
    };

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
                onSelect={props.onSelect}
                selected={props.selected}
            />
        </div>
    ) : null;
};