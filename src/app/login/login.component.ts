import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ApiResponseItem } from '../response.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly LOGIN_API_URL: string = 'http://51.158.107.27:82/api/login';
  showPassword: boolean = false;
  form: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      rememberMe: [false]
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const loginData = {
        login: this.form.value.username,
        password: this.form.value.password
      };
      this.http.post<ApiResponseItem>(this.LOGIN_API_URL, loginData)
        .subscribe(response => {
           if (!response.hasError) {
            if (response.userInfo && response.tokens) {
              this.authService.setTokens(response.tokens.token, response.tokens.refreshToken);
              this.authService.setLoginResponse(response);
              this.authService.isAuthenticated();
              this.router.navigate(['/dashboard']);
            } else {
              alert('sdfsdfsdfs');
          }
      }});
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  ngOnInit(): void {
  }

}
