console.log("Negar")

const myButton = document.querySelector('button')
myButton.addEventListener('click', function(){
    if (myButton.innerText == 'Click Here'){
        myButton.innerText = 'Button Clicked'
    } else
    myButton.innerText = 'Click Here'
})