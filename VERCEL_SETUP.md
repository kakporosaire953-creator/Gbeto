# Configuration Vercel pour Gbéto

## 🚀 Déploiement rapide

### Étape 1 : Importer le projet

1. Allez sur https://vercel.com/new
2. Importez le repository : `kakporosaire953-creator/Gbeto`
3. Vercel va détecter automatiquement Next.js

### Étape 2 : Configuration du projet

**Framework Preset** : Next.js (détecté automatiquement)

**Root Directory** : Laissez vide (configuration à la racine du monorepo)

Les commandes de build et d'installation sont déjà configurées dans `vercel.json` pour utiliser pnpm.

### Étape 3 : Variables d'environnement

Dans la section "Environment Variables", ajoutez :

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000/api/v1` | Development, Preview, Production |

**Note** : Vous devrez mettre à jour cette URL une fois que votre API sera déployée.

### Étape 4 : Déployer

Cliquez sur **"Deploy"**

## 🔄 Après le premier déploiement

### Mettre à jour l'URL de l'API

Une fois votre API déployée sur Railway/Render/autre :

1. Allez dans **Settings** > **Environment Variables**
2. Éditez `NEXT_PUBLIC_API_URL`
3. Changez la valeur pour : `https://votre-api-production.com/api/v1`
4. Redéployez le projet

## ⚙️ Configuration avancée (optionnel)

### Domaine personnalisé

1. **Settings** > **Domains**
2. Ajoutez votre domaine (ex: `gbeto.bj` ou `www.gbeto.com`)
3. Configurez vos DNS selon les instructions

### Variables d'environnement supplémentaires

Si vous utilisez des services optionnels :

```env
# Analytics (optionnel)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key

# Monitoring (optionnel)
SENTRY_DSN=your_sentry_dsn
```

## 🐛 Résolution de problèmes

### Erreur : "Command failed with exit code 1"

**Problème** : Le build échoue

**Solution** :
1. Vérifiez que le **Root Directory** est bien `apps/web`
2. Vérifiez la **Build Command** :
   ```bash
   cd ../.. && pnpm turbo build --filter=@gbeto/web
   ```

### Erreur : "Module not found"

**Problème** : Dépendances manquantes

**Solution** :
1. Vérifiez l'**Install Command** :
   ```bash
   cd ../.. && pnpm install
   ```

### Erreur : "Environment Variable references Secret"

**Problème** : Référence à un secret inexistant dans `vercel.json`

**Solution** : Ce problème a été corrigé. Assurez-vous d'avoir la dernière version du code.

## 📊 Configuration recommandée

### Environnements

Vercel crée automatiquement 3 environnements :

1. **Production** : Branche `main` → https://gbeto.vercel.app
2. **Preview** : Pull Requests → URLs uniques
3. **Development** : Variable pour tester localement

### Headers de sécurité

Les headers sont déjà configurés dans `vercel.json` :
- X-Content-Type-Options
- X-Frame-Options  
- Referrer-Policy
- Permissions-Policy
- Content-Security-Policy (dans `next.config.ts`)

## 🔗 Liens utiles

- Documentation Vercel : https://vercel.com/docs
- Dashboard : https://vercel.com/dashboard
- Logs de build : Accessible depuis chaque déploiement
- Analytics : https://vercel.com/analytics

## 🎯 Checklist de déploiement

- [ ] Repository importé dans Vercel
- [ ] Root directory configuré : `apps/web`
- [ ] Build command configurée
- [ ] Install command configurée
- [ ] Variable `NEXT_PUBLIC_API_URL` ajoutée
- [ ] Premier déploiement réussi
- [ ] URL de production fonctionnelle
- [ ] API déployée séparément
- [ ] Variable `NEXT_PUBLIC_API_URL` mise à jour avec l'URL de l'API
- [ ] Domaine personnalisé configuré (optionnel)

## 🚨 Important

Le frontend Next.js sera déployé sur Vercel, mais l'**API NestJS doit être déployée séparément** sur :
- Railway (recommandé)
- Render
- AWS/Azure
- Autre plateforme supportant Node.js avec PostgreSQL et Redis

Consultez `DEPLOYMENT.md` pour les instructions complètes de déploiement de l'API.
