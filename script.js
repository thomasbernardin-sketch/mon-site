// --- MODE SOMBRE ---
const btnSombre = document.getElementById('btn-sombre');
btnSombre.addEventListener('click', () => {
    document.body.classList.toggle('mode-sombre');
    if(document.body.classList.contains('mode-sombre')) {
        btnSombre.innerHTML = '☀️ Mode Clair';
    } else {
        btnSombre.innerHTML = '🌙 Mode Sombre';
    }
});

// --- ANIMATIONS D'APPARITION AU SCROLL ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 }); // Se déclenche quand 10% de l'élément est visible

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// --- LE VRAI JEU DE JONGLE (MOTEUR PHYSIQUE) ---
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
const gravity = 0.5;
const bounceLoss = 0.7; // Perte d'énergie sur les murs
const ballSize = 45;

function startGame(e) {
    if (isPlaying) {
        // Clic pendant le jeu = on jongle !
        score++;
        scoreDisplay.textContent = score;
        
        // Impulsion vers le haut
        velY = -12;
        
        // Déviation aléatoire sur les côtés selon où on clique
        const clickOffset = (e.clientX - posX - (ballSize/2)) / ballSize;
        velX = -clickOffset * 15; 
        
        // Fait tourner le ballon
        ball.style.transform = `rotate(${Math.random() * 360}deg)`;
        return;
    }

    // Premier clic : Lancement du jeu
    isPlaying = true;
    score = 0;
    scoreDisplay.textContent = score;
    gameUi.style.display = 'block';
    gameMessage.textContent = "Clique pour jongler !";
    gameMessage.style.color = "var(--text-color)";

    // Position initiale (là où est le ballon)
    const rect = ball.getBoundingClientRect();
    posX = rect.left;
    posY = rect.top;

    // Première impulsion
    velY = -15;
    velX = (Math.random() - 0.5) * 10;

    // On détache le ballon de son CSS de base pour le contrôler en JS
    ball.style.right = 'auto';
    ball.style.bottom = 'auto';

    gameLoop = requestAnimationFrame(updatePhysics);
}

function updatePhysics() {
    if (!isPlaying) return;

    velY += gravity; // Applique la gravité
    posX += velX;
    posY += velY;

    const maxX = window.innerWidth - ballSize;
    const maxY = window.innerHeight - ballSize;

    // Rebond sur les murs gauche/droite
    if (posX < 0) {
        posX = 0;
        velX = Math.abs(velX) * bounceLoss;
    } else if (posX > maxX) {
        posX = maxX;
        velX = -Math.abs(velX) * bounceLoss;
    }

    // Game Over si ça touche le sol
    if (posY >= maxY) {
        posY = maxY;
        endGame();
    }

    // Applique les positions
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
}

ball.addEventListener('click', startGame);
