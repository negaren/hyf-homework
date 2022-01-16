const button = document.querySelector('button')
const myBody = document.querySelector('body')
button.addEventListener('click', function () {
  
  if(myBody.style.color == 'white'){
    console.log('event')
    myBody.style.color='black';
    myBody.style.backgroundColor='white';
   
  } else {
    console.log('event')
     myBody.style.color='white';
    myBody.style.backgroundColor='black';
  }
  })
