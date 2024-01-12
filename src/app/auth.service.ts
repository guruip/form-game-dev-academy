import { Injectable } from '@angular/core';
import { ApiResponseItem } from './response.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginResponse: any;

  constructor() { }

  setTokens(token: string, refreshToken: string): void {
    const myObject = { token, refreshToken };
    document.cookie = JSON.stringify(myObject);
  }

  getAccessToken() {
    const storedObject = JSON.parse(document.cookie);
    return storedObject;
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
