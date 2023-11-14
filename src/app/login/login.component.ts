import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../registration/user.service';
import { User } from '../registration/User';
import { filter, find } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;
  user!: User;
  constructor(
    private form: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.setLoginStatus(true);
    //this.login();

    this.loginForm = this.form.group({
      userId: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
        ],
      ],
    });
  }
  login() {
    this.errorMessage = '';
    console.log(this.loginForm.value);
    this.userService
      .getUser(
        this.loginForm.get('userId')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe((user) => {
        if (user.id !== undefined) {
          this.userService.sendMessage(true);
          this.userService.setCurrentUser(user);
          this.router.navigateByUrl('/home');
        }
        this.errorMessage =
          'Username or password is incorrect. Please Try again!';
      });
  }
}
