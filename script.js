// --- 1. MODE SOMBRE ---
const btnSombre = document.getElementById('btn-sombre');
btnSombre.addEventListener('click', function() {
    document.body.classList.toggle('mode-sombre');
    btnSombre.textContent = document.body.classList.contains('mode-sombre') ? 'Mode clair' : 'Mode sombre';
});

// --- 2. TABLEAU DE BORD INTERACTIF ---
const onglets = document.querySelectorAll('.dash-card');
const contenus = document.querySelectorAll('.content-section');

onglets.forEach(onglet => {
    onglet.addEventListener('click', () => {
        // Enlever la classe active partout
        onglets.forEach(o => o.classList.remove('active'));
        contenus.forEach(c => c.classList.remove('active-content'));
        
        // Ajouter la classe active sur l'onglet cliqué et son contenu
        onglet.classList.add('active');
        const cible = document.getElementById(onglet.getAttribute('data-target'));
        cible.classList.add('active-content');
    });
});

// --- 3. EASTER EGG : MINI-JEU DE JONGLE ---
const btnEasterEgg = document.getElementById('easter-egg-btn');
const modalJeu = document.getElementById('modal-jeu');
const btnFermer = document.getElementById('fermer-jeu');
const ballonJeu = document.getElementById('ballon-jeu');
const scoreAffichage = document.getElementById('score-jeu');
const messageJeu = document.getElementById('message-jeu');
const zoneJeu = document.getElementById('zone-jeu');

let score = 0;
let jeuActif = false;
let positionY = 20;
let velociteY = 0;
const gravite = 0.6;
let animationJeu;

// Ouvrir le jeu
btnEasterEgg.addEventListener('click', () => {
    modalJeu.style.display = 'flex';
    reinitialiserJeu();
});

// Fermer le jeu
btnFermer.addEventListener('click', () => {
    modalJeu.style.display = 'none';
    cancelAnimationFrame(animationJeu);
});

// Mécanique physique
function moteurPhysique() {
    if (!jeuActif) return;
    
    velociteY += gravite; // La balle tombe de plus en plus vite
    positionY += velociteY;
    
    // Si la balle touche le fond = Game Over
    if (positionY >= zoneJeu.offsetHeight - 50) {
        positionY = zoneJeu.offsetHeight - 50;
        jeuActif = false;
        messageJeu.textContent = "Oh non ! Le ballon est tombé. Score final : " + score;
        messageJeu.style.color = "red";
    }
    
    ballonJeu.style.top = positionY + 'px';
    
    if (jeuActif) {
        animationJeu = requestAnimationFrame(moteurPhysique);
    }
}

// Clic sur le ballon pour jongler
ballonJeu.addEventListener('click', () => {
    if (!jeuActif && positionY >= zoneJeu.offsetHeight - 50) {
        reinitialiserJeu(); // Relance si on a perdu
    } else {
        jeuActif = true;
        velociteY = -12; // Force du rebond vers le haut
        score++;
        scoreAffichage.textContent = score;
        messageJeu.textContent = "Continue !";
        messageJeu.style.color = "#1e293b";
        
        // Empêcher la balle de sortir par le haut
        if (positionY < 0) positionY = 0;
    }
});

function reinitialiserJeu() {
    score = 0;
    scoreAffichage.textContent = score;
    positionY = 20;
    velociteY = 0;
    jeuActif = true;
    messageJeu.textContent = "Jongle en cliquant sur la balle !";
    messageJeu.style.color = "#1e293b";
    cancelAnimationFrame(animationJeu);
    moteurPhysique();
}
