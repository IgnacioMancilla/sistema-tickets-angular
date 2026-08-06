import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StatusBadge } from '../../components/status-badge/status-badge';
import { TicketEstado } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  imports: [FormsModule, RouterLink, StatusBadge],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css',
})
export class TicketDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ticketService = inject(TicketService);

  readonly mensajeError = signal('');
  readonly ticketId = Number(this.route.snapshot.paramMap.get('id'));
  readonly ticket = computed(() => this.ticketService.obtenerTicketPorId(this.ticketId));

  cambiarEstado(estado: string): void {
    this.mensajeError.set('');

    const ticket = this.ticketService.actualizarEstado(this.ticketId, estado as TicketEstado);

    if (!ticket) {
      this.mensajeError.set('No pudimos actualizar el estado porque el ticket no existe.');
    }
  }

  eliminarTicket(): void {
    this.mensajeError.set('');

    const confirmar = confirm('Seguro que quieres eliminar este ticket? Esta accion no se puede deshacer.');

    if (!confirmar) {
      return;
    }

    const eliminado = this.ticketService.eliminarTicket(this.ticketId);

    if (!eliminado) {
      this.mensajeError.set('No pudimos eliminar el ticket porque no fue encontrado.');
      return;
    }

    this.router.navigate(['/tickets']);
  }
}
