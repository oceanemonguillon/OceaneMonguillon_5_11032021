
function getbearsIndex() {
    fetch('http://localhost:3000/api/teddies/') //appel api, callback, ... return une promesse
        .then(response => { //fonction anonyme prend pour parametre response et return response.json
            return response.json();           
        })
        .then(function (data) { //Appel de la fonction getOneBear pour chaque objet présent dans l'API
            for (let i = 0; i < data.length; i++) {
                getOnebear(data[i]);
                if(i >= data.length){//Si l'api est vide, message "plus de stock"
                    window.alert("Oups, il n'y a plus d'ourson en stock, revenez plus tard!");
                }
            }
        })
        .catch(function(error){ //Message d'erreur en cas de rejet de l'API
            console.log(error);
            window.alert("Une erreur est survenue, réessayez plus tard!")
        })   
}
  
function getOnebear(bear) {
    // Création des éléments
    let li = document.createElement('li');
    let img = document.createElement('img');
    let spanName = document.createElement('span');
    let spanPrice = document.createElement('span');
    let spanDescription= document.createElement('span');
    let buttonPanier = document.createElement('div');

    //Ajoute des classes à l'élément parent <li>
    li.classList.add("list-group-item", "flex-column", "align-item-start"); 

    //Définit la source des images de chaque produit  
    img.src = bear.imageUrl;

    //Ajoute des balises HTML à la page index avec le contenu choisi
    spanName.innerHTML = `<a class="stretched-link" href="#"><h3> ${bear.name}</h3></a>`;
    spanPrice.innerHTML = `<p class="price">Prix : ${bear.price} €</p>`;
    spanDescription.innerHTML = `<p class="description">Description de l'article : ${bear.description} </p>`;
    buttonPanier.innerHTML = `<button id="addToBasket" class="btn btn-primary" type="button"><i class="fas fa-shopping-cart"></i> Ajouter au panier</button>`;
           
    //Ajoute un élément enfant defini à l'élément parent choisi
    li.appendChild(img);
    li.appendChild(spanName);
    li.appendChild(spanPrice);
    li.appendChild(spanDescription);
    li.appendChild(buttonPanier);

    //Appel la balise html <ul> par son ID "bears" + Ajoute un élément enfant defini à l'élément parent choisi
    document.getElementById('bears').appendChild(li);
}

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM entierement chargé");
    getbearsIndex();
}); 
