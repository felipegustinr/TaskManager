import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  is_ok = false;
  is_error = false;
  is_empty = false;

  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  registerUser() {
    console.log(this.user);
    if (
      this.user.name.length !== 0 &&
      this.user.email.length !== 0 &&
      this.user.password.length !== 0
    ) {
      this.userService.addUser(this.user).subscribe({
        next: (data => {
          this.is_ok = true;
          this.is_error = false;
          this.is_empty = false;
          console.log(data);
        }),
        error: (err => {
          this.is_ok = false;
          this.is_error = true;
          this.is_empty = true;
          console.error(err);
        })
      });
    } else {
      this.is_empty = true;
    }
  }
}
