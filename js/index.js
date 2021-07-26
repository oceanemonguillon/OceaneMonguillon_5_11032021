function creationPanier() {
    let lien = document.querySelector("#pagePanier");
    //Vérifier si le panier contient un ourson (ou +)
    if (localStorage.getItem("panier") === null || localStorage.getItem("panier") === "[]") {
      lien.setAttribute("href","#");
    } else {
      lien.setAttribute("href", "html/panier.html");
      lien.classList.add("text-info");
    }
}

function appelUrl() {
    fetch('http://localhost:3000/api/teddies/') //appel api, callback, ... return une promesse
        .then(response => { //fonction anonyme prend pour parametre response et retourne response.json
            return response.json();           
        })
        .then(function (data) { //Appel de la fonction affichageProduit pour chaque objet présent dans l'API
            for (let i = 0; i < data.length; i++) {
                affichageProduit(data[i]);
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
  
function affichageProduit(bear) {
    // Création des éléments composants chaque produit
    let li = document.createElement('li');
    let img = document.createElement('img');
    let nom = document.createElement('h3');
    let prix = document.createElement('p');
    let description= document.createElement('p');
    let lienPageProduit = document.createElement("a");
    let urlPage = "html/produits.html?id=" + bear._id;


    //Ajoute des classes à l'élément parent <li>
    li.classList.add("list-group-item", "flex-column", "align-item-start"); 
    prix.classList.add("price");
    description.classList.add("description");

    //Définit la source des images de chaque produit  
    img.src = bear.imageUrl;

    //Ajoute des balises HTML à la page index avec le contenu choisi
    nom.innerText = `${bear.name}`;
    prix.innerText = `Prix : ${bear.price/100} €`;
    description.innerText = `Description de l'article : ${bear.description}`;
    lienPageProduit.innerHTML = `<p> voir la fiche du produit</p>`;
    lienPageProduit.setAttribute('href', urlPage);

    
    //Ajoute un élément enfant defini à l'élément parent choisi
    li.appendChild(img);
    li.appendChild(nom);
    li.appendChild(prix);
    li.appendChild(description);
    li.appendChild(lienPageProduit);


    //Appel la balise html <ul> par son ID "bears" + Ajoute un élément enfant defini à l'élément parent choisi
    document.getElementById('bears').appendChild(li);
}


//Appel des fonction après chargement de la page HTML
document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM entierement chargé");
    appelUrl();
    creationPanier();
}); 
