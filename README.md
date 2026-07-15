# Gbéto

Marketplace multi-vendeurs mobile-first pour le Bénin, la CEDEAO et la diaspora.

## Démarrage

1. Installer Node.js 22 et pnpm 10.
2. Copier `.env.example` vers `.env` et renseigner les secrets.
3. Lancer `docker compose up -d`, puis `pnpm install`.
4. Exécuter `pnpm --filter @gbeto/database db:generate` puis `pnpm dev`.

L’application web est disponible sur le port 3000 et l’API sur le port 4000.

## Parcours disponibles

- `/` : accueil et découverte
- `/catalogue` : catalogue filtrable et triable
- `/produit/panier-tresse-afi` : fiche produit dynamique
- `/panier` : panier, livraison et cadeau diaspora
- `/compte` : commandes et fidélité acheteur
- `/dashboard` : espace vendeur
- `/admin` : pilotage et conformité

Les pages utilisent des données de démonstration tant que l’API n’est pas connectée. Elles sont conçues pour permettre ce remplacement sans réécrire les interfaces.

## Principes de sécurité

- Les montants sont stockés en unités monétaires minimales, jamais en flottants.
- Les webhooks de paiement sont signés, horodatés et idempotents.
- Le point d’entrée de paiement échoue par défaut tant que la vérification cryptographique réelle n’est pas configurée.
- Les flux escrow et tontine sont bloqués tant que `ENABLE_REGULATED_FLOWS` n’est pas activé après validation conformité.
- Les journaux d’audit sont append-only et ne contiennent aucune donnée secrète.

Consulter `docs/GBETO-PRODUCT-ARCHITECTURE.md` pour le cadrage complet.
