import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly ticketService = inject(TicketService);

  readonly tickets = this.ticketService.tickets;
  readonly total = computed(() => this.tickets().length);
  readonly pendientes = computed(() => this.tickets().filter((ticket) => ticket.estado === 'pendiente').length);
  readonly enProceso = computed(() => this.tickets().filter((ticket) => ticket.estado === 'en-proceso').length);
  readonly resueltos = computed(() => this.tickets().filter((ticket) => ticket.estado === 'resuelto').length);
  readonly prioridadAlta = computed(() => this.tickets().filter((ticket) => ticket.prioridad === 'alta').length);
}
