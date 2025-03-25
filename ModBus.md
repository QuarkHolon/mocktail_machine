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


