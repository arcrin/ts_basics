"use strict";
let user1;
user1 = {
    name: "Wen",
    age: 30,
    greet(phrase) {
        console.log(`${phrase} from ${this.name}`);
    }
};
user1.greet("Hello");
//# sourceMappingURL=app.js.map