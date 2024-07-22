[For english version of this readme.md see below after French version]

HOUB - Marketplace de freelances

HOUB est une plateforme de freelance complète construite avec Node.js et React, offrant des fonctionnalités pour permettre aux freelances et aux employeurs de se connecter et de collaborer sur des projets.

Fonctionnalités
Général

    Inscription et authentification des utilisateurs
    Tableau de bord administrateur
    Tableau de bord employeur
    Tableau de bord freelance
    Publication et gestion des offres d'emploi
    Recherche et filtrage des emplois et des freelances
    Système de messagerie pour la communication entre employeurs et freelances
    Système de notifications
    Support multilingue (anglais et français)
    Conversion de devises avec taux de change en temps réel

Fonctionnalités pour les Freelances

    Modifier le profil avec photo/avatar, description courte, description détaillée, formation, expérience, fourchette de taux journaliers, durée maximale et minimale des missions, type de travail (temps plein, temps partiel), lieu de travail (télétravail, sur site)
    Définir les informations de paiement (compte bancaire, portefeuille BTC, portefeuille XMR)
    Postuler aux offres d'emploi
    Gérer les candidatures et les commandes
    Consulter l'historique des offres d'emploi (proposées, en cours, terminées, annulées)
    Gestion des avis

Fonctionnalités pour les Employeurs

    Rechercher des freelances par catégorie, durée de mission, taux journalier, budget, type de travail (temps plein, temps partiel), lieu de travail (télétravail, sur site)
    Créer des offres d'emploi avec titre, description, catégorie, taux journalier maximum, durée, type de travail, lieu, horaires de travail
    Modifier le profil avec logo de l'entreprise, description, secteur, ville, région, pays
    Proposer des missions aux freelances
    Gérer les offres d'emploi et les candidatures
    Consulter l'historique des offres d'emploi (proposées, en cours, terminées, annulées)
    Engager des freelances

Fonctionnalités pour les Administrateurs

    Gérer les utilisateurs (freelances, employeurs)
    Modifier les catégories
    Paramètres de conversion de devises (clé API, devises)
    Gérer les langues
    Gérer les offres d'emploi et les candidatures
    Notifications et alertes système

Structure du Projet
Backend

    config/: Fichiers de configuration
    controllers/: Contrôleurs pour la gestion des requêtes
        authController.js: Authentification
        jobController.js: Gestion des offres d'emploi
        chatController.js: Gestion des discussions
        adminController.js: Fonctionnalités administratives
    middleware/: Middleware pour l'authentification
        auth.js: Authentification des utilisateurs
        adminAuth.js: Authentification des administrateurs
    models/: Modèles Mongoose
        User.js: Modèle utilisateur
        Job.js: Modèle d'offre d'emploi
        Chat.js: Modèle de discussion
        Currency.js: Modèle de devise
    routes/: Routes Express
        auth.js: Routes d'authentification
        jobs.js: Routes des offres d'emploi
        chats.js: Routes des discussions
        admin.js: Routes d'administration
    server.js: Fichier principal du serveur
    package.json: Dépendances et scripts backend

Frontend

    public/: Ressources publiques
    src/: Fichiers sources
        components/: Composants React
            auth/: Composants d'authentification
                Login.js: Composant de connexion
                Register.js: Composant d'inscription
            chat/: Composants de discussion
                Chat.js: Composant de discussion
            dashboard/: Composants du tableau de bord
                Dashboard.js: Tableau de bord commun
                EmployerDashboard.js: Tableau de bord employeur
                FreelancerDashboard.js: Tableau de bord freelance
                AdminDashboard.js: Tableau de bord administrateur
            jobs/: Composants des offres d'emploi
                CreateJob.js: Composant de création d'offre d'emploi
                JobList.js: Composant de liste des offres d'emploi
                JobDetails.js: Composant de détails des offres d'emploi
            layout/: Composants de mise en page
                Navbar.js: Barre de navigation
            pages/: Pages statiques
                Home.js: Page d'accueil
            profile/: Composants de profil
                Profile.js: Composant de profil
            routing/: Composants de routage
                PrivateRoute.js: Composant de route privée
        i18n/: Fichiers de traduction
            en-US.json: Traduction anglaise
            fr-FR.json: Traduction française
        App.js: Composant principal de l'application
        App.css: Feuille de style principale
        index.js: Point d'entrée principal
    package.json: Dépendances et scripts frontend


English version :

HOUB - Freelance Marketplace

HOUB is a comprehensive freelance marketplace built with Node.js and React, providing features for freelancers and employers to connect and collaborate on projects.
Features
General

    User Registration and Authentication
    Admin Dashboard
    Employer Dashboard
    Freelancer Dashboard
    Job Posting and Management
    Search and Filter for Jobs and Freelancers
    Chat System for Employer and Freelancer Communication
    Notification System
    Multi-language Support (English and French)
    Currency Conversion with Real-Time Exchange Rates

Freelancer Features

    Edit Profile with Photo/Avatar, Short Description, Detailed Description, Education, Experience, Daily Rate Range, Maximum and Minimum Mission Duration, Work Type (Full-Time, Part-Time), Work Location (Remote, On-site)
    Set Payment Information (Bank Account, BTC Wallet, XMR Wallet)
    Apply for Jobs
    Manage Applications and Orders
    View Job History (Proposed, In Progress, Completed, Cancelled)
    Review Management

Employer Features

    Search for Freelancers by Category, Mission Duration, Daily Rate, Budget, Work Type (Full-Time, Part-Time), Work Location (Remote, On-site)
    Create Job Offers with Title, Description, Category, Max Daily Rate, Duration, Work Type, Location, Working Hours
    Edit Profile with Company Logo, Description, Sector, City, Region, Country
    Propose Jobs to Freelancers
    Manage Job Offers and Applications
    View Job History (Proposed, In Progress, Completed, Cancelled)
    Hire Freelancers

Admin Features

    Manage Users (Freelancers, Employers)
    Edit Categories
    Currency Conversion Settings (API Key, Currencies)
    Manage Languages
    Manage Jobs and Applications
    System Notifications and Alerts

Project Structure
Backend

    config/: Configuration files
    controllers/: Controllers for handling requests
        authController.js: Authentication
        jobController.js: Job management
        chatController.js: Chat management
        adminController.js: Admin functionalities
    middleware/: Middleware for authentication
        auth.js: User authentication
        adminAuth.js: Admin authentication
    models/: Mongoose models
        User.js: User model
        Job.js: Job model
        Chat.js: Chat model
        Currency.js: Currency model
    routes/: Express routes
        auth.js: Authentication routes
        jobs.js: Job routes
        chats.js: Chat routes
        admin.js: Admin routes
    server.js: Main server file
    package.json: Backend dependencies and scripts

Frontend

    public/: Public assets
    src/: Source files
        components/: React components
            auth/: Authentication components
                Login.js: Login component
                Register.js: Registration component
            chat/: Chat components
                Chat.js: Chat component
            dashboard/: Dashboard components
                Dashboard.js: Common dashboard
                EmployerDashboard.js: Employer dashboard
                FreelancerDashboard.js: Freelancer dashboard
                AdminDashboard.js: Admin dashboard
            jobs/: Job components
                CreateJob.js: Create job component
                JobList.js: Job list component
                JobDetails.js: Job details component
            layout/: Layout components
                Navbar.js: Navigation bar
            pages/: Static pages
                Home.js: Home page
            profile/: Profile components
                Profile.js: Profile component
            routing/: Routing components
                PrivateRoute.js: Private route component
        i18n/: Internationalization files
            en-US.json: English translation
            fr-FR.json: French translation
        App.js: Main application component
        App.css: Main stylesheet
        index.js: Main entry point
    package.json: Frontend dependencies and scripts