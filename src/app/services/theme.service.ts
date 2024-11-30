import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.setDarkTheme(true);
    }
  }

  toggleTheme(): void {
    this.isDarkTheme.next(!this.isDarkTheme.value);
    localStorage.setItem('theme', this.isDarkTheme.value ? 'dark' : 'light');
    this.updateThemeClass();
  }

  private setDarkTheme(isDark: boolean): void {
    this.isDarkTheme.next(isDark);
    this.updateThemeClass();
  }

  private updateThemeClass(): void {
    if (this.isDarkTheme.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}