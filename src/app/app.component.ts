import { Component, OnInit } from '@angular/core';
import { User } from './registration/User';
import { UserService } from './registration/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'hotel';
  currentUser!: User;

  status!: Boolean;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((x) => (this.currentUser = x));
    this.userService.getMessage().subscribe((x) => (this.status = x));
  }
}
