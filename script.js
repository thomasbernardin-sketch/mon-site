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

// --- LE VRAI JEU DE JONGLE (MOUVEMENTS CORRIGÉS) ---
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
let resetTimeout;

function startGame(e) {
    e.preventDefault();

    if (isPlaying) {
        // En cours de jeu : On jongle
        score++;
        scoreDisplay.textContent = score;
        velY = -15; // Rebond vers le haut
        
        // CORRECTION : On génère une direction aléatoire (gauche ou droite)
        // à chaque frappe pour rendre le mouvement naturel et imprévisible.
        velX = (Math.random() - 0.5) * 25; 
        
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

    clearTimeout(resetTimeout);

    // Départ en bas à droite
    posX = window.innerWidth - 90;
    posY = window.innerHeight - 90;
    
    ball.style.bottom = 'auto';
    ball.style.right = 'auto';

    velY = -15; 
    // On le lance vers le milieu de l'écran pour commencer
    velX = -8;  

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
    
    resetTimeout = setTimeout(() => {
        gameUi.style.display = 'none'; 
        
        ball.style.left = '';
        ball.style.top = '';
        ball.style.bottom = '30px';
        ball.style.right = '30px';
        ball.style.transform = 'rotate(0deg)';
        
        velX = 0;
        velY = 0;
    }, 2000);
}

ball.addEventListener('mousedown', startGame);
ball.addEventListener('touchstart', startGame, { passive: false });
