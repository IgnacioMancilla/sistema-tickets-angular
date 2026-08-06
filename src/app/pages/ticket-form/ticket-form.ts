import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TicketEstado, TicketPrioridad } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.css',
})
export class TicketForm {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly ticketService = inject(TicketService);

  mensajeError = '';

  readonly ticketForm = this.formBuilder.nonNullable.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    estado: ['pendiente' as TicketEstado, Validators.required],
    prioridad: ['media' as TicketPrioridad, Validators.required],
    responsable: [''],
  });

  crearTicket(): void {
    this.mensajeError = '';

    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      this.mensajeError = 'Revisa los campos obligatorios antes de guardar el ticket.';
      return;
    }

    try {
      const ticket = this.ticketService.crearTicket(this.ticketForm.getRawValue());
      this.router.navigate(['/tickets', ticket.id]);
    } catch {
      this.mensajeError = 'No pudimos crear el ticket. Intenta nuevamente.';
    }
  }

  campoInvalido(nombre: 'titulo' | 'descripcion' | 'estado' | 'prioridad'): boolean {
    const campo = this.ticketForm.controls[nombre];
    return campo.invalid && (campo.dirty || campo.touched);
  }
}
