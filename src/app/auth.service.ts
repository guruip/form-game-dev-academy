import { Injectable } from '@angular/core';
import { ApiResponseItem } from './response.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginResponse: any;

  constructor() { }

  setTokens(token: string, refreshToken: string): void {
    document.cookie = token;
    document.cookie = refreshToken;
  }

  getAccessToken(): string | null {
    const tokenCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  setLoginResponse(response: ApiResponseItem): void {
    this.loginResponse = response;
  }

  getLoginResponse(): ApiResponseItem {
    return this.loginResponse;
  }
  
}
