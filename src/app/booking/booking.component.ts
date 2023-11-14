import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookings } from './Booking';
import { BookingService } from './booking.service';
import { UserService } from '../registration/user.service';
import { User } from '../registration/User';
import { Hotel } from '../hotels/Hotel';
import { HotelsService } from '../hotels/hotels.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  param!: any;
  user!: User;
  successMessage!: string;
  bookingSize!: number;
  errorMessage!: string;
  hotel!: Hotel;
  scheduleForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private bookingsService: BookingService,
    private userService: UserService,
    private hotelService: HotelsService
  ) {}

  ngOnInit() {
    console.log('hotel', this.hotel);

    this.route.params.subscribe((params) => {
      this.param = params['bookingid'];
    });

    this.scheduleForm = this.formBuilder.group({
      startDate: ['', [Validators.required, dataValidator]],
      endDate: ['', Validators.required],
      noOfPersons: [
        '',
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
      noOfRooms: [
        '',
        [Validators.required, Validators.min(0), Validators.max(3)],
      ],
      TypeOfRoom: [''],
    });
    forkJoin(this.getBookingSize(), this.getUser(), this.getHotel()).subscribe(
      ([y, z, t]) => {
        this.bookingSize = y.length;
        this.user = z;
        this.hotel = t;
      }
    );
  }

  getParam() {
    return this.route.params; //subscribe((value) => (this.param = value['bookingid']));
  }
  getHotel() {
    return this.hotelService.getHotel(this.param);
    //.subscribe((value) => (this.hotel = value));
  }
  getBookingSize() {
    return this.bookingsService.getBookings();
    // subscribe((bookings) => {
    //   this.bookingSize = bookings.length;
    // });
  }
  getUser() {
    return this.userService.getCurrentUser(); //subscribe((x) => (this.user = x));
  }
  book() {
    // console.log(this.bookingSize);
    // let book = new Bookings();
    // book.bookingId = this.param;
    // book.userId = this.user.id;
    // console.log(book, 'book');
    // book.endDate = this.scheduleForm.get('endDate')?.value;
    // book.startDate = this.scheduleForm.get('startDate')?.value;
    // book.noOfPersons = this.scheduleForm.get('noOfPersons')?.value;
    // book.noOfRooms = this.scheduleForm.get('noOfRooms')?.value;
    // book.typeOfRoom = this.scheduleForm.get('typeOfRoom')?.value;
    // book.id = this.bookingSize + 1;
    // console.log(book);
    // book.hotelName = this.hotel.hotelName;
    // book.hotelId = this.hotel.id;
    // console.log(book, 'book ');
    // this.bookingsService.book(book).subscribe(
    //   (x) => (this.successMessage = 'Booking successfully added!'),
    //   (y) => (this.errorMessage = 'Failed to add booking. Try again later')
    // );
  }
}
function dataValidator(date: FormControl) {
  const today = new Date().getTime();
  return date.value.getTime() <= today
    ? { invalidDate: 'You cannot use future dates' }
    : null;
}
// function creatDateRangeValidator(): ValidatorFn {
//   return (form: FormGroup): ValidationErrors | null => {
//     const start: Date = form.get('startDate').value;

//     const end: Date = form.get('endDate').value;

//     if (start && end) {
//       const isRangeValid = end.getTime() - start.getTime() > 0;

//       return isRangeValid ? null : { dateRange: true };
//     }

//     return null;
//   };
// }
