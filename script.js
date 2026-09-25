// On récupère le bouton grâce à son ID
const btnSombre = document.getElementById('btn-sombre');

// On ajoute l'action au clic
btnSombre.addEventListener('click', function() {
    // On active ou désactive la classe 'mode-sombre' sur toute la page
    document.body.classList.toggle('mode-sombre');
    
    // On change le texte du bouton selon l'état
    if (document.body.classList.contains('mode-sombre')) {
        btnSombre.textContent = 'Mode clair';
    } else {
        btnSombre.textContent = 'Mode sombre';
    }
});
