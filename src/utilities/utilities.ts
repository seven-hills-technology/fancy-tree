import { RichTreeElement, RichTreeElementExpandedState, TreeElement } from '../models/treeElement';

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
        ...treeElement,
        expandedState: treeElement.hideExpandArrow ? RichTreeElementExpandedState.empty : RichTreeElementExpandedState.collapsed,
        parent: parentTreeElement,
        children: null
    };
}