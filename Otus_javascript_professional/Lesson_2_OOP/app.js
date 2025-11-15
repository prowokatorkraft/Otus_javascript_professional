const { Comparator } = require('./Comparator/Comparator');
const comparator = new Comparator();

console.log("Tests running ...");

//Тесты выполняются успешно
console.log("Tests running for succes ...");
console.log(comparator.compare(4, 4));
console.log(comparator.compare("hello", "hello"));
console.log(comparator.compare([true], [true]));
console.log(comparator.compare(
    { name: "Danil", age: 30, isMarried: false, phones: [{ name: "Asys" }, { name: "Acer" }] },
    { name: "Danil", age: 30, isMarried: false, phones: [{ name: "Asys" }, { name: "Acer" }] }
));


//Тесты выполняются не успешно
console.log("Tests running for fault ...");
console.log(comparator.compare(2, 5));
console.log(comparator.compare("hello", "hello world!"));
console.log(comparator.compare([], "hello world!"));
console.log(comparator.compare([true], [false]));
console.log(comparator.compare([true], ""));

console.log(comparator.compare(
    { name: "Danil", age: 30, isMarried: false, phones: [{ name: "Asys" }, { name: "Acer" }] },
    { name: "Andrey", age: 30, isMarried: false, phones: [{ name: "Asys" }, { name: "Acer" }] }
));
console.log(comparator.compare(
    { name: "Danil", age: 30, isMarried: false, phones: [{ name: "Asys" }, { name: "Acer" }] },
    { name: "Danil", age: 12, isMarried: false, phones: [{ name: "Asys" }, { name: "Acer" }] }
));
console.log(comparator.compare(
    { name: "Danil", age: 30, isMarried: false, phones: [{ name: "Asys" }, { name: "Acer" }] },
    { name: "Danil", age: 30, isMarried: true, phones: [{ name: "Asys" }, { name: "Acer" }] }
));
console.log(comparator.compare(
    { name: "Danil", age: 30, isMarried: false, phones: [{ name: "Nokia" }, { name: "Acer" }] },
    { name: "Danil", age: 30, isMarried: false, phones: [{ name: "Asys" }, { name: "Acer" }] }
));
console.log(comparator.compare(
    { name: "Danil", age: 30, isMarried: false, phones: [{ name: "Asys" }, { name: "Acer" }] },
    { name: "Danil", age: 30, isMarried: false, phones: [{ name: "Asys" }] }
));
console.log(comparator.compare(
    { name: "Danil", age: 30, isMarried: false, phones: [{ name: "Asys" }, { name: "Acer" }] },
    { name: "Danil", age: 30, isMarried: false, phones: [{ name: "Asys" }, null] }
));

console.log("Tests finished.");
console.log("Tests finished.");
