let produitsPanier = JSON.parse(localStorage.getItem("panier"));
let IDproduits = [];


function panier() {
  for (let i = 0; i < produitsPanier.length; i++) {
    recuperationProduitPanier(i)
  }
  prixTotal()
}

function recuperationProduitPanier(i) {
  IDproduits.push(produitsPanier[i]._id);
      // Création des éléments composants chaque produit
      let produitPanier = document.createElement('li');
      let img = document.createElement('img');
      let prix = document.createElement('p');
      let lienPageProduit = document.createElement('a');
      let urlPage = "../html/produit.html?id=" + produitsPanier[i]._id;
      let selectionCouleur = document.createElement('p');
      let nomEtQuantite = document.createElement('p');

    //Ajoute des classes à l'élément parent <li>
    produitPanier.classList.add("list-group-item", "flex-column", "align-item-start"); 
    prix.classList.add("price");

    //Définit la source des images de chaque produit
    img.src = produitsPanier[i].imageUrl;

    //Ajoute des balises HTML à la page index avec le contenu choisi
    nomEtQuantite.innerText = `${produitsPanier[i].name  + " x" + produitsPanier[i].quantite}`;
    prix.innerText = `Prix : ${produitsPanier[i].price * produitsPanier[i].quantite / 100}€`;
    lienPageProduit.innerHTML = `<p> voir la fiche du produit</p>`;
    lienPageProduit.setAttribute('href', urlPage);
    selectionCouleur.innerText = `Vous avez choisi la couleur: ${produitsPanier[i].selectionCouleur}`;

    //Ajoute un élément enfant defini à l'élément parent choisi
    produitPanier.appendChild(img);
    produitPanier.appendChild(nomEtQuantite);
    produitPanier.appendChild(selectionCouleur);
    produitPanier.appendChild(prix);
    produitPanier.appendChild(lienPageProduit);

    //Appel la balise html <ul> par son ID "bears" + Ajoute un élément enfant defini à l'élément parent choisi
    document.getElementById('panier').appendChild(produitPanier);

}

function prixTotal() {
    let total = 0;
    for (let j = 0; j < produitsPanier.length; j++) {
      total = total + (produitsPanier[j].price * produitsPanier[j].quantite);
    }
    let prixTotalPanier= document.createElement('p');
    prixTotalPanier.innerText= `Total : ${total / 100} €`;
    document.querySelector("#totalPanier").appendChild(prixTotalPanier);
}

panier();

let orderId = localStorage.getItem("orderId");
console.log(orderId);
document.querySelector("strong").appendChild(document.createTextNode(orderId));
localStorage.removeItem("panier");
localStorage.removeItem("orderId");
