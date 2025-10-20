import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  readonly user = signal<string | null>(null);

  login(name: string) {
    this.user.set(name);
  }

  logout() {
    this.user.set(null);
  }

  get isLoggedIn() {
    return this.user() !== null;
  }
}
