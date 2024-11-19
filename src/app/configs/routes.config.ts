export const APP_ROUTES_CONFIG = {
  Default: '/',
  Wildcard: '**',
  Blank: '',

  Landing: '',

  Auth: {
    Root: 'auth',
    Register: 'register',
    Verify: {
      Root: 'verify',
      Page: ':token',
    },
    Login: 'login',
    RemindPassword: 'remind-password',
    ResetPassword: {
      Root: 'reset-password',
      Page: ':token',
    },
  },

  Admin: {
    Root: 'admin',
    Cards: {
      Root: 'cards',
      CardTranslations: ':id/translations',
    },
    Characters: {
      Root: 'characters',
      CharacterTranslations: ':id/translations',
    },
    GameSessions: {
      Root: 'game-sessions',
      Players: ':id/players',
    }
  },
};
