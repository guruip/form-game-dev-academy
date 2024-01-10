import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ApiResponseItem } from '../response.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly LOGIN_API_URL: string = 'http://51.158.107.27:82/api/login';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  onSubmit(form: any): void {
    const username = form.value.username;
    const password = form.value.password;

    if (username === 'morzac1@gmail.com' && password === 'sT6ohz') {
      const loginData = {
        login: username,
        password: password
      };

      this.http.post<ApiResponseItem>(this.LOGIN_API_URL, loginData)
        .subscribe(response => {
           if (!response.hasError) {
            if (response.userInfo && response.tokens) {
              this.authService.setTokens(response.tokens.token, response.tokens.refreshToken);

              this.authService.setLoginResponse(response);
              this.router.navigate(['/dashboard']);
                
            } else {
              // alert('sdfsdfsdfs');
          }
        }});
    } else {
       alert('sdfsdfsdfs');
    }
  } 

  ngOnInit(): void {
  }
}
