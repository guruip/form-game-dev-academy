import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setTokens(token: string, refreshToken: string): void {
    document.cookie = `token=${token}`;
    document.cookie = `refreshToken=${refreshToken}`;
  }

  getAccessToken(): string | null {
    const tokenCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
  
}
