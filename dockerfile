# Utilisez une image NodeJS en tant que base pour construire l'image
FROM node:18

# Définir le répertoire de travail pour les commandes suivantes
WORKDIR /app

# Copiez les fichiers nécessaires pour construire l'image
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste de votre code source
COPY . .

# Définir la commande pour démarrer l'application
CMD ["npm", "start"]
