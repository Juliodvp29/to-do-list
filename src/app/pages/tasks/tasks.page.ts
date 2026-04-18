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
  IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trashOutline, checkmarkCircle, radioButtonOffOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { TodoStore } from '@core/services/todo.store';

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
    IonFab,
    IonFabButton,
    IonInput,
    IonButtons,
    IonBadge
  ]
})
export class TasksPage {
  private todoStore = inject(TodoStore);
  
  tasks = this.todoStore.tasks;
  categories = this.todoStore.categories;
  
  newTaskTitle = signal('');

  constructor() {
    addIcons({ 
      add, 
      trashOutline, 
      checkmarkCircle, 
      radioButtonOffOutline, 
      checkmarkCircleOutline 
    });
  }

  addTask() {
    const title = this.newTaskTitle().trim();
    if (title) {
      this.todoStore.addTask(title);
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
}
