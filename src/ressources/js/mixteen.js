/**
 * Cette méthode permet de mélanger les differents éléments d'un tableau selon un ordre aléatoire. Cette méthode vient
 * enrichir l'objet Javascript Array et permet de simplifier le code plus tard.
 * @returns {Array}
 */
Array.prototype.shuffle = function () {
  let m = this.length, i;
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [this[m], this[i]] = [this[i], this[m]]
  }
  return this;
};
