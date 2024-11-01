type Combinable = number | string;
function combine(
    input1: Combinable,
    input2: Combinable,
    resultConversion: "as-number" | "as-text"

) {
  let result: Combinable;
  if (typeof input1 === "number" && typeof input2 === "number" || resultConversion === "as-number") {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);

const combineAsNumber = combine('30', '26', 'as-number');
console.log(combineAsNumber);

const combineAsText = combine('30', 26, 'as-text');
console.log(combineAsText);