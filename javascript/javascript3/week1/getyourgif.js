

const btnGif = document.getElementById('btn-gif');
const nptGifName = document.getElementById('npt-gif-name');
const nptGifNumber = document.getElementById('nput-gif-number');
nptGifNumber.defaultValue = "25"
const gifImageContainer = document.getElementById('gif-container');
let btnCounter = 0;
let deleteChild;
let nptNumValueArr = [];
btnGif.addEventListener('click', function btnFunction() {
    const gifUrl = `https://api.giphy.com/v1/gifs/search?api_key=H1KbqgU7FXTfHZ8x8IswATR0RpXciumB&q=${nptGifName.value}&limit=${nptGifNumber.value}&offset=0&rating=g&lang=en`;
    if (btnCounter == 1){
        deleteChild = nptGifNumber.value;
    }
    gifRender(gifUrl);   
})


function gifRender(gifName){
    fetch(gifName)
    .then(response => response.json())
    .then(data => {
        nptNumValueArr.push(nptGifNumber.value)
        if (nptNumValueArr.length > 1){
            const loopDeleteChild = nptNumValueArr[nptNumValueArr.length-2];
            for (let j =0; j < loopDeleteChild; j++){
                const elem = document.querySelector('iframe');
                gifImageContainer.removeChild(elem);
            } 
            for (let i=0; i<= nptGifNumber.value; i++){
                const iFrameElem = document.createElement('iframe');
                iFrameElem.setAttribute('src', `${data.data[i].embed_url}`);
                iFrameElem.setAttribute('width', '480');
                iFrameElem.setAttribute('height', '260');
                iFrameElem.setAttribute('class', 'giphy-embed');
                console.log(iFrameElem)
                gifImageContainer.appendChild(iFrameElem);
                const AgifElem = document.createElement('a');
                AgifElem.setAttribute('href', `https://giphy.com/gifs/filmeditor-disney-pixar-${data.data[i].id}`)
                iFrameElem.appendChild(AgifElem);
            }
        }
        for (let i=0; i<= nptGifNumber.value; i++){
            const iFrameElem = document.createElement('iframe');
            iFrameElem.setAttribute('src', `${data.data[i].embed_url}`);
            iFrameElem.setAttribute('width', '480');
            iFrameElem.setAttribute('height', '260');
            iFrameElem.setAttribute('class', 'giphy-embed');
            gifImageContainer.appendChild(iFrameElem);
            const AgifElem = document.createElement('a');
            AgifElem.setAttribute('href', `https://giphy.com/gifs/filmeditor-disney-pixar-${data.data[i].id}`)
            iFrameElem.appendChild(AgifElem);
        }

    })
}