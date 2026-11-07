/**
 * Validaciones compartidas de formularios. Devuelven el mensaje de error
 * (en español, diciendo cómo corregir) o una cadena vacía si está bien.
 */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const validators = {
  required: (v: string, what = 'este campo') => (v.trim() ? '' : `Completa ${what}`),
  name: (v: string) => (v.trim().length >= 2 ? '' : 'Escribe tu nombre (mínimo 2 letras)'),
  email: (v: string) => (EMAIL_RE.test(v.trim()) ? '' : 'Escribe un email válido, por ejemplo luna@correo.com'),
  /** Celular peruano: 9 dígitos que empiezan con 9, con o sin +51 y espacios. */
  phonePe: (v: string) => {
    if (!v.trim()) return '';
    const digits = v.replace(/\D/g, '').replace(/^51(?=9\d{8}$)/, '');
    return /^9\d{8}$/.test(digits) ? '' : 'Escribe un celular de 9 dígitos que empiece con 9, por ejemplo 987 654 321';
  },
  minLength: (v: string, n: number, what = 'el texto') =>
    v.trim().length >= n ? '' : `${what.charAt(0).toUpperCase() + what.slice(1)} necesita al menos ${n} caracteres (llevas ${v.trim().length})`,
  maxLength: (v: string, n: number) => (v.length <= n ? '' : `Usa como máximo ${n} caracteres`),
  url: (v: string) => {
    if (!v.trim()) return '';
    try {
      const u = new URL(v.startsWith('http') ? v : `https://${v}`);
      return u.hostname.includes('.') ? '' : 'Escribe una dirección web válida, por ejemplo mitienda.pe';
    } catch {
      return 'Escribe una dirección web válida, por ejemplo mitienda.pe';
    }
  },
};

/** Primer error de una lista de validaciones. */
export const firstError = (...errors: string[]) => errors.find(Boolean) ?? '';
