import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css'],
})
export class ReservarComponent implements OnInit {
  struct: NgbDateStruct;
  minDate: NgbDateStruct;
  allInSeconds: number;
  selectedDate = false;
  UserLogged$: Observable<string>;

  constructor(private calendar: NgbCalendar, private authenticationService: AuthenticationService) {
    this.selectToday();
  }

  ngOnInit() {
    this.UserLogged$ = this.authenticationService.UserLogged;
    this.minDate = this.calendar.getToday();
  }

  onReservation() {
    this.allInSeconds = new Date(this.struct.year, this.struct.month - 1, this.struct.day - 1).getTime();
    this.selectedDate = true;
  }

  back() {
    this.selectedDate = false;
  }

  selectToday() {
    this.struct = this.calendar.getToday();
  }

}
