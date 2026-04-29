/**
 * Utilidades generales reutilizables.
 * TODO: Colocar aquí formateadores, validadores y helpers de errores.
 */

export function formatError(error) {
  return error instanceof Error ? error.message : String(error);
}
