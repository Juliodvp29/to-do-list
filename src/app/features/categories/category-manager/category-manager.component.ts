import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonButton,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonIcon,
  IonInput
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trashOutline } from 'ionicons/icons';
import { TodoStore } from '@core/services/todo.store';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButtons, 
    IonButton,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonIcon,
    IonInput
  ]
})
export class CategoryManagerComponent {
  private modalCtrl = inject(ModalController);
  private todoStore = inject(TodoStore);

  categories = this.todoStore.categories;

  newCategoryName = signal('');
  newCategoryColor = signal('#0071e3');

  constructor() {
    addIcons({ add, trashOutline });
  }

  addCategory() {
    const name = this.newCategoryName().trim();
    if (name) {
      this.todoStore.addCategory(name, this.newCategoryColor());
      this.newCategoryName.set('');
      this.newCategoryColor.set('#0071e3');
    }
  }

  deleteCategory(id: string) {
    this.todoStore.deleteCategory(id);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
