# Modbus dans Node-RED : Coils, Holdings, Inputs, Discretes

Guide pour utiliser les différents types de registres Modbus dans Node-RED avec le protocole Modbus-TCP/RTU.
---
Source : [https://flowfuse.com/node-red/protocol/modbus/#sending-data-to-modbus-server

## 📌 Types de Registres Modbus

### 1. **Coils (0x)**
- **Type** : Lecture/Écriture (`Read-Write`)  
- **Adressage** : `0x` (ex: `0`, `1`, `2`...)  
- **Format** : 1 bit (`true/false`, `ON/OFF`)  
- **Usage** :  
  ```plaintext
  - Commander des relais
  - Activer/Désactiver des sorties numériques
  ```

### 2. Discrete Inputs (1x)
- **Type** : Lecture seule (Read-Only)
- **Adressage** : 1x (ex: 10001, 10002...)
- **Format** : 1 bit
- **Usage** :
  ```plaintext
  - Lire des capteurs binaires (boutons, fins de course)
  ```

### 3. **Holdings Registers (4x)**
- **Type** : Lecture/Écriture (`Read-Write`)  
- **Adressage** : `4x` (ex: 40001, 40002...)  
- **Format** : 16 bits (entier, flottant)  
- **Usage** :  
```plaintext
- Paramètres ajustables (ex: consigne de température)
- Envoyer des valeurs analogiques (ex: vitesse moteur)
```

### 4. Input Registers (3x)
- **Type** : Lecture seule (Read-Only)
- **Adressage** : 3x (ex: 30001, 30002...)
- **Format** : 16 bits
- **Usage** :
```plaintext
  - Lire des capteurs analogiques (température, pression)
```
 
## 📊 Tableau Comparatif Modbus

| Registre               | Type d'accès | Adressage | Taille  | Exemple d'utilisation                 |
|------------------------|--------------|-----------|---------|---------------------------------------|
| **Coils (0x)**         | Read-Write   | `0x`      | 1 bit   | Commandes de relais, LEDs             |
| **Discrete Inputs (1x)** | Read-Only  | `1x`      | 1 bit   | Boutons poussoirs, fins de course     |
| **Holding Registers (4x)** | Read-Write | `4x` | 16 bits | Paramètres utilisateur, consignes     |
| **Input Registers (3x)**  | Read-Only  | `3x` | 16 bits | Lectures de capteurs analogiques      |


## 🚦 Exemple Node-RED - Lecture Modbus

### Configuration d'un nœud Modbus Read
```json
[
  {
    "id": "modbus-read-holding",
    "type": "modbus-read",
    "z": "flow-123456",
    "name": "Lecture Holding Register",
    "topic": "",
    "showStatusActivities": true,
    "logIOActivities": true,
    "server": "config-modbus-server",
    "useIOFile": false,
    "ioFile": "",
    "useIOForPayload": false,
    "unitid": "1",
    "address": "40001",
    "quantity": "2",
    "fc": "3",
    "delayOnStart": false,
    "startDelayTime": "",
    "x": 400,
    "y": 200,
    "wires": [
      ["debug-output"]
    ]
  }
]
```

## 🔍 Explications des Paramètres Modbus

### 📌 Paramètres Clés du Nœud Modbus

```plaintext
address    : Adresse physique du registre (ex: 40001 pour Holding 4x)
quantity   : Nombre de registres/valeurs à lire/écrire
unitid     : Identifiant de l'esclave Modbus (1 par défaut)
fc         : "Function Code" (détermine le type de registre)
showStatus : Affiche l'état de la requête dans Node-RED
```

### 🛠️ Fonction Codes (FC) Modbus - Tableau Référence

| FC  | Nom Officiel                | Type de Registre       | Direction   | Taille  | Exemple d'Usage                 |
|-----|----------------------------|------------------------|-------------|---------|---------------------------------|
| `1` | Read Coils                 | Coils (0x)             | Lecture     | 1 bit   | État relais/sortie digitale     |
| `2` | Read Discrete Inputs       | Discrete Inputs (1x)   | Lecture     | 1 bit   | Lecture bouton/fin de course    |
| `3` | Read Holding Registers     | Holding Registers (4x) | Lecture     | 16 bits | Valeur paramètre utilisateur    |
| `4` | Read Input Registers       | Input Registers (3x)   | Lecture     | 16 bits | Température/pression analogique |
| `5` | Write Single Coil          | Coils (0x)             | Écriture    | 1 bit   | Activer/désactiver un relais    |
| `6` | Write Single Register      | Holding Registers (4x) | Écriture    | 16 bits | Modifier une consigne           |
| `15`| Write Multiple Coils       | Coils (0x)             | Écriture    | 1 bit   | Configurer plusieurs sorties    |
| `16`| Write Multiple Registers   | Holding Registers (4x) | Écriture    | 16 bits | Envoi de paramètres groupés    |

### Notes Techniques :
```plaintext
• FC 1-4 : Opérations de LECTURE seule
• FC 5-6 : Opérations d'ÉCRITURE unitaire
• FC 15-16 : Opérations d'ÉCRITURE multiple
• Taille : 1 bit = valeur binaire (0/1), 16 bits = entier/flottant
```
## 🔍 Exemples
### 🚰 MODBUS WRITE MULTIPLE HOLDINGS pour extraction de liquide par des pompes
```javascript
// 🚰 Commande de dosage précis pour 4 pompes
// Chaque pompe reçoit sa quantité en millilitres (0-65535 mL)

msg.payload = {
    value: [
        50,  // Pompe 1: 50 ml (adresse 40001)
        0,     // Pompe 2: OFF (adresse 40002)  
        10,  // Pompe 3: 10 ml (adresse 40003)
        40    // Pompe 4: 40 mL (adresse 40004)
    ],
    fc: 16,         // Function Code 16: Write Multiple Holdings
    unitid: 5,      // Identifiant de l'esclave
    address: 0,     // Offset 0 = Holding 40001
    quantity: 4     // Doit matcher le nombre de valeurs
};

// Métadonnées pour le système SCADA
msg.instructions = {
    timestamp: new Date().toISOString(),
    batch: "BATCH-2024-07-25",
    maxVolume: 65535  // Limite registre 16-bit
};

return msg;
```


### 📌 Lecture de la position du plateau (registre analogique)
```javascript
msg.payload = {
    fc: 4,           // Function Code 4: Read Input Registers
    unitid: 3,       // ID de l'esclave (ex: automate/PLC)
    address: 10,     // Offset 10 → Registre 30011
    quantity: 2      // Lit 2 registres (position + statut)
};

// Metadata pour le traitement
msg.sensorConfig = {
    scaleFactor: 0.1,    // 1 unité = 0.1mm
    maxPosition: 1000,   // 1000 = 100mm (course totale)
    safeZone: [200, 800] // Zone opérationnelle
};

return msg;

### 🌡️ Lecture de Température (Input Registers)
```javascript
// Configuration Modbus Read - Capteur de température
msg.payload = {
    fc: 4,           // Function Code 4: Read Input Registers
    unitid: 1,       // Adresse de l'esclave
    address: 20,     // Offset 20 → Registre 30021
    quantity: 2      // Lit 2 registres (valeur + statut)
};
return msg;
```


```javascript
// Exemple de traitement de la réponse
// Conversion des registres en float (IEEE 754)
const buffer = Buffer.alloc(4);
buffer.writeUInt16BE(msg.payload.buffer.readUInt16BE(0), 0); // Partie haute
buffer.writeUInt16BE(msg.payload.buffer.readUInt16BE(2), 2); // Partie basse

msg.temperature = {
    raw: msg.payload.buffer,
    celsius: buffer.readFloatBE(0).toFixed(1),
    status: msg.payload.buffer.readUInt16BE(4) // Registre supplémentaire
};

node.status({ fill: "green", text: `${msg.temperature.celsius}°C` });

```

### 🌡️✏️ Ecriture de consigne de Température (Holding Registers)
```javascript
// Configuration Modbus Write - Thermostat
const targetTemp = 23.5; // Consigne en °C

// Conversion float → 2 registres 16-bit
const buffer = Buffer.alloc(4);
buffer.writeFloatBE(targetTemp, 0);

msg.payload = {
    value: [buffer.readUInt16BE(0), buffer.readUInt16BE(2)], // Split 32-bit
    fc: 16,         // Function Code 16: Write Multiple Holdings
    unitid: 1,
    address: 50,    // Offset 50 → Registre 40051
    quantity: 2     // 2 registres pour un float
};
return msg;
```
### 📊 Comparatif Lecture/Écriture Température Modbus

| **Paramètre**       | **Lecture**               | **Écriture**              |
|---------------------|---------------------------|---------------------------|
| **Function Code**   | `4` (Read Input Registers)| `16` (Write Holdings)     |
| **Type Registre**   | `3x` (Input Registers)    | `4x` (Holding Registers)  |
| **Adressage**       | `30021` (offset 20)       | `40051` (offset 50)       |
| **Taille Donnée**   | 2 registres (32 bits)      | 2 registres (32 bits)     |
| **Format**          | IEEE 754 Float            | IEEE 754 Float            |
| **Exemple Valeur**  | `22.7`°C                  | `23.5`°C                  |
| **Payload Type**    | `buffer` (automatique)    | `array` de 2 entiers      |

### 🔍 Exemple de Données Brutes
| **Opération** | **Registre Haut** | **Registre Bas** | **Valeur Réelle** |
|---------------|-------------------|------------------|-------------------|
| Lecture       | `0x41B5`          | `0x999A`         | `22.7`°C          |
| Écriture      | `0x41BC`          | `0x0000`         | `23.5`°C          |

### ⚠️ Notes Techniques

```plaintext
1. Adressage en offset 0-based (ex: 30021 = address:20)
2. Float 32-bit nécessite TOUJOURS 2 registres
3. L'ordre des registres (endianness) doit matcher l'esclave
```

# 🔍 Différence entre FC6 et FC16 dans Modbus

## 📌 Fonction Code 6 (Write Single Holding Register)

```javascript
msg.payload = {
    fc: 6,           // Écriture UN SEUL registre
    address: 0,      // Offset 0 → Registre 40001
    unitid: 1,
    value: 1234      // Valeur 16-bit uniquement (0-65535)
};
```

**Caractéristiques** :

- Écrit **1 seul registre** (16 bits)
- Plage : `0x0000` à `0xFFFF` (entier non-signé)
- Exemple : Régler un seuil bas (`40001 = 1234`)
- Taille maximale : 1 valeur
- Débit réseau : Requête individuelle par valeur
- Cas typique : Mise à jour ponctuelle d'un paramètre



## 📌 Fonction Code 16 (Write Multiple Holding Registers)

```javascript
msg.payload = {
    fc: 16,          // Écriture MULTIPLE registres
    address: 10,     // Offset 10 → Registre 40011
    unitid: 1,
    value: [255, 256, 1024], // Tableau de valeurs
    quantity: 3      // Doit matcher value.length
};
```

**Caractéristiques** :
- Écrit **N registres** en une seule commande (1-123)
- Supporte les types complexes (floats, textes)
- Exemple : Envoyer une configuration complète
- Optimisation réseau : 1 requête pour multiples valeurs
- Cas typique : Initialisation système ou mise à jour groupée

## 📊 Tableau Comparatif Direct

| Critère               | FC6                          | FC16                         |
|-----------------------|------------------------------|------------------------------|
| **Nombre registres**  | 1                            | 1 à 123                      |
| **Format données**    | Entier 16-bit uniquement     | Multi-format (int16, float32, text) |
| **Efficacité réseau** | Faible (1 requête/valeur)    | Haute (1 requête multiple)    |
| **Usage typique**     | Mise à jour ponctuelle       | Configuration système complète |
| **Support float**     | Non                          | Oui (via 2 registres)         |
| **Exemple payload**   | `{"value":42}`               | `{"value":[3.14,25.0]}`       |
| **Overhead TCP**      | Élevé                        | Minimal                      |

### Notes techniques :
```plaintext
- FC6 : ID de fonction 0x06 (6)
- FC16 : ID de fonction 0x10 (16)
- Les deux opèrent sur les Holding Registers (4x)
```
