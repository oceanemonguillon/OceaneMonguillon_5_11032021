let produitsPanier = JSON.parse(localStorage.getItem("panier"));
let IDproduits = [];

function creationPanier() {
  let lien = document.querySelector("#pagePanier");
  //Vérifier si le panier contient un ourson (ou +)
  if (localStorage.getItem("panier") === null || localStorage.getItem("panier") === "[]") {
    lien.setAttribute("href","#");
  } else {
    lien.setAttribute("href", "panier.html");
    lien.classList.add("text-dark");
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
    let nombreOurs = document.createElement("span");
    let img = document.createElement('img');
    let spanNom = document.createElement('span');
    let spanPrix = document.createElement('span');
    let lienPageProduit = document.createElement("a");
    let urlPage = "../html/produits.html?id=" + produitsPanier[i]._id;
    let selectionCouleur = document.createElement("span");
    let quantité = document.createElement("div");
    let bouttonModifierQuantité = document.createElement("button");
    let bouttonSuprimer = document.createElement("button");

    //Ajoute des classes à l'élément parent <li>
    produitPanier.classList.add("list-group-item", "flex-column", "align-item-start"); 
    bouttonSuprimer.classList.add("btn", "btn-danger", "mt-3", "boutton-suprimer", "float-right");
    bouttonModifierQuantité.classList.add("btn", "btn-primary", "boutton-quantité");
    //Définit la source des images de chaque produit  
    img.src = produitsPanier[i].imageUrl;
    
    //Ajoute des balises HTML à la page index avec le contenu choisi
    spanNom.innerHTML = `<h3> ${produitsPanier[i].name}</h3>`;
    quantité.innerHTML = `<label for="quantité"> Combien en voulez-vous finalement? (1 à 10):</label> <input type="number" id="quantiteOurs" name="quantité" min="1" max="10" value="1">`;
    nombreOurs.innerHTML = `<p> quantité: ${produitsPanier[i].quantité}</p>`;
    spanPrix.innerHTML = `<p class="price">Prix : ${produitsPanier[i].price * produitsPanier[i].quantité / 100} €</p>`;
    lienPageProduit.innerHTML = `<p> voir la fiche du produit</p>`;
    lienPageProduit.setAttribute('href', urlPage);
    bouttonModifierQuantité.innerText = "Modifier la quantité";
    bouttonSuprimer.innerText = "Supprimer l'article";
    selectionCouleur.innerHTML = `<p> Vous avez choisi la couleur: ${produitsPanier[i].selectionCouleur}</p>`;

    //Ajoute un élément enfant defini à l'élément parent choisi
    produitPanier.appendChild(img);
    produitPanier.appendChild(spanNom);
    produitPanier.appendChild(selectionCouleur);
    produitPanier.appendChild(nombreOurs);
    produitPanier.appendChild(spanPrix);
    produitPanier.appendChild(lienPageProduit);
    produitPanier.appendChild(quantité);
    quantité.appendChild(bouttonModifierQuantité);
    produitPanier.appendChild(bouttonSuprimer);
    
    //Appel la balise html <ul> par son ID "bears" + Ajoute un élément enfant defini à l'élément parent choisi
    document.getElementById('panier').appendChild(produitPanier);

    //Attribution d'une fonction au bouton bouttonSuprimer
    bouttonSuprimer.addEventListener("click", function(i){annulerArticle(i);})
    //Attribution d'une fonction au bouton bouttonModifierQuantité
    bouttonModifierQuantité.addEventListener("click", function(){modifierQuantité();})
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
      total = total + (produitsPanier[j].price * produitsPanier[j].quantité);
    }
    let prixTotalPanier= document.createElement('span');
    prixTotalPanier.innerHTML= `<p> Total : ${total / 100} €</p>`;
    document.querySelector("#totalPanier").appendChild(prixTotalPanier);
}

//Fonction pour modifier la quantité d'oursons achetée
function modifierQuantité(){
  let quantité = localStorage.getItem("panier");
  console.log(localStorage.getItem("panier"));
  let nouvelleQuantité = document.getElementById("quantiteOurs").value;
  console.log(nouvelleQuantité);
  if(quantité != nouvelleQuantité){
    localStorage.setItem("quantité", "nouvelleQuantité");
    localStorage.setItem("panier", JSON.stringify(produitsPanier));
    console.log(localStorage.getItem('panier'));
    window.location.reload();
   
  }
}

//Fonction supprimer un article
function annulerArticle(i){
  produitsPanier.splice(i, 1);
   localStorage.clear();
   // Mise à jour du nouveau panier avec suppression de l'article
   localStorage.setItem("panier", JSON.stringify(produitsPanier));
   //Mise à jour de la page pour affichage de la suppression au client
   window.location.reload();

   retourPageIndex();
 };  

  
panier();