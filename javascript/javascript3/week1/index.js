const favMusic = {
	"Rock": "Scorpions",
	"Hard Rock": "Ironmaiden",
	"Western": "Shania Twain",
	"pop": "Michael Jackson",
	"classic": "Vivaldi"
};

// Find a cool api
// an api to fetch random dog image 

const imageDiv = document.getElementById('image-div');
fetch("https://dog.ceo/api/breed/hound/images")
.then(response => response.json())
.then(data => {
    console.log(data) // jason file that it resonds with 
    for (const value of data.message) {
        const imageLi = document.createElement('li');
        imageDiv.append(imageLi);
        imageLi.innerHTML = `<img src="${value}" height="300" width="300"/> `
           }

})
