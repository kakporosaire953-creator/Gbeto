# Création du repository GitHub

## Étapes à suivre :

1. **Aller sur GitHub** : https://github.com/new

2. **Configurer le repository** :
   - Repository name: `gbeto`
   - Description: `Marketplace multi-vendeurs mobile-first pour le Bénin, la CEDEAO et la diaspora`
   - Visibilité: **Public**
   - ⚠️ **NE PAS** cocher "Add a README file"
   - ⚠️ **NE PAS** ajouter .gitignore ou license

3. **Cliquer sur "Create repository"**

4. **Pousser le code** (déjà préparé localement) :
   ```bash
   git push -u origin main
   ```

## Ou via GitHub CLI (si installé) :

```bash
gh repo create gbeto --public --source=. --remote=origin --push
```

Le projet est déjà initialisé avec Git et tous les fichiers sont commités localement.
