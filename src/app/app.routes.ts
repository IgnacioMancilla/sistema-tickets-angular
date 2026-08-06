import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { TicketDetail } from './pages/ticket-detail/ticket-detail';
import { TicketForm } from './pages/ticket-form/ticket-form';
import { TicketList } from './pages/ticket-list/ticket-list';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'tickets', component: TicketList },
  { path: 'tickets/nuevo', component: TicketForm },
  { path: 'tickets/:id', component: TicketDetail },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', redirectTo: 'dashboard' },
];
