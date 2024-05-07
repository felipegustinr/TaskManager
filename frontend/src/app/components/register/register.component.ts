import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private UserService: UserService) { }

  registerUser(event: Event): void {
    event.preventDefault();
    const fullName = (event.target as HTMLFormElement).elements.namedItem('fullName');
    const email = (event.target as HTMLFormElement).elements.namedItem('email');
    const password = (event.target as HTMLFormElement).elements.namedItem('password');

    const newUser = { fullName, email, password };
    this.UserService.addUser(newUser).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        // Aquí puedes agregar lógica adicional después de registrar al usuario
      },
      (error) => {
        console.error('Error registering user:', error);
        // Aquí puedes manejar errores si ocurren durante el registro
      }
    );
  }
}
