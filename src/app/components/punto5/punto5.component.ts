import { Component, OnInit, inject } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TipoEspectador } from '../../utils/tipo-espectador.String';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-punto5',
  standalone: true,
  imports: [ CurrencyPipe, DatePipe, DataTablesModule ],
  templateUrl: './punto5.component.html',
  styleUrl: './punto5.component.css'
})
export class Punto5Component implements OnInit{
  private ticketService: TicketService = inject(TicketService)
  private router: Router = inject(Router)
  private currencyPipe = new CurrencyPipe('en-US')
  private datePipe = new DatePipe('en-US')
  tickets: Ticket[] = []
  dtOptions: ADTSettings = {}

  ngOnInit(): void {
    this.ticketService.setTickets()
    this.tickets = this.ticketService.getTickets()
    this.dtOptions = {
      data: this.tickets,
      columns: [
        {
          title: 'DNI',
          data: '_dni'
        },
        {
          title: 'Tipo de Espectador',
          data: '_tipoEspectador'
        },
        {
          title: 'Fecha de Cobro',
          data: '_fechaCobro',
          ngPipeInstance: this.datePipe,
          ngPipeArgs: ['dd/MM/yyyy']
        },
        {
          title: 'Precio Real',
          data: '_precioReal',
          ngPipeInstance: this.currencyPipe,
          ngPipeArgs: ['ARS','symbol']
        },
        {
          title: 'Precio Cobrado',
          data: '_precioCobrado',
          ngPipeInstance: this.currencyPipe,
          ngPipeArgs: ['ARS','symbol']
        }
      ],
      columnDefs: [
        {className: "text-center col-1", targets: "_all"}
      ]
    }
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
