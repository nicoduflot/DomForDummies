/**
 * DOM For Dummies
 * @author  Nicolas Duflot
 * @since   17/03/2023
 * @desc    Petite bibliothèque de fonctions de raccourcis pour agir sur le DOM
 */
/**
 * attendre que le DOM soit chargé
 * @param {function} callable
 */
function loaded(callable){
    window.addEventListener('DOMContentLoaded', callable);
}
/**
 * récupère un élément du DOM 
 * ou 
 * une collection d'élément du DOM
 * dépend du selecteur
 * @param {string} selector - sélécteur CSS du ou des éléments
 */
function q(selector){
    let collection = document.querySelectorAll(selector);
    return (collection.length > 1)? collection : collection[0];
}
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
 * 
 * il faut ABSOLUMENT ajouter le ; à la fin d'une propriété CSS pour les classes.
 * 
 * Ajouter l'élément créé au parent
 *  Il faut le selector du parent ciblé
 * 
 * @param {string} element  - tagname de l'élément html
 * @param {object} options  - options pour les attributs, classes et attribut style de l'élément a créer
 * @param {string} parent   - l'objet DOM du parent dans lequel on ajoute le textnode /!\ PAS LE SÉLECTEUR /!\
 */
function cEO(element, options = {}, parent = null){
    let newElement = document.createElement(element);
    for(let key in options){
        if(typeof options[key] === 'object'){
            let attr = options[key].join(' ');
            newElement.setAttribute(key, attr);
        }else{
            newElement.setAttribute(key, options[key]);
        }      
    }
    if(null !== parent){
        parent.appendChild(newElement)
    }
    return newElement;
}
/**
 * crée un noeud de text
 * @param {string} content - contenu texte du textnode
 * @param {object} parent - l'objet DOM du parent dans lequel on ajoute le textnode /!\ PAS LE SÉLECTEUR /!\
*/
function cTN(content, parent = null){
    let textNode = document.createTextNode(content);
    if(null !== parent){
        parent.append(textNode);
    }
    return textNode;
}