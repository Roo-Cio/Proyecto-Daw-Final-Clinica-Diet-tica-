export interface CitaPorPaciente {
    id: number;
    fecha: string;
    hora: string;
    nombre_paciente: string;
    dni_paciente: string;
    estado: 'pendiente' | 'realizada' | 'cancelada';
    tipo_cita: string;
    es_primera: boolean;
}