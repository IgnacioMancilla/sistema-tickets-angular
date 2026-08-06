import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ticket } from '../../models/ticket.model';
import { StatusBadge } from '../status-badge/status-badge';

@Component({
  selector: 'app-ticket-card',
  imports: [RouterLink, StatusBadge],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.css',
})
export class TicketCard {
  readonly ticket = input.required<Ticket>();
}
