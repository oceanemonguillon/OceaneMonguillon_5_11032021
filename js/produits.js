function creationPanier() {
    let lien = document.querySelector("#pagePanier");
    //Vérifier si le panier contient un ourson (ou +)
    if (localStorage.getItem("panier") === null || localStorage.getItem("panier") === "[]") {
      lien.setAttribute("href","#");
    } else {
      lien.setAttribute("href", "panier.html");
      lien.classList.add("text-info");
    }
}
  
//Fonction de création de la fiche produit
function affichageFicheProduit(bear) {
    // Création des éléments composants chaque produit
    let div = document.createElement("div");
    let nom = document.createElement("h2");
    let prix = document.createElement("p");
    let description = document.createElement("p");
    let img = document.createElement("img");
    let selectionCouleur = document.createElement("select");
    let bouttonPanier = document.createElement('div');
    let quantite = document.createElement("div");

    //Ajoute des classes à l'élément parent ciblé
    div.classList.add("card");
    img.classList.add("card-img-top");
    nom.classList.add("card-title");
    prix.classList.add("price", "card-text");
    description.classList.add("description", "card-text");
    //Définit la source des images de chaque produit  
    img.src = bear.imageUrl;

    //Ajoute des balises HTML à la page produits avec le contenu choisi
    nom.innerText = `${bear.name}`;
    prix.innerText = `Prix : ${bear.price/ 100} €`;
    description.innerText = `Description de l'article : ${bear.description}`;
    quantite.innerHTML = `<label for="quantite"> Combien en voulez-vous? (1 à 10):</label> <input type="number" id="quantiteOurs" name="quantite" min="1" max="10" value="1">`;
    bouttonPanier.innerHTML = `<button id="ajouterAuPanier" class="btn btn-primary mt-3" type="button"><i class="fas fa-shopping-cart"></i> Ajouter au panier</button>`;
    for (i = 0; i < bear.colors.length; i++) {
      let option = document.createElement("option");
      option.textContent = bear.colors[i];
      selectionCouleur.appendChild(option);
    }

   //Ajoute un élément enfant defini à l'élément parent choisi
    div.appendChild(nom);
    div.appendChild(img);
    div.appendChild(prix);
    div.appendChild(description);
    div.appendChild(selectionCouleur);
    div.appendChild(quantite);
    div.appendChild(bouttonPanier);
    document.getElementById('ficheProduit').appendChild(div);
}
  

  //Fonction pour récupérer le produit cliqué grâce a son id 
function recuperationOurson(id) {
    fetch("http://localhost:3000/api/teddies/" + id)
      .then(response => response.json())//fonction anonyme prend pour parametre response et retourne response.json
      .then(function(bear) {//Appel de la fonction affichageFicheProduit pour afficher le produit
        affichageFicheProduit(bear);
        // Ecouter les clics sur le bouton ajouterAuPanier
        let ajouterProduitPanier = document.querySelector("#ajouterAuPanier");
        ajouterProduitPanier.addEventListener("click", function () {ajouterAuPanier(bear)}, false);
      })
      .catch(function(error){ //Message d'erreur en cas de rejet de l'API
        console.log(error);
        window.alert("Une erreur est survenue, réessayez plus tard!");
    })
}

function ajouterAuPanier(bear) {
  //Création du panier dans le localStorage s'il n'existe pas déjà
  if (typeof localStorage.getItem("panier") !== "string") {
    let panier = [];
    localStorage.setItem("panier", JSON.stringify(panier));
  }
  //Récupérer les informations sur les oursons
  bear.selectionCouleur = document.querySelector("option:checked").innerText;
  bear.quantite = document.querySelector("input").value;
  //création d'une variable pour manipuler le panier
  let panier = JSON.parse(localStorage.getItem("panier"));
  //Vérification que l'ourson n'est pas déjà dans le panier
  let produitCree = false;
  let produitExistant;
  for (let i = 0; i < panier.length; i++) {
    if (bear._id === panier[i]._id && bear.price === panier[i].price && bear.selectionCouleur=== panier[i].selectionCouleur) {
      produitCree = true;
      produitExistant = panier[i];
    }
  }
  //Ajout de l'ourson selectioné au panier
  if (produitCree === false) {
    panier.push(bear);
    localStorage.setItem("panier", JSON.stringify(panier));
  } else {
    produitExistant.quantite = parseInt(produitExistant.quantite, 10) + parseInt(bear.quantite, 10);
    localStorage.setItem("panier", JSON.stringify(panier));
  }
  creationPanier();
  alert("Vous avez ajouté ce produit dans votre panier");
}

let params = (new URL(document.location)).searchParams;
let id = params.get("id");

//Appel des fonction après chargement de la page HTML
document.addEventListener("DOMContentLoaded", function(){
  console.log("DOM entierement chargé");
  creationPanier();
  recuperationOurson(id);
}); 
