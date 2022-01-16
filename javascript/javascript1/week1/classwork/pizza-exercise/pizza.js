console.log("I love pizza");
const pizzaName='margarita';
const pizzaAmmount=2;
// /by changing the pizzaSize total price will be changes/
const pizzaSize='Small';
console.log('New pizza order:', pizzaName);
const margaritaPrice=60;
const margaritaNormalprice=100;
console.log('The price of the pizza is:', margaritaPrice);
let totalPrice=(pizzaAmmount*margaritaPrice);
console.log(totalPrice);

if(pizzaSize!='Small'){
    totalPrice=(pizzaAmmount*margaritaNormalprice);
}
console.log(`New pizza order:, ${pizzaName}, ${pizzaSize}, ${pizzaAmmount}, Total cost for the order is:  ${totalPrice}`);
 