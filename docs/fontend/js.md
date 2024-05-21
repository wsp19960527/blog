---
title: javascript
date: 2023/12/12
tags:
  - javascript
categories:
  - javascript
  - docs
---

# es6

## var、let、const

### var

在 ES5 中，顶层对象的属性和全局变量是等价的，用 var 声明的变量既是全局变量，也是顶层变量
:::tip
顶层对象，在浏览器环境指的是 window 对象，在 Node 指的是 global 对象
:::

```js
var a = 10;
console.log(window.a); // 10
```

使用 var 声明的变量存在变量提升的情况

```js
console.log(a); // undefined
var a = 20;
```

在编译阶段，编译器会将其变成以下执行

```js
var a;
console.log(a);
a = 20;
```

使用 var，我们能够对一个变量进行多次声明，后面声明的变量会覆盖前面的变量声明

```js
var a = 20;
var a = 30;
console.log(a); // 30
```

在函数中使用使用 var 声明变量时候，该变量是局部的

```js
var a = 20;
function change() {
	var a = 30;
}
change();
console.log(a); // 20
```

而如果在函数内不使用 var，该变量是全局的

```js
var a = 20;
function change() {
	a = 30;
}
change();
console.log(a); // 30
```

### let

let 是 ES6 新增的命令，用来声明变量

用法类似于 var，但是所声明的变量，只在 let 命令所在的代码块内有效

```js
{
	let a = 20;
}
console.log(a); // ReferenceError: a is not defined.
```

不存在变量提升

```js
console.log(a); // 报错ReferenceError
let a = 2;
```

这表示在声明它之前，变量 a 是不存在的，这时如果用到它，就会抛出一个错误

只要块级作用域内存在 let 命令，这个区域就不再受外部影响

```js
var a = 123;
if (true) {
	a = "abc"; // ReferenceError
	let a;
}
```

使用 let 声明变量前，该变量都不可用，也就是大家常说的“暂时性死区”

最后，let 不允许在相同作用域中重复声明

```js
let a = 20;
let a = 30;
// Uncaught SyntaxError: Identifier 'a' has already been declared
```

注意的是相同作用域，下面这种情况是不会报错的

```js
let a = 20;
{
	let a = 30;
}
```

因此，我们不能在函数内部重新声明参数

```js
function func(arg) {
	let arg;
}
func();
// Uncaught SyntaxError: Identifier 'arg' has already been declared
```

### const

const 声明一个只读的常量，一旦声明，常量的值就不能改变

```js
const a = 1;
a = 3;
// TypeError: Assignment to constant variable.
```

这意味着，const 一旦声明变量，就必须立即初始化，不能留到以后赋值

```js
const a;
// SyntaxError: Missing initializer in const declaration
```

如果之前用 var 或 let 声明过变量，再用 const 声明同样会报错

```js
var a = 20;
let b = 20;
const a = 30;
const b = 30;
// 都会报错
```

const 实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动

对于简单类型的数据，值就保存在变量指向的那个内存地址，因此等同于常量

对于复杂类型的数据，变量指向的内存地址，保存的只是一个指向实际数据的指针，const 只能保证这个指针是固定的，并不能确保改变量的结构不变

```js
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop; // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

其它情况，const 与 let 一致

### 区别

var、let、const 三者区别可以围绕下面五点展开：

- 变量提升
- 暂时性死区
- 块级作用域
- 重复声明
- 修改声明的变量
- 使用

#### 变量提升

var 声明的变量存在变量提升，即变量可以在声明之前调用，值为 undefined

let 和 const 不存在变量提升，即它们所声明的变量一定要在声明后使用，否则报错

```js
// var
console.log(a); // undefined
var a = 10;

// let
console.log(b); // Cannot access 'b' before initialization
let b = 10;

// const
console.log(c); // Cannot access 'c' before initialization
const c = 10;
```

#### 暂时性死区

var 不存在暂时性死区

let 和 const 存在暂时性死区，只有等到声明变量的那一行代码出现，才可以获取和使用该变量

```js
/ var
console.log(a)  // undefined
var a = 10

// let
console.log(b)  // Cannot access 'b' before initialization
let b = 10

// const
console.log(c)  // Cannot access 'c' before initialization
const c = 10
```

#### 块级作用域

var 不存在块级作用域

let 和 const 存在块级作用域

```js
// var
{
	var a = 20;
}
console.log(a); // 20

// let
{
	let b = 20;
}
console.log(b); // Uncaught ReferenceError: b is not defined

// const
{
	const c = 20;
}
console.log(c); // Uncaught ReferenceError: c is not defined
```

#### 重复声明

var 允许重复声明变量

let 和 const 在同一作用域不允许重复声明变量

```js
// var
var a = 10;
var a = 20; // 20

// let
let b = 10;
let b = 20; // Identifier 'b' has already been declared

// const
const c = 10;
const c = 20; // Identifier 'c' has already been declared
```

#### 修改声明的变量

var 和 let 可以

const 声明一个只读的常量。一旦声明，常量的值就不能改变

```js
// var
var a = 10;
a = 20;
console.log(a); // 20

//let
let b = 10;
b = 20;
console.log(b); // 20

// const
const c = 10;
c = 20;
console.log(c); // Uncaught TypeError: Assignment to constant variable
```

#### 使用

能用 const 的情况尽量使用 const，其他情况下大多数使用 let，避免使用 var

## ES6 中数组新增了哪些扩展

### 扩展运算符的应用

ES6 通过扩展元素符...，好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列

```js
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```

主要用于函数调用的时候，将一个数组变为参数序列

```js
function push(array, ...items) {
	array.push(...items);
}

function add(x, y) {
	return x + y;
}

const numbers = [4, 38];
add(...numbers); // 42
```

可以将某些数据结构转为数组

```js
[...document.querySelectorAll("div")];
```

能够更简单实现数组复制

```js
const a1 = [1, 2];
const [...a2] = a1;
// [1,2]
```

数组的合并也更为简洁了

```js
const arr1 = ["a", "b"];
const arr2 = ["c"];
const arr3 = ["d", "e"];
[...arr1, ...arr2, ...arr3];
// [ 'a', 'b', 'c', 'd', 'e' ]
```

:::tip
通过扩展运算符实现的是浅拷贝，修改了引用指向的值，会同步反映到新数组
:::

下面看个例子就清楚多了

```js
const arr1 = ["a", "b", [1, 2]];
const arr2 = ["c"];
const arr3 = [...arr1, ...arr2];
arr1[2][0] = 9999; // 修改arr1里面数组成员值
console.log(arr3); //['a','b',[9999,2],'c']
```

扩展运算符可以与解构赋值结合起来，用于生成数组

```js
const [first, ...rest] = [1, 2, 3, 4, 5];
first; // 1
rest; // [2, 3, 4, 5]

const [first, ...rest] = [];
first; // undefined
rest; // []

const [first, ...rest] = ["foo"];
first; // "foo"
rest; // []
```

如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错

```js
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```

可以将字符串转为真正的数组

```js
[..."hello"];
// [ "h", "e", "l", "l", "o" ]
```

定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组

```js
let nodeList = document.querySelectorAll("div");
let array = [...nodeList];

let map = new Map([
	[1, "one"],
	[2, "two"],
	[3, "three"],
]);

let arr = [...map.keys()]; // [1, 2, 3]
```

如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错

```js
const obj = { a: 1, b: 2 };
let arr = [...obj]; // TypeError: Cannot spread non-iterable object
```

### 构造函数新增的方法

关于构造函数，数组新增的方法有如下：

- Array.from()
- Array.of()

#### Array.from()

将两类对象转为真正的数组：类似数组的对象和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）

```js
let arrayLike = {
	0: "a",
	1: "b",
	2: "c",
	length: 3,
};
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

还可以接受第二个参数，用来对每个元素进行处理，将处理后的值放入返回的数组

```js
Array.from([1, 2, 3], (x) => x * x);
// [1, 4, 9]
```

#### Array.of()

用于将一组值，转换为数组

```js
Array.of(3, 11, 8); // [3,11,8]
```

没有参数的时候，返回一个空数组

当参数只有一个的时候，实际上是指定数组的长度

参数个数不少于 2 个时，Array()才会返回由参数组成的新数组

```js
Array(); // []
Array(3); // [, , ,]
Array(3, 11, 8); // [3, 11, 8]
```

### 实例对象新增的方法

- copyWithin()
- find()、findIndex()
- fill()
- entries()，keys()，values()
- includes()
- flat()，flatMap()

#### copyWithin()

将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组

参数如下：

- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

```js
// 将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2
const arr = [1, 2, 3, 4, 5].copyWithin(0, 3);
console.log(arr); // [4, 5, 3, 4, 5]

const arr1 = [1, 2, 3, 4, 5].copyWithin(1, 3);
console.log(arr1); // [1, 4, 5, 4, 5]
```

#### find()、findIndex()

find()用于找出第一个符合条件的数组成员

参数是一个回调函数，接受三个参数依次为当前的值、当前的位置和原数组

```js
[1, 5, 10, 15].find(function (value, index, arr) {
	return value > 9;
}); // 10
```

findIndex 返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1

```js
[1, 5, 10, 15].findIndex(function (value, index, arr) {
	return value > 9;
}); // 2
```

这两个方法都可以接受第二个参数，用来绑定回调函数的 this 对象

```js
function f(v) {
	return v > this.age;
}
let person = { name: "John", age: 20 };
[10, 12, 26, 15].find(f, person); // 26
```

#### fill()

使用给定值，填充一个数组

```js
["a", "b", "c"].fill(7);
// [7, 7, 7]

new Array(3).fill(7);
// [7, 7, 7]
```

还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置

```js
["a", "b", "c"].fill(7, 1, 2);
// ['a', 7, 'c']
```

:::tip
注意，如果填充的类型为对象，则是浅拷贝
:::

#### entries()，keys()，values()

keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历

```js
for (let index of ["a", "b"].keys()) {
	console.log(index);
}
// 0
// 1

for (let elem of ["a", "b"].values()) {
	console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ["a", "b"].entries()) {
	console.log(index, elem);
}
```

#### includes()

用于判断数组是否包含给定的值

```js
[1, 2, 3]
	.includes(2) // true
	[(1, 2, 3)].includes(4) // false
	[(1, 2, NaN)].includes(NaN); // true
```

方法的第二个参数表示搜索的起始位置，默认为 0

参数为负数则表示倒数的位置

```js
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
```

#### flat()，flatMap()

将数组扁平化处理，返回一个新数组，对原数据没有影响

```js
[1, 2, [3, 4]].flat();
// [1, 2, 3, 4]
```

flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将 flat()方法的参数写成一个整数，表示想要拉平的层数，默认为 1

```js
[1, 2, [3, [4, 5]]].flat()[
	// [1, 2, 3, [4, 5]]

	(1, 2, [3, [4, 5]])
].flat(2);
// [1, 2, 3, 4, 5]
```

flatMap()方法对原数组的每个成员执行一个函数相当于执行 Array.prototype.map()，然后对返回值组成的数组执行 flat()方法。该方法返回一个新数组，不改变原数组

```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2]);
// [2, 4, 3, 6, 4, 8]
```

flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的 this

### 数组的空位

数组的空位指，数组的某一个位置没有任何值

ES6 则是明确将空位转为 undefined，包括 Array.from、扩展运算符、copyWithin()、fill()、entries()、keys()、values()、find()和 findIndex()

建议大家在日常书写中，避免出现空位

### 排序稳定性

将 sort()默认设置为稳定的排序算法

```js
const arr = ["peach", "straw", "apple", "spork"];

const stableSorting = (s1, s2) => {
	if (s1[0] < s2[0]) return -1;
	return 1;
};

arr.sort(stableSorting);
// ["apple", "peach", "straw", "spork"]
```

排序结果中，straw 在 spork 的前面，跟原始顺序一致

### eval 是做什么的？

eval 是 JavaScript 中的一个全局函数，它接收一个字符串作为参数，并将这个字符串当作 JavaScript 代码进行解析和执行。换句话说，eval 函数可以将动态生成的字符串当作代码来执行。

```js
const x = 10;
const y = 20;
const code = "console.log(x + y);";
eval(code); // 输出 30
```

::: danger
尽管 eval 在某些情况下可以很方便地执行动态生成的代码，但它也存在安全风险，并且会降低程序的性能，因此应该避免在实际开发中过度使用 eval。
:::

## 对象新增了哪些扩展

### 属性的简写

ES6 中，当对象键名与对应值名相等的时候，可以进行简写

```js
const baz = { foo: foo };

// 等同于
const baz = { foo };
```

方法也能够进行简写

```js
const o = {
	method() {
		return "Hello!";
	},
};

// 等同于

const o = {
	method: function () {
		return "Hello!";
	},
};
```

在函数内作为返回值，也会变得方便很多

```js
function getPoint() {
	const x = 1;
	const y = 10;
	return { x, y };
}

getPoint();
// {x:1, y:10}
```

:::tip
简写的对象方法不能用作构造函数，否则会报错

```js
const obj = {
	f() {
		this.foo = "bar";
	},
};

new obj.f(); // 报错
```

:::

### 属性名表达式

ES6 允许字面量定义对象时，将表达式放在括号内

```js
let lastWord = "last word";

const a = {
	"first word": "hello",
	[lastWord]: "world",
};

a["first word"]; // "hello"
a[lastWord]; // "world"
a["last word"]; // "world"
```

表达式还可以用于定义方法名

```js
let obj = {
	["h" + "ello"]() {
		return "hi";
	},
};

obj.hello(); // hi
```

:::tip
属性名表达式与简洁表示法，不能同时使用，会报错

```js
// 报错
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};
```

属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]

```js
const keyA = { a: 1 };
const keyB = { b: 2 };

const myObject = {
	[keyA]: "valueA",
	[keyB]: "valueB",
};

myObject; // Object {[object Object]: "valueB"}
```

:::

### super 关键字

this 关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字 super，指向当前对象的原型对象

```js
const proto = {
	foo: "hello",
};

const obj = {
	foo: "world",
	find() {
		return super.foo;
	},
};

Object.setPrototypeOf(obj, proto); // 为obj设置原型对象
obj.find(); // "hello"
```

### 扩展运算符的应用

在解构赋值中，未被读取的可遍历的属性，分配到指定的对象上面

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }
```

解构赋值必须是最后一个参数，否则会报错

解构赋值是浅拷贝

```js
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2; // 修改obj里面a属性中键值
x.a.b; // 2，影响到了结构出来x的值
```

对象的扩展运算符等同于使用 Object.assign()方法

### 属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

- for...in：循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）

- Object.keys(obj)：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名

- Object.getOwnPropertyNames(obj)：回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名

- Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 属性的键名

- Reflect.ownKeys(obj)：返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

上述遍历，都遵守同样的属性遍历的次序规则：

- 首先遍历所有数值键，按照数值升序排列
- 其次遍历所有字符串键，按照加入时间升序排列
- 最后遍历所有 Symbol 键，按照加入时间升序排

```js
const obj = {
	a: "1",
};
const parent = {
	b: "b",
};
Object.setPrototypeOf(obj, parent);

// for in
for (let key in obj) {
	console.log(key);
} // a b

Object.keys(obj); //['a']

Object.getOwnPropertyNames(obj); //['a']

let sym = Symbol("c");
obj[sym] = "sym";
Object.getOwnPropertySymbols(obj); //[Symbol(c)]

Reflect.ownKeys(obj); // (2) ['a', Symbol(c)]
```

### 对象新增的方法

关于对象新增的方法，分别有以下：

- Object.is()
- Object.assign()
- Object.getOwnPropertyDescriptors()
- Object.setPrototypeOf()，Object.getPrototypeOf()
- Object.keys()，Object.values()，Object.entries()
- Object.fromEntries()

#### Object.is()

严格判断两个值是否相等，与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是+0 不等于-0，二是 NaN 等于自身

```js
+0 === -0; //true
NaN === NaN; // false

Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
```

#### Object.assign()

Object.assign()方法用于对象的合并，将源对象 source 的所有可枚举属性，复制到目标对象 target

Object.assign()方法的第一个参数是目标对象，后面的参数都是源对象

```js
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target; // {a:1, b:2, c:3}
```

:::tip
Object.assign()方法是浅拷贝，遇到同名属性会进行替换
:::

#### Object.getOwnPropertyDescriptors()

返回指定对象所有自身属性（非继承属性）的描述对象

```js
const obj = {
	foo: 123,
	get bar() {
		return "abc";
	},
};

Object.getOwnPropertyDescriptors(obj);
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```

#### Object.setPrototypeOf()

Object.setPrototypeOf 方法用来设置一个对象的原型对象

```js
Object.setPrototypeOf(object, prototype);

// 用法
const o = Object.setPrototypeOf({}, null);
```

#### Object.getPrototypeOf()

用于读取一个对象的原型对象
Object.getPrototypeOf(obj);

#### Object.keys()

返回自身的（不含继承的）所有可遍历（enumerable）属性的键名的数组

```js
var obj = { foo: "bar", baz: 42 };
Object.keys(obj);
// ["foo", "baz"]
```

#### Object.values()

返回自身的（不含继承的）所有可遍历（enumerable）属性的键对应值的数组

```js
const obj = { foo: "bar", baz: 42 };
Object.values(obj);
// ["bar", 42]
```

#### Object.entries()

返回一个对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对的数组

```js
const obj = { foo: "bar", baz: 42 };
Object.entries(obj);
// [ ["foo", "bar"], ["baz", 42] ]
```

#### Object.fromEntries()

用于将一个键值对数组转为对象

```js
Object.fromEntries([
	["foo", "bar"],
	["baz", 42],
]);
// { foo: "bar", baz: 42 }
```

## 函数新增了哪些扩展

### 参数

ES6 允许为函数的参数设置默认值

```js
function log(x, y = "World") {
	console.log(x, y);
}

console.log("Hello"); // Hello World
console.log("Hello", "China"); // Hello China
console.log("Hello", ""); // Hello
```

函数的形参是默认声明的，不能使用 let 或 const 再次声明

```js
function foo(x = 5) {
	let x = 1; // error
	const x = 2; // error
}
```

参数默认值可以与解构赋值的默认值结合起来使用

```js
function foo({ x, y = 5 }) {
	console.log(x, y);
}

foo({}); // undefined 5
foo({ x: 1 }); // 1 5
foo({ x: 1, y: 2 }); // 1 2
foo(); // TypeError: Cannot read property 'x' of undefined
```

上面的 foo 函数，当参数为对象的时候才能进行解构，如果没有提供参数的时候，变量 x 和 y 就不会生成，从而报错，这里设置默认值避免

```js
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错
f(undefined, 1) // [1, 1]
```

### 属性

#### 函数的 length 属性

length 将返回没有指定默认值的参数个数

```js
(function (a) {})
	.length(
		// 1
		function (a = 5) {}
	)
	.length(
		// 0
		function (a, b, c = 5) {}
	).length; // 2
```

rest 参数也不会计入 length 属性

```js
(function (...args) {}).length; // 0
```

如果设置了默认值的参数不是尾参数，那么 length 属性也不再计入后面的参数了

```js
(function (a = 0, b, c) {}).length(
	// 0
	function (a, b = 1, c) {}
).length; // 1
```

#### name 属性

返回该函数的函数名

```js
var f = function () {};

// ES5
f.name; // ""

// ES6
f.name; // "f"
```

如果将一个具名函数赋值给一个变量，则 name 属性都返回这个具名函数原本的名字

```js
const bar = function baz() {};
bar.name; // "baz"
```

Function 构造函数返回的函数实例，name 属性的值为 anonymous

```js
new Function().name; // "anonymous"
```

bind 返回的函数，name 属性值会加上 bound 前缀

```js
function foo() {}
foo
	.bind({})
	.name(
		// "bound foo"

		function () {}
	)
	.bind({}).name; // "bound "
```

### 作用域

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域

等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的

下面例子中，y=x 会形成一个单独作用域，x 没有被定义，所以指向全局变量 x

```js
let x = 1;

function f(y = x) {
	// 等同于 let y = x
	let x = 2;
	console.log(y);
}

f(); // 1
```

### 严格模式

只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

```js
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```

### 箭头函数

使用“箭头”（=>）定义函数

```js
var f = (v) => v;

// 等同于
var f = function (v) {
	return v;
};
```

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分

```js
var f = () => 5;
// 等同于
var f = function () {
	return 5;
};

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function (num1, num2) {
	return num1 + num2;
};
```

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用 return 语句返回

```js
var sum = (num1, num2) => {
	return num1 + num2;
};
```

如果返回对象，需要加括号将对象包裹

```js
let getTempItem = (id) => ({ id: id, name: "Temp" });
```

:::tip

- 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象
- 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误
- 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替
- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数
  :::

## Set、Map 两种数据结构

如果要用一句来描述，我们可以说

Set 是一种叫做集合的数据结构，Map 是一种叫做字典的数据结构

什么是集合？什么又是字典？

- 集合

是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合

- 字典

是一些元素的集合。每个元素有一个称作 key 的域，不同元素的 key 各不相同

区别？

- 共同点：集合、字典都可以存储不重复的值
- 不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储

### set

Set 是 es6 新增的数据结构，类似于数组，但是成员的值都是唯一的，没有重复的值，我们一般称为集合

Set 本身是一个构造函数，用来生成 Set 数据结构

```js
const s = new Set();
```

#### 增删改查

Set 的实例关于增删改查的方法：

- add()
- delete()
- has()
- clear()

##### add

添加某个值，返回 Set 结构本身

当添加实例中已经存在的元素，set 不会进行处理添加

```js
s.add(1).add(2).add(2); // 2只被添加了一次
```

##### delete()

删除某个值，返回一个布尔值，表示删除是否成功

```js
s.delete(1);
```

##### has()

返回一个布尔值，判断该值是否为 Set 的成员

```js
s.has(2);
```

##### clear()

清除所有成员，没有返回值

```js
s.clear();
```

#### 遍历

Set 实例遍历的方法有如下：

关于遍历的方法，有如下：

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

Set 的遍历顺序就是插入顺序

keys 方法、values 方法、entries 方法返回的都是遍历器对象

```js
let set = new Set(["red", "green", "blue"]);

for (let item of set.keys()) {
	console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
	console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
	console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

forEach()用于对每个成员执行某种操作，没有返回值，键值、键名都相等，同样的 forEach 方法有第二个参数，用于绑定处理函数的 this

```js
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + " : " + value));
// 1 : 1
// 4 : 4
// 9 : 9
```

扩展运算符和 Set 结构相结合实现数组或字符串去重

```js
// 数组
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)]; // [3, 5, 2]

// 字符串
let str = "352255";
let unique = [...new Set(str)].join(""); // "352"
```

实现并集、交集、和差集

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter((x) => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter((x) => !b.has(x)));
// Set {1}
```

### Map

Map 类型是键值对的有序列表，而键和值都可以是任意类型

Map 本身是一个构造函数，用来生成 Map 数据结构

```js
const m = new Map();
```

#### 增删改查

Map 结构的实例针对增删改查有以下属性和操作方法：

- size 属性
- set()
- get()
- has()
- delete()
- clear()

##### size

size 属性返回 Map 结构的成员总数

```js
const map = new Map();
map.set("foo", true);
map.set("bar", false);

map.size; // 2
```

##### set()

设置键名 key 对应的键值为 value，然后返回整个 Map 结构

如果 key 已经有值，则键值会被更新，否则就新生成该键

同时返回的是当前 Map 对象，可采用链式写法

```js
const m = new Map();

m.set("edition", 6); // 键是字符串
m.set(262, "standard"); // 键是数值
m.set(undefined, "nah"); // 键是 undefined
m.set(1, "a").set(2, "b").set(3, "c"); // 链式操作
```

##### get()

get 方法读取 key 对应的键值，如果找不到 key，返回 undefined

```js
const m = new Map();

const hello = function () {
	console.log("hello");
};
m.set(hello, "Hello ES6!"); // 键是函数

m.get(hello); // Hello ES6!
```

##### has()

has 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中

```js
const m = new Map();

m.set("edition", 6);
m.set(262, "standard");
m.set(undefined, "nah");

m.has("edition"); // true
m.has("years"); // false
m.has(262); // true
m.has(undefined);
```

##### delete()

delete 方法删除某个键，返回 true。如果删除失败，返回 false

```js
const m = new Map();
m.set(undefined, "nah");
m.has(undefined); // true

m.delete(undefined);
m.has(undefined); // false
```

##### clear()

clear 方法清除所有成员，没有返回值

```js
let map = new Map();
map.set("foo", true);
map.set("bar", false);

map.size; // 2
map.clear();
map.size; // 0
```

#### 遍历

Map 结构原生提供三个遍历器生成函数和一个遍历方法：

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回所有成员的遍历器
- forEach()：遍历 Map 的所有成员

遍历顺序就是插入顺序

```js
const map = new Map([
	["F", "no"],
	["T", "yes"],
]);

for (let key of map.keys()) {
	console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
	console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
	console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
	console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
	console.log(key, value);
}
// "F" "no"
// "T" "yes"

map.forEach(function (value, key, map) {
	console.log("Key: %s, Value: %s", key, value);
});
```

### WeakSet 和 WeakMap

#### WeakSet

创建 WeakSet 实例

```js
const ws = new WeakSet();
```

WeakSet 可以接受一个具有 Iterable 接口的对象作为参数

```js
const a = [
	[1, 2],
	[3, 4],
];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```

在 API 中 WeakSet 与 Set 有两个区别：

- 没有遍历操作的 API
- 没有 size 属性

WeakSet 的成员只能是引用类型，而不能是其他类型的值

```js
let ws = new WeakSet();

// 成员不是引用类型
let weakSet = new WeakSet([2, 3]);
console.log(weakSet); // 报错

// 成员为引用类型
let obj1 = { name: 1 };
let obj2 = { name: 1 };
let ws = new WeakSet([obj1, obj2]);
console.log(ws); //WeakSet {{…}, {…}}
```

WeakSet 里面的引用只要在外部消失，它在 WeakSet 里面的引用就会自动消失

#### WeakMap

WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合

在 API 中 WeakMap 与 Map 有两个区别：

- 没有遍历操作的 API
- 没有 clear 清空方法

```js
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap();
const key = { foo: 1 };
wm1.set(key, 2);
wm1.get(key); // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([
	[k1, "foo"],
	[k2, "bar"],
]);
wm2.get(k2); // "bar"
```

WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名

```js
const map = new WeakMap();
map.set(1, 2);
// TypeError: 1 is not an object!
map.set(Symbol(), 2);
// TypeError: Invalid value used as weak map key
map.set(null, 2);
// TypeError: Invalid value used as weak map key
```

WeakMap 的键名所指向的对象，一旦不再需要，里面的键名对象和所对应的键值对会自动消失，不用手动删除引用

举个场景例子：

在网页的 DOM 元素上添加数据，就可以使用 WeakMap 结构，当该 DOM 元素被清除，其所对应的 WeakMap 记录就会自动被移除

```js
const wm = new WeakMap();

const element = document.getElementById("example");

wm.set(element, "some information");
wm.get(element); // "some information"
```

:::tip
WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用

下面代码中，键值 obj 会在 WeakMap 产生新的引用，当你修改 obj 不会影响到内部

```js
const wm = new WeakMap();
let key = {};
let obj = { foo: 1 };

wm.set(key, obj);
obj = null;
wm.get(key);
// Object {foo: 1}
```

## promise

### 介绍

Promise，译为承诺，是异步编程的一种解决方案，比传统的解决方案（回调函数）更加合理和更加强大

在以往我们如果处理多层异步操作，我们往往会像下面那样编写我们的代码

```js
doSomething(function (result) {
	doSomethingElse(
		result,
		function (newResult) {
			doThirdThing(
				newResult,
				function (finalResult) {
					console.log("得到最终结果: " + finalResult);
				},
				failureCallback
			);
		},
		failureCallback
	);
}, failureCallback);
```

阅读上面代码，是不是很难受，上述形成了经典的回调地狱

现在通过 Promise 的改写上面的代码

```js
doSomething()
	.then(function (result) {
		return doSomethingElse(result);
	})
	.then(function (newResult) {
		return doThirdThing(newResult);
	})
	.then(function (finalResult) {
		console.log("得到最终结果: " + finalResult);
	})
	.catch(failureCallback);
```

瞬间感受到 promise 解决异步操作的优点：

- 链式操作减低了编码难度
- 代码可读性明显增强

下面我们正式来认识 promise

#### 状态

promise 对象仅有三种状态

- pending（进行中）
- fulfilled（已成功）
- rejected（已失败）

#### 特点

- 对象的状态不受外界影响，只有异步操作的结果，可以决定当前是哪一种状态
- 一旦状态改变（从 pending 变为 fulfilled 和从 pending 变为 rejected），就不会再变，任何时候都可以得到这个结果

### 用法

Promise 对象是一个构造函数，用来生成 Promise 实例

```js
const promise = new Promise(function (resolve, reject) {});
```

Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject

- resolve 函数的作用是，将 Promise 对象的状态从“未完成”变为“成功”
- reject 函数的作用是，将 Promise 对象的状态从“未完成”变为“失败”

#### 实例方法

Promise 构建出来的实例存在以下方法：

- then()
- catch()
- finally()

##### then()

then 是实例状态发生改变时的回调函数，第一个参数是 resolved 状态的回调函数，第二个参数是 rejected 状态的回调函数

then 方法返回的是一个新的 Promise 实例，也就是 promise 能链式书写的原因

```js
getJSON("/posts.json")
	.then(function (json) {
		return json.post;
	})
	.then(function (post) {
		// ...
	});
```

##### catch

catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数

```js
getJSON("/posts.json")
	.then(function (posts) {
		// ...
	})
	.catch(function (error) {
		// 处理 getJSON 和 前一个回调函数运行时发生的错误
		console.log("发生错误！", error);
	});
```

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止

```js
getJSON("/post/1.json")
	.then(function (post) {
		return getJSON(post.commentURL);
	})
	.then(function (comments) {
		// some code
	})
	.catch(function (error) {
		// 处理前面三个Promise产生的错误
	});
```

一般来说，使用 catch 方法代替 then()第二个参数

Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应

```js
const someAsyncThing = function () {
	return new Promise(function (resolve, reject) {
		// 下面一行会报错，因为x没有声明
		resolve(x + 2);
	});
};
```

浏览器运行到这一行，会打印出错误提示 ReferenceError: x is not defined，但是不会退出进程

catch()方法之中，还能再抛出错误，通过后面 catch 方法捕获到

##### finally()

finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

#### 构造函数方法

Promise 构造函数存在以下方法：

- all()
- race()
- allSettled()
- resolve()
- reject()

##### all()

Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例

```js
const p = Promise.all([p1, p2, p3]);
```

接受一个数组（迭代对象）作为参数，数组成员都应为 Promise 实例

实例 p 的状态由 p1、p2、p3 决定，分为两种：

- 只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数
- 只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数

:::tip
如果作为参数的 Promise 实例，自己定义了 catch 方法，那么它一旦被 rejected，并不会触发 Promise.all()的 catch 方法
:::

```js
const p1 = new Promise((resolve, reject) => {
	resolve("hello");
})
	.then((result) => result)
	.catch((e) => e);

const p2 = new Promise((resolve, reject) => {
	throw new Error("报错了");
})
	.then((result) => result)
	.catch((e) => e);

Promise.all([p1, p2])
	.then((result) => console.log(result))
	.catch((e) => console.log(e));
// ["hello", Error: 报错了]
```

如果 p2 没有自己的 catch 方法，就会调用 Promise.all()的 catch 方法

```js
const p1 = new Promise((resolve, reject) => {
	resolve("hello");
}).then((result) => result);

const p2 = new Promise((resolve, reject) => {
	throw new Error("报错了");
}).then((result) => result);

Promise.all([p1, p2])
	.then((result) => console.log(result))
	.catch((e) => console.log(e));
// Error: 报错了
```

##### race()

Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例

```js
const p = Promise.race([p1, p2, p3]);
```

只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变

率先改变的 Promise 实例的返回值则传递给 p 的回调函数

```js
const p = Promise.race([
	fetch("/resource-that-may-take-a-while"),
	new Promise(function (resolve, reject) {
		setTimeout(() => reject(new Error("request timeout")), 5000);
	}),
]);

p.then(console.log).catch(console.error);
```

##### allSettled()

Promise.allSettled()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例

只有等到所有这些参数实例都返回结果，不管是 fulfilled 还是 rejected，包装实例才会结束

```js
const promises = [fetch("/api-1"), fetch("/api-2"), fetch("/api-3")];

await Promise.allSettled(promises);
removeLoadingIndicator();
```

##### resolve()

将现有对象转为 Promise 对象

```js
Promise.resolve("foo");
// 等价于
new Promise((resolve) => resolve("foo"));
```

参数可以分成四种情况，分别如下：

- 参数是一个 Promise 实例，promise.resolve 将不做任何修改、原封不动地返回这个实例
- 参数是一个 thenable 对象，promise.resolve 会将这个对象转为 Promise 对象，然后就立即执行 thenable 对象的 then()方法
- 参数不是具有 then()方法的对象，或根本就不是对象，Promise.resolve()会返回一个新的 Promise 对象，状态为 resolved
- 没有参数时，直接返回一个 resolved 状态的 Promise 对象

##### reject()

Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为 rejected

```js
const p = Promise.reject("出错了");
// 等同于
const p = new Promise((resolve, reject) => reject("出错了"));

p.then(null, function (s) {
	console.log(s);
});
// 出错了
```

Promise.reject()方法的参数，会原封不动地变成后续方法的参数

```js
Promise.reject("出错了").catch((e) => {
	console.log(e === "出错了");
});
// true
```

### 使用场景

将图片的加载写成一个 Promise，一旦加载完成，Promise 的状态就发生变化

```js
const preloadImage = function (path) {
	return new Promise(function (resolve, reject) {
		const image = new Image();
		image.onload = resolve;
		image.onerror = reject;
		image.src = path;
	});
};
```

通过链式操作，将多个渲染数据分别给个 then，让其各司其职。或当下个异步请求依赖上个请求结果的时候，我们也能够通过链式操作友好解决问题

```js
// 各司其职
getInfo()
	.then((res) => {
		let { bannerList } = res;
		//渲染轮播图
		console.log(bannerList);
		return res;
	})
	.then((res) => {
		let { storeList } = res;
		//渲染店铺列表
		console.log(storeList);
		return res;
	})
	.then((res) => {
		let { categoryList } = res;
		console.log(categoryList);
		//渲染分类列表
		return res;
	});
```

通过 all()实现多个请求合并在一起，汇总所有请求结果，只需设置一个 loading 即可

```js
function initLoad() {
	// loading.show() //加载loading
	Promise.all([getBannerList(), getStoreList(), getCategoryList()])
		.then((res) => {
			console.log(res);
			loading.hide(); //关闭loading
		})
		.catch((err) => {
			console.log(err);
			loading.hide(); //关闭loading
		});
}
//数据初始化
initLoad();
```

通过 race 可以设置图片请求超时

```js
//请求某个图片资源
function requestImg() {
	var p = new Promise(function (resolve, reject) {
		var img = new Image();
		img.onload = function () {
			resolve(img);
		};
		//img.src = "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg"; 正确的
		img.src = "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg1";
	});
	return p;
}

//延时函数，用于给请求计时
function timeout() {
	var p = new Promise(function (resolve, reject) {
		setTimeout(function () {
			reject("图片请求超时");
		}, 5000);
	});
	return p;
}

Promise.race([requestImg(), timeout()])
	.then(function (results) {
		console.log(results);
	})
	.catch(function (reason) {
		console.log(reason);
	});
```

## Generator
### 介绍
Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同

回顾下上文提到的解决异步的手段：

- 回调函数
- promise

那么，上文我们提到promsie已经是一种比较流行的解决异步方案，那么为什么还出现Generator？甚至async/await呢？

该问题我们留在后面再进行分析，下面先认识下Generator
### Generator函数
执行 Generator 函数会返回一个遍历器对象，可以依次遍历 Generator 函数内部的每一个状态

形式上，Generator函数是一个普通函数，但是有两个特征：

- function关键字与函数名之间有一个星号
- 函数体内部使用yield表达式，定义不同的内部状态
```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
```
### 使用
Generator 函数会返回一个遍历器对象，即具有Symbol.iterator属性，并且返回给自己
```js
function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g
// true
```
通过yield关键字可以暂停generator函数返回的遍历器对象的状态
```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();
```
上述存在三个状态：hello、world、return

通过next方法才会遍历到下一个内部状态，其运行逻辑如下：

- 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
- 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式
- 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
- 如果该函数没有return语句，则返回的对象的value属性值为undefined
```js
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```
done用来判断是否存在下个状态，value对应状态值

yield表达式本身没有返回值，或者说总是返回undefined

通过调用next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```
正因为Generator函数返回Iterator对象，因此我们还可以通过for...of进行遍历
```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```
原生对象没有遍历接口，通过Generator函数为它加上这个接口，就能使用for...of进行遍历了
```js
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```
### 异步解决方案
回顾之前展开异步解决的方案：

- 回调函数
- Promise 对象
- generator 函数
- async/await

这里通过文件读取案例，将几种解决异步的方案进行一个比较：
#### 回调函数
所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，再调用这个函数
```js
fs.readFile('/etc/fstab', function (err, data) {
  if (err) throw err;
  console.log(data);
  fs.readFile('/etc/shells', function (err, data) {
    if (err) throw err;
    console.log(data);
  });
});
```
readFile函数的第三个参数，就是回调函数，等到操作系统返回了/etc/passwd这个文件以后，回调函数才会执行
#### Promise
Promise就是为了解决回调地狱而产生的，将回调函数的嵌套，改成链式调用
```js
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};


readFile('/etc/fstab').then(data =>{
    console.log(data)
    return readFile('/etc/shells')
}).then(data => {
    console.log(data)
})
```
这种链式操作形式，使异步任务的两段执行更清楚了，但是也存在了很明显的问题，代码变得冗杂了，语义化并不强
#### generator
yield表达式可以暂停函数执行，next方法用于恢复函数执行，这使得Generator函数非常适合将异步任务同步化
```js
const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```
#### async/await
将上面Generator函数改成async/await形式，更为简洁，语义化更强了
```js
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```
#### 区别：
通过上述代码进行分析，将promise、Generator、async/await进行比较：

- promise和async/await是专门用于处理异步操作的

- Generator并不是为异步而设计出来的，它还有其他功能（对象迭代、控制输出、部署Interator接口...）

- promise编写代码相比Generator、async更为复杂化，且可读性也稍差

- Generator、async需要与promise对象搭配处理异步情况

- async实质是Generator的语法糖，相当于会自动执行Generator函数

- async使用上更为简洁，将异步代码以同步的形式进行编写，是处理异步编程的最终方案

### 使用场景
Generator是异步解决的一种方案，最大特点则是将异步操作同步化表达出来
```js
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()

// 卸载UI
loader.next()
```
包括redux-saga中间件也充分利用了Generator特性
```js
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;
```
还能利用Generator函数，在对象上实现Iterator接口
```js
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7
```
## Proxy
### 介绍
定义： 用于定义基本操作的自定义行为

本质： 修改的是程序默认形为，就形同于在编程语言层面上做修改，属于元编程(meta programming)

元编程（Metaprogramming，又译超编程，是指某类计算机程序的编写，这类计算机程序编写或者操纵其它程序（或者自身）作为它们的数据，或者在运行时完成部分本应在编译时完成的工作

一段代码来理解
```js
#!/bin/bash
# metaprogram
echo '#!/bin/bash' >program
for ((I=1; I<=1024; I++)) do
    echo "echo $I" >>program
done
chmod +x program
```
#####

#####

### JavaScript 的作用域链

JavaScript 的作用域链是指在代码中查找变量时所遵循的规则。当在函数内部访问一个变量时，JavaScript 引擎会先在当前函数的作用域中查找，如果找不到，就会顺着作用域链向上一层一层地查找，直到找到该变量或者到达全局作用域。
::: tip
作用域链的形成是由函数定义的位置决定的
:::

```js
var x = 10;

function outerFunction() {
	var y = 20;

	function innerFunction() {
		var z = 30;
		console.log(x + y + z); // 在这个例子中，JavaScript引擎会先在innerFunction的作用域中查找z，然后在outerFunction的作用域中查找y，最后在全局作用域中查找x。
	}

	innerFunction();
}

outerFunction();
```

在这个例子中，当 innerFunction 中的 console.log 语句执行时，JavaScript 引擎会按照作用域链的规则依次查找变量 x、y 和 z。

### 谈谈 This 对象的理解

在 JavaScript 中，this 是一个关键字，它指向当前执行代码的上下文对象。this 的值取决于函数的调用方式。它可能引用全局对象、调用它的对象，或者由 new 关键字创建的新对象。
在全局作用域中，this 指向全局对象（在浏览器中通常是 window 对象）。
在函数中，this 的值取决于函数的调用方式：

- 当一个函数作为对象的方法被调用时，this 指向调用该方法的对象。
- 当函数被作为普通函数调用时，this 指向全局对象（在非严格模式下），或者是 undefined（在严格模式下）
- 当使用 new 关键字调用构造函数时，this 指向新创建的对象。
  箭头函数的 this 值是在定义时确定的，它会捕获最近一层非箭头函数的 this 值，因此箭头函数没有自己的 this 绑定，它会继承父级作用域中的 this 值。

在 JavaScript 中，您可以通过以下方法显示地指定调用函数的 this 指向：

- 使用 call() 方法：call() 方法允许您调用一个函数，同时指定该函数中的 this 值，以及作为参数传递给该函数的参数列表。例如：

```js
function greet(name) {
	console.log(`Hello, ${name}! I am ${this.name}.`);
}

const person = { name: "Alice" };
greet.call(person, "Bob");
```

- 使用 apply() 方法：apply() 方法与 call() 方法类似，不同之处在于它接受一个参数数组而不是一系列单独的参数。例如：

```js
function greet(name) {
	console.log(`Hello, ${name}! I am ${this.name}.`);
}

const person = { name: "Alice" };
greet.apply(person, ["Bob"]);
```

- 使用 bind() 方法：bind() 方法创建一个新的函数，其中 this 值被永久绑定到指定的值。例如：

```js
function greet(name) {
	console.log(`Hello, ${name}! I am ${this.name}.`);
}

const person = { name: "Alice" };
const greetWithPerson = greet.bind(person);
greetWithPerson("Bob");
```

### hasOwnProperty 方法有什么作用

hasOwnProperty 是 JavaScript 中所有对象都拥有的方法，用于检查对象自身是否包含指定属性（而不是继承而来的属性）。具体来说，hasOwnProperty 方法的作用是检查对象的属性是否是对象自身拥有的属性，而不是继承自原型链上的属性。它接受一个参数，即要检查的属性名，如果对象自身包含该属性，则返回 true，否则返回 false。

```js
var obj = {
	name: "Alice",
	age: 25,
};

// 检查对象 obj 是否包含自身属性 name
var hasName = obj.hasOwnProperty("name"); // 返回 true

// 检查对象 obj 是否包含自身属性 toString
var hasToString = obj.hasOwnProperty("toString"); // 返回 false，因为 toString 是继承自原型链上的属性
```

### JavaScript 实现继承的几种方式

- 原型链继承：这种实现方式存在的缺点是，在包含有引用类型的数据时，会被所有的实例对象所共享，容易造成修改的混乱。还有就是在创建子类型的时候不能向超类型传递参数。
- 构造函数继承，这种方式是通过在子类型的函数中调用超类型的构造函数来实现的，这一种方法解决了不能向超类型传递参数的缺点，但是它存在的一个问题就是无法实现函数方法的复用，并且超类型原型定义的方法子类型也没有办法访问到。
- 组合继承，组合继承是将原型链和构造函数组合起来使用的一种方式。通过构造函数的方式来实现类型的属性的继承，通过将子类型的原型设置为超类型的实例来实现方法的继承。这种方式解决了上面的两种模式单独使用时的问题，但是由于我们是以超类型的实例来作为子类型的原型，所以调用了两次超类的构造函数，造成了子类型的原型中多了很多不必要的属性。
- 原型式继承，原型式继承的主要思路就是基于已有的对象来创建新的对象，实现的原理是，向函数中传入一个对象，然后返回一个以这个对象为原型的对象。这种继承的思路主要不是为了实现创造一种新的类型，只是对某个对象实现一种简单继承，ES5 中定义的 Object.create() 方法就是原型式继承的实现。缺点与原型链方式相同。
- 寄生式继承，寄生式继承的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对象进行扩展，最后返回这个对象。这个扩展的过程就可以理解是一种继承。这种继承的优点就是对一个简单对象实现继承，如果这个对象不是我们的自定义类型时。缺点是没有办法实现函数的复用
- 寄生组合式继承，组合继承的缺点就是使用超类型的实例做为子类型的原型，导致添加了不必要的原型属性。寄生式组合继承的方式是使用超类型的原型的副本来作为子类型的原型，这样就避免了创建不必要的属性。

```js
// 1. 原型链继承
function Parent() {
	this.name = "Parent";
}

Parent.prototype.sayHello = function () {
	console.log("Hello from Parent");
};

function Child() {
	this.type = "child";
}

Child.prototype = new Parent();

// 2. 构造函数继承
function Parent(name) {
	this.name = name;
}

function Child(name) {
	Parent.call(this, name);
}

// 3. 组合继承
function Parent(name) {
	this.name = name;
}

Parent.prototype.sayHello = function () {
	console.log("Hello from Parent");
};

function Child(name, type) {
	Parent.call(this, name);
	this.type = type;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

// 4. 原型式继承
var parent = {
	name: "Parent",
	sayHello: function () {
		console.log("Hello from Parent");
	},
};

var child = Object.create(parent);

// 5. 寄生式继承
function createChild(obj) {
	var child = Object.create(obj);
	child.sayHi = function () {
		console.log("Hi from Child");
	};
	return child;
}

// 6. 寄生组合式继承
function Parent(name) {
	this.name = name;
}

function Child(name, type) {
	Parent.call(this, name);
	this.type = type;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```

### 什么是闭包

闭包（Closure）是指在某个作用域内部定义的函数，该函数可以访问其外部作用域的变量。换句话说，闭包是函数以及其相关的引用环境的组合体，它可以“记住”并访问创建它的作用域中的变量，即使在该作用域外部调用函数时仍然可以访问这些变量。

闭包通常用于以下情况：

- 封装：闭包可以用于封装变量和函数，形成独立的作用域，避免全局变量污染。
- 数据隐藏：通过闭包，可以创建私有变量和函数，外部无法直接访问，从而保护数据安全性。
- 延续局部变量的寿命：当函数执行完毕后，其内部变量通常会被销毁，但闭包可以使得函数内部的局部变量在函数执行完毕后继续存在。

总之，闭包是一种强大的特性，它可以提供更好的封装和数据隐藏，同时延续局部变量的寿命，使得函数可以访问和操作其创建时的作用域中的变量，从而提供了更灵活的编程手段。闭包的使用可以带来很多好处，但同时也存在一些潜在的缺点，包括：

- 内存泄漏：如果闭包中保留了对外部作用域中大量变量的引用，并且这些变量不再需要时，这些变量会因为闭包的存在而无法被垃圾回收，导致内存泄漏。
- 性能问题：闭包可能会占用较多的内存，并且在访问外部作用域变量时需要额外的查找，可能会影响性能。
- 难以理解：对于初学者或不熟悉闭包概念的开发者来说，闭包的概念和工作原理可能比较难以理解，容易引发代码维护和调试困难。
- 滥用闭包可能导致代码混乱：过度使用闭包可能使得代码结构混乱，难以维护和理解。

### instanceof 的作用

instanceof 运算符主要用于检查一个对象是否属于一个特定的类（构造函数）或其子类的实例。它通过检查对象的原型链来确定对象的类型关系。

### 如何判断一个对象是否属于某个类？

- 使用 instanceof 运算符来判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
- 通过对象的 constructor 属性来判断，对象的 constructor 属性指向该对象的构造函数，但是这种方式不是很安全，因为 constructor 属性可以被改写。
- 如果需要判断的是某个内置的引用类型的话，可以使用 Object.prototype.toString() 方法来打印对象的
  [[Class]] 属性来进行判断。

### new 操作符具体干了什么呢？如何实现？

1. 创建一个新的空对象。
2. 将这个空对象的原型（**proto**）指向构造函数的原型对象（prototype）
3. 将构造函数的作用域赋给新对象（因此 this 指向这个新对象）
4. 执行构造函数内部的代码，为这个新对象添加属性和方法。
5. 如果构造函数没有显式返回一个对象，则返回这个新对象；否则返回构造函数内部显式返回的对象。

```js
function MyNew(constructor, ...args) {
	if (typeof constructor !== "function") throw "constructor 不是一个函数";
	let obj = {};
	obj.__proto__ = constructor.prototype;
	let result = constructor.apply(obj, args);
	return result instanceof Object ? result : obj;
}
function CreateObj(name) {
	this.name = name;
}
let obj = MyNew(Createobj, "alice");
console.log(obj.name); // alice
```

### 三种事件模型是什么

- DOM0 级模型：这种模型不会传播，所以没有事件流的概念，但是现在有的浏览器支持以冒泡的方式实现，它可以在网页中直接定义监听函数，也可以通过 js 属性来指定监听函数。这种方式是所有浏览器都兼容的。
- IE 事件模型：在该事件模型中，一次事件共有两个过程，事件处理阶段，和事件冒泡阶段。事件处理阶段会首先执行目标元素绑定的监听事件。然后是事件冒泡阶段，冒泡指的是事件从目标元素冒泡到 document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。这种模型通过 attachEvent 来添加监听函数，可以添加多个监听函数，会按顺序依次执行
- DOM2 级事件模型：在该事件模型中，一次事件共有三个过程，第一个过程是事件捕获阶段。捕获指的是事件从 document 一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。后面两个阶段和 IE 事件模型的两个阶段相同。这种事件模型，事件绑定的函数是 addEventListener，其中第三个参数可以指定事件是否在捕获阶段执行。

### 事件委托

事件委托本质上是利用了浏览器事件冒泡的机制。因为事件在冒泡过程中会上传到父节点，并且父节点可以通过事件对象获取到目标节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，这种方式称为事件代理。
::: tip
使用事件代理我们可以不必要为每一个子元素都绑定一个监听事件，这样减少了内存上的消耗。并且使用事件代理我们还可以实现事件的动态绑定，比如说新增了一个子节点，我们并不需要单独地为它添加一个监听事件，它所发生的事件会交给父元素中的监听函数来处理。
:::

### js 延迟加载的方式有哪些？

js 延迟加载，也就是等页面加载完成之后再加载 JavaScript 文件。 js 延迟加载有助于提高页面加载速度。

- 将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。
- 给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
- 给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
- 动态创建 DOM 标签的方式，我们可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。

### Ajax 是什么? 如何创建一个 Ajax？

Ajax（Asynchronous JavaScript and XML）是一种用于创建交互式网页应用程序的技术。它允许在不重新加载整个页面的情况下，通过异步方式与服务器进行数据交换，从而实现动态更新页面内容的效果。

要创建一个简单的 Ajax 请求，可以按照以下步骤进行：

1. 创建一个 XMLHttpRequest 对象，用于向服务器发起请求并处理响应。
2. 设置请求的相关参数，如请求的 URL、请求的方法（GET、POST 等）以及是否采用异步方式进行请求。
3. 监听 XMLHttpRequest 对象的状态变化，并处理响应数据。
4. 发起请求并发送数据（如果是 POST 请求）。

```js
var xhr = new XMLHttpRequest();
// xhr.open 是 XMLHttpRequest 对象用于初始化一个请求的方法。它接受三个参数：请求的方法、请求的URL、以及是否采用异步方式进行请求。
xhr.open("get", "https://www.baidu.com", true);
xhr.onreadystatechange = function () {
	if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
		console.log(xhr.responseText);
	} else {
		console.error("请求失败");
	}
};
// 如果是POST请求，可以将参数设置为要发送的数据
xhr.send("param1=value1&param2=value2");
```

::: tip
一个 XMLHttpRequest 对象一共有 5 个状态
可以通过 XMLHttpRequest[type]读取

- 0 - UNSENT（未初始化）：XMLHttpRequest 对象已经创建，但尚未调用 open 方法。
- 1 - OPENED（已打开）：open 方法已经被调用，但尚未调用 send 方法。
- 2 - HEADERS_RECEIVED（已接收响应头）：send 方法已经被调用，并且头部和状态已经可获得。
- 3 - LOADING（正在接收响应体）：响应体正在下载中；responseText 中已经获取了部分数据。
- 4 - DONE（请求完成）：整个数据传输过程已经结束。
  :::

### 浏览器的缓存机制？

浏览器的缓存机制是指浏览器在访问网页时如何存储和管理已经获取的资源的过程。浏览器通过缓存可以减少对服务器的请求，加快页面加载速度，提高用户体验。
浏览器的缓存机制主要包括以下几种：

- Memory Cache（内存缓存）：将请求过的资源存储在内存中，内存缓存速度快，但容量有限，通常只在当前页面会话中有效。
- Disk Cache（磁盘缓存）：将请求过的资源存储在磁盘中，磁盘缓存容量较大，可以在多个页面会话中有效，但读取速度相对内存缓存较慢。
- Service Worker Cache（Service Worker 缓存）：通过 Service Worker 技术实现的缓存，可以离线访问，提高网页的可靠性和性能。
- HTTP 缓存：利用 HTTP 协议中的缓存头部（如 Cache-Control、Expires、ETag、Last-Modified 等）来控制浏览器对资源的缓存行为。
  浏览器在请求资源时会根据缓存策略来决定是否从缓存中获取资源，还是向服务器发起请求。开发者可以通过设置 HTTP 头部来控制资源的缓存行为，以优化页面加载速度和缓解服务器压力。
  ::: info
  需要注意的是，浏览器缓存机制是复杂的，开发者需要根据具体的需求和场景，合理地设置缓存策略，以达到最佳的性能和用户体验
  :::
  以下是一些常见的 HTTP 缓存控制字段：
- Expires：指定资源的过期时间，告诉浏览器在该时间之前可以直接从缓存中获取资源，无需再向服务器发起请求。
- Cache-Control：用于控制请求和响应的缓存行为，包括 max-age（指定资源在缓存中的最长有效时间）、no-cache（强制要求缓存对资源进行重新验证，但仍然可以使用缓存的副本）等。常用的还有比如 private ，用来规定资源只能被客户端缓存，不能够代理服务器所缓存。还有如 no-store ，用来指定资源不能够被缓存，no-cache 代表该资源能够被缓存，但是立即失效，每次都需要向服务器发起请求。
- Last-Modified：指示资源的最后修改时间，浏览器可以通过发送 If-Modified-Since 头部来验证资源是否发生了变化。
- ETag：用于标识资源的特定版本，浏览器可以通过发送 If-None-Match 头部来验证资源是否发生了变化。

Web 缓存策略通常可以分为以下几种：

- 强缓存：当客户端发起请求时，如果资源处于强缓存中，并且未过期，客户端会直接从缓存中获取资源，而不会向服务器发送请求。强缓存通常通过设置响应头中的 Expires 或 Cache-Control 字段来实现。
  ::: info
  一般来说只需要设置其中一种方式就可以实现强缓存策略，当两种方式一起使用时，Cache-Control 的优先级要高于 Expires 。
  :::
- 协商缓存：当客户端发起请求时，如果资源未命中强缓存，客户端会向服务器发送请求，服务器会根据请求头中的条件进行判断，如果资源未发生变化，服务器会返回 304 Not Modified 状态码，告诉客户端可以继续使用缓存中的资源。协商缓存通常通过设置响应头中的 Last-Modified 和 ETag 字段来实现。
  ::: info
  因为 Last-Modified 的这种可能发生的不准确性，http 中提供了另外一种方式，那就是 Etag 属性。服务器在返回资源的时候，在头信息中添加了 Etag 属性，这个属性是资源生成的唯一标识符，当资源发生改变的时候，这个值也会发生改变。在下一次资源请求时，浏览器会在请求头中添加一个 If-None-Match 属性，这个属性的值就是上次返回的资源的 Etag 的值。服务接收到请求后会根据这个值来和资源当前的 Etag 的值来进行比较，以此来判断资源是否发生改变，是否需要返回资源。通过这种方式，比 Last-Modified 的方式更加精确。

当 Last-Modified 和 Etag 属性同时出现的时候，Etag 的优先级更高。使用协商缓存的时候，服务器需要考虑负载平衡的问题，因此多个服务器上资源的 Last-Modified 应该保持一致，因为每个服务器上 Etag 的值都不一样，因此在考虑负载平衡时，最好不要设置 Etag 属性。
:::

- Service Worker 缓存：通过 Service Worker 技术实现的缓存，可以离线访问，并且可以自定义缓存策略，提高网页的可靠性和性能。
- CDN 缓存：内容分发网络（CDN）通常会缓存静态资源，通过就近访问和内容分发，加速资源的获取，减少服务器的负载。
  :::info
  强缓存策略和协商缓存策略在缓存命中时都会直接使用本地的缓存副本，区别只在于协商缓存会向服务器发送一次请求。它们缓存不命中时，都会向服务器发送请求来获取资源。在实际的缓存机制中，强缓存策略和协商缓存策略是一起合作使用的。浏览器首先会根据请求的信息判断，强缓存是否命中，如果命中则直接使用资源。如果不命中则根据头信息向服务器发起请求，使用协商缓存，如果协商缓存命中的话，则服务器不返回资源，浏览器直接使用本地资源的副本，如果协商缓存不命中，则浏览器返回最新的资源给浏览器。
  :::

### 什么是浏览器的同源政策？

浏览器的同源政策是一种安全机制，用于限制一个网页文档或脚本如何与来自不同源的资源进行交互。同源政策要求网页文档或脚本只能与相同协议、主机和端口的资源进行交互，以防止恶意网站利用已认证的用户身份来获取其他网站的数据。

具体来说，同源政策要求以下信息保持相同才能被视为同源：

- 协议 (http vs https)
- 主机名
- 端口号

如果发起请求的网页与要请求的资源不符合同源政策，浏览器将阻止页面访问或脚本执行。这有助于保护用户的隐私和安全，防止恶意网站窃取个人信息或进行跨站点请求伪造攻击。

### 如何解决跨域问题？

解决跨域问题的方法有多种，以下是一些常用的方法：

- CORS（跨域资源共享）：在服务器端设置响应头中的 Access-Control-Allow-Origin 字段，允许指定域名的跨域请求。可以通过设置 \* 来允许所有域名的跨域请求，也可以指定具体的域名。
- JSONP（JSON with Padding）：利用 script 标签的跨域特性，通过动态创建 script 标签，将需要获取的数据作为参数传递到另一个域名的接口上，获取数据后通过回调函数处理。
- 代理服务器：在服务器端设置代理，将跨域请求转发到目标服务器，然后将响应返回给客户端。
- WebSocket：通过 WebSocket 进行跨域通信，WebSocket 协议本身不受同源策略限制。
- 跨域资源嵌入：在服务器端设置响应头中的 Access-Control-Allow-Origin 字段，允许指定域名的跨域请求。
- Nginx 反向代理：通过配置 Nginx 服务器作为反向代理，将跨域请求转发到目标服务器上。

### 模块化

模块化开发是指将一个大型的软件系统划分为多个相互独立的模块，以便于开发、测试和维护。以下是一些常见的模块化开发方法和技术：

- 模块化设计：在设计阶段，将系统划分为多个模块，并定义它们之间的接口和依赖关系。模块化设计可以通过面向对象的方法（如类和接口）或面向组件的方法（如微服务架构）来实现。
- 模块化编程：在编码阶段，使用模块化编程语言（如 JavaScript 的 ES6 模块）或模块化开发框架（如 Angular、React、Vue 等）来实现模块化开发。模块化编程可以帮助开发者将功能逻辑划分为模块，并管理模块之间的依赖关系。
- 模块化打包工具：使用现代的打包工具（如 Webpack、Parcel、Rollup 等）来将模块化的代码打包成可在浏览器中运行的静态资源。这些工具可以处理模块之间的依赖关系，实现按需加载和代码分割。
- 模块化管理工具：使用包管理工具（如 npm、Yarn）来管理模块的依赖关系和版本控制，以及发布、安装和更新模块。

### JavaScript 几种常见的模块化规范

- CommonJS：最初是为服务器端开发的 Node.js 设计的模块化规范。它使用 require 和 module.exports 来导入和导出模块，采用同步加载模块的方式。CommonJS 规范在 Node.js 中被广泛使用，但在浏览器端需要借助工具进行转换（如 Browserify）。
  ::: tip
  模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
  模块加载的顺序，按照其在代码中出现的顺序。
  :::
- AMD（Asynchronous Module Definition）：一种用于浏览器端异步加载模块的规范，最著名的实现是 RequireJS。AMD 规范允许定义模块时指定依赖关系，并异步加载模块，以提高页面加载性能。
- CMD 方案，这种方案和 AMD 方案都是为了解决异步模块加载的问题，sea.js 实现了 CMD 规范。

```js
// CMD
define(function (require, exports, module) {
	var a = require("./a");
	a.doSomething();
	// 此处略去 100 行
	var b = require("./b"); // 依赖可以就近书写
	b.doSomething();
	// ...
});

// AMD 默认推荐
define(["./a", "./b"], function (a, b) {
	// 依赖必须一开始就写好
	a.doSomething();
	// 此处略去 100 行
	b.doSomething();
	// ...
});
```

::: tip
它和 require.js 的区别在于模块定义时对依赖的处理不同和对依赖模块的执行时机的处理不同。

1. AMD 推崇依赖前置，在定义模块的时候就要声明其依赖的模块。而 CMD 推崇 就近依赖，只有在用到某个模块的时候再去 require。

2. 首先 AMD 和 CMD 对于模块的加载方式都是异步加载，不过它们的区别在于 模块的执行时机，AMD 在依赖模块加载完成后就直接执行依赖模块，依赖模块的执行顺序和我们书写的顺序不一定一致。而 CMD 在依赖模块加载完成后并不执行，只是下载而已，等到所有的依赖模块都加载好后，进入回调函数逻辑，遇到 require 语句 的时候才执行对应的模块，这样模块的执行顺序就和我们书写的顺序保持一致了。
   :::

- UMD（Universal Module Definition）：一种通用的模块格式，可以同时支持在浏览器端和 Node.js 环境中使用。UMD 模块既可以作为全局变量使用，也可以通过 CommonJS 或 AMD 的方式引入。
- ES6 模块：ECMAScript 6 引入了原生的模块化支持，使用 import 和 export 关键字来导入和导出模块。ES6 模块可以在编译阶段进行静态分析，可以进行静态优化和按需加载，是当前推荐的模块化规范。

es module 特性：

- 自动采用严格模式，忽略'use strict'
- 每个 esm 模块都是单独的私有作用域
- esm 是通过 cors 去请求外部 js 模块的
- esm 的 script 标签会延迟执行脚本（类似 defer）

es module 可以导入 commonjs 模块， 但 commonjs 不能导入 es module 模块

esmodule 模块中不能提取 commonjs 模块成员 import 不是解构到处对象

```js
// foojs
exports.foo = "commomjs foo";

// es module

import { foo } from "foo.js";
var bar = "es module bar";
export { bar }; // 只是固定语法 不是导出对象
```

commonjs 模块始终只会导出一个默认模块

::: tip
ES6 模块与 CommonJS 模块、AMD、CMD 之间有一些重要的差异：

1. 语法差异：
   - ES6 模块使用 import 和 export 关键字来导入和导出模块。
   - CommonJS 使用 require 来导入模块，使用 module.exports 或 exports 导出模块。
   - AMD 使用 define 来定义模块，使用 require 来异步加载模块。
   - CMD 也是一种异步加载模块的规范，与 AMD 类似，但在依赖加载方面有所不同。
2. 静态 vs 动态：
   - ES6 模块在编译阶段就可以进行静态分析，可以进行静态优化和按需加载。
   - CommonJS、AMD、CMD 是动态加载模块的规范，在运行时才能确定模块的依赖关系。
3. 循环依赖：
   - ES6 模块可以处理循环依赖（即模块 A 依赖模块 B，同时模块 B 也依赖模块 A）。
   - CommonJS、AMD、CMD 在处理循环依赖时会出现一些问题，需要开发者手动处理。
4. 顶层 this：
   - 在 ES6 模块中，顶层的 this 是 undefined，这意味着在模块顶层定义的变量和函数不会被添加到全局对象中。
   - 在 CommonJS、AMD、CMD 中，顶层的 this 是全局对象（如 window 或 global），模块顶层定义的变量和函数会添加到全局对象中。
5. 浏览器兼容性： - ES6 模块需要通过构建工具（如 Webpack、Rollup）进行转译和打包，才能在现代浏览器中运行。 - CommonJS、AMD、CMD 都可以在浏览器端直接运行，但需要借助相应的模块加载器（如 Browserify、RequireJS、seaJS）。
   :::

### 如何实现一个模块加载器？

实现一个简单的模块加载器可以分为以下几个步骤：

1. 解析模块标识：模块加载器需要能够解析模块标识，即将模块标识（如相对路径、绝对路径或模块名）转换为对应的文件路径。
2. 加载模块：根据解析得到的文件路径，模块加载器需要能够读取模块文件的内容，并执行其中的代码。
3. 模块缓存：为了提高性能，模块加载器通常会维护一个模块缓存，以避免重复加载相同的模块。
4. 模块包装：模块加载器需要对加载的模块进行包装，以创建模块作用域并提供模块间的依赖注入。
5. 处理模块依赖：在加载模块时，模块加载器需要能够解析模块内部的依赖关系，并递归加载这些依赖模块。

以下是一个简单的 JavaScript 模块加载器的示例代码：

```js
// 模块缓存对象
const moduleCache = {};

// 模块加载函数
function loadModule(moduleId) {
	// 如果模块已经在缓存中，则直接返回缓存的模块
	if (moduleCache[moduleId]) {
		return moduleCache[moduleId];
	}

	// 创建一个新的模块对象，并将其加入缓存
	const module = { exports: {} };
	moduleCache[moduleId] = module;

	// 加载模块文件内容并执行其中的代码
	const moduleCode = readFile(moduleId); // 读取模块文件内容的函数，需自行实现
	const wrappedCode = `(function (module, exports, require) { ${moduleCode} })(module, module.exports, myRequire)`;
	eval(wrappedCode);

	// 返回模块的导出对象
	return module.exports;
}

// 自定义的 require 函数
function myRequire(moduleId) {
	return loadModule(moduleId);
}

// 使用示例
const myModule = myRequire("path/to/myModule.js");
```

### JavaScript 类数组对象的定义？

一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。

常见的类数组对象有 arguments 和 DOM 方法的返回结果，还有一个函数也可以被看作是类数组对象，因为它含有 length
属性值，代表可接收的参数个数。

常见的类数组转换为数组的方法有这样几种：

1. 通过 call 调用数组的 slice 方法来实现转换

```js
Array.prototype.slice.call(arrayLike);
```

2. 通过 call 调用数组的 splice 方法来实现转换

```js
Array.prototype.splice.call(arrayLike, 0);
```

3. 通过 apply 调用数组的 concat 方法来实现转换

```js
Array.prototype.concat.apply([], arrayLike);
```

4. 通过 Array.from 方法来实现转换

```js
Array.from(arrayLike);
```

### 常用的数组原生方法

1. 遍历和操作元素：
   - forEach(): 对数组的每个元素执行一次提供的函数。
   - map(): 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
   - filter(): 创建一个新数组，其包含通过所提供函数实现的测试的所有元素。
   - reduce(): 对数组中的所有元素执行一个指定的函数累加器，并将累加结果返回。
   - reduceRight(): 对数组中的所有元素（从右到左）执行一个指定的函数累加器，并将累加结果返回。
   - every(): 用于检测数组中的所有元素是否都通过了指定函数的测试。如果是，则返回 true，否则返回 false。
   - some(): 用于检测数组中的元素是否有一个或多个通过了指定函数的测试。如果有至少一个元素通过，则返回 true，否则返回 false。
2. 修改数组：
   - push(): 将一个或多个元素添加到数组的末尾，并返回数组的新长度。
   - pop(): 移除数组的最后一个元素，并返回该元素的值。
   - shift(): 移除数组的第一个元素，并返回该元素的值，同时将数组长度减 1。
   - unshift(): 在数组的开头添加一个或多个元素，并返回数组的新长度。
   - splice(): 用于添加或删除数组中的元素。
   - reverse(): 用于颠倒数组中元素的顺序，第一个数组元素成为最后一个，最后一个数组元素成为第一个。
   - sort(): 用于对数组元素进行排序，并返回排序后的数组。
3. 合并和拆分数组：
   - concat(): 用于合并两个或多个数组，不会改变现有数组，而是返回一个新数组。
   - slice(): 返回数组的一段，不会改变原数组，而是返回一个新的子数组。
4. 其他
   - fill(): 用指定的值填充数组，可以指定填充的起始位置和结束位置。这个方法会改变原数组，并返回修改后的数组。
   - isArray(): 用于确定传递的值是否是一个数组。如果是数组，则返回 true，否则返回 false。
   - from(): 用于从类数组对象或可迭代对象中创建一个新的数组实例。
   - flat(): 用于将嵌套多层的数组转换为只有一层的数组。可以通过传递参数来指定扁平化的深度。

### V8 引擎的垃圾回收机制

V8 引擎使用了分代式垃圾回收机制，主要包括以下几个部分：

- 新生代垃圾回收：V8 将内存分为新生代和老生代两部分。新生代主要存放生存时间较短的对象，采用 Scavenge 算法进行垃圾回收。Scavenge 算法通过将新生代内存区域分为两个相等的空间：From 空间和 To 空间。当 From 空间中的对象经历过一次 Scavenge 回收后，依然存活的对象将被复制到 To 空间中，而非存活的对象会被直接清理掉。之后将 From 空间和 To 空间进行翻转，这样就完成了一次新生代的垃圾回收。
- 老生代垃圾回收：老生代主要存放生存时间较长的对象，采用标记-清除（Mark-Sweep）和标记-整理（Mark-Compact）相结合的方式进行垃圾回收。标记-清除算法首先会标记所有活动对象，然后清除所有未标记的对象。而标记-整理算法会在清除未标记对象后，将所有存活的对象向一端移动，从而减少内存碎片。
- 增量式垃圾回收：V8 引擎还支持增量式垃圾回收，可以在执行 JavaScript 代码的同时进行垃圾回收，以减少垃圾回收的停顿时间，提高程序的响应速度

### 哪些操作会造成内存泄漏？

内存泄漏通常是由以下几种操作或情况造成的：

- 未释放资源：例如打开文件、数据库连接、网络连接等资源后，没有及时关闭或释放。
- 循环引用：当对象之间相互引用，且存在一条引用链使得对象无法被垃圾回收时，就会发生内存泄漏。
- 定时器和回调：未清理的定时器和回调函数可能导致对象无法被释放。
- 全局变量：全局变量会一直存在于内存中，如果忘记清理全局变量，就会造成内存泄漏。
- 未释放的内存：在一些低级语言中，例如 C/C++，手动分配的内存需要手动释放，如果忘记释放就会导致内存泄漏。
- DOM 引用：在 JavaScript 中，对 DOM 元素的引用，如果没有及时释放，也会导致内存泄漏。

避免内存泄漏的方法包括及时释放资源、避免循环引用、合理管理定时器和回调、减少全局变量的使用等。

### js 的节流与防抖

- 节流（Throttling）：节流是指在一定时间间隔内只执行一次函数。如果在指定的时间间隔内多次触发该函数，只有第一次触发会立即执行，之后的触发会在时间间隔内被忽略。节流可以用于限制函数的执行频率，例如在处理用户输入时减少请求的发送次数。

```js
funtion trottle(func,delay){
  let timer;
  return function(){
    if(!timer) {
      func.apply(this,arguments)
      timer = setTimeout(() => {
        timer = null
      }, delay)
    }
  }
}
```

- 防抖（Debouncing）：防抖是指在一定时间间隔内，如果函数被多次触发，则只有当指定的时间间隔内没有再次触发时才执行函数。也就是说，如果连续触发函数，会重新计时，直到指定的时间间隔内没有再次触发才会执行函数。防抖常用于处理输入框输入事件，延迟搜索或过滤操作。

```js
funtion debounce(func,delay){
  let timer;
  return function(){
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,arguments)
    }, delay)
  }
}
```

### Object.is() 与原来的比较操作符 “===”、“==” 的区别

- 双等号进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
- Object.is() 对比方式：Object.is() 方法使用 "SameValue" 算法进行比较，而不是 "Abstract Equality Comparison" 或 "Strict Equality Comparison"。这意味着 Object.is() 在处理特殊值时会有不同的行为。
- Object.is() 对比特殊值：Object.is() 对比特殊值（例如 NaN 和 -0）的行为与 "===" 或 "==" 不同。例如，Object.is(NaN, NaN) 返回 true，而 NaN === NaN 返回 false。另外，Object.is(-0, 0) 返回 false，而-0 === 0 返回 true。
- Object.is() 处理正零和负零：Object.is() 方法可以正确区分正零和负零，而 "===" 或 "==" 无法区分。

总的来说，Object.is() 方法与原来的比较操作符 "===" 和 "==" 的区别在于对特殊值的处理方式。Object.is() 更严格和准确地进行值的比较，特别是在处理特殊值时有更可靠的行为。

### js 的事件循环

JavaScript 的事件循环是一种处理异步操作的机制，它确保了 JavaScript 代码的执行顺序和异步操作的协调。

事件循环由以下几个部分组成：

1. 调用栈（Call Stack）：用于存储代码执行的上下文和顺序。当函数被调用时，它会被推入调用栈，当函数执行完成时，它会被弹出调用栈。
2. 消息队列（Message Queue）：用于存储待处理的消息和事件。例如，DOM 事件、定时器事件、Promise 的回调等都会被放入消息队列。
3. 事件循环（Event Loop）：负责处理调用栈和消息队列之间的交互。它会不断地从消息队列中取出消息，放入调用栈中执行。

事件循环的工作流程如下：

- 首先，调用栈会执行同步任务，直到遇到异步操作（例如定时器、网络请求等）。
- 异步操作会被推入消息队列，等待处理。
- 当调用栈为空时，事件循环会从消息队列中取出消息，放入调用栈中执行。
- 这个过程会不断重复，直到消息队列为空。

这种机制确保了 JavaScript 中的异步操作能够按照预期的顺序执行，避免了多个异步操作之间的竞争和混乱。

总的来说，JavaScript 的事件循环是一种处理异步操作的机制，它通过调用栈和消息队列的交互来保证异步操作的顺序和协调。

在 JavaScript 中，事件循环中有两种类型的任务：微任务（microtask）和宏任务（macrotask）。

- 微任务（Microtask）：微任务是一种高优先级的任务，它会在当前（微任务）队列为空之前执行。常见的微任务包括 Promise 的回调函数和 MutationObserver 的回调函数、node 中的 process.nextTick。

- 宏任务（Macrotask）：宏任务是一种低优先级的任务，它会在当前（宏任务）队列为空时执行。常见的宏任务包括 setTimeout、setInterval、I/O 操作、UI 渲染等。

在事件循环中，当执行栈为空时，会按照以下顺序执行任务：

1. 执行所有微任务，直到微任务队列为空。
2. 执行所有宏任务，直到宏任务队列为空。
3. 重复执行上述步骤。

这种机制确保了微任务具有高优先级，可以在页面渲染前执行，保证了及时更新页面状态。而宏任务则是低优先级的任务，会在微任务执行完后才执行。

## 面试题

### ["1", "2", "3"].map(parseInt) 答案是多少？

map 方法提供了三个参数：当前元素的值、当前元素的索引和数组本身

parseInt 函数通常接受两个参数：要解析的字符串和解析时使用的基数

由于 parseInt 接受两个参数，而 map 传递了三个参数，所以实际上会出现以下行为：

- 对于第一个元素 "1"，parseInt("1", 0) 返回 1。
- 对于第二个元素 "2"，parseInt("2", 1) 返回 NaN。这是因为基数为 1 时，无法解析 "2"。
- 对于第三个元素 "3"，parseInt("3", 2) 返回 NaN。这是因为基数为 2 时，无法解析 "3"。
  因此，["1", "2", "3"].map(parseInt) 的结果是 [1, NaN, NaN]。

### 移动端的点击事件的有延迟，时间是多久，为什么会有？ 怎么解决这个延时？

移动端的点击事件会有大约 300 毫秒的延迟。这是因为浏览器会等待一小段时间，来判断用户是不是在进行双击操作，以便触发双击放大页面的功能。

为了解决移动端点击事件的延迟，可以采取以下方法：

1. 使用 touchstart 和 touchend 事件：可以使用 touchstart 和 touchend 事件来模拟点击事件，这样可以避免延迟。
2. 使用 fastclick 库：fastclick 是一个消除移动端点击延迟的库，可以直接集成到项目中，从而提供更快速的点击响应。
3. 设置 viewport 的 meta 标签：在 viewport 的 meta 标签中添加 user-scalable=no 可以禁用双击放大功能，从而避免浏览器等待双击的判断。
4. 使用 CSS 属性 touch-action: manipulation：这个属性告诉浏览器，元素上的手势不会导致页面滚动，从而可以减少点击事件的延迟。

通过以上方法，可以有效地解决移动端点击事件的延迟，提升用户体验。

### 手写 promise

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
	constructor(executor) {
		this.state = PENDING; // 状态
		this.value = undefined; // 值
		this.onFulfilledCallbacks = []; // 存储成功的回调
		this.onRejectedCallbacks = []; // 存储失败的回调

		// resolve函数
		const resolve = (value) => {
			if (this.state === PENDING) {
				// 状态为pending
				this.state = FULFILLED; // 改变状态
				this.value = value; // 改变值
				// 调用成功的回调
				this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
			}
		};

		const reject = (reason) => {
			if (this.state === PENDING) {
				this.state = REJECTED;
				this.value = reason;
				this.onRejectedCallbacks.forEach((fn) => fn(this.value));
			}
		};
		try {
			// 执行传入的executor
			executor(resolve, reject);
		} catch (error) {}
	}
	// then方法
	then(onFulfilled, onRejected) {
		// 返回一个新的promise
		return new MyPromise((resolve, reject) => {
			// 如果Promise已经成功
			if (this.state === FULFILLED) {
				// 使用setTimeout确保onFulfilled回调以异步方式执行
				setTimeout(() => {
					try {
						// 执行onFulfilled回调
						const x = onFulfilled(this.value);
						resolve(x); //使用onFulfilled回调的结果来resolve新的Promise
					} catch (error) {
						reject(error); //// 如果发生错误，则reject新的Promise
					}
				}, 0);
			}
			// 如果Promise已经失败
			if (this.state === REJECTED) {
				// 使用setTimeout确保onRejected回调以异步方式执行
				setTimeout(() => {
					try {
						// 执行onRejected回调
						const x = onRejected(this.value);
						// 使用onRejected回调的结果来resolve新的Promise
						resolve(x);
					} catch (error) {
						// 如果发生错误，则reject新的Promise
						reject(error);
					}
				}, 0);
			}
			// 如果Promise仍然是pending状态
			if (this.state === PENDING) {
				// 将onFulfilled回调添加到回调列表中
				this.onFulfilledCallbacks.push((value) => {
					// 使用setTimeout确保onFulfilled回调以异步方式执行
					setTimeout(() => {
						try {
							const x = onFulfilled(value);
							resolve(x); // 使用onFulfilled回调的结果来resolve新的Promise
						} catch (error) {
							// 如果发生错误，则reject新的Promise
							reject(error);
						}
					}, 0);
				});
				// 将onRejected回调添加到回调列表中
				this.onRejectedCallbacks.push((value) => {
					setTimeout(() => {
						// 使用setTimeout确保onRejected回调以异步方式执行
						try {
							const x = onRejected(value);
							resolve(x);
						} catch (error) {
							reject(error);
						}
					}, 0);
				});
			}
		});
	}
	// 处理Promise失败状态的方法
	catch(onRejected) {
		// 使用'then'方法来处理失败状态
		return this.then(null, onRejected);
	}
	// 创建一个已成功的Promise的静态方法
	static resolve(value) {
		return new MyPromise((resolve) => {
			// 使用给定的值来resolve Promise
			resolve(value);
		});
	}
	// 创建一个已失败的Promise的静态方法
	static reject(reason) {
		return new MyPromise((resolve, reject) => {
			// 使用给定的原因来reject Promise
			reject(reason);
		});
	}
	// 处理多个Promise并发执行的静态方法
	static all(promises) {
		return new MyPromise((resolve, reject) => {
			const results = []; // 存储Promise的结果的数组
			let completedPromises = 0; // 记录成功的Promise的数量
			promises.forEach((promise, index) => {
				promise
					.then((value) => {
						results[index] = value;
						completedPromises++; // 修改成功的Promise的数量
						// 所有Promise都成功了，调用resolve
						if (completedPromises === promises.length) {
							resolve(results);
						}
					})
					.catch(reject); // 如果有一个Promise失败，调用reject
			});
		});
	}
}
export default MyPromise;
```
