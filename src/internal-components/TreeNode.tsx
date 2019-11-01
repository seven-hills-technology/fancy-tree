import React from "react"

import { RichTreeElement } from "../models/treeElement"
import { TreeNodeList } from "./treeNodeList"

interface TreeNodeProps {
    treeElement: RichTreeElement;
    toggleExpandedState: (treeElement: RichTreeElement) => void;
}

export const TreeNode: React.FunctionComponent<TreeNodeProps> = props => {

    return (
        <li>
            {props.treeElement.expandedState != null ? (
                <button onClick={() => props.toggleExpandedState(props.treeElement)}>
                    {props.treeElement.expandedState === true ? <span>v</span> : <span>&gt;</span>}
                </button>
            ) : null}
            {props.treeElement.name}
            {props.treeElement.children != null && props.treeElement.expandedState === true ? (
                <TreeNodeList
                    treeElements={props.treeElement.children}
                    toggleExpandedState={props.toggleExpandedState}
                />
            ) : null}
        </li>
    )
}