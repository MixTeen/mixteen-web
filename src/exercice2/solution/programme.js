// On calcule un nombre aléatoire en utilisant la méthode Math.random() qui renvoi un nombre entre 0 et 1 avec une
// grande précision
const nombre_aleatoire = parseInt(Math.random() * 1000 + 1);

// Le nombre de coup est calculé pour savoir le score
let nbcoup = 0;

function jouer() {
  const nombre = document.getElementById("nombre").value;

  if (nombre) {
    nbcoup = nbcoup + 1;
    document.getElementById('score').textContent = nbcoup;

    if (nombre < nombre_aleatoire) {
      document.getElementById('message').innerHTML = 'C\'est plus';
    }
    else if (nombre > nombre_aleatoire) {
      document.getElementById('message').innerHTML = 'C\'est moins';
    }
    else {
      document.getElementById('message').innerHTML = '<b>Vous avez gagné</b>';
    }
  }
}

