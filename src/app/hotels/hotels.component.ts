import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hotel } from './Hotel';
import { HotelsService } from './hotels.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent implements OnInit {
  hotels!: Hotel[];
  @Output() hotelSelected = new EventEmitter();

  constructor(private hotelService: HotelsService, private router: Router) {}
  booking(hotel: Hotel): void {
    this.hotelSelected.emit(hotel);
    this.router.navigateByUrl('/booking/' + hotel.id);
  }
  ngOnInit() {
    this.getListHotel();
  }
  getListHotel() {
    this.hotelService.getHotels().subscribe((response) => {
      this.hotels = response;
    });
  }
}
