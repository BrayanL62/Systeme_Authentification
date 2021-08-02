'use strict';

const btnInscription = document.querySelector('.btn-inscription');
const btnConnection = document.querySelector('.btn-connection');
const deco = document.querySelector('.btn-deco');

const formInscription = document.querySelector('.form-inscription');
const emailInscription = document.querySelector('.email-inscription');
const mdpInscription = document.querySelector('.mdp-inscription');

const formConnection = document.querySelector('.form-connection');

// Gérer l'apparition des différents formulaires connexion ou inscription lors du 'click' du btn

btnInscription.addEventListener('click', () => {
    // Si le formulaire de connexion est visible, on retire le formulaire
    if(formConnection.classList.contains('apparition')){
        formConnection.classList.remove('apparition');
    }
    // Puis on affiche le formulaire d'inscription
    formInscription.classList.toggle('apparition');
})

btnConnection.addEventListener('click', () => {
    // Si le formulaire d'inscription est visible, on retire le formulaire
    if(formInscription.classList.contains('apparition')){
        formInscription.classList.remove('apparition');
    }
    // Puis on affiche le formulaire de connexion
    formConnection.classList.toggle('apparition');
})

// Gérer la partie inscription du formulaire 

formInscription.addEventListener('submit', (e) => {
    e.preventDefault();
    const mailValeur = emailInscription.value;
    const mdpInscriptionValeur = mdpInscription.value;

    // Cette méthode permet, comme son nom l'indique, de créer un utilisateur
    // avec un email et un MDP, penser à bien activer l'inscription
    // via mail/mdp dans Firebase avant de faire un test
    auth.createUserWithEmailAndPassword(mailValeur, mdpInscriptionValeur)
    .then(cred => {
        console.log(cred);
        // Permet de reset les input
        formInscription.reset();
        // Permet de faire disparaître la fenêtre du formulaire d'inscription
        formInscription.classList.toggle('apparition');
    })
})

// Gérer la deconnexion de l'utilisateur

deco.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
    .then(() => {
        console.log("Déconnecté");
    })
})

// Gérer la connexion de l'utilisateur 

formConnection.addEventListener('submit', (e) => {
    e.preventDefault();

    const mailValeur = emailConnection.value;
    const mdpConnectionValeur = mdpConnection.value;

    auth.signInWithEmailAndPassword(mailValeur, mdpConnectionValeur)
    .then(cred => {
        console.log("Connexion!", cred.user);
        // Permet de reset les input
        formConnection.reset();
        // Permet de faire disparaître la fenêtre du formulaire d'Connection
        formConnection.classList.toggle('apparition');
    })
})

// Gérer le contenu afficher si l'utilisateur est connecté ou non
const h1 = document.querySelector('h1');
const info = document.querySelector('.info');

auth.onAuthStateChanged(utilisateur => {
    if(utilisateur){
        info.innerText = "Voici le contenu privé";
        h1.innerText = "Vous voilà de retour ! :)";
    } else {
        console.log("Utilisateur s'est déconnecté");
        info.innerText = "Contenu public";
        h1.innerText = "Bienvenue, inscrivez-vous ou connectez-vous";
    }
})