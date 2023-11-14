import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(private form: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.loginForm = this.form.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.pattern('\\d{10}')]],
      email: ['', [Validators.required, Validators.email]],
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
  register() {
    console.log(this.loginForm.value);

      this.userService.register(this.loginForm.value).subscribe(
        (user) => {
          console.log(user);
          this.successMessage = 'Registration success';
        },
        (err) => {
          this.errorMessage = 'Registration failed';
        }
      );
    }
  }

