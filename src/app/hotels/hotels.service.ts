import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HotelsComponent } from './hotels.component';
import { Hotel } from './Hotel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  readonly url = 'http://localhost:3000/hotels';
  constructor(private http: HttpClient) {}

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.url);
  }
  getHotel(id:number): Observable<Hotel> {
    return this.http.get<Hotel>(this.url+'/'+id)
  }
}
