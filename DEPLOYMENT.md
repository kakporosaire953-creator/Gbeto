# Guide de déploiement Vercel - Gbéto

## Architecture de déploiement

Le projet Gbéto utilise une architecture **découplée** :
- **Frontend (Next.js)** : Déployé sur Vercel
- **Backend (NestJS API)** : À déployer séparément (Railway, Render, AWS, etc.)
- **Base de données PostgreSQL** : Service géré externe requis
- **Redis** : Service géré externe requis

## 🚀 Déploiement du Frontend sur Vercel

### Option 1 : Déploiement via l'interface Vercel (recommandé)

1. **Connecter votre repository**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Add New Project"
   - Importez votre repository GitHub/GitLab/Bitbucket

2. **Configuration du projet**
   - **Framework Preset** : Next.js
   - **Root Directory** : `apps/web`
   - **Build Command** : `cd ../.. && pnpm turbo build --filter=@gbeto/web`
   - **Output Directory** : `.next`
   - **Install Command** : `cd ../.. && pnpm install`

3. **Variables d'environnement**
   Ajoutez ces variables dans les settings du projet :
   ```
   NEXT_PUBLIC_API_URL=https://votre-api-backend.com/api/v1
   ```

### Option 2 : Déploiement via CLI

```bash
# Installer Vercel CLI
pnpm add -g vercel

# Se connecter
vercel login

# Déployer depuis la racine du projet
vercel

# Ou déployer en production
vercel --prod
```

## 📋 Variables d'environnement à configurer

Dans le dashboard Vercel (Settings > Environment Variables) :

### Variables publiques (Next.js)
```
NEXT_PUBLIC_API_URL=https://votre-api-production.com/api/v1
```

### Variables privées (si nécessaire pour le build)
```
# Optionnel selon vos besoins
SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
```

## 🔧 Configuration spécifique monorepo

Le fichier `vercel.json` à la racine configure :
- Build command pour Turbo
- Installation avec pnpm
- Headers de sécurité
- Redirection API vers votre backend

## 🌐 Déploiement de l'API (Backend)

L'API NestJS **ne peut pas** être déployée sur Vercel car elle nécessite :
- Une connexion persistante à PostgreSQL
- Redis pour le cache et les files
- Un runtime Node.js long-running

### Options recommandées pour l'API :

#### 1. **Railway** (Recommandé - Simple)
```bash
# Installer Railway CLI
npm i -g @railway/cli

# Se connecter
railway login

# Initialiser depuis apps/api
cd apps/api
railway init

# Déployer
railway up
```

Variables d'environnement Railway :
```
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
PORT=4000
APP_URL=https://votre-frontend.vercel.app
AUTH_SECRET=...
FEDAPAY_SECRET_KEY=...
FEDAPAY_WEBHOOK_SECRET=...
WHATSAPP_ACCESS_TOKEN=...
CLOUDINARY_URL=...
ENABLE_REGULATED_FLOWS=false
```

#### 2. **Render**
- Créer un "Web Service"
- Build Command: `cd apps/api && pnpm build`
- Start Command: `cd apps/api && pnpm start`
- Ajouter PostgreSQL et Redis depuis le dashboard

#### 3. **AWS (ECS/Fargate)** ou **Azure Container Apps**
- Conteneuriser l'API avec Docker
- Déployer sur ECS Fargate ou Azure Container Apps
- Configurer les services gérés RDS (PostgreSQL) et ElastiCache (Redis)

#### 4. **DigitalOcean App Platform**
- Similar à Heroku, support natif des monorepos
- PostgreSQL et Redis gérés disponibles

## 🗄️ Base de données PostgreSQL

### Options recommandées :

1. **Neon** (Serverless, gratuit pour commencer)
   - https://neon.tech
   - Compatible Prisma
   - Branching pour les previews

2. **Supabase** (Gratuit tier généreux)
   - https://supabase.com
   - PostgreSQL géré + fonctionnalités supplémentaires

3. **Railway PostgreSQL**
   - Si vous déployez l'API sur Railway

4. **AWS RDS / Azure Database**
   - Pour la production à grande échelle

### Migration de la base de données

```bash
# Depuis packages/database
pnpm db:generate
pnpm db:migrate

# Ou directement avec Prisma
npx prisma migrate deploy
```

## 🔴 Redis

### Options recommandées :

1. **Upstash** (Serverless, edge-compatible)
   - https://upstash.com
   - Plan gratuit disponible

2. **Railway Redis**
   - Si vous utilisez Railway pour l'API

3. **AWS ElastiCache / Azure Cache**
   - Pour production

## 🔐 Sécurité et secrets

### Génération des secrets

```bash
# AUTH_SECRET (32+ caractères aléatoires)
openssl rand -base64 32
```

### Gestion des secrets
- **Jamais** commiter les fichiers `.env`
- Utiliser les variables d'environnement de chaque plateforme
- Séparer les environnements (dev, staging, production)

## 🚨 Points d'attention avant le déploiement

### ✅ Checklist de sécurité

- [ ] Tous les secrets sont dans les variables d'environnement
- [ ] `ENABLE_REGULATED_FLOWS=false` en production jusqu'à validation juridique
- [ ] CORS configuré avec `APP_URL` correct
- [ ] Webhooks de paiement avec vérification de signature activée
- [ ] HTTPS forcé partout
- [ ] Rate limiting activé sur l'API

### ✅ Checklist technique

- [ ] PostgreSQL accessible depuis l'API
- [ ] Redis accessible depuis l'API
- [ ] Variables d'environnement synchronisées entre frontend et backend
- [ ] Migrations de base de données exécutées
- [ ] Prisma client généré
- [ ] Tests passent en préproduction

### ✅ Checklist performance

- [ ] Images optimisées (AVIF/WebP)
- [ ] Budget JavaScript respecté (<170 Ko)
- [ ] CDN configuré pour les assets statiques
- [ ] Cache headers appropriés

## 🔄 Workflow de déploiement continu

1. **Preview deployments** (automatique)
   - Chaque PR crée un déploiement preview sur Vercel
   - URL unique pour tester

2. **Staging/Préproduction**
   - Branche `develop` → environnement staging
   - Tests de smoke automatiques

3. **Production**
   - Merge sur `main` → déploiement production
   - Avec approbation manuelle si nécessaire

### Configuration GitHub Actions (optionnel)

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main, develop]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm turbo build --filter=@gbeto/web
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 📊 Monitoring et observabilité

### Recommandations

1. **Vercel Analytics** (intégré)
   - Performance web vitals
   - Gratuit pour le frontend

2. **Sentry** (erreurs)
   - Tracking des erreurs frontend et backend
   - Configuration dans `.env`

3. **PostHog** (analytics)
   - Déjà prévu dans votre config
   - Respecte le RGPD/conformité

## 🌍 Déploiement multi-région

Pour l'expansion CEDEAO mentionnée dans l'architecture :

- Frontend : Vercel CDN automatique (global)
- API : Déployer des instances régionales
- Database : Read replicas dans les régions cibles

## 📞 Support et debugging

### Logs Vercel
```bash
vercel logs <deployment-url>
```

### Debugging build
```bash
# Tester le build localement
cd apps/web
pnpm build
```

## 🎯 Prochaines étapes après déploiement

1. Configurer le domaine personnalisé
2. Activer HTTPS automatique
3. Tester tous les parcours critiques
4. Configurer les alertes de monitoring
5. Documenter les procédures d'incident
6. Planifier les sauvegardes PostgreSQL

---

**Note importante** : Ce projet est conçu pour une architecture découplée. Le frontend Vercel communique avec l'API backend via HTTPS. Assurez-vous que l'API est déployée et accessible avant de mettre le frontend en production.
