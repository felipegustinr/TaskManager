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
    // Check if email and password are not empty
    if (!this.email || !this.password) {
      this.loginError = 'Please enter an email and a password';
      return;
    }

    // Log in
    this.isLoggingIn = true;
    this.loginService.login(this.email, this.password).subscribe(
      response => {
        // Store the token in localStorage
        localStorage.setItem('token', response.token);

        // Redirect to the home page
        this.router.navigate(['/administration']);
      },
      error => {
        console.error('Login error:', error);
        this.isLoggingIn = false;
        this.loginError = 'Incorrect credentials. Please try again.';
      }
    );
  }
}
