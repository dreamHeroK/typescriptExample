const xSymbol: unique symbol = Symbol()

// let ySymbol: unique symbol = Symbol()  must use const

let x = Symbol() // symbol

// const y = Symbol() // unique symbol

const y = x // symbol


console.log(Symbol(1) === Symbol(1))

// const a: unique symbol = Symbol.for('foo')
// const b: unique symbol = Symbol.for('foo')

// console.log(a == b) 

const a: unique symbol = Symbol()
// const b: symbol = a
let b = a // symbol
// const c: unique symbol = b error

interface Foo {
    [a]: string,
    // [b]: number error
}

class c {
    static readonly foo: string;
    public static readonly a: unique symbol = Symbol()
}
