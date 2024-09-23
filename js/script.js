loaded(() => {
    /* le script se lance après que la page soit chargée*/
    console.log('page chargée');
    /* la fonction q pour récupérer un élément défini */
    let oneHeader = q('body > header');
    console.log('Un seul header enfant direct de body', oneHeader);

    /* la fonction q pour récupérer une collection d'éléments  */
    let allNavLinks = q('body > nav a');
    console.log('Tous les liens avant création d\'un lien avec dfd : ', allNavLinks);

    let selectTest = q('#selectTest');
    console.log('Objet de formulaire select ', selectTest);
    console.log('valeur de l\'Objet de formulaire select ', selectTest.value);

    selectTest.addEventListener('change', function () {
        console.log('Objet de formulaire select quand on change la valeur ', selectTest.value);
    });

    /* ajouter un lien dans la liste de la nav */
    /* récupération de l'élément ul */
    let linkNav = q('body > nav > ul');
    /* création du li */
    let newLi = cEO('li');
    /* ajout du li dans ul */
    linkNav.append(newLi);
    /* option de l'élément a que l'on va créer */
    let aOptions = {
        href: '#', /* l'url du lien */
        class: ['nav-link', 'item'], /* on ajoute des classes au lien */
        style: ['font-weight: bold;', 'text-transform:uppercase;'], /* on ajoute du style au lien */
        'data-test': 'dataset test' /* on ajoute un dataset au lien */
    };
    /* création du a avec les options définies précédemment */
    let newLiLink = cEO('a', aOptions);
    /* ajout du a au li */
    newLi.append(newLiLink);
    /* création du texte à l'intérieur du lien */
    let newLinkText = cTN('nouveau lien créé avec DFD');
    /* ajout du texte dans a */
    newLiLink.append(newLinkText);
    /* le lien est bien ajouté dans le DOM */
    allNavLinks = q('body > nav a');
    console.log('Tous les liens après création d\'un lien avec dfd : ', allNavLinks);

    /*
    let numbers = [1, 2, 3, 4, 5];
    let copyNumbers = [...numbers];
    copyNumbers.reverse();
    console.log(copyNumbers);
    console.log(numbers);
    */

    let spanOptions = {
        style: ['font-weight: bold;', 'text-transform:uppercase;'], /* on ajoute du style au lien */
        'data-span': 'dataset span' /* on ajoute un dataset au lien */
    };
    /* le span est créé, récupéré dans une variable et ajouté directement à un élément parent */
    let span = cEO('span', spanOptions, q('#parent'));

    /* le textNode est créé et ajouté directement à un élément parent */
    cTN('Mon span en utilisant l\'ajout à un parent de cEO et la création de text node avec l\'ajout à un parent !', span);

    q('#btnTestEraseChilds').addEventListener('click', function () {
        erase_childs(q('#divTestEraseChilds'));
    });

    q('#resetTestErase').addEventListener('click', function () {
        let ul = cEO('ul', {}, q('#divTestEraseChilds'));
        let li = cEO('li', {}, ul);
        cTN('li enfant', li);
        q('#divTestEraseChilds').append(ul);
        let button = cEO('button');
        cTN('bouton test enfant', button);
        q('#divTestEraseChilds').append(button);

    });

    q('#XML').addEventListener('click', function () {
        fetch(q('#XML').dataset.xmlsource)
            .then(response => response.text())
            .then(xmlFlux => {
                /* créer un objet pour parser le XML */
                const parser = new DOMParser();
                /* parser le XML dans une constante */
                const xmlDoc = parser.parseFromString(xmlFlux, 'application/xml');
                /* 
                aller récupérer la racine du XML 
                keyword est le nom de l'élément racine du xml qui contient les données a afficher
                C'est nécessaire pour pouvoir parser correctement le XML
                */
                xmlData = xmlDoc.getElementsByTagName(q('#XML').dataset.keyword);
                let affichage = q(`#${q('#XML').dataset.target}`);
                affichage.classList.remove('error');
                /* on vide l'élément receveur */
                erase_childs(affichage);
                /* parser le contenu de la racine et l'afficher dans un élément */
                affichage.appendChild(parseXML(xmlData[0]));
            })
            .catch(e => console.error(e));
    });

    q('#externXML').addEventListener('click', function () {
        let affichage = q(`#${q('#XML').dataset.target}`);
        affichage.classList.remove('error');
        if (q('#ext-ressource').value !== '' && q('#ext-root-element').value !== '') {
            fetch(q('#ext-ressource').value)
                .then(response => response.text())
                .then(xmlFlux => {
                    /* créer un objet pour parser le XML */
                    const parser = new DOMParser();
                    /* parser le XML dans une constante */
                    const xmlDoc = parser.parseFromString(xmlFlux, 'application/xml');
                    /* 
                    aller récupérer la racine du XML 
                    keyword est le nom de l'élément racine du xml qui contient les données a afficher
                    C'est nécessaire pour pouvoir parser correctement le XML
                    */
                    xmlData = xmlDoc.getElementsByTagName(q('#ext-root-element').value);
                    affichage.classList.remove('error');
                    /* on vide l'élément receveur */
                    erase_childs(affichage);
                    /* parser le contenu de la racine et l'afficher dans un élément */
                    affichage.appendChild(parseXML(xmlData[0]));
                })
                .catch(e => console.error(e));
        }else{
            
            let error = cTN('le lien vers la ressource et / ou le nom de l\'élément racine manque');
            erase_childs(affichage);
            affichage.classList.add('error');
            affichage.appendChild(error);
        }
    });

    q('#resetXml').addEventListener('click', function () {
        q('#listeXML').classList.remove('error');
        erase_childs(q('#listeXML'));
    });

    q('#testRandomize').addEventListener('click', ()=>{
        const resRand = randomize(q('#randMin').value, q('#randMax').value);
        q('#resRandomize').innerText = resRand;
    });

    function addJson(data){
        const affData = q('#myJson');
        let dataText = '';
        data.forEach(element => {
            for(key in element){
                dataText = dataText + `${key} : ${element[key]}, `;
            }
            dataText = dataText + '\n';
        });
        affData.innerText = dataText;
    }

    getJSon('./json/user.json', addJson);
});