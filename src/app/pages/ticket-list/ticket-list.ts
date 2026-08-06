import { Component, computed, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TicketCard } from '../../components/ticket-card/ticket-card';
import { TicketEstado, TicketPrioridad } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  imports: [FormsModule, RouterLink, TicketCard],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
})
export class TicketList {
  private readonly ticketService = inject(TicketService);

  readonly busqueda = signal('');
  readonly estado = signal<TicketEstado | 'todos'>('todos');
  readonly prioridad = signal<TicketPrioridad | 'todas'>('todas');

  readonly ticketsFiltrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();

    return this.ticketService.tickets().filter((ticket) => {
      const coincideTitulo = ticket.titulo.toLowerCase().includes(texto);
      const coincideEstado = this.estado() === 'todos' || ticket.estado === this.estado();
      const coincidePrioridad = this.prioridad() === 'todas' || ticket.prioridad === this.prioridad();

      return coincideTitulo && coincideEstado && coincidePrioridad;
    });
  });

  actualizarBusqueda(valor: string): void {
    this.busqueda.set(valor);
  }

  actualizarEstado(valor: string): void {
    this.estado.set(valor as TicketEstado | 'todos');
  }

  actualizarPrioridad(valor: string): void {
    this.prioridad.set(valor as TicketPrioridad | 'todas');
  }
}
