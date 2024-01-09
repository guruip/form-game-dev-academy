import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiResponseItem } from '../response.types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userData: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userData = this.authService.getLoginResponse();
    console.log(this.userData);
  }

}
