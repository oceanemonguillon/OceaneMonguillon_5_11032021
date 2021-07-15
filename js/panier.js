let produitsPanier = JSON.parse(localStorage.getItem("panier"));
let IDproduits = [];

function creationPanier() {
    //Vérifier si le panier contient un ourson (ou +)
  if (localStorage.getItem("panier") === null || localStorage.getItem("panier") === "[]") {
    document.querySelector("#pagePanier").parentNode.hidden = true;
  } else {
    document.querySelector("#pagePanier").parentNode.hidden = false;
  }
}

//Retourne sur la page index si le client vide le panier
function retourPageIndex() {
    if (localStorage.getItem("panier") === null || localStorage.getItem("panier") === "[]") {
      window.location.href = "../index.html";
    }
}

//Fonction pour récupérer le produit ajouté au panier grâce a son id 
function recuperationProduitPanier(i) {
    IDproduits.push(produitsPanier[i]._id);
    // Création des éléments composants chaque produit
    let produitPanier = document.createElement('li');
    let img = document.createElement('img');
    let spanNom = document.createElement('span');
    let spanPrix = document.createElement('span');
    let lienPageProduit = document.createElement("a");
    let urlPage = "../html/produits.html?id=" + produitsPanier[i]._id;
    let selectionCouleur = document.createElement("span");
    let quantité = document.createElement("div");
    let selectionQuantité = document.createElement("select");
    let bouttonModifierQuantité = document.createElement("button");
    let bouttonSuprimer = document.createElement("button");

    //Ajoute des classes à l'élément parent <li>
    produitPanier.classList.add("list-group-item", "flex-column", "align-item-start"); 
    bouttonSuprimer.classList.add("btn", "btn-danger", "mt-3", "boutton-suprimer");
    bouttonModifierQuantité.classList.add("btn", "btn-primary", "boutton-quantité");
    //Définit la source des images de chaque produit  
    img.src = produitsPanier[i].imageUrl;
    
    //Ajoute des balises HTML à la page index avec le contenu choisi
    spanNom.innerHTML = `<h3> ${produitsPanier[i].name}</h3>`;
    spanPrix.innerHTML = `<p class="price">Prix : ${produitsPanier[i].price * produitsPanier[i].selectionQuantité / 100} €</p>`;
    lienPageProduit.innerHTML = `<p> voir la fiche du produit</p>`;
    lienPageProduit.setAttribute('href', urlPage);
    bouttonModifierQuantité.innerText = "Modifier la quantité";
    selectionQuantité.innerHTML=`<option value="1">1</option> <option value="2">2</option> <option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>`;
    bouttonSuprimer.innerText = "Supprimer l'article";
    selectionCouleur.innerHTML = `<p> Vous avez choisi la couleur: ${produitsPanier[i].selectionCouleur}</p>`;

    //Ajoute un élément enfant defini à l'élément parent choisi
    produitPanier.appendChild(img);
    produitPanier.appendChild(spanNom);
    produitPanier.appendChild(selectionCouleur);
    produitPanier.appendChild(spanPrix);
    produitPanier.appendChild(lienPageProduit);
    produitPanier.appendChild(quantité);
    quantité.appendChild(selectionQuantité);
    quantité.appendChild(bouttonModifierQuantité);
    produitPanier.appendChild(bouttonSuprimer);
    
    //Appel la balise html <ul> par son ID "bears" + Ajoute un élément enfant defini à l'élément parent choisi
    document.getElementById('panier').appendChild(produitPanier);

    //Attribution d'une fonction au bouton bouttonSuprimer
    bouttonSuprimer.addEventListener("click", function(i){annulerArticle(i);})

    bouttonModifierQuantité.addEventListener("click", (event) => {modifierQuantité(event);})
}
  
function panier() {
    for (let i = 0; i < produitsPanier.length; i++) {
      recuperationProduitPanier(i);
    }
    prixTotal()
}

function prixTotal() {
    let total = 0;
    for (let j = 0; j < produitsPanier.length; j++) {
      total = total + (produitsPanier[j].price * produitsPanier[j].selectionQuantité);
    }
    let prixTotalPanier= document.createElement('span');
    prixTotalPanier.innerHTML= `<p> Total : ${total / 100}</p>`;
}


function modifierQuantité(event) {
    //Sélectionner le bouton puis la carte à laquelle il appartient
    let carteProduit = event.target.parentNode.parentNode.parentNode;
    //Identifier l'item associé dans le local storage
    let idProduit = carteProduit.getAttribute("data-id");
    let couleurProduit = carteProduit.getAttribute("data-color");
    for (let i = 0; i < produitsPanier.length; i++) {
      if (idProduit === produitsPanier[i]._id && couleurProduit === produitsPanier[i].selectionCouleur) {
        produitPanierIndex = i;
      }
    }
    console.log(event);
    console.log(idProduit);
    console.log(couleurProduit);
    //Modifier la quantité dans le local storage
    produitsPanier[produitPanierIndex].selectionQuantité = event.target.previousSibling.value;
    // Mise à jour du nouveau panier avec suppression de l'article
    localStorage.setItem("panier", (JSON.stringify(produitsPanier)));
    //Mise à jour de la page pour affichage de la suppression au client
    window.location.reload();
    alert("Quantité modifiée !");
}

function annulerArticle(i){
  produitsPanier.splice(i, 1);
   localStorage.clear();
   // Mise à jour du nouveau panier avec suppression de l'article
   localStorage.setItem("panier", JSON.stringify(produitsPanier));
   //Mise à jour de la page pour affichage de la suppression au client
   window.location.reload();

   retourPageIndex();
 };  
  

  
creationPanier();
panier();