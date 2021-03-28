# Management patrimony

**+1 pour ce beau README pls :smiley:**

Le but de ce site est de permettre aux offices de tourismes de pouvoir gérer des monuments qui seront visibles sur une application mobile

*Le site final sera fait en symfony, vous retrouverez une petite partie du développement en NodeJS*

Le site a été pensé en **MOBILE FIRST**

## :warning: Important

- Les liens "A propos" et "Mentions légales" servent de décoration :eyes:
- De même pour la partie connexion, elle n'a pas été implémenté
- Exécuté sur nodejs V14.16.0 LTS
- Des tests ont été realisé sur les clefs étrangères (cf. [Gestion des erreurs](#gestion-des-erreurs)), mais pour pas passer mon temps là-dessus, je n'ai pas fait l'entièreté de ce qui devrait être fait pour un vrai serveur en prod...

---

Navigateur web | Compatibilité | version testée
--- | --- | ---
chromium (brave, chrome, edge, ...) | :heavy_check_mark: | 89
Firefox | :heavy_check_mark: | 87
Opera | :heavy_check_mark: | 75
Safari | :grey_question: | x
internet explorer | :x: <br />(c'est volontaire, je ne voulais pas le prendre en compte,<br />même si j'aurai pu utiliser babeljs + autoprefixer css) | 11
  

## Getting started

Installation des dépendances npm
```sh
$ npm install
```

Creation des tables pour le SQLite

Nom des tables | Description
--- | ---
Category | catégorie des places (ex : Prison, Église, ...)
Place | Monument (ex : Place du château, Pont des amours, ...)
Image | Image des places  (monuments)
User | utilisateur (office de tourisme)

```text
/create-db
```

Création des données pour SQLite

```text
/data-test
```

:warning: Normalement, après avoir était sur /data-test, il devrait y avoir 8 catégories et 2 places, mais pour une raison inconnue, ca ne fonctionne pas tout le temps, il est parfois nécessaire de relancer la page.

```js
    db.run('INSERT INTO category (name) VALUES (\'Pont\');')
    db.run('INSERT INTO category (name) VALUES (\'Lac\');')
    db.run('INSERT INTO category (name) VALUES (\'Magasin\');')
    db.run('INSERT INTO category (name) VALUES (\'Marché\');')
    db.run('INSERT INTO category (name) VALUES (\'Église\');')
    db.run('INSERT INTO category (name) VALUES (\'Prison\');')
    db.run('INSERT INTO category (name) VALUES (\'Fontaine\');')
    db.run('INSERT INTO category (name) VALUES (\'Rivière\');')

    db.get('SELECT * FROM category', [], (err,row) => {
        db.run("INSERT INTO place (name, latitude, longitude, category_id) VALUES('Pont des amours', 6.131370, 45.900227," + row.id + ")")
        db.run("INSERT INTO place (name, latitude, longitude, category_id) VALUES('Test', 6.131370, 45.900227," + row.id + ")")
    })
```

# Screenshots

### home

![Catégorie](https://nathan-cuvellier.fr/img/js_damas/m_home.png)

![Catégorie](https://nathan-cuvellier.fr/img/js_damas/home.png)


### login

![Catégorie](https://nathan-cuvellier.fr/img/js_damas/m_login.png)

![Catégorie](https://nathan-cuvellier.fr/img/js_damas/login.png)


### Catégories

![Catégorie](https://nathan-cuvellier.fr/img/js_damas/m_category.png)
![Catégorie](https://nathan-cuvellier.fr/img/js_damas/category.png)

### Place


![Catégorie](https://nathan-cuvellier.fr/img/js_damas/m_add_place.png)
![Catégorie](https://nathan-cuvellier.fr/img/js_damas/m_add_place_list_category.png)
![Catégorie](https://nathan-cuvellier.fr/img/js_damas/place.png)



### Barre de navigation pour les petits écrans

![Menu](https://nathan-cuvellier.fr/img/js_damas/m_menu.png)

### Gestion des erreurs

![Erreur exemple](https://nathan-cuvellier.fr/img/js_damas/error_foreign_key.png)
![Erreur exemple](https://nathan-cuvellier.fr/img/js_damas/error_foreign_key_place_category.png)

### image

![Image](https://nathan-cuvellier.fr/img/js_damas/m_images.png)

![Image](https://nathan-cuvellier.fr/img/js_damas/images.png)

![Image demo](https://nathan-cuvellier.fr/img/js_damas/image_demo.gif)


