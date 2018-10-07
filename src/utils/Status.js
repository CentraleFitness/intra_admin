const Status = {
    GENERIC_OK: {
        code: "001",
        message_fr: "OK.",
        message_en: "OK."
    },
    REG_SUCCESS: {
        code: "101",
        message_fr: "Création du compte réussie.",
        message_en: "Registration successful."
    },
    REG_ERROR_EMAIL_TAKEN: {
        code: "301",
        message_fr: "Echec lors de la création du compte, l'adresse email est déja utilisée.",
        message_en: 'Registration failed, email already taken.'
    },
    REG_ERROR_EMAIL: {
        code: "302",
        message_fr: "Echec lors de la création du compte, l'adresse email ne correspond pas ou n'est pas bien formatée.",
        message_en: "Registration failed, bad email."
    },
    REG_ERROR_PASSWORD: {
        code: "303",
        message_fr: "Echec lors de la création du compte, le mot de passe ne correspond pas ou n'est pas bien formaté.",
        message_en: "Registration failed, bad password."
    },
    REG_ERROR_FIRSTNAME: {
        code: "304",
        message_fr: "Echec lors de la création du compte, le prénom ne correspond pas ou n'est pas bien formaté.",
        message_en: "Registration failed, bad firstname."
    },
    REG_ERROR_LASTNAME: {
        code: "305",
        message_fr: "Echec lors de la création du compte, le nom ne correspond pas ou n'est pas bien formaté.",
        message_en: "Registration failed, bad lastname."
    },
    AUTH_SUCCESS: {
        code: "201",
        message_fr: "Authentification réussie.",
        message_en: "Authentication successful."
    },
    AUTH_ERROR_TOKEN: {
        code: "202",
        message_fr: "Echec lors de l'authentification, mauvais token.",
        message_en: "Authentication failed, bad token."
    },
    AUTH_ERROR_CREDENTIALS: {
        code: "501",
        message_fr: "Echec lors de l'authentification, mauvais identifiants.",
        message_en: "Authentication failed, bad credentials."
    },
    MGR_ERROR_ERROR_FIRSTNAME: {
        code: "701",
        message_fr: "Prénom du gérant manquant.",
        message_en: "Manager's first name is missing."
    },
    MGR_ERROR_ERROR_LASTNAME: {
        code: "702",
        message_fr: "Nom du gérant manquant.",
        message_en: "Manager's last name is missing."
    },
    MGR_ERROR_ERROR_PHONE: {
        code: "703",
        message_fr: "Numéro de téléphone du gérant manquant.",
        message_en: "Manager's phone number is missing."
    },
    MGR_ERROR_NO_CENTER: {
        code: "704",
        message_fr: "Le gérant n'a aucune salle de sport associée.",
        message_en: "Manager do not have associated center."
    },
    CTR_REG_SUCCESS: {
        code: "801",
        message_fr: "OK.",
        message_en: "OK."
    },
    CTR_ERROR_ERROR_NAME: {
        code: "802",
        message_fr: "Nom de la salle de sport manquant.",
        message_en: "Center's name is missing."
    },
    CTR_ERROR_ERROR_DESCRIPTION: {
        code: "803",
        message_fr: "Description de la salle de sport manquante.",
        message_en: "Center's description is missing."
    },
    CTR_ERROR_ERROR_ADDRESS: {
        code: "804",
        message_fr: "Adresse de la salle de sport manquante.",
        message_en: "Center's address is missing."
    },
    CTR_ERROR_ERROR_ZIP_CODE: {
        code: "805",
        message_fr: "Code postal de la salle de sport manquant.",
        message_en: "Center's zip code is missing."
    },
    CTR_ERROR_ERROR_CITY: {
        code: "806",
        message_fr: "Ville de la salle de sport manquante.",
        message_en: "Center's city is missing."
    },
    CTR_ERROR_ALREADY_EXISTS: {
        code: "807",
        message_fr: "La salle de sport existe déja.",
        message_en: "Center already exists."
    },
    MISC_ERROR: {
        code: "401",
        message_fr: "Erreur de base de données.",
        message_en: "Database problem."
    },
    GENERAL_MISSING_PARAM: {
        code: "402",
        message_fr: "Paramètre(s) manquant(s).",
        message_en: "Missing parameter(s)."
    },
    MISC_RANDOM: {
        code: "666",
        message_fr: "Erreur inconnue.",
        message_en: "Random error."
    }
};

export default Status;