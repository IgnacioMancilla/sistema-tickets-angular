import { Component, input } from '@angular/core';
import { TicketEstado, TicketPrioridad } from '../../models/ticket.model';

@Component({
  selector: 'app-status-badge',
  imports: [],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
})
export class StatusBadge {
  readonly tipo = input.required<'estado' | 'prioridad'>();
  readonly valor = input.required<TicketEstado | TicketPrioridad>();

  texto(): string {
    const etiquetas: Record<TicketEstado | TicketPrioridad, string> = {
      pendiente: 'Pendiente',
      'en-proceso': 'En proceso',
      resuelto: 'Resuelto',
      baja: 'Baja',
      media: 'Media',
      alta: 'Alta',
    };

    return etiquetas[this.valor()];
  }
}
