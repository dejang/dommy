const { apply, getOwnPropertyDescriptor } = Reflect;
const { createElement: rawCreateElement } = Document.prototype;
const { getAttribute: rawGetAttribute, querySelectorAll: rawQuerySelectorAll, setAttribute: rawSetAttribute, } = HTMLElement.prototype;
const rawChildNodes = getOwnPropertyDescriptor(Node.prototype, 'childNodes').get;
const rawNextSibling = getOwnPropertyDescriptor(Node.prototype, 'nextSibling').get;
const rawParentElement = getOwnPropertyDescriptor(Node.prototype, 'parentElement').get;
const rawParentNode = getOwnPropertyDescriptor(Node.prototype, 'parentNode').get;
const rawPreviousSibling = getOwnPropertyDescriptor(Node.prototype, 'previousSibling').get;
getOwnPropertyDescriptor(Node.prototype, 'rawTextContent').get;

const KEY_ATTR_NAME = '_key_';

function parseSelector(selector, key) {
    return `${selector}[${KEY_ATTR_NAME}=${key}]`;
}
function markNode(node, key) {
    apply(rawSetAttribute, node, [KEY_ATTR_NAME, key]);
}
function hasKey(node, key) {
    return apply(rawGetAttribute, node, [KEY_ATTR_NAME]) === key;
}
function getKey(node) {
    return apply(rawGetAttribute, node, [KEY_ATTR_NAME]);
}
function getKeyFromNodeOrParent(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
        return apply(rawGetAttribute, node, [KEY_ATTR_NAME]);
    }
    else {
        const parent = apply(rawParentNode, node, []);
        if (parent) {
            return apply(rawGetAttribute, parent, [KEY_ATTR_NAME]);
        }
    }
    return null;
}
function scanAndExecute(root, callback) {
    if (!root)
        return;
    const stack = [root];
    while (stack.length !== 0) {
        const current = stack.pop();
        callback(current);
        const children = apply(rawChildNodes, current, []);
        for (let i = 0, len = children.length; i < len; i++) {
            const child = children[i];
            if (child.nodeType === 1) {
                stack.push(child);
            }
        }
    }
}

function factoryCreateElement(key) {
    return function createElement(...args) {
        const el = apply(rawCreateElement, this, args);
        markNode(el, key);
        return el;
    };
}

/**
 * Returns the childNodes as an Array instead of a Live NodeList.
 * The Array will contain all childNodes that are accessible for the current key.
 */
function childNodes() {
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
        }
    }
    return filteredNodes;
}
/**
 * This firstChild will return the first text node or element that matches a key.
 * Only the element needs to match the key.
 */
function firstChild() {
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
    }
    return firstChild;
}
/**
 * Similar to firstChild only this would return the last child.
 */
function lastChild() {
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
// nextSibling
/**
 * Returns the next sibling. If the sibling is a text node it will return it only if
 * the parent has the same key otherwise it will keep scanning for element siblings that match the key.
 */
function nextSibling() {
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
// parentElement
/**
 *
 * Return the parent element of the current node that matches the same key.
 * If the node is not an element then it will use the key of the parent to determine the parent.
 */
function parentElement() {
    let parentElement = apply(rawParentElement, this, []);
    let parentElementKey = parentElement ? getKey(parentElement) : null;
    const key = this.nodeType === Node.ELEMENT_NODE ? getKey(this) : parentElementKey;
    if (key === null) {
        return null;
    }
    while (parentElement) {
        parentElementKey = getKey(parentElement);
        if (key === parentElementKey) {
            break;
        }
        parentElement = apply(rawParentElement, parentElement, []);
    }
    return parentElement;
}
// parentNode
// previousSibling
/**
 *
 * Returns the previous sibling of a node. For nodes that are node elements we compare with parent key.
 */
function previousSibling() {
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
// textContent
// hasChildNodes
/**
 *
 * Returns true or false if the node has children.
 */
function hasChildNodes() {
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

export { childNodes, factoryCreateElement, firstChild, getKey, getKeyFromNodeOrParent, hasChildNodes, hasKey, lastChild, markNode, nextSibling, parentElement, parseSelector, previousSibling, scanAndExecute };
