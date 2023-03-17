# Dom For Dummies

## Petite bibliothèque de fonctions de raccourcis pour agir sur le DOM

* Attendre que le DOM soit chargé
* Un querySelector qui renvoi une collection ou un seul élément, selon le selecteur (plus a choisir entre un selector ou selectorAll)
* Un créateur d'élément DOM avec options pour inclure directement les attribut de l'élément.
* D'autres encore qui sont en cuisine

### Usages
* Le fichier dfd-script.js est a appeler dans le ```<head />```
* dfd-script.js contient en commentaire dans les fonctions leur utilisation (simple promis)
* Le fichier index.html montre un exemple d'utilisation des fonctions

### Fonctions

#### loaded(selector)
Loaded retourne simplement la formulation ```window.addEventListener(callable)```

#### q(selector)
q fait un querySelectorAll du selecteur, ensuite analyse la collection.
si la collection n'est qu'un élément, l'élément est retourné comme pour un querySelector,
sinon retourne la collection comme un querySelectorAll

#### cEO(element, options)
Combine createElement et setAttribute.
option est un objet litéral
* les noms des attribut de l'objet sont les noms des attributs de l'élément.
* la valeur des attributs de l'objet sont les valeurs de l'attribut de l'élément
* les attributs tels que ```class``` et ```style``` sont a renseigner en tableau
```
option{
    href: '#',
    class: ['class1', 'class2', ...],
    style: ['property: value;', 'property: value;', ... 'property: value;']
}
```

#### cTN(content)
retourne simplement ```window.createTextNode(content)```