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

// --- LE VRAI JEU DE JONGLE (VERSION BLINDÉE) ---
const ball = document.getElementById('ball');
const gameUi = document.getElementById('game-ui');
const scoreDisplay = document.getElementById('score');
const gameMessage = document.getElementById('game-message');

let isPlaying = false;
let gameLoop;
let score = 0;
let posX, posY;
let velX = 0, velY = 0;
const gravity = 0.8;
const bounceLoss = 0.9; 
const ballSize = 60; 
let resetTimeout;

// 'pointerdown' est plus fiable pour la souris et le tactile
ball.addEventListener('pointerdown', (e) => {
    e.preventDefault(); 

    if (isPlaying) {
        // --- JONGLAGE ---
        score++;
        scoreDisplay.textContent = score;
        
        // Rebond vers le haut
        velY = -16; 
        
        // Direction aléatoire gauche/droite
        velX = (Math.random() - 0.5) * 20; 
        
        // Fait tourner le ballon visuellement
        ball.style.transform = `rotate(${Math.random() * 360}deg)`;
    } else {
        // --- DÉMARRAGE ---
        isPlaying = true;
        score = 0;
        scoreDisplay.textContent = score;
        gameUi.style.display = 'block';
        gameMessage.textContent = "Continue de jongler !";
        gameMessage.style.color = "var(--text-color)";
        
        clearTimeout(resetTimeout);

        // On détache le ballon de son coin
        posX = window.innerWidth - 100;
        posY = window.innerHeight - 100;
        ball.style.bottom = 'auto';
        ball.style.right = 'auto';

        // Premier saut
        velY = -16;
        velX = -8; 

        cancelAnimationFrame(gameLoop);
        updatePhysics();
    }
});

function updatePhysics() {
    if (!isPlaying) return;

    velY += gravity; 
    posX += velX;
    posY += velY;

    const maxX = window.innerWidth - ballSize;
    const maxY = window.innerHeight - ballSize;

    // Rebonds sur les murs latéraux
    if (posX <= 0) {
        posX = 0;
        velX = Math.abs(velX) * bounceLoss;
    } else if (posX >= maxX) {
        posX = maxX;
        velX = -Math.abs(velX) * bounceLoss;
    }

    // Rebond au plafond
    if (posY <= 0) {
        posY = 0;
        velY = Math.abs(velY) * bounceLoss;
    }

    // GAME OVER : S'il touche le sol
    if (posY >= maxY) {
        posY = maxY;
        endGame();
    } else {
        // Applique la nouvelle position
        ball.style.left = posX + 'px';
        ball.style.top = posY + 'px';
        gameLoop = requestAnimationFrame(updatePhysics);
    }
}

function endGame() {
    isPlaying = false;
    gameMessage.textContent = "Dommage ! Score : " + score;
    gameMessage.style.color = "red";
    
    // Réinitialisation après 2 secondes
    resetTimeout = setTimeout(() => {
        gameUi.style.display = 'none'; 
        
        ball.style.left = '';
        ball.style.top = '';
        ball.style.bottom = '30px';
        ball.style.right = '30px';
        ball.style.transform = 'rotate(0deg)';
    }, 2000);
}
