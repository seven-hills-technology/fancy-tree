export interface TreeElement {
    id: string;
    name: string;
}

export interface RichTreeElement extends TreeElement {
    expandedState: true | false | null;
    parent: RichTreeElement | null;
    children: RichTreeElement[] | null;
}