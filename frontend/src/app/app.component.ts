import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLoggedIn: boolean = false;
  username: string = '';
  userId: string = '';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = this.loginService.getUsername();
      console.log('Username:', this.username)
     this.userId =this.loginService.getUserId()
      console.log('Userid:',this.userId)
      
    }
  }
  logout(): void {
    this.loginService.logout();
  }
}
