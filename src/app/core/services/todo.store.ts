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
  selectedCategoryId = signal<string | null>(null);

  // Selectors (Read-only signals & Computed)
  readonly tasks = this.tasksSignal.asReadonly();
  readonly categories = this.categoriesSignal.asReadonly();
  readonly filteredTasks = computed(() => {
    const selected = this.selectedCategoryId();
    const allTasks = this.tasksSignal();
    if (!selected) return allTasks;
    return allTasks.filter(t => t.categoryId === selected);
  });

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

  // Category Actions
  addCategory(name: string, color: string, icon?: string) {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      color,
      icon
    };
    this.categoriesSignal.update(cats => [...cats, newCategory]);
  }

  updateCategory(id: string, updates: Partial<Category>) {
    this.categoriesSignal.update(cats =>
      cats.map(c => (c.id === id ? { ...c, ...updates } : c))
    );
  }

  deleteCategory(id: string) {
    this.categoriesSignal.update(cats => cats.filter(c => c.id !== id));
    // Remove category from existing tasks
    this.tasksSignal.update(tasks =>
      tasks.map(t => t.categoryId === id ? { ...t, categoryId: undefined } : t)
    );
    if (this.selectedCategoryId() === id) {
      this.selectedCategoryId.set(null);
    }
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
