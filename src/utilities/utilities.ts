import { RichTreeElement, TreeElement, RichTreeElementExpandedState } from '../models/treeElement';

export const getAncestorsOfTreeElement = (treeElement: RichTreeElement) => {
    const ancestors = [] as RichTreeElement[];

    for (let currentTreeElement: RichTreeElement | null = treeElement; currentTreeElement != null; currentTreeElement = currentTreeElement.parent) {
        ancestors.push(currentTreeElement);
    }

    ancestors.reverse();
    return ancestors;
}

export const mapTreeElementToRichTreeElement = (treeElement: TreeElement, parentTreeElement: RichTreeElement | null): RichTreeElement => {
    return {
        id: treeElement.id,
        name: treeElement.name,
        expandedState: RichTreeElementExpandedState.collapsed,
        parent: parentTreeElement,
        children: null
    };
}