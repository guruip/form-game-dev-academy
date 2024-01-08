import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';


interface LoginResponse {
  hasError: boolean;
  errors: string[];
  total: number;
  data: {
    userInfo: {
      userId: number;
      userName: string;
      userAvatar: string;
      userRole: number;
    };
    tokens: {
      token: string;
      refreshToken: string;
    };
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  onSubmit(form: any): void {
    const loginData = {
      login: form.value.username,
      password: form.value.password
    };

    this.http.post<LoginResponse>('http://51.158.107.27:82/api/login', loginData)
      .subscribe(response => {
        if (!response.hasError) {
          this.authService.setTokens(response.data.tokens.token, response.data.tokens.refreshToken);
          this.router.navigate(['/dashboard']);
        } else {
          console.error(response.errors);
        }
      });
  }

  ngOnInit(): void {
  }

}
