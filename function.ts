function f(x?: number) {
    // ...
}

f(); // OK
f(10); // OK

let myFunc:
    (a?: number, b: number) => number; // 报错 A required parameter cannot follow an optional parameter.