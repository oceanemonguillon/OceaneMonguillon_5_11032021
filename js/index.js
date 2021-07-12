function creationBasket() {
    //Vérifier si le panier contient un ourson (ou +)
    if (localStorage.getItem("basket") === null || localStorage.getItem("basket") === "[]") {
      document.querySelector("#basketPage").parentNode.hidden = true;//si pannier vide, page "panier" cachée
    } else {
      document.querySelector("#basketPage").parentNode.hidden = false;//si pannier contien au moins 1 ourson, page "panier" visible
    }
}

function getbearsIndex() {
    fetch('http://localhost:3000/api/teddies/') //appel api, callback, ... return une promesse
        .then(response => { //fonction anonyme prend pour parametre response et retourne response.json
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
    // Création des éléments composants chaque produit
    let li = document.createElement('li');
    let img = document.createElement('img');
    let spanName = document.createElement('span');
    let spanPrice = document.createElement('span');
    let spanDescription= document.createElement('span');
    let productPageLink = document.createElement("a");
    let urlPage = "html/produits.html?id=" + bear._id;
    let buttonPanier = document.createElement('div');

    //Ajoute des classes à l'élément parent <li>
    li.classList.add("list-group-item", "flex-column", "align-item-start"); 
    
    //Définit la source des images de chaque produit  
    img.src = bear.imageUrl;

    //Ajoute des balises HTML à la page index avec le contenu choisi
    spanName.innerHTML = `<h3> ${bear.name}</h3>`;
    spanPrice.innerHTML = `<p class="price">Prix : ${bear.price} €</p>`;
    spanDescription.innerHTML = `<p class="description">Description de l'article : ${bear.description} </p>`;
    buttonPanier.innerHTML = `<button id="addToBasket" class="btn btn-primary" type="button"><i class="fas fa-shopping-cart"></i> Ajouter au panier</button>`;
    productPageLink.innerHTML = `<p> voir la fiche du produit</p>`;
    productPageLink.setAttribute('href', urlPage);
    
    //Ajoute un élément enfant defini à l'élément parent choisi
    li.appendChild(img);
    li.appendChild(spanName);
    li.appendChild(spanPrice);
    li.appendChild(spanDescription);
    li.appendChild(productPageLink);
    li.appendChild(buttonPanier);

    //Appel la balise html <ul> par son ID "bears" + Ajoute un élément enfant defini à l'élément parent choisi
    document.getElementById('bears').appendChild(li);
}

function addToBasket(bear) {
    //Création du panier dans le localStorage s'il n'existe pas déjà
    if (typeof localStorage.getItem("basket") !== "string") {
      let basket = [];
      localStorage.setItem("basket", JSON.stringify(basket));
    }
    //Récupérer les informations sur les oursons
    bear.selectedColor = document.querySelector("option:checked").innerText;
    bear.selectedQuantity = document.querySelector("input").value;
    delete bear.colors;
    //création d'une variable pour manipuler le panier
    let basket = JSON.parse(localStorage.getItem("basket"));
    //Vérification que l'ourson n'est pas déjà dans le panier
    let isThisItemExist = false;
    let existingItem;
    for (let i = 0; i < basket.length; i++) {
      if (bear._id === basket[i]._id && bear.price === basket[i].price && bear.selectedcolor === basket[i].selectedcolor) {
        isThisItemExist = true;
        existingItem = basket[i];
      }
    }
    //Ajout de l'ourson selectioné au panier
    if (isThisItemExist === false) {
      basket.push(bear);
      localStorage.setItem("basket", JSON.stringify(basket));
    } else {
      existingItem.selectedQuantity = parseInt(existingItem.selectedQuantity, 10) + parseInt(bear.selectedQuantity, 10);
      localStorage.setItem("basket", JSON.stringify(basket));
    }
    creationBasket();
  }

//Appel des fonction après chargement de la page HTML
document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM entierement chargé");
    getbearsIndex();
    creationBasket();
}); 
