import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { TipoEspectador } from '../../utils/tipo-espectador.String';
import { Descuentos } from '../../utils/descuentos';

@Component({
  selector: 'app-punto5form',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './punto5form.component.html',
  styleUrl: './punto5form.component.css'
})
export class Punto5formComponent {
  private ticketService: TicketService = inject(TicketService)
  private router: Router = inject(Router)

  mostrarLabel: boolean = false
  mostrarSmall: boolean = true

  precioCobrado: number = 0

  newTicketForm = new FormGroup({
    dni: new FormControl('',Validators.required),
    tipoEspectador: new FormControl('',Validators.required),
    fechaCobro: new FormControl('',Validators.required),
    precioReal: new FormControl('',Validators.required)
  })

  get dni() {
    return this.newTicketForm.get('dni')
  }
  get tipoEspectador() {
    return this.newTicketForm.get('tipoEspectador')
  }
  get fechaCobro(){
    return this.newTicketForm.get('fechaCobro')
  }
  get precioReal(){
    return this.newTicketForm.get('precioReal')
  }

  volver(): void{
    this.router.navigate(['/punto5'])
  }

  createTicket(): void{
    let tipoEspectador: TipoEspectador
    if(this.newTicketForm.get('tipoEspectador')?.value == 'local'){
      tipoEspectador = TipoEspectador.LOCAL
    } else  {
      tipoEspectador = TipoEspectador.EXTRANJERO
    }
    if(this.dni?.value && this.fechaCobro?.value && this.precioReal?.value){
      this.ticketService.addTicket(this.dni?.value,
        Number(this.precioReal?.value), tipoEspectador,
        new Date(this.fechaCobro?.value), this.precioCobrado)
        this.ticketService.saveTickets()
      this.router.navigate(['/punto5'])
    }
    
  }

  calcularDescuento(): void {
    const select = (document.getElementById('espectador') as HTMLInputElement)?.value;
    const precio = (document.getElementById('precio') as HTMLInputElement)?.value;
    if(select == ''){
      this.mostrarSmall = true
    } else {
      this.mostrarSmall = false
    }
    if(precio == ''){
      this.precioCobrado = 0
    }
    if(select == 'local' && parseInt(precio) > 0){
      this.mostrarLabel = true
      this.precioCobrado = parseInt(precio) - parseInt(precio) * Descuentos.LOCAL
    } else {
      if(select == 'extranjero' && parseInt(precio) > 0){
        this.mostrarLabel = true
        this.precioCobrado = parseInt(precio)
      }
    }

  }

}
