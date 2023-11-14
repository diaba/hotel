import { BookingService } from './../booking/booking.service';
import { Component, OnInit } from '@angular/core';
import { Bookings } from '../booking/Booking';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../registration/user.service';
import { User } from '../registration/User';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent implements OnInit {
  bookings!: Bookings[];
  currentUser!: User;
  constructor(
    private BookingService: BookingService,
    private router: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    this.getBookings()}
  getBookings() {
    this.BookingService.getBookings().subscribe((bookings) => {
      this.bookings = bookings.filter((booking) => booking.userId === this.currentUser.id);
      console.log(this.bookings);
    });
  }
}
