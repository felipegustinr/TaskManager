import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isLoggingIn: boolean = false;
  loginError: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    if (!this.email || !this.password) {
      this.loginError = 'Please enter an email and a password';
      return;
    }

    // Log in
    this.isLoggingIn = true;
    this.loginService.login(this.email, this.password).subscribe(
      response => {
      
        localStorage.setItem('token', response.token);


        this.loginService.setUsername(response.usename)


        this.router.navigate(['/task']).then(() => {
          window.location.reload();
        });
      },
      error => {
        console.error('Login error:', error);
        this.isLoggingIn = false;
        this.loginError = 'Incorrect credentials. Please try again.';
      }
    );
  }
}
