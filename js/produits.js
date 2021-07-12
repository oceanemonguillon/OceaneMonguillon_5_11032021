function creationBasket() {
    //Vérifier si le panier contient un ourson (ou +)
    if (localStorage.getItem("basket") === null || localStorage.getItem("basket") === "[]") {
      document.querySelector("#basketPage").parentNode.hidden = true;
    } else {
      document.querySelector("#basketPage").parentNode.hidden = false;
    }
}
  
//Fonction de création de la fiche produit
function showbear(bear) {
    // Création des éléments composants chaque produit
    let div = document.createElement("div");
    let Name = document.createElement("h2");
    let spanPrice = document.createElement("span");
    let spanDescription = document.createElement("span");
    let img = document.createElement("img");
    let selectColors = document.createElement("select");
    let buttonPanier = document.createElement('div');

    //Ajoute des classes à l'élément parent ciblé
    div.classList.add("card");
    img.classList.add("card-img-top");
    Name.classList.add("card-title");

    //Définit la source des images de chaque produit  
    img.src = bear.imageUrl;

    //Ajoute des balises HTML à la page produits avec le contenu choisi
    Name.innerText = `${bear.name}`;
    spanPrice.innerHTML = `<p class="price card-text">Prix : ${bear.price} €</p>`;
    spanDescription.innerHTML = `<p class="description card-text">Description de l'article : ${bear.description} </p>`;
    buttonPanier.innerHTML = `<button id="addToBasket" class="btn btn-primary" type="button"><i class="fas fa-shopping-cart"></i> Ajouter au panier</button>`;
    for (i = 0; i < bear.colors.length; i++) {
      let option = document.createElement("option");
      option.textContent = bear.colors[i];
      selectColors.appendChild(option);
    }

   //Ajoute un élément enfant defini à l'élément parent choisi
    div.appendChild(Name);
    div.appendChild(img);
    div.appendChild(spanPrice);
    div.appendChild(spanDescription);
    div.appendChild(selectColors);
    div.appendChild(buttonPanier);
    document.getElementById('ficheProduit').appendChild(div);
  }
  

  //Fonction pour récupérer le produit cliqué grâce a son id 
  function getbear(id) {
    fetch("http://localhost:3000/api/teddies/" + id)
      .then(response => response.json())//fonction anonyme prend pour parametre response et retourne response.json
      .then(function(bear) {//Appel de la fonction showbear pour afficher le produit
        showbear(bear);
        // Ecouter les clics sur le bouton addToBasket
        let addItemToBasket = document.querySelector("#addToBasket");
        addItemToBasket.addEventListener("click", function () {addToBasket(bear)}, false);
    })
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
  
  let params = (new URL(document.location)).searchParams;
  let id = params.get("id");

  //Appel des fonction après chargement de la page HTML
  document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM entierement chargé");
    creationBasket();
    getbear(id);
}); 
