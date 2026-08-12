const express = require('express')
const app = express()
app.listen(3000)
// Exersice 1:
app.get("/greetings/:name", (req, res) => {
    const name = req.params.name;
    res.send(`<h1>Hello There ${name}!!</h1>`)
}
)
// Exercise 2
app.get("/roll/:number", (req, res) => {
    const number = req.params.number;
    if (!Number(number))
        res.send(`<h1>You must specify a number!</h1>`)
    else {
        const random = Math.floor(Math.random() * number);
        res.send(`<h1>You rolled a ${random}</h1>`)
    }
}
)
//Exersice 3 
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];
app.get("/collections/:number", (req, res) => {
    const collection = req.params.number;
    if ((collection - 1) >= collectibles.length || collection < 1)
        res.send(`<h1>This item is not yet in stock. Check back soon!</h1>`)
    else
        res.send(`<h1>So, you want the ${collectibles[collection - 1].name}? For ${collectibles[collection - 1].price}, it can be yours!</h1>`)

})
// Exersice 4
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
app.get("/shoes", (req, res) => {
    let result = shoes;
    let output = "";
    const minprice = req.query["min-price"];
    const maxprice = req.query["max-price"];
    const type = req.query.type;
    if (minprice) {
        result = result.filter(shoe => shoe.price >= Number(minprice));
    }
    if (maxprice) {
        result = result.filter(shoe => shoe.price <= Number(maxprice));
    }
    if (type) {
        result = result.filter(shoe => shoe.type === type);
    }
    result.forEach((filtered) => {
        output += `<h1>${filtered.name} - ${filtered.price} - ${filtered.type}</h1>`;
    });

    res.send(output);
})