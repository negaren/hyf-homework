// console.log("Negar");
// const favDish = ["Qorme Sabzi", "Fish", "Ash Reshteh"];
// const favoriteDishUl = document.getElementById("favDish");
// for(let i=0; i<favDish.length; i++){
//     const li = document.createElement('li');
//     li.innerHTML = favDish[i]
//     favoriteDishUl.appendChild(li);
// }
const podcasts = [{
    name: 'The mystery om of Johan Klausen Varbourg',
    imageUrl: 'https://picsum.photos/536/354'
},
{
    name: 'Tips about dogs with small legs',
    imageUrl: 'https://picsum.photos/536/354'
},
{
    name: 'You, me, we and us',
    imageUrl: 'https://picsum.photos/536/354'
},
{
    name: 'Breakfast news - Dinner edition'
}
];
const podcastUl = document.createElement('ul');
const myBody = document.querySelector('body');

for (key in podcasts) {
    if (podcasts.hasOwnProperty(key)) {
        const podcastLi = document.createElement('li');
        const header = document.createElement('h1');
        header.innerHTML = podcasts[key].name;
        podcastLi.appendChild(header);
        console.log(podcastLi);
        podcastUl.appendChild(podcastLi);
        myBody.appendChild(podcastUl);
        if (podcasts[key].imageUrl !== undefined) {
            const podcastImage = document.createElement('img');
            podcastImage.setAttribute('src', podcasts[key].imageUrl);
            podcastImage.setAttribute('alt', podcasts[key].name);
            podcastLi.appendChild(podcastImage);
        }
    }
  

}
