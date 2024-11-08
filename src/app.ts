interface Person {
    name: string;
    age: number;
    
    greet(phrase: string): void;
}


let user1: Person;

user1 = {
    name: "Wen", 
    age: 30,
    greet(phrase: string) {
        console.log(`${phrase} from ${this.name}`);
    }
}

user1.greet("Hello");