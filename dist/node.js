import { getKey, getKeyFromNodeOrParent, hasKey, } from "./isolation";
import { apply, rawChildNodes, rawNextSibling, rawParentElement, rawParentNode, rawPreviousSibling, rawTextContent, } from "./util";
/**
 * Returns the childNodes as an Array instead of a Live NodeList.
 * The Array will contain all childNodes that are accessible for the current key.
 */
export function childNodes() {
    const nodes = apply(rawChildNodes, this, []);
    const key = getKey(this);
    const filteredNodes = [];
    if (key === null) {
        return filteredNodes;
    }
    for (let i = 0, len = nodes.length; i < len; i++) {
        const n = nodes[i];
        switch (n.nodeType) {
            case 1:
                hasKey(n, key) && filteredNodes.push(n);
                break;
            case 3:
                filteredNodes.push(n);
                break;
            default: break;
        }
    }
    return filteredNodes;
}
/**
 * This firstChild will return the first text node or element that matches a key.
 * Only the element needs to match the key.
 */
export function firstChild() {
    const childNodes = apply(rawChildNodes, this, []);
    const key = getKey(this);
    let firstChild = null;
    for (let i = 0, len = childNodes.length; i < len; i++) {
        const n = childNodes[i];
        if (n.nodeType !== 1) {
            firstChild = n;
            break;
        }
        if (hasKey(n, key)) {
            firstChild = n;
            break;
        }
        ;
    }
    return firstChild;
}
/**
 * Similar to firstChild only this would return the last child.
 */
export function lastChild() {
    const childNodes = apply(rawChildNodes, this, []);
    const key = getKey(this);
    let lastChild = null;
    for (let i = childNodes.length - 1; i >= 0; i--) {
        const n = childNodes[i];
        if (n.nodeType !== Node.ELEMENT_NODE) {
            lastChild = n;
            break;
        }
        if (hasKey(n, key)) {
            lastChild = n;
            break;
        }
    }
    return lastChild;
}
/**
 * Returns the next sibling. If the sibling is a text node it will return it only if
 * the parent has the same key otherwise it will keep scanning for element siblings that match the key.
 */
export function nextSibling() {
    const parentNode = apply(rawParentNode, this, []);
    const parentNodeKey = parentNode ? getKey(parentNode) : null;
    const key = this.nodeType === Node.ELEMENT_NODE ? getKey(this) : parentNodeKey;
    if (key === null) {
        return null;
    }
    const parentHasSameKey = key === parentNodeKey;
    let sibling = apply(rawNextSibling, this, []);
    let found = null;
    while (sibling) {
        if (sibling.nodeType === Node.ELEMENT_NODE && hasKey(sibling, key)) {
            found = sibling;
            break;
        }
        else if (parentHasSameKey) {
            found = sibling;
            break;
        }
        sibling = apply(rawNextSibling, sibling, []);
    }
    return found;
}
/**
 *
 * Return the parent element of the current node that matches the same key.
 * If the node is not an element then it will use the key of the parent to determine the parent.
 */
export function parentElement() {
    let parentElement = apply(rawParentElement, this, []);
    let parentElementKey = parentElement ? getKey(parentElement) : null;
    const key = this.nodeType === Node.ELEMENT_NODE ? getKey(this) : parentElementKey;
    if (key === null) {
        return null;
    }
    let found = null;
    while (parentElement) {
        parentElementKey = getKey(parentElement);
        if (key === parentElementKey) {
            found = parentElement;
            break;
        }
        parentElement = apply(rawParentElement, parentElement, []);
    }
    return parentElement;
}
// parentNode
/**
 *
 * Returns the parent node of the element based on key.
 */
export function parentNode() {
    return null;
}
/**
 *
 * Returns the previous sibling of a node. For nodes that are node elements we compare with parent key.
 */
export function previousSibling() {
    const parentNode = apply(rawParentNode, this, []);
    const parentNodeKey = parentNode ? getKey(parentNode) : null;
    const key = this.nodeType === Node.ELEMENT_NODE ? getKey(this) : parentNodeKey;
    if (key === null) {
        return null;
    }
    const parentHasSameKey = key === parentNodeKey;
    let sibling = apply(rawPreviousSibling, this, []);
    let found = null;
    while (sibling) {
        if (sibling.nodeType === Node.ELEMENT_NODE && hasKey(sibling, key)) {
            found = sibling;
            break;
        }
        else if (parentHasSameKey) {
            found = sibling;
            break;
        }
        sibling = apply(rawPreviousSibling, sibling, []);
    }
    return found;
}
/**
 *
 * Returns the text content based on the key of the element.
 */
export function textContent() {
    if (this.nodeType === Node.TEXT_NODE) {
        return apply(rawTextContent, this, []);
    }
    const immediateChildren = apply(childNodes, this, []);
    const fragment = new DocumentFragment();
    const queue = [[immediateChildren, fragment]];
    while (queue.length > 0) {
        const [children, parent] = queue.shift();
        for (let i = 0, len = children.length; i < len; i++) {
            const rawChild = children[i];
            const cloneChild = rawChild.cloneNode();
            parent.appendChild(cloneChild);
            if (rawChild.nodeType !== Node.TEXT_NODE) {
                const rawChildren = apply(childNodes, rawChild, []);
                if (rawChildren.length > 0) {
                    queue.push([rawChildren, cloneChild]);
                }
            }
        }
    }
    return apply(rawTextContent, fragment, []);
}
/**
 *
 * Returns true or false if the node has children.
 */
export function hasChildNodes() {
    if (this.nodeType === Node.TEXT_NODE) {
        return false;
    }
    const childNodes = apply(rawChildNodes, this, []);
    const key = getKeyFromNodeOrParent(this);
    if (key === null) {
        return false;
    }
    for (let i = 0, len = childNodes.length; i < len; i++) {
        const n = childNodes[i];
        if (hasKey(n, key))
            return true;
    }
    return false;
}
//# sourceMappingURL=node.js.map