import { KEY_ATTR_NAME } from "./config";
import { apply, rawChildNodes, rawGetAttribute, rawParentNode, rawSetAttribute } from "./util";
export function parseSelector(selector, key) {
    return `${selector}[${KEY_ATTR_NAME}=${key}]`;
}
export function markNode(node, key) {
    apply(rawSetAttribute, node, [KEY_ATTR_NAME, key]);
}
export function hasKey(node, key) {
    return apply(rawGetAttribute, node, [KEY_ATTR_NAME]) === key;
}
export function getKey(node) {
    return apply(rawGetAttribute, node, [KEY_ATTR_NAME]);
}
export function getKeyFromNodeOrParent(node) {
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
export function scanAndExecute(root, callback) {
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
//# sourceMappingURL=isolation.js.map