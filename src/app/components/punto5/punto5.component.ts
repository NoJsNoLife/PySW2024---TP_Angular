import { Component, OnInit, inject } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TipoEspectador } from '../../utils/tipo-espectador.String';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-punto5',
  standalone: true,
  imports: [ CurrencyPipe, DatePipe, NgFor ],
  templateUrl: './punto5.component.html',
  styleUrl: './punto5.component.css'
})
export class Punto5Component implements OnInit{
  private ticketService: TicketService = inject(TicketService)
  private router: Router = inject(Router)
  tickets: Ticket[] = []

  ngOnInit(): void {
    this.ticketService.setTickets()
    this.tickets = this.ticketService.getTickets()
    /*for(let t of this.tickets){
      console.log(t, this.tickets.indexOf(t))
    }*/
  }

  mostrar(ticket: Ticket): void{
    console.log(ticket)
  }
  createTicket(): void{
    this.router.navigate(['punto5/new'])
  }
  
  updateTicket(ticket: Ticket): void{
    this.router.navigate(['punto5', ticket._dni])
  }

  deleteTicket(ticket: Ticket): void{
    this.ticketService.deleteTicket(ticket)
    this.ticketService.saveTickets()
    alert('Ticket Eliminado')
  }

  totalTicketsLocales(): number[]{
    let locales: Ticket[] = this.tickets.filter(t => t._tipoEspectador === TipoEspectador.LOCAL)
    let values: number[] = []
    if(locales.length != 0){
      values.push(locales.length)
      let total: number = 0
      for(let i=0; i<locales.length; i++){
        total += locales[i]._precioCobrado
      }
      values.push(total)
    } else {
      values.push(0,0)
    }
    return values
  }

  totalTicketsExtranjeros(): number[]{
    let extranjeros: Ticket[] = this.tickets.filter(t => t._tipoEspectador === TipoEspectador.EXTRANJERO)
    let values: number[] = []
    if(extranjeros.length != 0){
      values.push(extranjeros.length)
      let total: number = 0
      for(let i=0; i<extranjeros.length; i++){
        total += extranjeros[i]._precioCobrado
      }
      values.push(total)
    } else {
      values.push(0,0)
    }
    return values
  }

  totalTickets(): number[]{
    let values: number[] = []
    if(this.tickets.length != 0){
      values.push(this.tickets.length)
      let total: number = 0
      for(let i=0; i<this.tickets.length; i++){
        total += this.tickets[i]._precioCobrado
      }
      values.push(total)
    } else {
      values.push(0,0)
    }
    return values
  }
}
