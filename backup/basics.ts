function add(n1: number, n2: number, showResult: boolean, resultModPhrase: string) {
    const result = n1 + n2;
    if (showResult) {
        console.log(`${resultModPhrase}${result}`);
    }
    return result;
}

const number1 = 5;
const number2 = 2.8;
add(number1, number2, true, "Result is: ");