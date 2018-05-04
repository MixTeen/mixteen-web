// Créer un tableau avec les noms des animaux que l'on retrouve dans les images
const images = ['castor', 'chat', 'cochon', 'lapin', 'ours', 'panda', 'raton-laveur', 'renard', 'souris', 'tigre'];

// un memory associe des images 2 par 2. On construit un nouveau tableau qui contient les animaux deux fois et qui
// les mélanges
const grille = images
  .concat(images)
  .shuffle()
  .map((image, index) => {
    return {
      numero: index,
      source: `images/${image}.svg`,
      trouve: false
    }
  });

// Dans le jeu de memory on associe deux cartes. On sélectionne une première carte puis une seconde. Ensuite quand
// les cartes sont retournées plus aucune carte n'est disponible. Nous gérons ceci en définissant deux variables
// carte1 et carte2
let carte1;
let carte2;
// Le nombre de coup est calculé pour savoir en combien de clic on arrive à gagner
let nbcoup = 0;

// On va construire notre grille sur la page et faire des sauts de ligne dès que l'on atteint 5 éléments en largeur
// Pour définir cette grille nous avons utilisé la déclartion css suivante
//     #grille {
//        display: grid;
//        grid-template-columns: repeat(5, 20%);
//     }
// On indique que l'affichage se fait sous forme de grille et que cette grille contient 5 colonnes. Chaque colonne
// représente 20% de la largeur.
function dessinerGrille() {
  // La première étape consite à effacer les carte1 et 2 si elles ont été affectées
  carte1 = undefined;
  carte2 = undefined;

  // Pour définir la grille nous allons utiliser plusieurs variables
  // casesHtml est utilisé pour construire les cases de la grille au format HTML. C'est une chaine de caractères
  // que nous allons via Javascript placé dans la grille définit dans notre document H
  let casesHtml = '';
  // colonne est un compteur pour savoir quelle est la colonne en cours. Quand on arrivera au bout des colonnes 5,
  // ce compteur sera réinitailisé
  let colonne = 1;
  // ligne est un compteur pour savoir quelle est la ligne en cours. Cette valeur est incrémentée que lorsque nous
  // changeons de ligne lorsque le nombre de colonnes est atteint
  let ligne = 1;

  for (let image of grille) {
    if (colonne > 5) {
      colonne = 1;
      ligne = ligne + 1;
    }

    // Nous allons définir une case de la grille. Une case correspond à un bloc placé dans une DIV HTML. Pour savoir où
    // on la place sur la grille nous allons ajouté des styles CSS sur ce div. Par exemple
    // <div style="grid-row: 2;grid-column: 3"></div> crée une case en ligne 2 et colonne 3
    // On ajoutera aussi une classe CSS carte pour bénéficier des styles déjà définis ainsi que le numro de la carte
    // <div class="carte" id="carte${image.numero}"></div>
    if (image.trouve) {
      // Si l'image a déja été trouvée on l'affiche et on ne fait plus rien
      casesHtml = casesHtml + `
      <div class="carte" id="carte${image.numero}" style="grid-row: ${ligne}";grid-column: ${colonne};>
        <img src="${image.source}">
      </div>`;
    }
    else {
      // Sinon si l'image n'a pas été trouvée nous ne l'affichons pas en la déclarant tout de même mais en utlisant le
      // style="visibility:hidden". Nous ajoutons simplement un écouteur
      // d'évenement onclick sur la case pour qu'un traitement soit lancé quand l'utilisateur clique sur une carte
      casesHtml = casesHtml + `
      <div class="carte" id="carte${image.numero}" style="grid-row: ${ligne};grid-column: ${colonne}" onclick="cliquerSurImage(${image.numero})">
        <img style="visibility:hidden" src="${image.source}">
      </div>`;
    }

    colonne = colonne + 1;
  }

  document.getElementById('grille').innerHTML = casesHtml;
}

function cliquerSurImage(numero) {
  // On n'a passé qu'un numéro de carte il faut retrouver la bonne carte
  const carte = grille.filter(image => image.numero === numero)[0];

  // Nous cherchons dans la page notre carte via sont numéro et l'id que nous avons défini
  const imageCarte = document.getElementById(`carte${carte.numero}`).getElementsByTagName("img")[0];

  // Si la carte 1 n'a pas été retournée la carte 1 est la carte qui vient d'être tirée
  if (!carte1) {
    carte1 = carte;
    imageCarte.style['visibility'] = 'visible';
  }
  else if (!carte2 && carte1.numero !== carte.numero){
    // Si la carte 1 est déjà retournée et qu'il n'y a pas de deuxième carte retournée la carte est la carte 2
    carte2 = carte;
    // Quand 2 cartes sont jouées un tour est passé
    nbcoup = nbcoup + 1;
    document.getElementById('score').textContent = nbcoup;

    imageCarte.style['visibility'] = 'visible';

    // Si les cartes correspondent on les marque comme trouvées
    if (carte1.source === carte2.source) {
      carte1.trouve = true;
      carte2.trouve = true;
    }

    // Nous redessinons grille en laissant passer 2 secondes (2000 ms)
    setTimeout(dessinerGrille, 2000)
  }
}

dessinerGrille();
