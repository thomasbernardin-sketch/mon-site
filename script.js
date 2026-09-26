// --- MODE SOMBRE ---
const btnSombre = document.getElementById('btn-sombre');
btnSombre.addEventListener('click', () => {
    document.body.classList.toggle('mode-sombre');
    if(document.body.classList.contains('mode-sombre')) {
        btnSombre.innerHTML = 'Mode Clair';
    } else {
        btnSombre.innerHTML = 'Mode Sombre';
    }
});

// --- LE VRAI JEU DE JONGLE (CORRIGÉ ET ULTRA-RÉACTIF) ---
const ball = document.getElementById('ball');
const gameUi = document.getElementById('game-ui');
const scoreDisplay = document.getElementById('score');
const gameMessage = document.getElementById('game-message');

let isPlaying = false;
let gameLoop;
let score = 0;
let posX, posY;
let velX = 0, velY = 0;
const gravity = 0.6;
const bounceLoss = 0.8; 
const ballSize = 60; 
let resetTimeout; // Sécurité pour faire disparaître l'écran de fin

function startGame(e) {
    // Empêche le comportement par défaut (qui peut annuler le clic)
    e.preventDefault();

    // Gestion du clic (souris) ou du toucher (téléphone)
    let clientX = e.clientX;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
    }

    if (isPlaying) {
        // En cours de jeu : On jongle
        score++;
        scoreDisplay.textContent = score;
        velY = -15; // Rebond vers le haut
        
        // Déviation à gauche/droite selon où l'on clique sur le ballon
        const clickOffset = (clientX - posX - (ballSize/2)) / ballSize;
        velX = -clickOffset * 20; 
        
        // Effet visuel de rotation
        ball.style.transform = `rotate(${Math.random() * 360}deg)`;
        return;
    }

    // Lancement d'une nouvelle partie
    isPlaying = true;
    score = 0;
    scoreDisplay.textContent = score;
    gameUi.style.display = 'block';
    gameMessage.textContent = "Clique pour jongler !";
    gameMessage.style.color = "var(--text-color)";

    // Annule la disparition du texte de la partie précédente s'il y en avait une
    clearTimeout(resetTimeout);

    // On impose le point de départ en bas à droite
    posX = window.innerWidth - 90;
    posY = window.innerHeight - 90;
    
    // On détache le ballon de son emplacement CSS fixe
    ball.style.bottom = 'auto';
    ball.style.right = 'auto';

    velY = -15; // Puissance du premier saut
    velX = -5;  // Projection vers la gauche

    gameLoop = requestAnimationFrame(updatePhysics);
}

function updatePhysics() {
    if (!isPlaying) return;

    velY += gravity; 
    posX += velX;
    posY += velY;

    const maxX = window.innerWidth - ballSize;
    const maxY = window.innerHeight - ballSize;

    // Rebond sur les Murs latéraux
    if (posX < 0) {
        posX = 0;
        velX = Math.abs(velX) * bounceLoss;
    } else if (posX > maxX) {
        posX = maxX;
        velX = -Math.abs(velX) * bounceLoss;
    }

    // Rebond sur le Plafond
    if (posY < 0) {
        posY = 0;
        velY = Math.abs(velY) * bounceLoss;
    }

    // Game Over : Touche le sol
    if (posY >= maxY) {
        posY = maxY;
        endGame();
    }

    // On applique la nouvelle position à l'image du ballon
    ball.style.left = posX + 'px';
    ball.style.top = posY + 'px';

    if (isPlaying) {
        gameLoop = requestAnimationFrame(updatePhysics);
    }
}

function endGame() {
    isPlaying = false;
    cancelAnimationFrame(gameLoop);
    gameMessage.textContent = "Dommage ! Score final : " + score;
    gameMessage.style.color = "red";
    
    // Le jeu est fini, on réinitialise l'interface après exactement 2 secondes
    resetTimeout = setTimeout(() => {
        gameUi.style.display = 'none'; // Cache le score
        
        // Remet le ballon à sa place d'origine en bas à droite
        ball.style.left = '';
        ball.style.top = '';
        ball.style.bottom = '30px';
        ball.style.right = '30px';
        ball.style.transform = 'rotate(0deg)';
        
        velX = 0;
        velY = 0;
    }, 2000);
}

// On utilise 'mousedown' et 'touchstart' à la place de 'click' 
// pour une réaction instantanée, même quand le ballon tombe très vite !
ball.addEventListener('mousedown', startGame);
ball.addEventListener('touchstart', startGame, { passive: false });
