import { Component, OnInit } from '@angular/core';
import { UserService } from '../registration/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  logout() {
    this.userService.sendMessage(false);
  }

  constructor(private userService: UserService) {}

  ngOnInit() {}
}
