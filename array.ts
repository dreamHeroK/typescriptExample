const arr: (number | string)[] = ['1', 2, 3]

const numberArr: Array<number> = [1, 2, 3, , , 44, 5]

const arr1: Array<number | string> = ['1', 2, 3, 4, 5]

const arr2: readonly number[] = [1, 2, 3, 4]

const arr3: ReadonlyArray<number> = [1, 2, 3, , 4, , , 44];

const arr4: Array<{ label: string, value: number }> = []

const arr5: Array<Array<number>> = [[]]


arr4.push({ label: '午餐', value: 2 });
arr5.push([0])

console.log(arr4, arr5)

function getSum(arr: number[]) {
    console.log(arr)
}

getSum(numberArr)
getSum(arr as number[])