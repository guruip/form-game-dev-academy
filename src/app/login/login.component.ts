import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('alertTooltip') alertTooltip!: TooltipComponent;

  private readonly LOGIN_API_URL: string = 'http://51.158.107.27:82/api/login';
  showPassword: boolean = false;
  form: FormGroup;

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

  onSubmit(): void {
    if (this.form.valid) {
      const loginData: { login: string; password: string } = {
        login: this.form.value.username,
        password: this.form.value.password
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

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  showAlert(type: string, text: string) {
    this.alertTooltipService.addAlert(type, text);
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      // this.http.unsubscribe();
  }

}
