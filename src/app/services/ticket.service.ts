import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket';
import { TipoEspectador } from '../utils/tipo-espectador.String';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  tickets: Ticket[] = []

  addTicket(dni: String, precioReal: number, tipoEpectador: TipoEspectador,
    fechaCobro: Date, precioCobrado: number): void{
    if(!this.tickets.find(t => t._dni === dni)){
      this.tickets.push(new Ticket(dni,precioReal, tipoEpectador, fechaCobro, precioCobrado))
    }
  }

  getTicket(dni: String, date? : Date): Ticket | undefined{
    let ticket: Ticket | undefined
    if(date){
      ticket = this.tickets.find(t => t._dni === dni 
        && t._fechaCobro.toLocaleDateString() === date.toLocaleDateString())
    } else {
      ticket = this.tickets.find(t => t._dni === dni)
    }
    return ticket
  }

  /*updateTicket(ticket: Ticket): void{
    let aux: number;
    aux = this.tickets.findIndex(t => t.dni === ticket.dni)
    if(aux != -1){
      this.tickets[aux] = ticket
    }
  }*/

  deleteTicket(ticket: Ticket): void{
    this.tickets.splice(this.tickets.indexOf(ticket), 1)
  }
  
  getTickets(): Ticket[]{
    return this.tickets
  }

  setTickets(): void{
    this.tickets = JSON.parse(sessionStorage.getItem('tickets') || '[]')
  }

  saveTickets(): void{
    sessionStorage.setItem('tickets', JSON.stringify(this.tickets))
  }
}
