import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
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
  IonInput,
  IonButtons,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  addCircleOutline, 
  trashOutline, 
  checkmarkCircle, 
  arrowUpCircle,
  gridOutline,
  checkmarkDoneCircleOutline,
  ellipseOutline
} from 'ionicons/icons';
import { TodoStore } from '@core/services/todo.store';
import { ConfigService } from '@core/services/config.service';
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
    IonButtons,
    ScrollingModule
  ]
})
export class TasksPage {
  private todoStore = inject(TodoStore);
  private modalCtrl = inject(ModalController);
  public configService = inject(ConfigService);
  
  filteredTasks = this.todoStore.filteredTasks;
  categories = this.todoStore.categories;
  selectedCategoryId = this.todoStore.selectedCategoryId;
  
  newTaskTitle = signal('');

  constructor() {
    addIcons({ 
      addCircleOutline, 
      trashOutline, 
      checkmarkCircle,
      arrowUpCircle,
      gridOutline,
      checkmarkDoneCircleOutline,
      ellipseOutline
    });
  }

  addTask() {
    const title = this.newTaskTitle().trim();
    if (title) {
      this.todoStore.addTask(title, this.selectedCategoryId() ?? undefined);
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

  getCategoryName(categoryId?: string): string {
    if (!categoryId) return '';
    const category = this.categories().find(c => c.id === categoryId);
    return category?.name || '';
  }

  getPendingCount(): number {
    return this.filteredTasks().filter(t => !t.completed).length;
  }

  setCategoryFilter(categoryId: string | null) {
    this.todoStore.selectedCategoryId.set(categoryId);
  }

  async openCategoryManager() {
    const modal = await this.modalCtrl.create({
      component: CategoryManagerComponent,
      breakpoints: [0, 0.5, 0.85],
      initialBreakpoint: 0.5,
      handle: true,
    });
    await modal.present();
  }
}
