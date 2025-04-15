---
title: Map 和 Set
date: 2025/04/11
tags:
  - js
  - javascript
  - Map
  - Set
categories:
  - 前端
---

## Map

`Map` 是一个键值对集合，键可以是任意类型的值，包括对象、函数等。与普通对象不同的是，`Map` 的键值对是有序的，并且可以使用任何类型的值作为键。
`Map` 的基本用法如下：

```javascript
// 创建一个 Map
const map = new Map();
// 创建时初始化键值对
const map2 = new Map([
	["name", "Alice"],
	["age", 25],
]);
```

### has

`has` 方法用于判断 Map 中是否存在某个键。

```javascript
const map = new Map([
	["name", "Alice"],
	["age", 25],
]);
console.log(map.has("name")); // true
```

### get

`get` 方法用于获取 Map 中某个键对应的值。不存在时返回 `undefined`。

```javascript
const map = new Map([
  ['name', 'Alice'],
  ['age', 25],
]);
console.log(map.get('name')); // Alice
const.log(map.get('fistname')); // undefined
```

### set

`set` 方法用于设置 Map 中某个键对应的值，如果键已存在，则更新其值。接受两个参数：键和值。

```javascript
const map = new Map([
	["name", "Alice"],
	["age", 25],
]);
map.set("name", "Bob");
console.log(map.get("name")); // Bob
```

::: tip
`set` 方法可以链式调用，因为它返回的是 Map 对象本身。 Map 中的键是唯一的，如果设置了相同的键，则会覆盖原有的值。如果传进来的键是 -0 则会把键设置为 +0 再赋值。

```javascript
const map = new Map();
map.set("name", "Alice").set("age", 25);
console.log(map.get("name")); // Alice
```

:::

### delete

`delete` 方法用于删除 Map 中某个键对应的键值对。返回值为 `true` 表示删除成功，`false` 表示删除失败。

```javascript
const map = new Map([
	["name", "Alice"],
	["age", 25],
]);
console.log(map.delete("name")); // true
console.log(map.has("name")); // false
```

### clear

`clear` 方法用于清空 Map 中的所有键值对。

```javascript
const map = new Map([
	["name", "Alice"],
	["age", 25],
]);
map.clear();
console.log(map.size); // 0
```

### size

`size` 属性用于获取 Map 中键值对的数量。

```javascript
const map = new Map([
	["name", "Alice"],
	["age", 25],
]);
console.log(map.size); // 2
```

### 遍历

`Map` 提供了多种遍历方法，可以使用 `forEach`、`keys`、`values` 和 `entries` 方法来遍历 Map 中的键值对。

```javascript
const map = new Map([
	["name", "Alice"],
	["age", 25],
]);
map.forEach((value, key) => {
	console.log(key, value);
});
// name Alice
// age 25
```

```javascript
const map = new Map([
	["name", "Alice"],
	["age", 25],
]);
const keys = map.keys();
const values = map.values();
const entries = map.entries();
console.log(keys); // MapIterator { 'name', 'age' }
console.log(values); // MapIterator { 'Alice', 25 }
console.log(entries); // MapIterator { [ 'name', 'Alice' ], [ 'age', 25 ] }
```

### Map 和 Object 的区别

- `Map` 的键可以是任意类型的值，而 `Object` 的键只能是字符串或符号。
- `Map` 的键值对是有序的，而 `Object` 的键值对是无序的。
- `Map` 的大小可以通过 `size` 属性获取，而 `Object` 需要使用 `Object.keys(obj).length` 来获取。
- `Map` 提供了更多的方法来操作键值对，如 `set`、`get`、`has`、`delete` 等，而 `Object` 只能使用点语法或方括号语法来访问属性。
- `Map` 的性能更好，尤其是在频繁添加和删除键值对时。
- `Map` 可以使用 `for...of` 方法遍历，而 `Object` 需要使用 `for...in` 或 `Object.keys()` 来遍历。
- Map 对象继承自 `Object.prototype`，而 `Object` 继承自 `Object.prototype`。这意味着 Map 对象可以使用 Object 的方法，如 `toString()`、`hasOwnProperty()` 等。
- `Map` 只能使用 `new Map()` 创建，而 `Object` 可以使用字面量或构造函数创建。

## Set

`Set` 是一个值的集合，值可以是任意类型的值，包括对象、函数等。与普通数组不同的是，`Set` 中的值是唯一的，并且没有顺序。
`Set` 的基本用法如下：

```javascript
// 创建一个 Set
const set = new Set();
// 创建时初始化值
const set2 = new Set([1, 2, 3, 4]);
```

### has

`has` 方法用于判断 Set 中是否存在某个值。

```javascript
const set = new Set([1, 2, 3, 4]);
console.log(set.has(1)); // true
```

### add

`add` 方法用于向 Set 中添加一个值，如果值已存在，则不会添加。接受一个参数：值。

```javascript
const set = new Set([1, 2, 3, 4]);
set.add(5);
console.log(set.has(5)); // true
```

::: tip
`add` 方法可以链式调用，因为它返回的是 Set 对象本身。 Set 中的值是唯一的，如果添加了相同的值，则不会重复添加。

```javascript
const set = new Set();
set.add(1).add(2).add(3);
console.log(set.has(1)); // true
```

:::

### delete

`delete` 方法用于删除 Set 中某个值。返回值为 `true` 表示删除成功，`false` 表示删除失败。

```javascript
const set = new Set([1, 2, 3, 4]);
console.log(set.delete(1)); // true
console.log(set.has(1)); // false
```

### clear

`clear` 方法用于清空 Set 中的所有值。

```javascript
const set = new Set([1, 2, 3, 4]);
set.clear();
console.log(set.size); // 0
```

### size

`size` 属性用于获取 Set 中值的数量。

```javascript
const set = new Set([1, 2, 3, 4]);
console.log(set.size); // 4
```

### 遍历

`Set` 提供了多种遍历方法，可以使用 `forEach`、`keys`、`values` 和 `entries` 方法来遍历 Set 中的值。

```javascript
const set = new Set([1, 2, 3, 4]);
set.forEach((value) => {
	console.log(value);
});
// 1
// 2
// 3
// 4
```

## weakMap

`WeakMap` 是一个键值对集合，键必须是对象，而值可以是任意类型的值。与 `Map` 不同的是，`WeakMap` 的键是弱引用的，这意味着如果没有其他引用指向这个键，则它会被垃圾回收机制自动删除。
`WeakMap` 的基本用法如下：

```javascript
// 创建一个 WeakMap
const weakMap = new WeakMap();
// 创建时初始化键值对
const obj1 = { name: "Alice" };
const obj2 = { age: 17 };
const weakMap2 = new WeakMap([
	[obj1, "Alice"],
	[obj2, "Bob"],
]);
```

## weakSet

`WeakSet` 是一个值的集合，值必须是对象。与 `Set` 不同的是，`WeakSet` 的值是弱引用的，这意味着如果没有其他引用指向这个值，则它会被垃圾回收机制自动删除。
`WeakSet` 的基本用法如下：

```javascript
// 创建一个 WeakSet
const weakSet = new WeakSet();
// 创建时初始化值
const obj1 = { name: "Alice" };
const obj2 = { age: 17 };
const weakSet2 = new WeakSet([obj1, obj2]);
```

## 总结

- `Map` 和 `Set` 是 ES6 新增的数据结构，提供了更灵活和高效的方式来存储和操作数据。
- `Map` 是一个键值对集合，键可以是任意类型的值，值也可以是任意类型的值。
- `Set` 是一个值的集合，值可以是任意类型的值，但值是唯一的。
- `WeakMap` 和 `WeakSet` 是弱引用的集合，键或值必须是对象。
- `WeakMap` 的键是弱引用的，值可以是任意类型的值。
- `WeakSet` 的值是弱引用的，值必须是对象。
- `Map` 和 `Set` 提供了多种方法来操作键值对或值，如 `set`、`get`、`has`、`delete`、`clear` 等。
- `WeakMap` 和 `WeakSet` 提供了类似的方法，但不支持遍历。
- `Map` 和 `Set` 的性能更好，尤其是在频繁添加和删除键值对或值时。
- `WeakMap` 和 `WeakSet` 的键或值是弱引用的，可以自动被垃圾回收机制删除。
- `Map` 和 `Set` 可以使用 `for...of` 方法遍历，而 `WeakMap` 和 `WeakSet` 不能遍历。
