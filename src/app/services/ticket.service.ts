import { Injectable, signal } from '@angular/core';
import { Ticket, TicketEstado, TicketFormData, TicketPrioridad } from '../models/ticket.model';

const STORAGE_KEY = 'support-tickets';

const TICKETS_INICIALES: Ticket[] = [
  {
    id: 1,
    titulo: 'No puedo iniciar sesion',
    descripcion: 'El usuario indica que sus credenciales son correctas, pero el sistema muestra un error de acceso.',
    estado: 'pendiente',
    prioridad: 'alta',
    responsable: 'Mesa de ayuda',
    fechaCreacion: '2026-08-01',
  },
  {
    id: 2,
    titulo: 'Correo corporativo lento',
    descripcion: 'El cliente reporta lentitud al cargar la bandeja de entrada desde el navegador.',
    estado: 'en-proceso',
    prioridad: 'media',
    responsable: 'Soporte TI',
    fechaCreacion: '2026-08-03',
  },
  {
    id: 3,
    titulo: 'Solicitud de instalacion de impresora',
    descripcion: 'Se requiere configurar una impresora compartida en el equipo de una nueva colaboradora.',
    estado: 'resuelto',
    prioridad: 'baja',
    responsable: 'Infraestructura',
    fechaCreacion: '2026-08-04',
  },
];

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly ticketsSignal = signal<Ticket[]>(this.cargarTickets());

  readonly tickets = this.ticketsSignal.asReadonly();

  obtenerTickets(): Ticket[] {
    return this.ticketsSignal();
  }

  obtenerTicketPorId(id: number): Ticket | undefined {
    return this.obtenerTickets().find((ticket) => ticket.id === id);
  }

  crearTicket(datos: TicketFormData): Ticket {
    const tickets = this.obtenerTickets();
    const nuevoTicket: Ticket = {
      ...datos,
      responsable: datos.responsable.trim() || 'Sin asignar',
      id: this.generarId(tickets),
      fechaCreacion: new Date().toISOString().slice(0, 10),
    };

    this.guardarTickets([nuevoTicket, ...tickets]);
    return nuevoTicket;
  }

  actualizarEstado(id: number, estado: TicketEstado): Ticket | undefined {
    let ticketActualizado: Ticket | undefined;

    const tickets = this.obtenerTickets().map((ticket) => {
      if (ticket.id !== id) {
        return ticket;
      }

      ticketActualizado = { ...ticket, estado };
      return ticketActualizado;
    });

    if (ticketActualizado) {
      this.guardarTickets(tickets);
    }

    return ticketActualizado;
  }

  eliminarTicket(id: number): boolean {
    const tickets = this.obtenerTickets();
    const ticketsFiltrados = tickets.filter((ticket) => ticket.id !== id);

    if (ticketsFiltrados.length === tickets.length) {
      return false;
    }

    this.guardarTickets(ticketsFiltrados);
    return true;
  }

  contarPorEstado(estado: TicketEstado): number {
    return this.obtenerTickets().filter((ticket) => ticket.estado === estado).length;
  }

  contarPorPrioridad(prioridad: TicketPrioridad): number {
    return this.obtenerTickets().filter((ticket) => ticket.prioridad === prioridad).length;
  }

  private cargarTickets(): Ticket[] {
    const ticketsGuardados = localStorage.getItem(STORAGE_KEY);

    if (!ticketsGuardados) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(TICKETS_INICIALES));
      return TICKETS_INICIALES;
    }

    try {
      const tickets = JSON.parse(ticketsGuardados) as Ticket[];
      return Array.isArray(tickets) ? tickets : TICKETS_INICIALES;
    } catch {
      return TICKETS_INICIALES;
    }
  }

  private guardarTickets(tickets: Ticket[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    this.ticketsSignal.set(tickets);
  }

  private generarId(tickets: Ticket[]): number {
    const ids = tickets.map((ticket) => ticket.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }
}
