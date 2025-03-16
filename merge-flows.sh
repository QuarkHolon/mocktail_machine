#!/bin/bash

# Chemin du répertoire contenant les fichiers JSON
INPUT_DIR="$HOME/.node-red/flows"
OUTPUT_FILE="$HOME/.node-red/flows.json"

# Vérifier si le répertoire existe
if [ ! -d "$INPUT_DIR" ]; then
  echo "Le répertoire $INPUT_DIR n'existe pas."
  exit 1
fi

# Vérifier si les fichiers existent
FILES=("flows_mocktails.json" "flows_modbus.json" "flows_monitoring.json")
for FILE in "${FILES[@]}"; do
  if [ ! -f "$INPUT_DIR/$FILE" ]; then
    echo "Le fichier $FILE est manquant dans $INPUT_DIR."
    exit 1
  fi
done

# Vérifier que chaque fichier JSON est valide
for FILE in "${FILES[@]}"; do
  if ! jq empty "$INPUT_DIR/$FILE" > /dev/null 2>&1; then
    echo "Erreur : Le fichier $INPUT_DIR/$FILE n'est pas un JSON valide."
    echo "Détails de l'erreur :"
    jq empty "$INPUT_DIR/$FILE" 2>&1
    exit 1
  fi
done

# Concaténer les fichiers JSON
echo "[" > "$OUTPUT_FILE"  # Commencer le tableau JSON
for ((i=0; i<${#FILES[@]}; i++)); do
  FILE="${FILES[$i]}"
  echo "Traitement du fichier : $FILE"
  # Ajouter le contenu de chaque fichier (sans les crochets [])
  jq -c '.[]' "$INPUT_DIR/$FILE" >> "$OUTPUT_FILE"
  # Ajouter une virgule entre les objets (sauf après le dernier)
  if [ "$i" -lt "$((${#FILES[@]}-1))" ]; then
    echo "," >> "$OUTPUT_FILE"
  fi
done
echo "]" >> "$OUTPUT_FILE"  # Fermer le tableau JSON

# Vérifier si le fichier final est un JSON valide
if jq empty "$OUTPUT_FILE" > /dev/null 2>&1; then
  echo "Le fichier $OUTPUT_FILE a été créé avec succès et est un JSON valide."
else
  echo "Erreur : Le fichier $OUTPUT_FILE n'est pas un JSON valide."
  echo "Détails de l'erreur :"
  jq empty "$OUTPUT_FILE" 2>&1
  echo "Le fichier problématique est probablement le dernier traité : $FILE"
  exit 1
fi

