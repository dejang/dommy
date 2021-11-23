import { KEY_ATTR_NAME } from "./config";
import { apply, rawChildNodes, rawGetAttribute, rawSetAttribute } from "./util";

export function parseSelector(selector: string, key: string): string {
    return `${selector}[${KEY_ATTR_NAME}=${key}]`;
}

export function markNode(node: HTMLElement, key: string) {
    apply(rawSetAttribute, node, [KEY_ATTR_NAME, key]);
}

export function hasKey(node: HTMLElement, key: string) {
    return apply(rawGetAttribute, node, [KEY_ATTR_NAME]) === key;
}

export function scanAndExecute(root: Node | null, callback: Function) {
    if (!root) return;

    const stack: Array<Node> = [root];

    while(stack.length !== 0) {
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