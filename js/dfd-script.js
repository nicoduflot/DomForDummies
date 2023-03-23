/**
 * DOM For Dummies
 * @author  Nicolas Duflot
 * @since   17/03/2023
 * @desc    Petite bibliothèque de fonctions de raccourcis pour agir sur le DOM
 * 
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
 * @param {string} selector - selector for the html element(s)
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
 * @param {string} element  - tagname of the html element
 * @param {object} options  - option for the html element attributes
 * @param {string} parent   - selector for the html element parent when added as a child element
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
        q(parent).appendChild(newElement)
    }
    return newElement;
}

/**
 * crée un noeud de text
 * @param {string} content - text content of the text node
 * @param {object} parent - the parent DOM Object /!\ NOT THE SELECTOR /!\
*/
function cTN(content, parent = null){
    let textNode = document.createTextNode(content);
    if(null !== parent){
        parent.append(textNode);
    }
    return textNode;
}