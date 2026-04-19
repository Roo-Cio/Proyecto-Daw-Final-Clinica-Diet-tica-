import { Especialista } from './especialista.model';

export interface Cita {
    id_cita: number;
    id_paciente: number;
    id_especialista: number;
    fecha_hora_cita: string; //formato '2026-06-01 12:00:00'
    tipo_cita: 'teleática' | 'presencial';
    estado: 'pendiente' | 'realizada' | 'cancelada';
    es_primera: boolean;
    comentario: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    especialista: Especialista;
}