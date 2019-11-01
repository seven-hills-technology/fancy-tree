import { useState } from "react";

import { RichTreeElement } from "../models/treeElement";
import { getAncestorsOfTreeElement } from "../utilities/utilities";

export const useTreeState = (initialTreeRoots: RichTreeElement[] = []): [RichTreeElement[], React.Dispatch<React.SetStateAction<RichTreeElement[]>>, (treeElement: RichTreeElement) => void] => {
    const [rootTreeElements, setRootTreeElements] = useState(initialTreeRoots);

    const setTreeElement = (treeElement: RichTreeElement) => {
        const treeElementAncestors = getAncestorsOfTreeElement(treeElement);

        let newRootTreeElements: RichTreeElement[] | null = null;
        let previousTreeElementAncestor: RichTreeElement | null = null;

        // loop through each of treeElement's ancestors, starting with the very top
        for (const currentTreeElementAncestor of treeElementAncestors) {
            // if we are on the first level of this loop, then previousTreeElementAncestor will be null, so loop through
            // the top level treeElements; otherwise, loop through previousTreeElementAncestor's children
            const currentLevelTreeElements: RichTreeElement[] = (previousTreeElementAncestor && previousTreeElementAncestor.children || rootTreeElements)
                .map(currentLevelTreeElement => {
                    if (currentLevelTreeElement.id !== currentTreeElementAncestor.id) {
                        // if the currentLevelTreeElement does not match the id of the ancestor we're on (meaning it's not in
                        // the ancestor hierarchy) then return its object unmodified
                        return currentLevelTreeElement;
                    } else {
                        // if we got past the previous if condition, then the id of currentLevelTreeElement is in the ancestor list;
                        // if it matches the id of the bottom tree element we're updating, clone the object we sent in to update,
                        // otherwise just clone the object already in the tree
                        if (currentLevelTreeElement.id !== treeElement.id) {
                            return {...currentLevelTreeElement};
                        } else {
                            return {...treeElement};
                        }
                    }
                });
                
            if (newRootTreeElements == null) {
                newRootTreeElements = currentLevelTreeElements;
            }

            if (previousTreeElementAncestor != null) {
                previousTreeElementAncestor.children = currentLevelTreeElements;
            }

            previousTreeElementAncestor = currentLevelTreeElements.find(x => x.id === currentTreeElementAncestor.id) || null;
        }

        if (newRootTreeElements != null) {
            setRootTreeElements(newRootTreeElements);
        }
    };

    return [rootTreeElements, setRootTreeElements, setTreeElement];
}