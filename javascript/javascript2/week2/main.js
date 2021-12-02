let allProducts = getAvailableProducts();

function renderProducts(products) {
    let productList = document.querySelector('ul');
        while (productList.firstChild) {
            productList.removeChild(productList.firstChild);
        }

    if (products == null || products == [] || products.length == 0) {
        
        renderList(allProducts);
    }else
    renderList(products);
    
}
function renderList(products){
    const mainUl = document.querySelector('ul');
    products.forEach(element => {
        const myLi = document.createElement('li');
        myLi.innerHTML = `
        <a href="http://www.freeimageslive.co.uk/free_stock_image/vintage-bentley-jpg" target="_blank"><img src="http://www.freeimageslive.co.uk/files/images008/vintage_bentley.thumbnail.jpg" alt="stock image 6183   vintage bentley" width="125" height="125" border="0" /></a><br/>
                <h2>${element.name}</h2>
                <li>Price: ${element.price}</li>
                <li style="padding-bottom:4%;">Rating: ${element.rating}</li>
         `;
        mainUl.appendChild(myLi)
    });
}
renderProducts(allProducts); // This should create the ul and the li's with the individual products details

document.getElementById('search-input').addEventListener('input', function () {
    var inputNameSearch = document.getElementById('search-input').value;
        let pName = "";
        
            var filterProducts = allProducts.filter(product => {
                pName = product.name;
                return pName.toLowerCase().match(inputNameSearch.toLowerCase())
            })
            renderProducts(filterProducts);   
    
})

document.getElementById("price-search-input").addEventListener('input', function(){
    var inputPriceSearch = document.getElementById('price-search-input').value;
    var filterPrice = allProducts.filter(product =>
        {
            return inputPriceSearch > product.price
        })
        renderProducts(filterPrice); 
})





