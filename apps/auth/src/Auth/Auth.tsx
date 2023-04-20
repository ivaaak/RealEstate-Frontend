import { useEffect } from 'react';
import Keycloak from 'keycloak-js';

export default function Auth() {
  useEffect(() => {
    const keycloakBaseUrl = localStorage.getItem('keycloakBaseUrl');
    const keycloakRealm = localStorage.getItem('keycloakRealm');
    const keycloakClient = localStorage.getItem('keycloakClient');

    const keycloakOptions = {
      url: keycloakBaseUrl,
      realm: keycloakRealm,
      clientId: keycloakClient,
    };

    const keycloak = Keycloak(keycloakOptions);

    keycloak
      .init({ onLoad: 'login-required' })
      .then(() => {
        localStorage.setItem('token', keycloak.token);
        keycloak
          .loadUserInfo()
          .then((value) => {
            localStorage.setItem('userInfo', JSON.stringify(value));
          });
    });

    keycloak.onTokenExpired = () => {
      keycloak
        .updateToken(60)
        .then(() => {
          localStorage.setItem('token', keycloak.token);
        });
    };
  }, []);

  return null;
}
