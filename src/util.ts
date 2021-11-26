
export const { apply, getOwnPropertyDescriptor } = Reflect;

export const { createElement: rawCreateElement } = Document.prototype;

export const {
    getAttribute: rawGetAttribute,
    querySelectorAll: rawQuerySelectorAll,
    setAttribute: rawSetAttribute,
} = HTMLElement.prototype;


export const rawChildNodes = getOwnPropertyDescriptor(Node.prototype, 'childNodes')!.get!;
export const rawNextSibling = getOwnPropertyDescriptor(Node.prototype, 'nextSibling')!.get!;
export const rawParentElement = getOwnPropertyDescriptor(Node.prototype, 'parentElement')!.get!;
export const rawParentNode = getOwnPropertyDescriptor(Node.prototype, 'parentNode')!.get!;
export const rawPreviousSibling = getOwnPropertyDescriptor(Node.prototype, 'previousSibling')!.get!;
export const rawTextContent = getOwnPropertyDescriptor(Node.prototype, 'textContent')!.get!;
