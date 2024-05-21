---
title: DOM
date: 2023/12/15
tags:
 - DOM
categories:
 - javascript
 - docs
---
# DOM

### documen.write 和 innerHTML 的区别？
document.write 和 innerHTML 都用于向 HTML 文档中插入内容，但它们之间有几个重要的区别：
1. 执行时机：
    - document.write 是在页面加载过程中执行的，它会在文档解析过程中直接将内容写入到文档流中。如果在页面加载完成后再调用 document.write，它会清空整个文档并写入指定的内容。
    - innerHTML 是在页面加载完成后执行的，它可以用来动态地修改文档中的内容，而不会影响文档的解析过程。
2. 影响范围：
    - document.write 会直接在文档流中插入内容，它会影响整个文档的结构和布局。
    - innerHTML 是作用在特定的 HTML 元素上，它只会改变指定元素的内容，不会影响其他部分的文档结构和布局。
3. 性能：
    - 由于 document.write 直接操作文档流，它在页面加载过程中可能会导致文档解析和渲染的性能问题。
    - innerHTML 利用浏览器的重绘优化机制，通常比 document.write 更高效。

### DOM 操作——创建、添加、移除、移动、复制、查找节点
#### 创建新节点
```js
// 创建一个指定标签名的元素节点
const newElement = document.createElement('div');

// 创建一个文档片段，文档片段是 DOM 节点的一种，它可以包含多个子节点，但不会在 DOM 树中创建额外的层级。
// 通常用于临时存储和操作多个节点，然后一次性将它们添加到文档中，以减少重绘和重排的次数。
const fragment = document.createDocumentFragment();
const div = document.createElement('div');
const span = document.createElement('span');
fragment.appendChild(div);
fragment.appendChild(span);
// 最后将 fragment 一次性添加到文档中
parentElement.appendChild(fragment);

// 创建一个包含指定文本内容的文本节点
const textNode = document.createTextNode('Hello, World!');
```
#### 添加节点:
```js
// 将新节点添加为父节点的最后一个子节点
parentElement.appendChild(newElement);

// 将新节点添加为父节点的第一个子节点
parentElement.prepend(newElement);

// 将新节点添加为参考节点之前的兄弟节点
referenceElement.before(newElement);

// 将新节点添加为参考节点之后的兄弟节点
referenceElement.after(newElement);
// 在指定节点的子节点列表中的某个子节点前插入新节点。如果 old 为 null，则将 new 节点插入到子节点列表的末尾。 
const parentElement = document.getElementById('parent');
const newElement = document.createElement('div');
const oldElement = document.getElementById('existingChild');
parentElement.insertBefore(newElement, oldElement);
```
#### 移除节点:
```js
// 从父节点移除指定节点
parentElement.removeChild(childElement)
// 移除自身节点
element.remove()
```
#### 移动节点:
```js
// 将节点移动到新的父节点下
newParentElement.appendChild(childElement)
// 用新节点替换指定节点的子节点，并返回被替换的子节点。这个方法通常用于在 DOM 树中替换现有的节点。
parentElement.replaceChild(newElement, oldElement);
```
#### 复制节点
``` js
// 复制节点 参数为 true 表示深复制，复制节点及其子节点；false 表示浅复制，只复制节点本身
const cloneNode = originalNode.cloneNode(true)
```
#### 查找节点
``` js
// 通过id
const elementById = document.getElementById('myId')

// 通过类名查找节点列表
const elementsByClass = document.getElementByClassName('myClass')

// 通过标签名查找节点列表
const elementsByTag = document.getElementByTagName('div')

// 通过 CSS 选择器在文档中查找匹配的第一个元素
const elementByComplexSelector = document.querySelector('.myClass > span:first-child');

// 通过 CSS 选择器查找节点列表
const elementsBySelector = document.querySelectorAll('.myClass')
```
#### 属性操作
``` js
//  用于获取指定属性的属性值，如果属性不存在，则返回 null。
const element = document.getElementById('myElement');
const value = element.getAttribute('data-id');

// setAttribute(key, value): 用于设置指定属性的属性值，如果属性不存在，则会创建该属性并设置对应的值。
const element = document.getElementById('myElement');
element.setAttribute('data-id', '12345');

// hasAttribute(key): 用于检查元素是否具有指定的属性，如果有则返回 true，否则返回 false。
const element = document.getElementById('myElement');
if (element.hasAttribute('data-id')) {
  // do something
}

// removeAttribute(key): 用于移除指定属性。
const element = document.getElementById('myElement');
element.removeAttribute('data-id');
```
