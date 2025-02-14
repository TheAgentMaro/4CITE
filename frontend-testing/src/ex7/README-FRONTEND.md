# E2E Testing with Cypress - Shopping Flow

Ce projet démontre l'utilisation de Cypress pour tester un flux d'achat complet, de l'inscription jusqu'au paiement.

## Scénarios de Test

### 1. Flux d'achat complet
- Inscription d'un nouvel utilisateur
- Ajout de plusieurs produits au panier
- Vérification du panier
- Saisie des informations de paiement
- Confirmation de la commande

### 2. Validation des formulaires
- Validation du formulaire d'inscription
- Validation des champs de paiement
- Gestion des erreurs

## Exécution des Tests

1. Démarrer l'application :
```bash
npm start
```

2. Lancer Cypress :
```bash
npm run cypress:open
```

3. Sélectionner "shopping-flow.cy.js" dans l'interface Cypress