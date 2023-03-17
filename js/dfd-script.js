/**
 * DOM For Dummies
 * 
 * Petite bibliothèque de fonctions de raccourcis pour agir sur le DOM
 * 
 */

function loaded(callable){
    /**
     * attendre que le DOM soit chargé
     */
    window.addEventListener('DOMContentLoaded', callable);
}

function q(selector){
    /**
     * récupère un élément du DOM ou une collection d'élément du DOM
     * dépend du selecteur, la fonction évalue si c'est une collection de plusieurs éléments.
     */
    let collection = document.querySelectorAll(selector);
    return (collection.length > 1)? collection : collection[0];
}

function cEO(element, options = {}){
    /**
     * crée un élément dans le DOM et ses attributs, classes et / ou style
     * des classes ou des styles doivent être définies dans des tableaux dans l'objet options.
     * 
     * les clefs de l'objet options sont utilisées pour représenter l'attribut, 
     * donc pour des attribut comme les dataset on écrira 'data-test': 'valeur'
     * 
     * Insérrer une classe
     *      class: ['classe1', 'classe2', ... ]
     * 
     * Insérrer du style
     *      style: ['property: value;', 'property: value;', ...]
     * il faut ABSOLUMENT ajouter le ; à la fin d'une propriété CSS pour les classes.
     */
    let newElement = document.createElement(element);
    for(let key in options){
        if(typeof options[key] === 'object'){
            let attr = options[key].join(' ');
            newElement.setAttribute(key, attr);
        }else{
            newElement.setAttribute(key, options[key]);
        }      
    }
    return newElement;
}

function cTN(content){
    /**
     * crée un noeud de text
     */
    return document.createTextNode(content);
}