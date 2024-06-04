const tuple: [string, number, string?, boolean?, ...number[]] = ['1', 2, '2', false, 4,];

let array1: number[] = [1]

let tuple1: [number] = [1]

let tuple2: [number, number] = [1, 2]
const colorTuple: [red: number, green: number, yellow: number] = [255, 0, 2]

const readonlyTuple: readonly [number, string] = [1, '1']


const readonlyTuple2: Readonly<[number, string]> = [1, '1']

let array2: number[] = [...tuple1, ...colorTuple]

let array3: number[] = [1, 2, 3]
// 未使用扩展运算符长度固定
// if (tuple1.length === 2) {

// }

function addNum(x: number, y: number): number {
    return x + y
}
console.log(array2.slice(0, 2))
addNum(...tuple2)