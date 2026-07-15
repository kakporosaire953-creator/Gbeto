# Déploiement Vercel - Guide Simple

## 📋 Prérequis

Votre projet est un **monorepo Turbo** avec pnpm. Le frontend Next.js est dans `apps/web`.

## 🚀 Étapes de déploiement

### 1. Connectez votre repository à Vercel

1. Allez sur **https://vercel.com/new**
2. Sélectionnez votre repository : `kakporosaire953-creator/Gbeto`
3. Cliquez sur "Import"

### 2. Configuration du projet

Vercel va détecter Next.js automatiquement. Configurez :

#### Root Directory
- Cliquez sur **"Edit"** à côté de "Root Directory"
- Sélectionnez : **`apps/web`**
- ✅ Ceci indique à Vercel où se trouve votre application Next.js

#### Framework Preset
- **Next.js** (détecté automatiquement)

#### Build Settings
Vercel détectera automatiquement :
- **Install Command** : `pnpm install` (grâce au `packageManager` dans package.json)
- **Build Command** : `pnpm build`
- **Output Directory** : `.next`

⚠️ **Ne modifiez pas ces commandes** - laissez Vercel les détecter automatiquement.

### 3. Variables d'environnement

Ajoutez cette variable (cliquez sur "Add" dans la section Environment Variables) :

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000/api/v1` |

**Note** : C'est une valeur temporaire. Une fois votre API déployée, revenez modifier cette valeur.

### 4. Déployez

Cliquez sur **"Deploy"** et attendez.

## ✅ Ce qui va se passer

1. Vercel clone votre repository
2. Détecte que vous utilisez pnpm (grâce à `packageManager` dans package.json)
3. Installe les dépendances avec `pnpm install`
4. Build l'application web avec Turbo
5. Déploie sur le CDN global de Vercel

## 🔄 Mises à jour automatiques

Une fois configuré :
- Chaque push sur `main` → déploiement en production
- Chaque pull request → preview déployé automatiquement

## 🌐 Après le premier déploiement

### Mettre à jour l'URL de l'API

Une fois l'API déployée :

1. Dans Vercel, allez dans **Settings** → **Environment Variables**
2. Modifiez `NEXT_PUBLIC_API_URL` avec l'URL réelle de votre API
3. Exemple : `https://gbeto-api.railway.app/api/v1`
4. Redéployez (ou Vercel le fera automatiquement)

### Domaine personnalisé

1. **Settings** → **Domains**
2. Ajoutez votre domaine (ex: `www.gbeto.bj`)
3. Configurez les DNS selon les instructions

## 🐛 Dépannage

### Erreur : "No Next.js version detected"
**Solution** : Vérifiez que le Root Directory est bien `apps/web`

### Erreur : "workspace:* not supported"
**Solution** : Vercel doit détecter pnpm automatiquement. Vérifiez que `packageManager` est dans package.json

### Erreur de build
**Solution** : 
1. Vérifiez les logs de build dans Vercel
2. Testez localement : `cd apps/web && pnpm build`

## 📚 Architecture de déploiement

```
┌─────────────────────────────────────┐
│         Vercel (Frontend)           │
│    apps/web → Next.js App           │
│    URL: gbeto.vercel.app            │
└──────────────┬──────────────────────┘
               │ API Calls
               ↓
┌─────────────────────────────────────┐
│    Railway/Render (Backend)         │
│    apps/api → NestJS API            │
│    PostgreSQL + Redis               │
└─────────────────────────────────────┘
```

Le frontend et le backend sont déployés séparément et communiquent via HTTPS.

## 🎯 Checklist

- [ ] Repository importé dans Vercel
- [ ] Root Directory = `apps/web`
- [ ] Variable `NEXT_PUBLIC_API_URL` configurée
- [ ] Déploiement réussi
- [ ] Site accessible via l'URL Vercel
- [ ] API déployée séparément (voir DEPLOYMENT.md)
- [ ] Variable d'environnement mise à jour avec l'URL de l'API
- [ ] Tests fonctionnels du site

## 💡 Conseils

- Le premier déploiement prend 2-5 minutes
- Les déploiements suivants sont plus rapides grâce au cache
- Utilisez les Preview Deployments pour tester avant la production
- Surveillez les Web Vitals dans Vercel Analytics

---

**Besoin d'aide ?** Consultez la [documentation Vercel pour les monorepos](https://vercel.com/docs/monorepos)
