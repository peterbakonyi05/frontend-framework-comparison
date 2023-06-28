import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    // TODO: Experiment with this later on...
    // ngZone: 'noop',
  })
  .catch((err) => console.error(err));
