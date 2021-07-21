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

 function verificationValiditeChamp(input, regExp) {
  return input.value.match(regExp) !== null;
}


function envoiFormulairePaiement() {
  //Si la fonction a déjà été utilisée on réinitialise le formulaire
  //suppr div
  //suppr valide/invalide
  let inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length ; i++) {
    inputs[i].classList.remove("invalide");
    inputs[i].classList.remove("valide");
  }

  let messagesAlerte = document.querySelectorAll(".messagesAlerte");
  for (let i = 0; i < messagesAlerte.length ; i++) {
    messagesAlerte[i].remove();
  };

  //Récupérer les informations du formulaire
  var prenom = document.querySelector("#prenom"),
    nom = document.querySelector("#nom"),
    addresse = document.querySelector("#addresse"),
    ville = document.querySelector("#ville"),
    email = document.querySelector("#email");

  //Définition des expressions régulières pour la vérification de la validité des champs
  let stringRegExp = /([A-Za-z0-9_\s\-'\u00C0-\u024F]+)/;
  emailRegExp = /^([\w\-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;

  //Vérification de la validité des champs
  let validitePrenom = verificationValiditeChamp(prenom, stringRegExp),
  validiteNom= verificationValiditeChamp(nom, stringRegExp);
  validiteAdresse = verificationValiditeChamp(addresse, stringRegExp);
  validiteVille = verificationValiditeChamp(ville, stringRegExp);
  validiteEmail = verificationValiditeChamp(email, emailRegExp);

  //Alerter l'utilisateur s'il a mal rempli le formulaire
  let champ = [prenom, nom, addresse, ville, email],
    validiteChamps = [validitePrenom, validiteNom, validiteAdresse, validiteVille, validiteEmail],
    champInvalide = false;

  for (let i = 0; i < champ.length; i++) {
    if (!validiteChamps[i]) { //si un champ n'est pas valide
      champInvalide = true; //un champ au moins est incorrect, sera utilisé plus loin pour empêcher la requête POST à l'API

      //Création du message à envoyer à l'utilisateur
      let message;
      if (champ[i] === document.querySelector("#prenom")) {
        message = "Le prénom est incorrect !";
      } else if (champ[i] === document.querySelector("#nom")) {
        message = "Le nom est incorrect !";
      } else if (champ[i] === document.querySelector("#addresse")) {
        message = "L'adresse postale est incorrecte !";
      } else if (champ[i] === document.querySelector("#ville")) {
        message = "La ville est incorrecte !";
      } else {
        message = "L'adresse mail est incorrecte !";
      }

      //Création et stylisation de l'alerte
      let alert = document.createElement("div");
      alert.appendChild(document.createTextNode(message));
      champ[i].classList.add("is-invalid");
      alert.classList.add("alertMessages", "invalid-feedback");
      champ[i].parentElement.appendChild(alert);

    } else {
      champ[i].classList.add("is-valid");
    }
  }
  //Si l'un des champs a été vidé ...
  if (champInvalide) return; //la fonction s'arrête 
  //sinon on continue

  //Les entrer dans un objet
  let contact = {
    prenom: prenom.value,
    nom: nom.value,
    addresse: addresse.value,
    ville: ville.value,
    email: email.value
  },
    produits = IDproduits;
  //Récupérer l'id de la commande
  fetch('http://localhost:3000/api/teddies/order', {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contact: contact,
      produits: produits
    })
  })
    .then(response => response.json())
    .then(commande => {
      localStorage.setItem("idCommande", commande.idCommande);
      window.location.href = "../html/order.html";
    })
    .catch(error => alert("Un des champ du formulaire n'est pas correct !"));
}

  
panier();
document.querySelector("#envoiFormulairePaiement").addEventListener("click", envoiFormulairePaiement, false);