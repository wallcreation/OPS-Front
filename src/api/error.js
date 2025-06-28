// errorMessages.js

export const errorMessages = {
  1000: "Données de connexion manquantes.",
  1001: "Identifiants invalides.",
  1002: "Compte désactivé ou supprimé.",
  1003: "Token expiré ou invalide.",
  1004: "Accès non autorisé.",

  2001: "L'opérateur existe déjà.",
  2002: "Le compte est déjà lié.",
  2003: "Nom d’équipe déjà utilisé.",
  2004: "Erreur de validation sur la pénalité.",
  2005: "Données statistiques invalides.",

  3001: "Opérateur déjà lié à une autre équipe.",
  3002: "Compte déjà attribué à un opérateur.",
  3003: "Impossible de lier l’équipe au compte.",
  3004: "L’opérateur n’existe pas.",
  3005: "Impossible de lier les stats à un opérateur.",

  4001: "Opérateur introuvable.",
  4002: "Le compte est encore lié.",
  4003: "Des opérateurs sont encore dans l’équipe.",
  4004: "Pénalité introuvable.",
  4005: "Statistique non trouvée ou protégée."
};

export function getErrorMessage(code) {
  return errorMessages[code] || "Une erreur inconnue est survenue.";
}
