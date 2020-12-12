import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider
  } from 'angularx-social-login';
  
  export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig([
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('991673514140-upg2h7o9rehrpjib85v61dcn2o6jovve.apps.googleusercontent.com')
      }
    ]);
  
    return config;
  }