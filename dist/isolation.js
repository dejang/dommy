import { KEY_ATTR_NAME } from "./config";
import { apply, rawChildNodes, rawGetAttribute, rawSetAttribute } from "./util";
export function parseSelector(selector, key) {
    return `${selector}[${KEY_ATTR_NAME}=${key}]`;
}
export function markNode(node, key) {
    apply(rawSetAttribute, node, [KEY_ATTR_NAME, key]);
}
export function hasKey(node, key) {
    return apply(rawGetAttribute, node, [KEY_ATTR_NAME]) === key;
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