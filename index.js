//Recherche de la balise <ul> dans le HTML
const ul = document.getElementById('bears');
//Fonction pour créer un nouvel élément de la liste
function nouvelElement(element) {
    return document.createElement(element);
}
//Fonction pour ajouter un élément enfant à l'élément parent
function append(parent, child) {
    return parent.appendChild(child);
}

//Appel de l'API via l'URL
fetch('http://localhost:3000/api/teddies/') 
    //retourne une promesse et transforme les données en JSON si elles sont valides
    .then(function(res) { 
      if (res.ok) {
        return res.json();
      }
    })
    //Traitement des données JSON
    .then(function(data){
        //création des elements de la liste grace à la fonction nouvelElement
        return data.map(function(bear){
            let li = nouvelElement('li');
            let img = nouvelElement('img');
            let spanName = nouvelElement('span');
            let spanPrice = nouvelElement('span');
            let spanDescription= nouvelElement('span');

            //Ajoute des classes à l'élément parent <li>
            li.classList.add("list-group-item", "flex-column", "align-item-start");  
            //Définit la source des images de chaque produit  
            img.src = bear.imageUrl;
            //Ajoute des balises HTML à la page index avec le contenu choisi
            spanName.innerHTML = `<a class="stretched-link" href="#"><h3> ${bear.name}</p></a>`;
            spanPrice.innerHTML = `<p class="price">Prix : ${bear.price} €</p>`;
            spanDescription.innerHTML = `<p class="description">Description de l'article : ${bear.description} </p>`;
           
            //Affichage des éléments sur la page grâce a "append"
            append(li, img);
            append(li, spanName);
            append(li, spanPrice);
            append(li, spanDescription);
            append(ul, li);

        })
    })
    //Gère le rejet en cas d'erreur lors de l'appel
    .catch(function(err) {
      // Une erreur est survenue
      console.log(err);
    });

