import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Reservation } from '../model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservesService {
  private baseurl = 'http://fenw.etsisi.upm.es:5555/reservations';

  constructor(private http: HttpClient) { }

  getAllReservationsByLogedUser() {
    return this.http.get<Reservation[]>(this.baseurl, {
      observe: 'response',
      headers: new HttpHeaders({'Authorization': sessionStorage.getItem('token')})
    });
  }

  getAllReservationsByAllUsersInDate(DateToIso: number) {
    return this.http.get<Reservation[]>(this.baseurl + '/' + DateToIso, {
      observe: 'response',
      headers: new HttpHeaders({'Authorization': sessionStorage.getItem('token')})
    });
  }

  registerReserve(courtId: number, rsvdatetime: number) {
    return this.http.post(this.baseurl, {courtid: courtId, rsvdatetime: rsvdatetime}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      }),
      observe: 'response'
    });
  }
  getReservasByFecha(rsvdateTime) {
    if (rsvdateTime) {
      return this.http.get(this.baseurl + '/reservations/' + rsvdateTime);
    }
  }
  getAllReservas() {
    return this.http.get<Reservation>(this.baseurl + '/reservations/listUserReservations');
  }

}
