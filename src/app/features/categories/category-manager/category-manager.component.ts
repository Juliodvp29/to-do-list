import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
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
import { addCircle, trashOutline, folderOpenOutline, pencilOutline } from 'ionicons/icons';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryManagerComponent {
  private modalCtrl = inject(ModalController);
  private todoStore = inject(TodoStore);

  categories = this.todoStore.categories;

  newCategoryName = signal('');
  newCategoryColor = signal('#0071e3');
  editingCategoryId = signal<string | null>(null);

  constructor() {
    addIcons({ addCircle, trashOutline, folderOpenOutline, pencilOutline });
  }

  addCategory() {
    const name = this.newCategoryName().trim();
    if (name) {
      if (this.editingCategoryId()) {
        this.todoStore.updateCategory(this.editingCategoryId()!, {
          name,
          color: this.newCategoryColor()
        });
        this.cancelEdit();
      } else {
        this.todoStore.addCategory(name, this.newCategoryColor());
        this.newCategoryName.set('');
        this.newCategoryColor.set('#0071e3');
      }
    }
  }

  startEdit(cat: any) {
    this.editingCategoryId.set(cat.id);
    this.newCategoryName.set(cat.name);
    this.newCategoryColor.set(cat.color);
  }

  cancelEdit() {
    this.editingCategoryId.set(null);
    this.newCategoryName.set('');
    this.newCategoryColor.set('#0071e3');
  }

  deleteCategory(id: string) {
    this.todoStore.deleteCategory(id);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
