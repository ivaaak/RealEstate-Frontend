import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';
import microfrontendLayout from './microfrontend-layout.html';

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);

System.import('@real-estate/shared-ui').then(() => {
  System.import('@real-estate/shared-api').then(() => {
    layoutEngine.activate();
    start();
    // Import the shared UI
    // Import the shared API
    // Start the microfrontends
  });
});
