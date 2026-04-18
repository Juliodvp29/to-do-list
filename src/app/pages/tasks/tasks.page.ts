import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonButton, 
  IonIcon, 
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonFab,
  IonFabButton,
  IonInput,
  IonButtons,
  IonBadge,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trashOutline, checkmarkCircle, radioButtonOffOutline, checkmarkCircleOutline, folderOpenOutline } from 'ionicons/icons';
import { TodoStore } from '@core/services/todo.store';
import { CategoryManagerComponent } from '../../features/categories/category-manager/category-manager.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonList, 
    IonItem, 
    IonButton, 
    IonIcon, 
    IonLabel,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonInput,
  ]
})
export class TasksPage {
  private todoStore = inject(TodoStore);
  private modalCtrl = inject(ModalController);
  
  tasks = this.todoStore.tasks;
  filteredTasks = this.todoStore.filteredTasks;
  categories = this.todoStore.categories;
  selectedCategoryId = this.todoStore.selectedCategoryId;
  
  newTaskTitle = signal('');
  newTaskCategoryId = signal<string | undefined>(undefined);

  constructor() {
    addIcons({ 
      add, 
      trashOutline, 
      checkmarkCircle, 
      radioButtonOffOutline, 
      checkmarkCircleOutline,
      folderOpenOutline
    });
  }

  addTask() {
    const title = this.newTaskTitle().trim();
    if (title) {
      this.todoStore.addTask(title, this.newTaskCategoryId() || this.selectedCategoryId() || undefined);
      this.newTaskTitle.set('');
    }
  }

  toggleTask(taskId: string) {
    this.todoStore.toggleTask(taskId);
  }

  deleteTask(taskId: string) {
    this.todoStore.deleteTask(taskId);
  }

  getCategoryColor(categoryId?: string): string {
    if (!categoryId) return '#8e8e93';
    const category = this.categories().find(c => c.id === categoryId);
    return category?.color || '#8e8e93';
  }

  setCategoryFilter(categoryId: string | null) {
    this.todoStore.selectedCategoryId.set(categoryId);
  }

  async openCategoryManager() {
    const modal = await this.modalCtrl.create({
      component: CategoryManagerComponent,
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modal.present();
  }
}
