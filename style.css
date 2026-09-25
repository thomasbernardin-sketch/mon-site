/* Importation d'une police moderne depuis Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

body {
    font-family: 'Poppins', sans-serif;
    background-color: #f8fafc;
    color: #1e293b;
    margin: 0;
    padding: 0;
    transition: background-color 0.4s, color 0.4s;
}

/* --- ANIMATIONS D'APPARITION --- */
@keyframes apparition {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

.header {
    background: linear-gradient(135deg, #1e293b, #334155);
    color: white;
    padding: 60px 20px;
    text-align: center;
    position: relative;
    animation: apparition 0.8s ease-out;
}

.profile-container {
    max-width: 800px;
    margin: 0 auto;
}

.profile-img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    margin-bottom: 20px;
    transition: transform 0.3s ease;
}

.profile-img:hover {
    transform: scale(1.05); /* L'image grossit légèrement au survol */
}

h1 { margin: 0; font-size: 2.5em; letter-spacing: 1px; }
.subtitle { font-weight: 600; color: #94a3b8; font-size: 1.1em; margin-bottom: 20px; }
.bio { line-height: 1.6; font-weight: 300; }

/* Bouton Mode Sombre stylisé */
#btn-sombre {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

#btn-sombre:hover {
    background-color: white;
    color: #1e293b;
}

.main-content {
    max-width: 900px;
    margin: 50px auto;
    padding: 0 20px;
    /* Apparaît juste après le header */
    animation: apparition 1s ease-out 0.3s backwards;
}

h2 {
    border-bottom: 3px solid #3b82f6;
    display: inline-block;
    padding-bottom: 5px;
    margin-bottom: 25px;
}

/* Badges de compétences animés */
.skills-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.skills-list li {
    background-color: #e2e8f0;
    padding: 10px 20px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9em;
    transition: all 0.3s ease;
    cursor: default;
}

.skills-list li:hover {
    background-color: #3b82f6;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(59, 130, 246, 0.3);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

/* Cartes de projets interactives */
.project-card {
    background-color: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    border: 1px solid transparent;
}

.project-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    border-color: #3b82f6;
}

.footer {
    text-align: center;
    padding: 50px 20px;
    background-color: #1e293b;
    color: white;
}

.contact-btn {
    display: inline-block;
    margin-top: 15px;
    padding: 12px 30px;
    background-color: #3b82f6;
    color: white;
    text-decoration: none;
    border-radius: 30px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.contact-btn:hover {
    background-color: #2563eb;
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(37, 99, 235, 0.4);
}

/* --- MODE SOMBRE --- */
body.mode-sombre {
    background-color: #0f172a;
    color: #f8fafc;
}

body.mode-sombre .project-card {
    background-color: #1e293b;
    color: #f8fafc;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    border-color: #334155;
}

body.mode-sombre .skills-list li {
    background-color: #334155;
    color: #f8fafc;
}

body.mode-sombre .skills-list li:hover {
    background-color: #3b82f6;
}

/* --- ANIMATION DU BALLON DE FOOT --- */
.animation-foot {
    font-size: 40px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    animation: rebond 1.5s infinite ease-in-out;
}

@keyframes rebond {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-40px) rotate(180deg); }
}
