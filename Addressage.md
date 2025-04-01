# 🍹 **Documentation Modbus - Machine à Mocktails (Crouzet EM4 + Node-RED)**  
*Par [Paul Le Bars] - Mis à jour le $(date +%d/%m/%Y)*  

---

## 📌 **1. Introduction**  
Ce document décrit l'adressage Modbus pour piloter :  
- 🧊 **Armoire réfrigérée** (compresseur + sonde de température)  
- 🧃 **4 pompes à ingrédients** (bouteilles liquides)  
- 🏗️ **Plateau mobile** (détection verre + positionnement)  

---

## 🔧 **2. Tableau des Adresses Modbus (Format standardisé)**  
*Basé sur le standard Modbus (décalage à 0 possible dans Node-RED)*  

### **2.1. Écritures (Coils et Registres)**  
| Fonction                | Type      | FC  | Address | Value/Values       | Exemple JSON                          |
|-------------------------|-----------|-----|---------|--------------------|---------------------------------------|
| **Compresseur**         | Coil      | 5   | 0       | 1=ON               | `{"unitid":1,"fc":5,"address":0,"value":1}` |
| **Pompe Bouteille 1**   | Coil      | 5   | 1       | 1=ON (200ms)       | `{"unitid":1,"fc":5,"address":1,"value":1}` |
| **Pompe Bouteille 2**   | Coil      | 5   | 2       | 1=ON (300ms)       | `{"unitid":1,"fc":5,"address":2,"value":1}` |
| **Pompe Bouteille 3**   | Coil      | 5   | 3       | 1=ON (150ms)       | `{"unitid":1,"fc":5,"address":3,"value":1}` |
| **Pompe Bouteille 4**   | Coil      | 5   | 4       | 1=ON (250ms)       | `{"unitid":1,"fc":5,"address":4,"value":1}` |
| **Température**         | Register  | 6   | 0       | 50=5.0°C           | `{"unitid":1,"fc":6,"address":0,"value":50}` |
| **Position Plateau**    | Register  | 6   | 9       | 50=50%             | `{"unitid":1,"fc":6,"address":9,"value":50}` |

### **2.2. Lectures (Entrées et Registres)**  
| Fonction                | Type      | FC  | Address | Count | Exemple JSON                          |
|-------------------------|-----------|-----|---------|-------|---------------------------------------|
| **Capteur Porte**       | Discrete  | 2   | 0       | 1     | `{"unitid":1,"fc":2,"address":0,"count":1}` |
| **Détection Verre**     | Discrete  | 2   | 9       | 1     | `{"unitid":1,"fc":2,"address":9,"count":1}` |
| **Température**         | Register  | 4   | 0       | 1     | `{"unitid":1,"fc":4,"address":0,"count":1}` |
| **Position Plateau**    | Register  | 4   | 9       | 1     | `{"unitid":1,"fc":4,"address":9,"count":1}` |

---

## 💻 **3. Exemples Node-RED**  
### **3.1. Activation Pompe + Température**  
```javascript
// Écriture séquentielle
[
    {
        "payload": {"unitid":1,"fc":6,"address":0,"value":50}  // 5.0°C
    },
    {
        "payload": {"unitid":1,"fc":5,"address":1,"value":1}   // Pompe 1 ON
    }
]
```

### **3.2. Activation Pompe + Température**  
```javascript
// Écriture séquentielle
[
    {
        "payload": {"unitid":1,"fc":6,"address":0,"value":50}  // 5.0°C
    },
    {
        "payload": {"unitid":1,"fc":5,"address":1,"value":1}   // Pompe 1 ON
    }
]
```

### **3.3. Activation du compresseur**  
```javascript
msg.payload = 1;  // ON
msg.address = 0;  // Coil 00001
msg.fc = 5;       // Function Code 5 (Write Single Coil)
return msg;
```

### **3.4. Lecture de la température**
```javascript
msg.address = 0;  // Input Register 30001
msg.fc = 4;       // Function Code 4 (Read Input Registers)
return msg;
// Conversion: temp = msg.payload / 10;
```

### **3.5. Lecture Groupe de capteurs**
```javascript
msg.payload = {
    "unitid": 1,
    "fc": 4,
    "address": 0,  // 30001
    "count": 3     // Lit temp + 2 registres
};
return msg;
```


  ## ⚠️ **Notes Techniques Avancées**

### **1. Adressage Modbus**
```diff
- Attention aux décalages d'adresse :
  - Certaines librairies (comme `node-red-contrib-modbus`) utilisent un offset à 0 :
    - `40001` → `address: 0` en Node-RED
    - `00001` → `address: 0` pour les coils
+ Solution : Vérifier la documentation de votre librairie Modbus.
```

```diff
# Bonnes pratiques d'adressage
+ Adresses coils (FC5)       : 00001 → address:0 (offset 0)
+ Adresses registres (FC6/16): 40001 → address:0 (offset 0)
+ Adresses entrées (FC2/4)   : 30001 → address:0 (offset 0)

! Attention : Certains drivers utilisent address:1 pour 40001
```


### **2. Gestion des erreurs**
```javascript
// Template de gestion d'erreur Node-RED
if (msg.error) {
    node.error("Erreur Modbus détectée", {
        payload: msg.payload,
        address: msg.address,
        details: msg.error.message
    });
    msg.payload = {
        status: "error",
        error_code: msg.error.code
    };
    return msg;
}
```


### **3. Tableau de Conversion des Valeurs**

| Donnée              | Calcul                   | Exemple          |
|---------------------|--------------------------|------------------|
| Température         | `valeur_écrite = °C × 10` | 5.5°C → 55       |
| Position plateau    | `valeur_écrite = (pourcentage × 65535) / 100` | 50% → 32767      |
| Temps dosage        | `1 unité = 1 ms`          | 200ms → 200      |

### **4. Optimisation des Communications**

| Paramètre          | Valeur Recommandée | Description                  | Impact |
|--------------------|--------------------|------------------------------|--------|
| Timeout            | 2000-3000 ms       | Délai max pour la réponse    | ▲ Fiabilité |
| Polling Interval   | 1000 ms            | Fréquence de lecture         | ▼ Charge réseau |
| Retry Attempts     | 3                  | Tentatives de reconnexion    | ▲ Robustesse |
| Buffer Size        | 512 bytes          | Taille du buffer TCP         | ▲ Débit |
| Parallel Requests  | 2-4                | Requêtes simultanées         | ▲ Performance |

**Légende :**  
▲ = Amélioration, ▼ = Réduction


### **4. Optimisation des Communications**
```javascript
# Paramètres recommandés (Node-RED)
{
    "timeout": 3000,       # Délai réponse (ms)
    "retryInterval": 5000, # Intervalle reconnexion
    "parallel": False      # Requêtes séquentielles
}

