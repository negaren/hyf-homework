const balance = 3000;
if (balance <= 0) {
    console.log('Please deposit some money!')
} else if (balance<=1000) {
    console.log('Your balance is looking okay')
} else if (3000 >= balance > 1000) {
    console.log('Your balance is looking good')
} else if (10000 >= balance > 3000) {
    console.log('Your balance is fantastic')
} else {
    console.log('Your balance is AMAZING!')
}