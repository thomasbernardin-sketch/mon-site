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

// --- LE VRAI JEU DE JONGLE (MOTEUR PHYSIQUE RÉPARÉ) ---
const ball = document.getElementById('ball');
const gameUi = document.getElementById('game-ui');
const scoreDisplay = document.getElementById('score');
const gameMessage = document.getElementById('game-message');

let isPlaying = false;
let gameLoop;
let score = 0;

// Variables physiques
let posX, posY;
let velX = 0;
let velY = 0;
const gravity = 0.6;
const bounceLoss = 0.8; 
const ballSize = 60; // Taille du ballon

function startGame(e) {
    if (isPlaying) {
        // Clic pendant le jeu = on jongle !
        score++;
        scoreDisplay.textContent = score;
        
        // Impulsion vers le haut
        velY = -15;
        
        // Déviation à gauche ou à droite selon où on clique
        const clickOffset = (e.clientX - posX - (ballSize/2)) / ballSize;
        velX = -clickOffset * 20; 
        
        // Fait tourner le ballon visuellement
        ball.style.transform = `rotate(${Math.random() * 360}deg)`;
        return;
    }

    // --- PREMIER CLIC : LANCEMENT DU JEU ---
    isPlaying = true;
    score = 0;
    scoreDisplay.textContent = score;
    gameUi.style.display = 'block';
    gameMessage.textContent = "Clique pour jongler !";
    gameMessage.style.color = "var(--text-color)";

    // On détache le ballon de sa position CSS initiale (en bas à droite)
    // Pour le passer entièrement sous le contrôle du Javascript
    const rect = ball.getBoundingClientRect();
    posX = rect.left;
    posY = rect.top;
    
    ball.style.bottom = 'auto';
    ball.style.right = 'auto';

    // Première impulsion vers le haut et la gauche
    velY = -15;
    velX = -5;

    gameLoop = requestAnimationFrame(updatePhysics);
}

function updatePhysics() {
    if (!isPlaying) return;

    velY += gravity; // La gravité tire le ballon vers le bas
    posX += velX;
    posY += velY;

    // Limites de l'écran
    const maxX = window.innerWidth - ballSize;
    const maxY = window.innerHeight - ballSize;

    // Rebond sur les murs (gauche et droite)
    if (posX < 0) {
        posX = 0;
        velX = Math.abs(velX) * bounceLoss;
    } else if (posX > maxX) {
        posX = maxX;
        velX = -Math.abs(velX) * bounceLoss;
    }

    // Rebond au plafond (pour ne pas qu'il disparaisse en haut)
    if (posY < 0) {
        posY = 0;
        velY = Math.abs(velY) * bounceLoss;
    }

    // Si le ballon touche le sol = Game Over
    if (posY >= maxY) {
        posY = maxY;
        endGame();
    }

    // Mise à jour de la position du ballon à l'écran
    ball.style.left = posX + 'px';
    ball.style.top = posY + 'px';

    if (isPlaying) {
        gameLoop = requestAnimationFrame(updatePhysics);
    }
}

function endGame() {
    isPlaying = false;
    cancelAnimationFrame(gameLoop);
    gameMessage.textContent = "Dommage ! Score : " + score + " (Clique pour rejouer)";
    gameMessage.style.color = "red";
    
    // On remet les valeurs à zéro pour pouvoir recommencer proprement
    velX = 0;
    velY = 0;
}

// Détection du clic sur le ballon
ball.addEventListener('click', startGame);
