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
    // Verificar que el email y la contraseña no estén vacíos
    if (!this.email || !this.password) {
      this.loginError = 'Por favor ingresa un email y una contraseña';
      return;
    }

    // Iniciar sesión
    this.isLoggingIn = true;
    this.loginService.login(this.email, this.password).subscribe(
      response => {
        // Almacenar el token en el localStorage
        localStorage.setItem('token', response.token);

        // Redirigir a la página de inicio
        this.router.navigate(['/administration']);
      },
      error => {
        console.error('Error de inicio de sesión:', error);
        this.isLoggingIn = false;
        this.loginError = 'Credenciales incorrectas. Por favor intenta de nuevo.';
      }
    );
  }
}
