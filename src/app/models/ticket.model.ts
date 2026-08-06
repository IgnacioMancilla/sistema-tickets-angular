export type TicketEstado = 'pendiente' | 'en-proceso' | 'resuelto';

export type TicketPrioridad = 'baja' | 'media' | 'alta';

export interface Ticket {
  id: number;
  titulo: string;
  descripcion: string;
  estado: TicketEstado;
  prioridad: TicketPrioridad;
  responsable: string;
  fechaCreacion: string;
}

export type TicketFormData = Omit<Ticket, 'id' | 'fechaCreacion'>;
