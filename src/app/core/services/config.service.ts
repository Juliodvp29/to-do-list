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
      this.remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour
      
      // Fetches and activates the config from Firebase
      await fetchAndActivate(this.remoteConfig);
      
      // Update values
      this.updateValues();
    } catch (error) {
      console.error('Error fetching remote config', error);
    }
  }

  private updateValues() {
    const val = getValue(this.remoteConfig, 'show_pending_count');
    this.showPendingCount.set(val.asBoolean());
  }
}
