import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ApiResponseItem } from '../response.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertTooltipService } from '../alert-tooltip.service';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('alertTooltip') alertTooltip!: TooltipComponent;

  private readonly LOGIN_API_URL: string = 'http://51.158.107.27:82/api/login';
  public showPassword: boolean = false;
  public form: FormGroup;
  public rememberPassword: boolean = false;
  public password: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private alertTooltipService: AlertTooltipService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      rememberMe: [false]
    })
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const loginData: { login: string; password: string } = {
        login: this.form.value.username,
        password: this.form.value.password
      };
      if (this.rememberPassword) {
        console.log('Пароль сохранен:', this.password);
      };
      this.http.post<ApiResponseItem>(this.LOGIN_API_URL, loginData)
        .subscribe((response: ApiResponseItem) => {
            if (response.userInfo && response.tokens) {
              this.authService.setTokens(response.tokens.token, response.tokens.refreshToken);
              this.authService.setLoginResponse(response);
              this.router.navigate(['/dashboard']);
            }
          }, (errorResponse: HttpErrorResponse) => {
          this.showAlert('fail', errorResponse.error.errors[0]);
        });
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  public showAlert(type: string, text: string): void {
    this.alertTooltipService.addAlert(type, text);
  }

  ngOnInit(): void {
  }

}
