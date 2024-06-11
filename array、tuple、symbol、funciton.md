### 数组 array

数组所有成员类型相同，成员数量是不确定的，可以是无限数量的成员，也可以是零成员。
```
const array: (string | number | boolean | { x: string })[] = [1, 2, '3', false, { x: '222' }]  // 正确

const array:  number[] = [1, 2, '3', false, { x: '222' }]  //Type 'string|boolean|{x:string}' is not assignable to type 'number'.
```


数组类型的写法 `type[] ` `Array<T>`  `interface name{[prop: number]: string;}` (用得少，不推荐)
```
const array: (string | number | boolean | { x: string })[]=[]
const array: Array<(string | number | boolean | { x: string })> = []

// 看不懂，用得少，不推荐
interface Array2 {
    [prop: number]: string | number | boolean | { x: string }
}

const obj: Array2 = ['a', 'b', 'c', 1, 2];
```

数组的成员是可以动态变化的。

```
let arr:number[] = [1, 2, 3];

arr[3] = 4;
arr.length = 2;

arr // [1, 2]
```

由于成员数量可以动态变化，所以 TypeScript 不会对数组边界进行检查，越界访问数组并不会报错。

```
let arr:number[] = [1, 2, 3];
let foo = arr[3]; // 正确
```
TypeScript 允许使用方括号读取数组成员的类型。
```
type chaos= (string | number | boolean | { x: string })
type chaosArray =chaos[]

type item = chaosArray[number] //chaos
```

如果数组变量没有声明类型，TypeScript 就会推断数组成员的类型。这时，推断行为会因为值的不同，而有所不同。

如果变量的初始值是空数组，那么 TypeScript 会推断数组类型是any[]。

为这个数组赋值时，TypeScript 会自动更新类型推断。
```

const arr = []; // Variable 'arr' implicitly has type 'any[]' in some locations where its type cannot be determined.
arr // 推断为 any[] 严格模式下编译报错

arr.push(123);
arr // 推断类型为 number[]

arr.push('abc');
arr // 推断类型为 (string|number)[]
```
自动更新只发生初始值为空数组的情况。如果初始值不是空数组，类型推断就不会更新。
```
const arr = [123]; // const arr:number[]=[123]

arr.push('abc'); // 报错
```
##### 只读数组，const 断言

在某些情况下，需要使用不可变数据，要求数组是不可变的。
TypeScript 允许声明只读数组，方法是在数组类型前面加上readonly关键字。
```
const arr:readonly number[] = [0, 1];

arr[1] = 2; // Index signature in type 'readonly number[]' only permits reading.
arr.push(3); // Property 'push' does not exist on type 'readonly number[]'
delete arr[0]; // Index signature in type 'readonly number[]' only permits reading.
```

上面示例中，arr是一个只读数组，删除、修改、新增数组成员都会报错。

TypeScript 将readonly number[]与number[]视为两种不一样的类型，后者是前者的子类型。

这是因为只读数组没有pop()、push()之类会改变原数组的方法，所以number[]的方法数量要多于readonly number[]，这意味着number[]其实是readonly number[]的子类型。

$\color{red}{子类型继承了父类型的所有特征，并加上了自己的特征，所以子类型number[]可以用于所有使用父类型的场合，反过来就不行。}$

```
let a1:number[] = [0, 1];
let a2:readonly number[] = a1; // 正确

a1 = a2; // The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.(4104)
```
由于只读数组是数组的父类型，所以它不能代替数组。
```
function getSum(s:number[]) {
  // ...
}

const arr:readonly number[] = [1, 2, 3];

getSum(arr) // Argument of type 'readonly number[]' is not assignable to parameter of type 'number[]'.
  The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.(2345)

getSum(arr as number[]) // 不报错，也不推荐 使用as断言改变编译
```

`readonly`关键字不能与数组的泛型写法一起使用。
```
//'readonly' type modifier is only permitted on array and tuple literal types.(1354)
const arr:readonly Array<number> = [0, 1];
```

TypeScript 提供了两个专门的泛型，用来生成只读数组的类型。

```
const a1:ReadonlyArray<number> = [0, 1]; // 泛型T是数组成员

const a2:Readonly<number[]> = [0, 1]; // 泛型T是整个数组
```

只读数组还可以使用“const 断言”。
```
const arr = [0, 1] as const;

arr[0] = [2]; // Cannot assign to '0' because it is a read-only property.
```
##### 多维数组

这里相当于一个拓展,数组声明可以声明二维及以上数组
```
const multi:number[][] =
  [[1,2,3], [23,24,25]];
const multi:Array<Array<Array<number>>> =
  [[[1,2,3], [23,24,25]]];
```

### 元祖 tuple
##### 简介

元组（tuple）是 TypeScript 特有的数据类型，JavaScript 没有单独区分这种类型。它表示成员类型可以自由设置的数组，即数组的各个成员的类型可以不同。

由于成员的类型可以不一样，所以元组必须明确声明每个成员的类型。
```
const s:[string, string, boolean]
  = ['a', 'b', true];
// 编译后是数组 "use strict";
///const s = ['a', 'b', true];
```
元组类型的写法，与上一章的数组有一个重大差异。数组的成员类型写在方括号外面`（number[]）`，元组的成员类型是写在方括号里面`（[number]）`。TypeScript 的区分方法就是，成员类型写在方括号里面的就是元组，写在外面的就是数组。

```
// 数组
let a:number[] = [1];

// 元组
let t:[number] = [1];
```

使用元组时，必须明确给出类型声明（上例的`[number]`），不能省略，否则 TypeScript 默认会把一个值自动推断为数组。
```
// 数组
let a:number[] = [1];

// 元组
let t:[number] = [1];

// 值相同，类型不同
// 编译后
"use strict";
// 数组
let a = [1];
// 元组
let t = [1];
```
元组成员的类型可以添加问号后缀（?），表示该成员是可选的。
```
let a:[number, number?] = [1];
```
注意，问号只能用于元组的尾部成员，也就是说，所有可选成员必须在必选成员之后。
```
type myTuple = [
  number,
  number,
  number?,
  string?
];
```
由于需要声明每个成员的类型，所以在没用使用扩展运算符`...`的情况下，元组的成员数量是有限的，从类型声明就可以明确知道，元组最大包含多少个成员，越界的成员会报错。
```
let x:[string, string] = ['a', 'b'];

x[2] = 'c'; // 报错
```

使用扩展运算符（...），可以表示不限成员数量的元组。
```
type NamedNums = [
  string,
  ...number[]
];

const a:NamedNums = ['A', 1, 2];
const b:NamedNums = ['B', 1, 2, 3];
```

扩展运算符（...）用在元组的任意位置都可以，它的后面只能是一个数组或元组。
```
type t1 = [string, number, ...boolean[]];
type t2 = [string, ...[number,string], number];
type t3 = [...[number,string], string, number];
```
元组的成员可以添加成员名，这个成员名是说明性的，可以任意取名，没有实际作用。

```
type Color = [
  red: number,
  green: number,
  blue: number
];

const c:Color = [255, 255, 255];
```
元组和数组一样可以通过方括号读取成员类型
```
type Tuple = [string, number];
type Age = Tuple[1]; // number
type Tuple = [string, number, Date];
type TupleEl = Tuple[number];  // type TupleEl = string|number|Date
```
##### 只读元组
只读元祖写法
```
// 写法一
type t = readonly [number, string]

// 写法二
type t = Readonly<[number, string]>
```

跟数组一样，只读元组是元组的父类型。所以，元组可以替代只读元组，而只读元组不能替代元组。

```
type t1 = readonly [number, number];
type t2 = [number, number];

let x:t2 = [1, 2];
let y:t1 = x; // 正确

x = y; // The type 't1' is 'readonly' and cannot be assigned to the mutable type 't2'.
```
只读元组不能替代元组,在typescript校验中会有报错
```
function distanceFromOrigin([x, y]:[number, number]) {
  return Math.sqrt(x**2 + y**2);
}

let point = [3, 4] as const;

distanceFromOrigin(point); // Argument of type 'readonly [3, 4]' is not assignable to parameter of type '[number, number]'.
  The type 'readonly [3, 4]' is 'readonly' and cannot be assigned to the mutable type '[number, number]'.

// 解决方法
function distanceFromOrigin([x, y]:readonly [number, number]) {
  return Math.sqrt(x**2 + y**2);
}
// 或者
distanceFromOrigin(point as [number,numer]) // 类型断言
```

##### 成员数量推断
```
function f(point: [number, number]) {
  if (point.length === 3) {  // 报错 point.length 2|3
    // ...
  }
}
function f(point: [number, number]) {
  if (point.length === 4) {  // 报错 point.length 2 
    // ...
  }
}

//如果使用了扩展运算符包含数组，TypeScript 就无法推断出成员数量。
// 一旦扩展运算符使得元组的成员数量无法推断，TypeScript 内部就会把该元组当成数组处理。
function f(
  point:[number, ...number[]]
) {
  if (point.length === 4) {  // 正确
    // ...
  }
}
function f(
  point:[number, ...[number,number]]
) {
  if (point.length === 4) {  // 报错 point.length 3
    // ...
  }
}
```

##### 扩展运算符与成员数量
扩展运算符（...）将数组（注意，不是元组）转换成一个逗号分隔的序列，这时 TypeScript 会认为这个序列的成员数量是不确定的，因为数组的成员数量是不确定的。
这导致如果函数调用时，使用扩展运算符传入函数参数，可能发生参数数量与数组长度不匹配的报错。
```
const arr = [1, 2];

function add(x:number, y:number){
  // ...
}

add(...arr) // 报错 A spread argument must either have a tuple type or be passed to a rest parameter.

// 解决方法
const arr:[number, number] = [1, 2]; // 1
const arr = [1, 2] as const; // 2
function add(...number:number[]){ 
  // ...
}
```

### symbol
Symbol 是 ES2015 新引入的一种原始类型的值。它类似于字符串， $\color{red}{但是每一个 Symbol 值都是独一无二的，与其他任何值都不相等。}$

Symbol 值通过Symbol()函数生成。在 TypeScript 里面，Symbol 的类型使用symbol表示。
```
let x:symbol = Symbol();
let y:symbol = Symbol();

x === y // false
```
##### unique symbo
symbol类型包含所有的 Symbol 值，但是无法表示某一个具体的 Symbol 值。
为了解决这个问题，TypeScript 设计了symbol的一个子类型unique symbol，它表示单个的、某个具体的 Symbol 值。

因为unique symbol表示单个值，所以这个类型的变量是不能修改值的，只能用const命令声明，不能用let声明。
```
// 正确
const x:unique symbol = Symbol();

// A variable whose type is a 'unique symbol' type must be 'const'. 
let y:unique symbol = Symbol();
```

每个声明为symbol类型的变量，它们的值都是不一样的，两个unique symbol其实属于两个值类型。
```
const a:unique symbol = Symbol();
const b:unique symbol = Symbol();

a === b // 类型校验报错This comparison appears to be unintentional because the types 'typeof a' and 'typeof b' have no overlap.

let y = Symbol();
let x = Symbol()
x===y // false
//而且，由于变量a和b是两个类型，就不能把一个赋值给另一个。
const a:unique symbol = Symbol();
const b:unique symbol = a; // 类型校验错误 Type 'typeof a' is not assignable to type 'typeof b'.
```
可以使用typeof 指向同一个unique symbol 类型
```
const a:unique symbol = Symbol();
const b:typeof a = a; // 正确
b===a  // true
```
相同参数的Symbol.for()方法会返回相同的 Symbol 值。TypeScript 目前无法识别这种情况，所以可能出现多个 unique symbol 类型的变量，等于同一个 Symbol 值的情况。

```
const a:unique symbol = Symbol.for('foo');
const b:unique symbol = Symbol.for('foo');
a===b // 类型校验错误 编译后运行为true This comparison appears to be unintentional because the types 'typeof a' and 'typeof b' have no overlap.
```

unique symbol 类型是 symbol 类型的子类型，所以可以将前者赋值给后者,
```
const a:unique symbol = Symbol(); // 子类型

const b:symbol = a; // 正确 父类型

const c:unique symbol = b; // 报错 Type 'symbol' is not assignable to type 'unique symbol'.
```
unique symbol 类型的一个作用，就是用作属性名，这可以保证不会跟其他属性名冲突。如果要把某一个特定的 Symbol 值当作属性名，那么它的类型只能是 unique symbol，不能是 symbol。
```
const x:unique symbol = Symbol();
const y:symbol = Symbol();

interface Foo {
  [x]: string; // 正确
  [y]: string; // 报错 A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
}
```

unique symbol类型也可以用作类（class）的属性值，但只能赋值给类的readonly static属性。
```
class C {
  static readonly foo:unique symbol = Symbol(); //static和readonly两个限定符缺一不可，这是为了保证这个属性是固定不变的。
}
```

##### 类型推断
const命令为变量赋值 Symbol 值时，变量类型默认就是unique symbol，所以类型可以省略不写，也就是类型推断为 unique symbol
```
const x:unique symbol = Symbol();
// 等同于
const x = Symbol(); // s: unique symbol

let y = Symbol(); // y: symbol

const z = x; // z: symbol
```

### 函数 funciton

##### 简介
函数的类型声明，需要在声明函数时，给出参数的类型和返回值的类型。
```
// 写法一
const hello = function (txt:string) :void{
  console.log('hello ' + txt);
}

// 写法二
// 写法二有两个地方需要注意。

// 首先，函数的参数要放在圆括号里面，不放会报错
// 其次，类型里面的参数名是必须的。
const hello:
  (txt:string) => void
= function (txt) {
  console.log('hello ' + txt);
};

type MyFunc = (string, number) => number;
// (string: any, number: any) => number
```

函数类型里面的参数名与实际参数名，可以不一致。
  ```
let f:(x:number) => number;
 
f = function (y:number) {
  return y;
};
```
如果函数的类型定义很冗长，或者多个函数使用同一种类型，往往可以type命令为函数类型定义一个别名，便于指定给其他变量。

```
type MyFunc = (txt:string) => void;

const hello:MyFunc = function (txt) {
  console.log('hello ' + txt);
};
```

函数的实际参数个数，可以少于类型指定的参数个数，但是不能多于，即 TypeScript 允许省略参数。

```
let myFunc:
  (a:number, b:number) => number;

myFunc = (a:number) => a; // 正确

myFunc = (
  a:number, b:number, c:number
) => a + b + c; // 报错 Type '(a: number, b: number, c: number) => number' is not assignable to type '(a: number, b: number) => number'.Target signature provides too few arguments. Expected 3 or more, but got 2.
```
因为 JavaScript 函数在声明时往往有多余的参数，实际使用时可以只传入一部分参数。比如，数组的forEach()方法的参数是一个函数，该函数默认有三个参数(item, index, array) => void，实际上往往只使用第一个参数(item) => void。因此，TypeScript 允许函数传入的参数不足。

```
// 函数x只有一个参数，函数y有两个参数，x可以赋值给y，反过来就不行。
let x = (a:number) => 0;
let y = (b:number, s:string) => 0;

y = x; // 正确
x = y; // 报错 Type '(b: number, s: string) => number' is not assignable to type '(a: number) => number'.
```
可以使用typeof运算符传递函数类型，建议使用typeof同一个函数而不是无限传递
```
function add(
  x:number,
  y:number
) {
  return x + y;
}

const myAdd:typeof add = function (x, y) {
  return x + y;
}
const newAdd:typeof myAdd = function (x, y) {
  return x + y;
}
```

##### 少见写法
函数类型声明还可以使用对象类型声明和interface声明
```
// 对象声明，适用函数本身有注册属性
let add:{
  (x:number, y:number):number
};
 
add = function (x, y) {
  return x + y;
};
add.v='1'

// Interface

interface myfn {
  (a:number, b:number): number;
}

var add:myfn = (a, b) => a + b;
```
##### Function 类型
Function 类型的值都可以直接执行。
任何函数类型都具有Function类型
```
function doSomething(f: Function):number {
    return f(1, 2, 3);
}

const add: (...number: number[]) => number = (...number){
    let sum = 0;
    number.forEach(item => {
        sum += item
    })
    return sum
}
doSomething(add) 
```
##### 箭头函数
箭头函数是普通函数的一种简化写法，它的类型写法与普通函数类似。
```
// 箭头函数
const repeat = (
  str:string,
  times:number
):string => str.repeat(times);

// 普通函数
function repeat(str:string,times:number):string{
return str.repeat(times)
}

// 箭头函数作为函数参数
function greet(
    fn: (a: string) => void
): void {
    fn('world');
}
const arrow = (fn: (a: string) => void): void=> fn('hello')

```

##### 可选参数
如果某个参数可以省略，则在参数名后面加问号表示,可选参数只能放在必选参数的后面
```
function f(x?:number) {
  // ...
}

f(); // OK
f(10); // OK

let myFunc:
  (a?:number, b:number) => number; // 报错 A required parameter cannot follow an optional parameter.
```
如果前部参数有可能为空，这时只能显式注明该参数类型可能为undefined。传参时也要显式传入undefined。
```
const myFunc:
  (
    a:number|undefined,
    b:number
  ) => number=(a,b)=>{
  return a||b
}
myFunc(undefined,2)
```
函数体内部用到可选参数时，需要判断该参数是否为undefind,
```
let myFunc:
  (a:number, b?:number) => number; 

myFunc = function (x, y) {
  if (y === undefined) { // y: number|undefined
    return x;
  }
  return x + y; // y:number
}
```
##### 参数默认值
TypeScript 函数的参数默认值写法，与 JavaScript 一致。

设置了默认值的参数，就是可选的。如果不传入该参数，它就会等于默认值。
使用默认值参数后，省略参数类型会类型推断为默认值的类型

```
function createPoint(
  x:number = 0,
  y:number = 0
):[number, number] {
  return [x, y];
}

createPoint() // [0, 0]

function createPoint(
  x = 0, y = 0   // x:number y: number
) {
  return [x, y];
}
```
可选参数与默认值不能同时使用
```
// 报错 Parameter cannot have question mark and initializer.
function f(x?: number = 0) {
  // ...
}
```
设有默认值的参数，如果传入undefined，也会触发默认值。
```
function f(x = 456) {
  return x;
}

f(undefined) // 456
```
具有默认值的参数如果不位于参数列表的末尾，调用时不能省略，如果要触发默认值，必须显式传入undefined。
```
function add(
  x:number = 0,
  y:number
) {
  return x + y;
}

add(1) // Expected 2 arguments, but got 1.
add(undefined, 1) // 正确
```
##### 参数解构
函数参数如果存在变量解构，类型写法如下。
```
function f(
  [x, y]: [number, number]
) {
  // ...
}

function sum(
  { a, b, c }: {
     a: number;
     b: number;
     c: number
  }
) {
  console.log(a + b + c);
}

type ABC = { a:number; b:number; c:number };

function sum({ a, b, c }:ABC) {
  console.log(a + b + c);
}
```

##### rest参数
rest 参数表示函数剩余的所有参数，它可以是数组（剩余参数类型相同），也可能是元组（剩余参数类型不同）。
```
// rest 参数为数组
function joinNumbers(...nums:number[]) {
  // ...
}

// rest 参数为元组 元组需要声明每一个剩余参数的类型。如果元组里面的参数是可选的，则要使用可选参数。
function f(...args:[boolean, number]) {
  // ...
}
```
rest 参数可以与变量解构结合使用。
```
function repeat(
  ...[str, times]: [string, number]
):string {
  return str.repeat(times);
}

// 等同于
function repeat(
  str: string,
  times: number
):string {
  return str.repeat(times);
}
```
#### 返回值类型
##### void 类型 
void 类型表示函数没有返回值。
```
function f():void {
  console.log('hello');
}
```
函数的运行结果如果是抛出错误，也允许将返回值写成void。
```
function throwErr():void {
  throw new Error('something wrong');
}
```
##### never 类型
never类型表示肯定不会出现的值。它用在函数的返回值，就表示某个函数肯定不会返回值，即函数不会正常执行结束。
它主要有以下两种情况。

（1）抛出错误的函数。

注意，只有抛出错误，才是 never 类型。如果显式用return语句返回一个 Error 对象，返回值就不是 never 类型。
```
function fail(msg:string):never {
  throw new Error(msg);
}
```
（2）无限执行的函数。
```
const sing = function():never {
  while (true) {
    console.log('sing');
  }
};
```
注意，never类型不同于void类型。前者表示函数没有执行结束，不可能有返回值；后者表示函数正常执行结束，但是不返回值，或者说返回undefined。

##### 局部类型
函数内部允许声明其他类型，该类型只在函数内部有效，称为局部类型。
```
function hello(txt:string) {
  type message = string;
  let newTxt:message = 'hello ' + txt;
  return newTxt;
}

const newTxt:message = hello('world'); // 报错 Cannot find name 'message'.
```

##### 高阶函数
一个函数的返回值还是一个函数，那么前一个函数就称为高阶函数（higher-order function
```
(someValue: number) => (multiplier: number) => someValue * multiplier;
```

##### 函数重载
有些函数可以接受不同类型或不同个数的参数，并且根据参数的不同，会有不同的函数行为。这种根据参数类型不同，执行不同逻辑的行为，称为函数重载（function overload）。
上面示例中，函数reverse()可以将参数颠倒输出。参数可以是字符串，也可以是数组。

这意味着，该函数内部有处理字符串和数组的两套逻辑，根据参数类型的不同，分别执行对应的逻辑。这就叫“函数重载”。

TypeScript 对于“函数重载”的类型声明方法是，逐一定义每一种情况的类型。
```
function reverse(str:string):string;
function reverse(arr:any[]):any[];
function reverse(
  stringOrArray:string|any[]
):string|any[] {
  if (typeof stringOrArray === 'string')
    return stringOrArray.split('').reverse().join('');
  else
    return stringOrArray.slice().reverse();
}
```
上面示例中，前两行类型声明列举了重载的各种情况。第三行是函数本身的类型声明，它必须与前面已有的重载声明兼容。

重载声明的排序很重要，因为 TypeScript 是按照顺序进行检查的，一旦发现符合某个类型声明，就不再往下检查了，所以类型最宽的声明应该放在最后面，防止覆盖其他类型声明。
```
function f(x:any):number;
function f(x:string): 0|1;
function f(x:any):any {
  // ...
}

const a:0|1 = f('hi'); // 报错 f('hi'):number
```
上面声明中，第一行类型声明x:any范围最宽，导致函数f()的调用都会匹配这行声明，无法匹配第二行类型声明，所以最后一行调用就报错了，因为等号两侧类型不匹配，左侧类型是0|1，右侧类型是number。这个函数重载的正确顺序是，第二行类型声明放到第一行的位置。

对象的方法也可以使用重载。
```
class StringBuilder {
  #data = '';

  add(num:number): this;
  add(bool:boolean): this;
  add(str:string): this;
  add(value:any): this {
    this.#data += String(value);
    return this;
  }

  toString() {
    return this.#data;
  }
}
```
函数重载也可以用来精确描述函数参数与返回值之间的对应关系。
```
function createElement(
  tag:'a'
):HTMLAnchorElement;
function createElement(
  tag:'canvas'
):HTMLCanvasElement;
function createElement(
  tag:'table'
):HTMLTableElement;
function createElement(
  tag:string
):HTMLElement {
  // ...
}
```
由于重载是一种比较复杂的类型声明方法，为了降低复杂性，一般来说，如果可以的话，应该优先使用联合类型替代函数重载，除非多个参数之间、或者某个参数与返回值之间，存在对应关系。
```
// 写法一
function len(s:string):number;
function len(arr:any[]):number;
function len(x:any):number {
  return x.length;
}

// 写法二
function len(x:any[]|string):number {
  return x.length;
}
```

##### 构造函数
JavaScript 语言使用构造函数，生成对象的实例。

构造函数的最大特点，就是必须使用new命令调用。
构造函数的类型写法，就是在参数列表前面加上new命令。
```
class Animal {
  numLegs:number = 4;
}

type AnimalConstructor = new () => Animal;

function create(c:AnimalConstructor):Animal {
  return new c();
}

const a = create(Animal);
```
上面示例中，类型AnimalConstructor就是一个构造函数，而函数create()需要传入一个构造函数。在 JavaScript 中，类（class）本质上是构造函数，所以Animal这个类可以传入create()。

构造函数还有另一种类型写法，就是采用对象形式。
```
type F = {
  new (s:string): object;
};
```
某些函数既是构造函数，又可以当作普通函数使用，比如Date()。这时，类型声明可以写成下面这样。
```
type F = {
  new (s:string): object;
  (n?:number): number;
}
```