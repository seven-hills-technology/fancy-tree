import React from "react"

import { RichTreeElement } from "../models/treeElement"
import { TreeNode } from "./treeNode"

interface TreeNodeListProps {
    treeElements: RichTreeElement[];
    toggleExpandedState: (treeElement: RichTreeElement) => void;
}

export const TreeNodeList: React.FunctionComponent<TreeNodeListProps> = props => {
    return (
        <ul>
            {props.treeElements.map((treeElement, i) => {
                return (
                    <TreeNode
                        key={i}
                        treeElement={treeElement}
                        toggleExpandedState={props.toggleExpandedState}
                    />
                )
            })}
        </ul>
    )
}