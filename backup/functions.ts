function add(n1: number, n2: number) {
    return n1 + n2;
}

function printResult(num: number): void {  // is there still a difference between undefined and void?
    console.log('Result: ' + num);
}

function addAndHandle(n1: number, n2: number, callback: (num: number) => void) {
    const result = n1 + n2;
    callback(result);
}

printResult(add(5, 12));

let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = printResult;

console.log(combineValues(8, 9));

addAndHandle(1, 2, (result) => {
    console.log(result);
});