/**
 * Returns the childNodes as an Array instead of a Live NodeList.
 * The Array will contain all childNodes that are accessible for the current key.
 */
export declare function childNodes(this: Node): Array<Node>;
/**
 * This firstChild will return the first text node or element that matches a key.
 * Only the element needs to match the key.
 */
export declare function firstChild(this: Node): Node | null;
/**
 * Similar to firstChild only this would return the last child.
 */
export declare function lastChild(this: Node): Node | null;
/**
 * Returns the next sibling. If the sibling is a text node it will return it only if
 * the parent has the same key otherwise it will keep scanning for element siblings that match the key.
 */
export declare function nextSibling(this: Node): Node | null;
/**
 *
 * Return the parent element of the current node that matches the same key.
 * If the node is not an element then it will use the key of the parent to determine the parent.
 */
export declare function parentElement(this: Node): Node | null;
/**
 *
 * Returns the previous sibling of a node. For nodes that are node elements we compare with parent key.
 */
export declare function previousSibling(this: Node): Node | null;
export declare function textContent(this: Node): string;
/**
 *
 * Returns true or false if the node has children.
 */
export declare function hasChildNodes(this: Node): boolean;
//# sourceMappingURL=node.d.ts.map