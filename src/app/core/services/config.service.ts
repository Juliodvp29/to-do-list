import { Injectable, inject, signal } from '@angular/core';
import { 
  RemoteConfig, 
  getValue, 
  fetchAndActivate 
} from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private remoteConfig = inject(RemoteConfig);

  // Flags as Signals
  showPendingCount = signal<boolean>(true); // Default value

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      // Configuration settings
      this.remoteConfig.settings.minimumFetchIntervalMillis = 0; 
      await fetchAndActivate(this.remoteConfig);
      this.updateValues();
    } catch (error) {
      console.error('Firebase Remote Config: Error al obtener la configuración', error);
    }
  }

  private updateValues() {
    const val = getValue(this.remoteConfig, 'show_pending_count');
    const boolVal = val.asBoolean();
    console.log(`Firebase Remote Config: show_pending_count = ${boolVal} (Origen: ${val.getSource()})`);
    this.showPendingCount.set(boolVal);
  }
}
