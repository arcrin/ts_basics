// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string];
// } ={
//     name: "Wen",
//     age: 30,
//     hobbies: ["Sports", "Cooking"],
//     role: [2, "author"]
// }
enum Role {
    ADMIN,
    READ_ONLY,
    AUTHOR
}
const person ={
    name: "Wen",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: Role.ADMIN
};
// person.role.push('admin'); // push is a special case, type can not detect this
// person.role[1] = 10;
let favoriteActivities: string[];
favoriteActivities = ["Sports"];

console.log(person);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()); // ERROR
}

if (person.role === Role.ADMIN) {
    console.log("ADMIN login");
}