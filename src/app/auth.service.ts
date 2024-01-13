import { Injectable } from '@angular/core';
import { ApiResponseItem } from './response.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginResponse: any;

  constructor() { }

  public setTokens(token: string, refreshToken: string): void {
    const myObject = { token, refreshToken };
    document.cookie = JSON.stringify(myObject);
  }

  public getAccessToken() {
    const storedObject = JSON.parse(document.cookie);
    return storedObject;
  }

  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  public setLoginResponse(response: ApiResponseItem): void {
    this.loginResponse = response;
  }

  public getLoginResponse(): ApiResponseItem {
    return this.loginResponse;
  }
  
}
