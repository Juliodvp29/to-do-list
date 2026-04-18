import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
import { AppComponent } from '@app/app.component';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from '@app/app.routes';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },  
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideRemoteConfig(() => getRemoteConfig()),
  ],
});
