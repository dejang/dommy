import {
    childNodes,
    firstChild,
    lastChild,
    hasChildNodes,
    hasKey,
    nextSibling,
    parentElement,
    previousSibling,
} from '../dist/lib'
import { apply } from '../dist/util';
import { KEY_ATTR_NAME } from '../dist/config';

let el;

beforeEach(() => {
    el = document.createElement('div');
    el.setAttribute(KEY_ATTR_NAME, 'foo');
    el.innerHTML = `<div ${KEY_ATTR_NAME}="bar"></div><div ${KEY_ATTR_NAME}="foo"></div>this text`;
});

it('childNodes', () => {
    const nodes = apply(childNodes, el, []);
    expect(nodes.length).toBe(2);
    expect(nodes[0].nodeType).toBe(1);
    expect(hasKey(nodes[0], 'foo')).toBe(true);
    expect(nodes[1].nodeType).toBe(3);
});

it('firstChild', () => {
    let child = apply(firstChild, el, []);
    expect(hasKey(child, 'foo')).toBe(true);

    el.innerHTML = `this text<div ${KEY_ATTR_NAME}="bar"></div><div _key_="foo"></div>`;
    child = apply(firstChild, el, []);
    expect(child.nodeValue).toBe('this text');

    el.innerHTML = `<div ${KEY_ATTR_NAME}="bar"></div>`;
    child = apply(firstChild, el, []);
    expect(child).toBe(null);
});

it('lastChild', () => {
    let child = apply(lastChild, el, []);
    expect(child.nodeValue).toBe('this text');
});

it('nextSibling', () => {
    const children = el.childNodes;
    el.removeAttribute(KEY_ATTR_NAME);
    let child = children[0];
    let sibling = apply(nextSibling, child, []);
    expect(sibling).toBe(null);

    child = children[1];
    sibling = apply(nextSibling, child, []);
    expect(sibling).toBe(null);

    el.setAttribute(KEY_ATTR_NAME, 'foo');
    sibling = apply(nextSibling, child, []);
    expect(sibling.nodeValue).toBe('this text');

    const newSibling = document.createElement('span');
    newSibling.setAttribute(KEY_ATTR_NAME, 'foo');
    el.appendChild(newSibling);
    child = children[2];
    sibling = apply(nextSibling, child, []);
    expect(sibling.tagName).toBe('SPAN');
});

it('parentElement', () => {
    el.setAttribute(KEY_ATTR_NAME, 'foo');
    el.setAttribute('id', 'thisparent');
    const children = el.childNodes;

    let child = children[0];
    let parent = apply(parentElement, child, []);
    expect(parent).toBe(null);

    child = children[1];
    parent = apply(parentElement, child, []);
    expect(parent.id).toBe('thisparent');

    child = children[2];
    parent = apply(parentElement, child, []);
    expect(parent.id).toBe('thisparent');
});

it('previousSibling', () => {
    const children = el.childNodes;
    el.removeAttribute(KEY_ATTR_NAME);
    let child = children[0];
    let sibling = apply(previousSibling, child, []);
    expect(sibling).toBe(null);

    child = children[1];
    sibling = apply(previousSibling, child, []);
    expect(sibling).toBe(null);

    sibling = apply(previousSibling, child, []);
    expect(sibling).toBe(null);

    el.setAttribute(KEY_ATTR_NAME, 'foo');
    sibling = apply(previousSibling, child, []);
    expect(sibling.tagName).toBe('DIV');
});

it('hasChildNodes', () => {
    el.removeAttribute(KEY_ATTR_NAME);
    expect(apply(hasChildNodes, el, [])).toBe(false);
    el.setAttribute(KEY_ATTR_NAME, 'foo');
    expect(apply(hasChildNodes, el, [])).toBe(true);
});