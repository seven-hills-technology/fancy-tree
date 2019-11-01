import React from "react"

import { RichTreeElement, RichTreeElementExpandedState } from "../models/treeElement"
import { TreeNodeList } from "./treeNodeList"

interface TreeNodeProps {
    treeElement: RichTreeElement;
    toggleExpandedState: (treeElement: RichTreeElement) => void;
    onSelect?: (id: string) => void;
    selected?: string | null;
}

export const TreeNode: React.FunctionComponent<TreeNodeProps> = props => {

    return (
        <li>
            <span className="expansion-button-container">
                {props.treeElement.expandedState != null ? (
                    <button 
                        onClick={() => props.toggleExpandedState(props.treeElement)}
                        onMouseDown={e => e.preventDefault()}
                    >
                        {props.treeElement.expandedState === RichTreeElementExpandedState.collapsed ? <i className="fas fa-caret-right"></i> : null}
                        {props.treeElement.expandedState === RichTreeElementExpandedState.expanded ? <i className="fas fa-caret-down"></i> : null}
                        {props.treeElement.expandedState === RichTreeElementExpandedState.loading ? <i className="fas fa-spinner"></i> : null}
                    </button>
                ) : null}
            </span>
            <span 
                className={[
                    "item-content",
                    ...(props.selected === props.treeElement.id ? ["item-selected"] : [])
                ].join(" ")}
                onClick={() => props.onSelect != undefined ? props.onSelect(props.treeElement.id) : undefined}
            >{props.treeElement.name}</span>
            {props.treeElement.children != null && props.treeElement.expandedState === RichTreeElementExpandedState.expanded ? (
                <TreeNodeList
                    treeElements={props.treeElement.children}
                    toggleExpandedState={props.toggleExpandedState}
                    onSelect={props.onSelect}
                    selected={props.selected}
                />
            ) : null}
        </li>
    )
}