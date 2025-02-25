# TestHDM

Une application **Todo List** construite avec **React (Vite + MUI)** pour le frontend et **NestJS + Prisma** pour le backend, utilisant **MySQL** comme base de données.  
Elle permet de **créer**, **modifier**, **supprimer** et **rechercher** des tâches.

## 🚀 **Fonctionnalités principales**

- ✅ Création de tâches avec validation dynamique.  
- 📝 Édition de tâches (impossible si le nom n’a pas changé).  
- 🗑 Suppression de tâches.  
- 🔎 Recherche des tâches par **nom** (filtrage dynamique).  
- 🌐 Appels API entièrement fonctionnels avec `fetch`.  
- 🏃 Rafraîchissement instantané de la liste après chaque action.

---

## 🎨 **Stack technique**

### 🔧 **Frontend** :
- ⚛ **React** (avec Vite)  
- 🎨 **Material-UI (MUI)** pour la conception des interfaces  
- ⚡ **Fetch API** pour les appels HTTP    
- 🌈 **Recherche dynamique** via requêtes GET

### 🔧 **Backend** :
- 🚀 **NestJS** (framework backend Node.js)  
- 💾 **Prisma** ORM pour l’interaction avec **MySQL**  
- 🌐 **API REST** avec endpoints pour CRUD complet + recherche  

### 🛢 **Base de données** :
- 🐬 **MySQL**  
- 🎛 Schéma Prisma avec la table `Task` :
  ```prisma
  model Task {
    id        Int      @id @default(autoincrement())
    name      String
    createdAt DateTime @default(now())
    updatedAt DateTime @default(now()) @updatedAt
  }
