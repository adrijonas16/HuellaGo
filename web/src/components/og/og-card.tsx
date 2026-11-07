/* Plantilla de las imágenes para compartir (1200×630). Solo estilos en línea: la renderiza next/og. */

export const OG_SIZE = { width: 1200, height: 630 };

export function Paw({ size = 64, color = '#FFFFFF' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill={color}>
      <ellipse cx="11" cy="17" rx="3.6" ry="4.6" transform="rotate(-18 11 17)" />
      <ellipse cx="29" cy="17" rx="3.6" ry="4.6" transform="rotate(18 29 17)" />
      <ellipse cx="16.5" cy="10.5" rx="3.4" ry="4.4" transform="rotate(-6 16.5 10.5)" />
      <ellipse cx="23.5" cy="10.5" rx="3.4" ry="4.4" transform="rotate(6 23.5 10.5)" />
      <path d="M20 19.5c-4.6 0-9 4.6-9 8.6 0 3 2.3 4.4 4.8 4.4 1.6 0 2.7-.8 4.2-.8s2.6.8 4.2.8c2.5 0 4.8-1.4 4.8-4.4 0-4-4.4-8.6-9-8.6z" />
    </svg>
  );
}

export function OgCard({ eyebrow, title, footer }: { eyebrow?: string; title: string; footer?: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#3352F5',
        color: '#FFFFFF',
        padding: '64px 72px',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* rastro de huellas */}
      <div style={{ position: 'absolute', right: 40, top: 40, display: 'flex', flexDirection: 'column', gap: 18, opacity: 0.18 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ display: 'flex', marginLeft: i % 2 ? 70 : 0, transform: `rotate(${i % 2 ? 20 : -14}deg)` }}>
            <Paw size={72} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paw size={44} color="#3352F5" />
        </div>
        <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.5 }}>huellago</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 900 }}>
        {eyebrow && <div style={{ fontSize: 30, color: '#FFC531', fontWeight: 700, marginBottom: 12 }}>{eyebrow}</div>}
        <div style={{ fontSize: title.length > 40 ? 64 : 84, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>{title}</div>
      </div>
      <div style={{ fontSize: 28, opacity: 0.85 }}>{footer ?? 'Servicios, eventos y rutas pet friendly en Arequipa'}</div>
    </div>
  );
}
