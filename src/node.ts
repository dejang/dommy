import { hasKey } from "./isolation"
import { apply, rawChildNodes } from "./util"

// childNodes
export function factoryChildNodes(key: string) {
    return function childNodes(this: Node): Array<Node> {
        const nodes = apply(rawChildNodes, this, []);
        const filteredNodes: Array<Node> = [];
        
        for (let i = 0, len = nodes.length; i < len; i++) {
            const n = nodes[i];
            if (n.nodeType === 1 && hasKey(n, key)) {
                filteredNodes.push(n);
            } else if (n.nodeType !== 1) {
                filteredNodes.push(n);
            }
        }

        return filteredNodes;
    }
}