# Management patrimony

Le but de ce site est de permettre aux offices de tourismes de pouvoir gérer des monuments qui seront visibles sur une application mobile

*Le site final sera fait en symfony, vous retrouverez une petite partie du développement en NodeJS*

Le site a été pensé en **MOBILE FIRST**

Navigateur web | Compatibilité | version testée
--- | --- | ---
chromium (brave, chrome, edge, ...) | :heavy_check_mark: | 89
Firefore | :heavy_check_mark: | 87
Opera | :heavy_check_mark: | 75
Safari | :grey_question: | x
internet explorer | :x: (c'est volontaire, je ne voulais pas le prendre en compte, même si j'aurai pu utiliser babeljs + autoprefixer css) | 11
  

## Getting started

Install npm dependencies
```sh
$ npm install
```

Creation des tables pour le SQLite

Table Name | Description
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


