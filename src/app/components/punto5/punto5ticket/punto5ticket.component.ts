import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../models/ticket';

@Component({
  selector: 'app-punto5ticket',
  standalone: true,
  imports: [ CurrencyPipe, DatePipe ],
  templateUrl: './punto5ticket.component.html',
  styleUrl: './punto5ticket.component.css'
})
export class Punto5ticketComponent implements OnInit{
  private ticketService: TicketService = inject(TicketService)
  private activeRoute: ActivatedRoute = inject(ActivatedRoute)
  private router: Router = inject(Router)
  ticket: Ticket | undefined

  ngOnInit(): void {
    this.ticket = this.ticketService.getTicket(this.activeRoute.snapshot.params['dni'])
  }

  volver(): void{
    this.router.navigate(['/punto5'])
  }
}
