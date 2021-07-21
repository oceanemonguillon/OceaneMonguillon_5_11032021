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
      let spanPrix = document.createElement('span');
      let lienPageProduit = document.createElement("a");
      let urlPage = "../html/produit.html?id=" + produitsPanier[i]._id;
      let selectionCouleur = document.createElement("span");
      let nomEtQuantité = document.createElement("span");

    //Ajoute des classes à l'élément parent <li>
    produitPanier.classList.add("list-group-item", "flex-column", "align-item-start"); 

    //Définit la source des images de chaque produit
    img.src = produitsPanier[i].imageUrl;
    //Ajoute des balises HTML à la page index avec le contenu choisi
    nomEtQuantité.appendChild(document.createTextNode(produitsPanier[i].name  + " x" + produitsPanier[i].quantité));
    spanPrix.innerHTML = `<p class="price">Prix : ${produitsPanier[i].price * produitsPanier[i].quantité / 100} €</p>`;
    lienPageProduit.innerHTML = `<p> voir la fiche du produit</p>`;
    lienPageProduit.setAttribute('href', urlPage);
    selectionCouleur.innerHTML = `<p> Vous avez choisi la couleur: ${produitsPanier[i].selectionCouleur}</p>`;

    //Ajoute un élément enfant defini à l'élément parent choisi
    produitPanier.appendChild(img);
    produitPanier.appendChild(nomEtQuantité);
    produitPanier.appendChild(selectionCouleur);
    produitPanier.appendChild(spanPrix);
    produitPanier.appendChild(lienPageProduit);

    //Appel la balise html <ul> par son ID "bears" + Ajoute un élément enfant defini à l'élément parent choisi
    document.getElementById('panier').appendChild(produitPanier);

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

panier();

let idCommande = localStorage.getItem("idCommande");
console.log(idCommande);
document.querySelector("strong").appendChild(document.createTextNode(idCommande));
localStorage.removeItem("panier");
localStorage.removeItem("idCommande");
