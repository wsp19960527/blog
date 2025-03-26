---
title: infer 关键字
date: 2025/03/26
tags:
  - ts
  - typescript
  - infer
categories:
  - 前端
---

infer 关键字用于条件类型中，以从其他类型中推断出一个新的类型变量。
它允许在类型检查时提取和使用特定的子类型或属性，从而增强类型系统的表达能力和灵活性。
简单来说，infer 可以帮助从复杂类型中自动提取出所需的部分类型。

```ts
type Moment<T> = T extends infer U ? U : never;

type StringType = Moment<string>; // string
type NumberType = Moment<number>; // number
type UnionType = Moment<string | number>; // string | number

interface User {
	name: string;
	age: number;
}

type UserType = Moment<User>; // User
```

提取函数返回值类型

```ts
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type ExampleFunction = (x: number, y: string) => boolean;
type ReturnTypeOfExampleFunction = GetReturnType<ExampleFunction>; // boolean
```

提取数组元素类型

```ts
type ArrayType<T> = T extends (infer U)[] ? U : never;
type MomentArr = string[];
type Example1Array = Array<string>;

type ElementTypeOfExampleArray = ArrayType<MomentArr>; // string
type ElementTypeOfExample1Array = ArrayType<Example1Array>; //string
```

提取 Promise 返回值类型

```ts
type PromiseType<T> = T extends Promise<infer U> ? U : never;
type ExamplePromise = Promise<string>;
type ExamplePromiseType = PromiseType<ExamplePromise>; // string
```

提取函数参数类型

```ts
type ParametersType<T> = T extends (...args: infer U) => any ? U : never;
type ExampleFunction2 = (x: number, y: string) => boolean;
type ParametersOfExampleFunction = ParametersType<ExampleFunction2>; // [number, string]
```

提取构造函数参数类型

```ts
type ConstructorParametersType<T> = T extends new (...args: infer U) => any ? U : never;
type ExampleClass = new (a: number, b: string) => boolean;
// class ExampleClass {
//   constructor(
//     public a: number,
//     public b: string,
//   ) {}
// }
// const e = new ExampleClass(1, '2');
type ConstructorParametersOfExampleClass = ConstructorParametersType<ExampleClass>; // [number, string]
```

条件类型中的复杂推断

```ts
type IsArray<T> = T extends (infer U)[] ? U : never;
type IsFunction<T> = T extends (...args: any[]) => infer R ? R : never;

type ExtractType<T> = T extends any[] ? IsArray<T> : T extends (...args: any[]) => any ? IsFunction<T> : T;

// 示例
type ArrayType1 = ExtractType<string[]>; // string
type FunctionReturnType = ExtractType<() => number>; // number
type DefaultType = ExtractType<boolean>; // boolean
```
