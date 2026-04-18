import { Injectable, signal, computed, effect } from '@angular/core';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private readonly TASKS_KEY = 'todo_tasks';
  private readonly CATEGORIES_KEY = 'todo_categories';

  // State
  private tasksSignal = signal<Task[]>(this.loadTasks());
  private categoriesSignal = signal<Category[]>(this.loadCategories());

  // Selectors Read-only signals
  readonly tasks = this.tasksSignal.asReadonly();
  readonly categories = this.categoriesSignal.asReadonly();

  constructor() {
    // Persist changes to localStorage automatically
    effect(() => {
      localStorage.setItem(this.TASKS_KEY, JSON.stringify(this.tasksSignal()));
    });
    effect(() => {
      localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(this.categoriesSignal()));
    });
  }

  // Actions
  addTask(title: string, categoryId?: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      categoryId,
      createdAt: Date.now(),
    };
    this.tasksSignal.update((tasks) => [newTask, ...tasks]);
  }

  toggleTask(taskId: string) {
    this.tasksSignal.update((tasks) =>
      tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  }

  deleteTask(taskId: string) {
    this.tasksSignal.update((tasks) => tasks.filter((t) => t.id !== taskId));
  }

  updateTask(taskId: string, updates: Partial<Task>) {
    this.tasksSignal.update((tasks) =>
      tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
    );
  }

  setTasks(tasks: Task[]) {
    this.tasksSignal.set(tasks);
  }

  setCategories(categories: Category[]) {
    this.categoriesSignal.set(categories);
  }

  private loadTasks(): Task[] {
    try {
      const data = localStorage.getItem(this.TASKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private loadCategories(): Category[] {
    try {
      const data = localStorage.getItem(this.CATEGORIES_KEY);
      return data ? JSON.parse(data) : this.getDefaultCategories();
    } catch {
      return this.getDefaultCategories();
    }
  }

  private getDefaultCategories(): Category[] {
    return [
      { id: '1', name: 'Personal', color: '#0071e3' },
      { id: '2', name: 'Trabajo', color: '#1d1d1f' },
      { id: '3', name: 'Urgente', color: '#ff3b30' },
    ];
  }
}
