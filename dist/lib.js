const { apply, getOwnPropertyDescriptor } = Reflect;
const { createElement: rawCreateElement } = Document.prototype;
const { getAttribute: rawGetAttribute, querySelectorAll: rawQuerySelectorAll, setAttribute: rawSetAttribute, } = HTMLElement.prototype;
const rawChildNodes = getOwnPropertyDescriptor(Node.prototype, 'childNodes').get;

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

// childNodes
function factoryChildNodes(key) {
    return function childNodes() {
        const nodes = apply(rawChildNodes, this, []);
        const filteredNodes = [];
        for (let i = 0, len = nodes.length; i < len; i++) {
            const n = nodes[i];
            if (n.nodeType === 1 && hasKey(n, key)) {
                filteredNodes.push(n);
            }
            else if (n.nodeType !== 1) {
                filteredNodes.push(n);
            }
        }
        return filteredNodes;
    };
}

export { factoryChildNodes, factoryCreateElement, hasKey, markNode, parseSelector, scanAndExecute };
