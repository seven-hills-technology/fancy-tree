export interface TreeElement {
    id: string;
    name: string;
    hideExpandArrow?: boolean;
}

export enum RichTreeElementExpandedState {
    collapsed,
    expanded,
    loading,
    empty
}

export interface RichTreeElement extends TreeElement {
    expandedState: RichTreeElementExpandedState;
    parent: RichTreeElement | null;
    children: RichTreeElement[] | null;
}