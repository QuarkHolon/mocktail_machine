# Système de Préparation de Mocktails Node-Red/IoT Crouzet

Ce projet consiste en un système automatisé pour la préparation de mocktails. Il permet aux consommateurs de sélectionner des mocktails, vérifie la disponibilité des ingrédients, prépare les boissons, et gère les stocks. Le système inclut également des fonctionnalités pour la maintenance et la surveillance.

## Cas d'Utilisation

### 1. Préparation d'un Mocktail

**Scénario :**

1. **Sélection du Mocktail :**
   - Un consommateur utilise l'interface pour sélectionner un mocktail, par exemple, "Mojito Virgin".

2. **Vérification de la Disponibilité :**
   - Le système vérifie les ingrédients nécessaires pour le "Mojito Virgin" (Jus de citron vert, Sirop de menthe, Eau gazeuse) et leurs niveaux actuels.
   - Si tous les ingrédients sont disponibles et en quantité suffisante, le système confirme que le mocktail peut être préparé.

3. **Préparation du Mocktail :**
   - Le système envoie les commandes appropriées à la machine pour mélanger les ingrédients dans les bonnes proportions.
   - Le mocktail est servi au consommateur.

4. **Mise à Jour des Niveaux d'Ingrédients :**
   - Les niveaux des ingrédients utilisés sont mis à jour dans la base de données pour refléter la consommation.

### 2. Remplacement d'une Bouteille d'Ingrédient

**Scénario :**

1. **Notification de Niveau Bas :**
   - Le système envoie une alerte au technicien indiquant qu'une bouteille d'ingrédient (par exemple, "Jus de citron vert") est presque vide.

2. **Remplacement de la Bouteille :**
   - Le technicien retire la bouteille vide et la remplace par une nouvelle bouteille pleine.
   - Le technicien met à jour l'état de la bouteille dans le système, en définissant `is_active` sur `TRUE` et en réinitialisant `current_level` à `100%`.

3. **Mise à Jour du Système :**
   - Le système enregistre le changement et met à jour les recettes disponibles en conséquence.

### 3. Ajout d'un Nouvel Ingrédient

**Scénario :**

1. **Ajout d'un Nouvel Ingrédient :**
   - Un nouvel ingrédient, par exemple "Jus de pomme", est ajouté à la machine.
   - Le technicien entre les informations sur le nouvel ingrédient dans le système, y compris son emplacement et son niveau initial.

2. **Mise à Jour des Recettes :**
   - Le système met à jour la liste des recettes disponibles pour inclure celles qui utilisent le nouvel ingrédient.

3. **Disponibilité des Recettes :**
   - Les consommateurs peuvent maintenant sélectionner des recettes utilisant le "Jus de pomme" si tous les autres ingrédients nécessaires sont disponibles.

### 4. Surveillance de la Température

**Scénario :**

1. **Surveillance Continue :**
   - Le système surveille en continu la température de l'armoire réfrigérée.

2. **Alerte de Température :**
   - Si la température dépasse une certaine limite, le système envoie une alerte au technicien pour qu'il prenne des mesures correctives.

3. **Intervention du Technicien :**
   - Le technicien vérifie le système de réfrigération et prend les mesures nécessaires pour rétablir la température à un niveau acceptable.

### 5. Enregistrement des Événements de Consommation

**Scénario :**

1. **Commande d'un Mocktail :**
   - Un consommateur commande un mocktail spécifique.

2. **Enregistrement de l'Événement :**
   - Le système enregistre l'événement de consommation dans la base de données, incluant l'ID du mocktail et l'horodatage.

3. **Analyse des Données :**
   - Les données de consommation sont utilisées pour analyser les préférences des consommateurs et optimiser les niveaux de stock des ingrédients.

## Installation

Pour installer et exécuter ce projet, suivez les étapes suivantes :

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/votre-repo.git

2. Installer les dépendances :
   ```bash
   npm install

3. Initialisation (manuelle) des tables mysql dans le répertoire mysql

4. Initialisation du fichier nodered.env pour alimenter la configuration setttings.js de node-red

5. http://localhost:1880/admin pour démarrer


   
