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

/**
 * supprime tous les noeuds enfants
 * @param {object} node - le noeud dans lequel on supprime tous les enfants
 */
function erase_childs(node){
    if(node.childNodes){
        let childs = node.childNodes;
        while(childs.length > 0){
            node.removeChild(node.lastChild);
        }
    }
}

/* lire un XML et le retourner sous forme de liste, avec les attributs des éléments eux aussi listés */
/**
 * 
 * @param {*} xmlData - le flux XML
 * @param {*} liste - null par défaut, sers pour la récursivité
 * @param {Object} userOptions - objet des option pour l'affichage des attributs
 * 
 */
function parseXML(xmlData, liste = null, userOptions = null){
    /* le XML sera affiché sous la forme d'une liste html */
    liste = cEO('ul');
    /* 
    options de l'affichage des attributs des éléments XML 
    soit demandées par l'utilisateur soit par défaut, 
    les classes ne fonctionnants qu'avec 
    l'utilisation de bootstrap 5.2 minimum
    */
    let options = userOptions || {
        style: `
            font-style:italic;
            font-weight:bold;
            list-style-type: none`, 
        class: 'alert alert-primary p-0  ps-2 pe-2 mb-0'
    };
    /* on  parcours tous les noeuds enfant de la racine */
    xmlData.childNodes.forEach(element => {
        /* si le noeud n'est pas un noeud texte ou un commentaire */
        if (element.nodeName !== '#text' && element.nodeName !== '#comment') {
            /* si le noeud a des enfants, il s'agit d'une sous-liste */
            if (element.children.length !== 0) {
                let li = cEO('li');
                li.appendChild(cTN(`${element.nodeName} :`)); 
                /* si l'élément possède des attributs, on les affiche */
                if(element.attributes.length > 0){
                    let ulAttr = cEO('ul', options);
                    for(attr of element.attributes){
                        let liAttr = cEO('li');
                        let elemAttr = cTN(`attr : ${attr['name']} => ${attr['value']}`)
                        liAttr.appendChild(elemAttr);
                        ulAttr.appendChild(liAttr);
                    }
                    li.appendChild(ulAttr);
                }
                liste.appendChild(li);
            } else {
                /* si pas d'enfant, c'est un élément de liste */
                let li = cEO('li');
                li.appendChild(cTN(`${element.nodeName} : ${element.innerHTML}`));
                /* si l'élément possède des attributs, on les affiche */
                if(element.attributes.length > 0){
                    let ulAttr = cEO('ul', options);
                    for(attr of element.attributes){
                        let liAttr = cEO('li');
                        let elemAttr = cTN(`attr : ${attr['name']} => ${attr['value']}`)
                        liAttr.appendChild(elemAttr);
                        ulAttr.appendChild(liAttr);
                    }
                    li.appendChild(ulAttr);
                }
                liste.appendChild(li);
            }
            if (element.children.length !== 0) {
                /* si le noeud a des enfants, on rappelle la fonction */
                liste.appendChild(parseXML(element, liste));
            }
        }
    });
    /* on renvoie la liste formée à l'appel */
    return liste;
}

function randomize(min = 0, max = 0){
    if(isNaN(parseFloat(min)) || isNaN(parseFloat(max))){
        return 0;
    }else{
        if(parseFloat(max) <= parseFloat(min)){
            return 0;
        }else{
            return Math.floor(Math.random() * (parseFloat(max) - parseFloat(min) + 1)) + parseFloat(min);
        }
    }
}