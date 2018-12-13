import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReservesService } from '../../shared/services/reserves.service';
import { ToastErrorSettings } from '../../shared/model/configToastError.model';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from '../../shared/model/reservation.model';
import { PistaHoraModel } from '../../shared/model/pistahora.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent implements OnInit {
  @Input() allInSeconds: number;
  @Output() back: EventEmitter<null> = new EventEmitter();

  allReservations: Reservation[] = [];
  myReservations: Reservation[] = [];
  UserLogged$: Observable<string>;

  ReservesTable: PistaHoraModel = new PistaHoraModel(['', 'Pista', 'Fecha', 'Hora'], []);
  pista1: PistaHoraModel = new PistaHoraModel(['', 'Hora'], []);
  pista2: PistaHoraModel = new PistaHoraModel(['', 'Hora'], []);
  pista3: PistaHoraModel = new PistaHoraModel(['', 'Hora'], []);
  pista4: PistaHoraModel = new PistaHoraModel(['', 'Hora'], []);

  formRes: FormGroup;
  pistas = ['1', '2', '3', '4'];
  horas = [];
  constructor(private resService: ReservesService,
              private toastr: ToastrService, private fb: FormBuilder, private autService: AuthenticationService) { }

  ngOnInit() {
    this.UserLogged$ = this.autService.UserLogged;
    this.formRes = new FormGroup({
      pista: new FormControl(),
      hora: new FormControl()
    });
    this.formRes = this.fb.group({
      pista: [this.pistas[0]],
      hora: [this.horas[0]]
    });
    this.getAllReservationsByLogedUser ();
    }

  getAllReservationsByLogedUser() {
    this.resService.getAllReservationsByLogedUser().subscribe(
      resp => {
        if (resp) {
          this.myReservations = [];
          resp.body.forEach((elem) => {
            this.myReservations.push(elem);
          });
        } else {
          this.toastr.error('Error de busqueda.', 'Error', ToastErrorSettings.TOAST_ERROR_SETINGS);
        }
      },
      error => {
        this.toastr.error('Error de busqueda.', 'Error', ToastErrorSettings.TOAST_ERROR_SETINGS);
      }
    );
  }

  getAllReservationsByAllUsersInDate() {
    this.resService.getAllReservationsByAllUsersInDate(this.allInSeconds).subscribe(
      resp => {
        if (resp) {
          this.allReservations = [];
          resp.body.forEach((elem) => {
            this.allReservations.push(elem);
          });
        } else {
          this.toastr.error('Error de busqueda.', 'Error', ToastErrorSettings.TOAST_ERROR_SETINGS);
        }
      },
      error => {
        this.toastr.error('Error de busqueda.', 'Error', ToastErrorSettings.TOAST_ERROR_SETINGS);
      }
    );
  }

  eligeHora(pista: string) {
    this.horas = [];
    for (let i = 10; i < 22; i++) {
      this.horas.push(i.toString() + ':00');
    }
    this.allReservations.forEach((reservation) => {
      if (reservation.courtId === Number(pista)) {
        this.horas.splice(this.horas.indexOf(reservation.timeres), 1);
      }
    });

    // Check is today.
    const today = new Date().setHours(0, 0, 0, 0);
    if (today === this.allInSeconds) {
      for (let i = new Date().getHours(); i > 9; i--) {
        this.horas.splice(this.horas.indexOf(i.toString() + ':00'), 1);
      }
    }

    this.formRes.controls['hora'].patchValue(this.horas[0]);
  }

volver() {
    this.back.emit();
  }

  eligePista(value) {
    this.eligeHora(value);
  }

  onReserve() {
    const date = new Date(this.allInSeconds);
    date.setHours(Number(this.formRes.value.hora.split(':')[0]));
    this.resService.registerReserve(Number(this.formRes.value.pista), date.getTime()).subscribe(
      resp => {
        if (resp) {
          if (resp.status === 201) {
            this.toastr.success('Reserva realizada.', 'Pista: ' + this.formRes.value.pista +
              ' | Hora: ' + this.formRes.value.hora, ToastErrorSettings.TOAST_ERROR_SETINGS);
            this.getAllReservationsByLogedUser();
            this.getAllReservationsByAllUsersInDate();
          }
        } else {
          this.toastr.error('Error al registrar usuario', 'Error', ToastErrorSettings.TOAST_ERROR_SETINGS);
        }
      },
      error => {
        if (error.status === 400) {
          this.toastr.error('Error en los datos enviados', 'Error', ToastErrorSettings.TOAST_ERROR_SETINGS);
        } else if (error.status === 409) {
          this.toastr.error('Máximo 4 reservas', 'Se ha superado el límite de reservas', ToastErrorSettings.TOAST_ERROR_SETINGS);
        } else if (error.status === 500) {
          this.toastr.error('Error, contacte con el administrador del sistema.', 'Error', ToastErrorSettings.TOAST_ERROR_SETINGS);
        }
      }
    );
  }

  EligeFecha() {
    const today = new Date(this.allInSeconds);
    let dd: string = today.getDate().toString();
    let mm = (today.getMonth() + 1).toString();
    const yyyy = today.getFullYear().toString();

    if (today.getDate() < 10) {
      dd = '0' + dd;
    }

    if ((today.getMonth() + 1) < 10) {
      mm = '0' + mm;
    }

    return (dd + '/' + mm + '/' + yyyy);
  }


}
