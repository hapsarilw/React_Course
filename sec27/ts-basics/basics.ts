// Primitive: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives

let age: number;

age = 12;

let userName: string | string[];

userName = 'Max';

let isInstructor: boolean;

isInstructor = true;


// More complex types
let hobbies: string[];

hobbies = ['Sport', 'Cooking'];

type Person =  {
    // defined type that can store
    name: String;
    age: number;
}; // Object type definition

let person: Person;

person = {
    name: 'Max',
    age: 32
}

// person = {
//     isEmployee: true
// }

let people: Person[];

// Types inference

let course: string | number | boolean = 'React - The Complete Guide';

course = 12341; // type inference -> tries to refer as many types as before

function add3(a:number, b: number): number {
    return a + b;
}

function print(value: any){
    console.log(value);
}

// Generics

function insertAtBeginning<T>(array: T[], value: T){
    const newArray = [value, ...array];
    return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stingArray = insertAtBeginning(['a', 'b', 'c'], 'd')

// updatedArray[0].split('');