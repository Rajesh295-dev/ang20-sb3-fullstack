import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';

import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // ❌ provideServerRouting is removed in Angular 20
    // If you had custom routes for SSR, you now configure them differently
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
