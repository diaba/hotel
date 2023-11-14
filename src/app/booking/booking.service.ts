import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookings } from './Booking';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  readonly url = 'http://localhost:3000/bookings';
  constructor(private http: HttpClient) {}

  getBookings(): Observable<Bookings[]> {
    return this.http.get<Bookings[]>(this.url);
  }
  book(booking: Bookings): Observable<Bookings>{
    return this.http.post<Bookings>(this.url, booking);
  }
}
