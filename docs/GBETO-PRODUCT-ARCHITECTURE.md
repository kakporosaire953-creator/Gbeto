# Gbéto — Dossier produit et architecture

Version de référence : 1.0 — 15 juillet 2026

## 1. Décision exécutive

Gbéto est une marketplace multi-vendeurs mobile-first destinée d’abord au Bénin, puis à la CEDEAO et à la diaspora. La proposition de valeur est double : donner aux vendeurs locaux un accès simple à un marché formel et permettre aux acheteurs locaux ou à l’étranger de commander pour eux-mêmes ou pour leurs proches.

La plateforme complète reste la cible, mais le déploiement doit être progressif. Le paiement séquestré et la tontine sont des activités réglementées. Le code les place donc derrière un garde-fou de conformité : aucune collecte, conservation ou redistribution de fonds ne doit être activée avant validation juridique, KYC/AML, procédures opérationnelles, rapprochement comptable et audit indépendant.

Le modèle logistique recommandé au départ est un réseau de partenaires livreurs : Gbéto orchestre les missions, le suivi et la preuve de livraison, sans financer immédiatement une flotte. Une flotte hybride pourra être introduite dans les zones denses lorsque les volumes justifieront ses coûts fixes.

## 2. Objectifs et indicateurs

### Objectifs produit

1. Rendre l’achat local fiable, lisible et rapide sur un téléphone d’entrée de gamme.
2. Donner aux vendeurs un catalogue, une gestion de commandes et des paiements compréhensibles.
3. Créer de la confiance par la vérification, le paiement protégé, le suivi et les litiges traçables.
4. Rendre le mode diaspora aussi simple qu’un cadeau : le payeur et le bénéficiaire peuvent être différents.
5. Préparer l’expansion régionale sans dupliquer le code métier.

### North-star metric

Nombre mensuel de commandes livrées sans litige, avec un acheteur ou un bénéficiaire satisfait.

### Indicateurs de lancement

| Dimension | Indicateur | Cible pilote |
|---|---|---:|
| Activation | Acheteurs terminant une première commande | ≥ 25 % |
| Offre | Vendeurs vérifiés avec ≥ 5 produits actifs | ≥ 100 |
| Paiement | Taux de succès après tentative | ≥ 92 % |
| Livraison | Commandes livrées dans la fenêtre annoncée | ≥ 90 % |
| Qualité | Litiges par commande livrée | < 3 % |
| Fidélité | Acheteurs revenant sous 60 jours | ≥ 30 % |
| Performance | LCP p75 sur réseau mobile | < 2,5 s |

## 3. Utilisateurs et personas

### Awa — acheteuse locale

22 ans, Cotonou, téléphone Android d’entrée de gamme et forfait limité. Elle compare les prix, paie par Mobile Money et a besoin d’indications de livraison adaptées aux adresses informelles. Elle abandonne si la page est lourde ou si le coût final apparaît tard.

### Koffi — vendeur indépendant

34 ans, artisan à Ouidah. Il vend surtout via WhatsApp, maîtrise peu les outils de gestion et veut publier vite, éviter les faux acheteurs et savoir exactement ce qu’il recevra après commission.

### Mariam — acheteuse diaspora

39 ans, vit en France. Elle veut acheter en EUR pour sa famille au Bénin, choisir le bénéficiaire et obtenir une preuve de livraison sans imposer la gestion du paiement à ses proches.

### Serge — livreur partenaire

28 ans, travaille par zones. Il a besoin d’une liste de missions, d’itinéraires légers, de contacts masqués, d’un mode réseau instable et d’une preuve de remise simple.

### Clarisse — opératrice support et litiges

Elle traite les anomalies avec une vue chronologique de la commande, des paiements et des preuves. Chaque action sensible doit être justifiée et auditée.

### Administrateur conformité

Il vérifie vendeurs et documents, suit les alertes KYC/AML, fixe les plafonds et peut suspendre un compte. Il ne peut pas modifier seul le grand livre financier.

## 4. Parcours prioritaires

### Achat local

Découverte → recherche/filtre → fiche produit → panier multi-vendeurs → adresse et repère → devis de livraison → Mobile Money → confirmation → suivi → preuve de livraison → avis.

### Achat diaspora

Choix du pays et de la devise → catalogue disponible pour la zone du bénéficiaire → panier → coordonnées du bénéficiaire → paiement EUR/USD → contrôle de risque → livraison locale → confirmation au payeur et au bénéficiaire.

### Vente

Inscription téléphone → vérification d’identité et d’activité → création boutique → produit assisté → modération → commande → acceptation → préparation → remise au livreur → livraison → solde disponible → versement.

### Livraison

Mission proposée → acceptation → collecte avec code → géolocalisation échantillonnée → contact masqué → remise par OTP ou photo consentie → clôture.

### Litige

Ouverture dans le délai autorisé → gel du versement concerné → collecte des preuves → médiation → décision à double contrôle → remboursement ou libération → notification et journal d’audit.

## 5. Périmètre fonctionnel

### Commerce

- Catalogue multi-catégories avec politique de produits interdits.
- Boutiques, variantes, stocks, promotions, panier multi-vendeurs et commandes fractionnables.
- Recherche tolérante aux fautes, suggestions et filtres sobres.
- Avis uniquement après livraison, avec modération et droit de réponse.
- Fidélité en points non convertibles en espèces et parrainage antifraude.

### Confiance

- Vérification progressive des vendeurs selon risque et volume.
- Badges dont la signification et la date sont visibles.
- Centre de litiges, preuves, SLA et appels.
- Journal d’audit append-only pour les actions administratives.

### Paiement

- Mobile Money en XOF et paiements diaspora en EUR/USD selon moyens effectivement disponibles.
- Webhooks signés et idempotents ; le navigateur ne confirme jamais seul un paiement.
- Grand livre en partie double, rapprochement quotidien et montants en unités minimales.
- Escrow activable uniquement après validation réglementaire et contractuelle.

### Logistique

- Partenaires livreurs avec zones, capacité, score de qualité et créneaux.
- Attribution par zone, distance, capacité et historique d’échecs.
- Localisation limitée pendant une mission active ; rétention courte.
- Preuve de collecte et de livraison ; fonctionnement dégradé hors ligne.

### Collaboration et croissance

- WhatsApp pour notifications transactionnelles consenties, jamais comme source de vérité.
- Assistance vendeurs : qualité de fiche, catégorisation et traduction proposées, toujours révisables.
- Assistance acheteurs : recherche conversationnelle et comparaison, sans inventer les stocks ou garanties.
- Achat groupé avec seuil, date limite et remboursement automatique si le seuil échoue.
- Tontine numérique derrière garde-fou réglementaire, règles immuables après démarrage et consentement explicite.

## 6. Règles métier critiques

1. Un vendeur ne publie qu’après vérification minimale et acceptation de la politique catalogue.
2. Les produits réglementés ou interdits sont bloqués ; une liste locale versionnée est administrable.
3. Un prix est enregistré en unité minimale et avec sa devise ; aucune conversion n’altère le prix source.
4. Le taux de change et ses frais sont affichés puis figés pendant quinze minutes au checkout.
5. Une commande multi-vendeurs possède un paiement parent mais des montants dus séparés par vendeur.
6. Le stock est réservé pour une durée limitée ; il est relâché après échec ou expiration du paiement.
7. Une commande ne devient `PAID` qu’après webhook vérifié et rapproché.
8. Les commissions sont calculées sur des entiers avec une règle d’arrondi versionnée.
9. Le versement vendeur n’est libéré qu’après livraison et fin du délai de réclamation applicable.
10. Toute mutation financière exige une clé d’idempotence.
11. Les remboursements ne dépassent jamais le montant capturé moins les remboursements antérieurs.
12. L’accès admin suit le moindre privilège et les actions financières sensibles exigent quatre yeux.
13. Les coordonnées du bénéficiaire diaspora servent uniquement à la commande concernée.
14. Le consentement marketing est séparé du consentement transactionnel.
15. Les décisions assistées sont explicables et révocables par un opérateur humain.

## 7. Exigences non fonctionnelles

### Performance 3G

- Budget initial : JavaScript route publique ≤ 170 Ko compressés, image héro ≤ 180 Ko, police ≤ 90 Ko.
- Rendu serveur, streaming et cache CDN pour le catalogue public.
- Pagination par curseur, images AVIF/WebP responsives et chargement différé.
- Pas de carte interactive lourde avant action de l’utilisateur.
- Stratégie `stale-while-revalidate` pour les données non transactionnelles.

### Accessibilité

- Objectif WCAG 2.2 AA : navigation clavier, cible tactile ≥ 44 px, contraste et focus visibles.
- HTML sémantique, annonces d’état et erreurs associées aux champs.
- Réduction des animations selon préférence système.
- Les traductions locales sont relues par des locuteurs ; aucun texte critique n’est livré par traduction automatique seule.

### Fiabilité

- Disponibilité cible 99,9 % pour l’achat ; RPO 15 min et RTO 60 min.
- Réessais exponentiels avec dead-letter queue pour notifications et webhooks.
- Circuit breakers autour des services externes.
- Sauvegardes chiffrées avec test de restauration trimestriel.

## 8. Architecture

Le monorepo sépare `apps/web`, `apps/api`, `packages/database` et `packages/config`. Le web Next.js assure le rendu mobile et les interfaces. L’API NestJS porte les règles métier et expose une API versionnée. PostgreSQL est la source de vérité ; Redis sert au cache, aux verrous courts et aux files BullMQ. Socket.IO diffuse uniquement les événements temps réel non autoritatifs.

### Modules métier

| Module | Responsabilité |
|---|---|
| Identity | sessions, MFA admin, rôles, consentements |
| Merchant | KYC, boutiques, conformité catalogue |
| Catalog | produits, variantes, prix, médias, recherche |
| Checkout | panier, devis, stock, taux de change |
| Orders | cycle de vie, fractionnement, retours |
| Payments | intentions, webhooks, remboursements, rapprochement |
| Ledger | écritures immuables, soldes dérivés, escrow |
| Delivery | zones, attribution, tracking, preuves |
| Trust | avis, signalements, litiges, fraude |
| Growth | fidélité, parrainage, achats groupés |
| Tontine | groupes, contributions, tours, garde-fou conformité |
| Messaging | WhatsApp et notifications multicanales |
| Intelligence | recherche sémantique et assistants contrôlés |

### Événements clés

`PaymentSucceeded`, `OrderPaid`, `SellerAccepted`, `DeliveryAssigned`, `ParcelPickedUp`, `OrderDelivered`, `DisputeOpened`, `PayoutReleased`. Chaque consommateur persiste son état et son identifiant d’événement afin d’éviter les doubles traitements.

## 9. Données

Le schéma fourni couvre utilisateurs, adresses, boutiques, produits multilingues, commandes, paiements, grand livre, livraisons, litiges, tontines et audit. Les données personnelles sont minimisées et séparées des événements analytiques.

Principes : identifiants opaques, UTC en base, devise ISO 4217, montants `BigInt`, coordonnées décimales, snapshots de commande immuables et suppressions logiques lorsque la loi impose une conservation.

## 10. API

Préfixe : `/api/v1`. Authentification par cookie sécurisé côté web ; jetons courts pour clients autorisés. Pagination par curseur et erreurs au format Problem Details.

| Méthode | Route | Usage |
|---|---|---|
| GET | `/catalog` | Catalogue localisé et paginé |
| POST | `/checkout/quote` | Total, livraison, change et expiration |
| POST | `/orders` | Création idempotente d’une commande |
| GET | `/orders/:id` | Vue autorisée d’une commande |
| PATCH | `/orders/:id/state` | Transition contrôlée |
| POST | `/payments/intents` | Initialisation du paiement |
| POST | `/payments/webhooks/fedapay` | Confirmation signée |
| POST | `/deliveries/:id/assign` | Attribution partenaire |
| POST | `/deliveries/:id/events` | Événement géolocalisé |
| POST | `/disputes` | Ouverture et gel éventuel |
| POST | `/regulated/:flow` | Flux bloqué avant conformité |

## 11. Sécurité et protection des données

- Modèle de menace couvrant prise de compte, fraude vendeur, rejeu webhook, manipulation de prix, abus promo, IDOR, XSS/CSRF et exfiltration admin.
- Sessions rotatives, cookies `HttpOnly`, `Secure`, `SameSite=Lax`, MFA obligatoire pour les rôles sensibles.
- Validation stricte en entrée, contrôle d’autorisation au niveau ressource et en-têtes de sécurité.
- Secrets exclusivement dans le gestionnaire du déploiement ; rotation et séparation par environnement.
- Chiffrement en transit et au repos ; données KYC dans un périmètre à accès limité.
- Limitation de débit par identité et empreinte réseau, avec seuils renforcés pour connexion et paiement.
- Aucun numéro complet de Mobile Money ou document KYC dans les journaux.
- Analyse des dépendances, SAST, tests d’autorisation et pentest avant production.

### Rôles

| Action | Acheteur | Vendeur | Livreur | Support | Conformité | Admin |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Acheter et suivre ses commandes | ✓ | ✓ | — | lecture | lecture | lecture |
| Gérer sa boutique | — | ✓ | — | assistance | suspendre | ✓ |
| Mettre à jour une mission assignée | — | — | ✓ | lecture | — | ✓ |
| Résoudre un litige | — | réponse | preuve | ✓ | contrôle | ✓ |
| Vérifier KYC | — | soumettre | soumettre | — | ✓ | supervision |
| Modifier une règle financière | — | — | — | — | proposer | double validation |

## 12. Internationalisation

Locales de lancement : français (`fr`), fon (`fon`), yoruba (`yo`), anglais (`en`) et lingala (`ln`). Le français est la langue de repli. Les textes système utilisent des catalogues versionnés ; titres et descriptions produits sont des objets localisés. Le fon et certaines variantes locales demandent une validation éditoriale dédiée et un plan de terminologie.

Devises : XOF comme devise comptable initiale ; EUR et USD pour l’affichage et le paiement diaspora lorsque le moyen de paiement le permet. Le checkout affiche devise de débit, devise de règlement, taux, frais et durée de validité. Le risque de change n’est jamais implicitement supporté par le vendeur.

## 13. Tests et qualité

### Pyramide

- Unitaires : calcul monétaire, transitions, permissions, commissions, seuils.
- Intégration : PostgreSQL/Redis, webhooks, idempotence, concurrence de stock.
- Contrat : adaptateurs paiement, WhatsApp, stockage et livraison.
- E2E : achat local, diaspora, vendeur, livraison, litige et remboursement.
- Non fonctionnels : Lighthouse sur profil mobile, accessibilité automatisée et manuelle, charge checkout, chaos ciblé.

### Critères de sortie

Zéro vulnérabilité critique, zéro violation d’autorisation connue, webhooks rejouables sans doublon, restauration testée, parcours clavier complet, budgets de performance tenus et procédure d’incident répétée.

## 14. Déploiement

Trois environnements isolés : développement, préproduction et production. Le web est livré sur une plateforme edge ; l’API, les workers, PostgreSQL et Redis sur une infrastructure régionale gérée. Les migrations suivent une stratégie expand/migrate/contract et ne bloquent pas les requêtes.

Pipeline : formatage → types → tests → build → analyse sécurité → déploiement préproduction → smoke tests → approbation production → déploiement progressif → surveillance → rollback automatique si les indicateurs se dégradent.

Observabilité : traces par commande, métriques paiement/livraison, logs structurés avec corrélation, alertes centrées utilisateur et analytique respectueuse du consentement.

## 15. Feuille de route

### Phase 0 — conformité et terrain, 3 à 5 semaines

Valider le modèle financier, les autorisations, les catégories interdites, les contrats livreurs, les taux et SLA. Tester les parcours avec 15 acheteurs, 10 vendeurs et 5 livreurs.

### Phase 1 — pilote Cotonou, 8 à 12 semaines

Identité, vérification vendeur, catalogue, panier, paiement XOF, commandes, partenaires livreurs, notifications, support et administration. EUR/USD en parcours diaspora contrôlé.

### Phase 2 — confiance et croissance, 6 à 8 semaines

Litiges complets, fidélité, parrainage, avis, recherche améliorée, achats groupés et assistants vendeurs/acheteurs.

### Phase 3 — finance réglementée, calendrier conditionnel

Escrow et tontine après audit juridique et technique, procédures KYC/AML, comptabilité, gestion de liquidité, plafonds, scénarios d’échec et pilote fermé.

### Phase 4 — expansion CEDEAO

Configuration pays, fiscalité, devises, moyens de paiement, langues, partenaires logistiques et règles catalogue par juridiction.

## 16. Risques et décisions contestées

| Risque | Position recommandée |
|---|---|
| Tout lancer simultanément | Conserver la cible complète, mais déployer par drapeaux et cohortes |
| Escrow interne | Exiger une opinion juridique écrite et un audit avant activation |
| Tontine au lancement | Limiter à un pilote fermé après conformité ; aucun fonds en mode démonstration |
| Toutes catégories légales | Ajouter une liste positive au pilote et une modération par risque |
| Cinq langues dès le jour un | Livrer le socle multilingue, puis publier uniquement les traductions humaines validées |
| Tracking permanent | Collecter uniquement durant la mission, à fréquence adaptative |
| Flotte propre immédiate | Démarrer partenaires, mesurer les zones avant d’internaliser |

## 17. Checklists de validation

### Produit

- [ ] Les hypothèses ont été testées avec chaque persona.
- [ ] Les coûts totaux apparaissent avant confirmation.
- [ ] Le bénéficiaire diaspora donne son consentement transactionnel.
- [ ] Les critères d’acceptation et indicateurs sont instrumentés.

### Technique

- [ ] Types, tests, builds et migrations passent en préproduction.
- [ ] Les événements sont idempotents et les files disposent d’une dead-letter queue.
- [ ] La restauration de sauvegarde a été chronométrée.
- [ ] Les modes réseau lent, interruption et reprise sont testés.

### Sécurité et conformité

- [ ] La matrice d’accès est testée, notamment les accès objet.
- [ ] Le webhook paiement rejette signature invalide, rejeu et horodatage expiré.
- [ ] KYC/AML, plafonds, conservation et signalement sont validés juridiquement.
- [ ] Escrow et tontine restent désactivés sans preuve d’autorisation.
- [ ] Un pentest indépendant ne présente aucune anomalie critique ouverte.

### Exploitation

- [ ] Les partenaires livreurs ont contrat, zones, SLA et procédure d’incident.
- [ ] Le support possède scripts, escalades et délais de résolution.
- [ ] Le rapprochement paiement/commande/grand livre fonctionne quotidiennement.
- [ ] Les alertes critiques ont un responsable et une procédure testée.

## 18. Améliorations proposées

Après le pilote, mesurer avant d’ajouter : recherche vocale pour faible littératie, mode USSD ou commande assistée, points relais, scoring de fiabilité explicable, regroupement écologique des livraisons et outils de financement vendeur. Aucun de ces ajouts ne doit précéder la fiabilité du paiement, du stock et de la livraison.

## 19. État du site livré

### Routes utilisateur

| Route | État | Contenu |
|---|---|---|
| `/` | Fonctionnelle | Accueil, recherche locale, sélection, diaspora, conversion d’affichage |
| `/catalogue` | Fonctionnelle | Filtres par catégorie, tri et cartes produits accessibles |
| `/produit/[slug]` | Fonctionnelle | Produit dynamique, variantes, livraison et ajout au panier |
| `/panier` | Fonctionnelle | Quantités, totaux, livraison offerte et option cadeau diaspora |
| `/compte` | Maquette interactive | Commandes, suivi, fidélité et raccourcis du compte |
| `/dashboard` | Maquette opérationnelle | Indicateurs vendeur, commandes et qualité boutique |
| `/admin` | Maquette opérationnelle | Risques, vérifications, santé, activité et conformité |

Le catalogue, le produit et le panier utilisent encore des données de démonstration locales afin de rendre le parcours consultable sans secrets ni services externes. Le branchement à l’API doit remplacer ces données par requêtes mises en cache et états d’erreur explicites.

### Intégrations

- Le contrat des adaptateurs paiement, messagerie et livraison est défini.
- Le webhook de paiement échoue volontairement tant que la vérification cryptographique réelle n’est pas branchée.
- Escrow et tontine restent bloqués par configuration.
- Les cinq catalogues linguistiques sont présents ; le fon porte un statut de relecture humaine obligatoire.

### Checklist du prochain incrément

- [ ] Brancher l’authentification et appliquer la matrice de permissions à chaque ressource.
- [ ] Connecter catalogue, panier et commandes à PostgreSQL via l’API.
- [ ] Implémenter puis tester l’adaptateur de paiement en environnement de test.
- [ ] Ajouter les tests E2E clavier/mobile pour le tunnel complet.
- [ ] Valider les textes fon, yoruba et lingala avec des locuteurs rémunérés.
- [ ] Activer l’observabilité sans données personnelles ni secrets.
