'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Mail, MapPin, Send, Check, Loader2, Store, HelpCircle } from 'lucide-react';
import { ObfuscatedEmail } from '@/components/legal/obfuscated-email';
import { sendContactMessage, errorMessage } from '@/lib/backend';
import { validators, firstError } from '@/lib/validation';
import { track } from '@/lib/analytics';
import { SITE } from '@/lib/site';
import { cn } from '@/lib/utils';

const SUBJECTS = [
  'Consulta general',
  'Soporte técnico',
  'Registrar negocio',
  'Reportar problema',
  'Alianzas comerciales',
  'Prensa',
  'Privacidad y datos personales',
  'Otro',
];

const MAX = 2000;

type Field = 'name' | 'email' | 'subject' | 'message' | 'consent';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState('');
  const shownAt = useRef(Date.now());

  useEffect(() => {
    shownAt.current = Date.now();
  }, [sent]);

  // Los enlaces de otras páginas pueden preelegir el asunto (?asunto=planes|negocio|privacidad)
  useEffect(() => {
    const preset: Record<string, string> = { planes: 'Alianzas comerciales', negocio: 'Registrar negocio', privacidad: 'Privacidad y datos personales', soporte: 'Soporte técnico' };
    const asunto = new URLSearchParams(window.location.search).get('asunto') ?? '';
    if (preset[asunto]) setForm((f) => ({ ...f, subject: preset[asunto] }));
  }, []);

  const errors: Record<Field, string> = {
    name: validators.name(form.name),
    email: validators.email(form.email),
    subject: form.subject ? '' : 'Elige un asunto',
    message: firstError(validators.minLength(form.message, 20, 'tu mensaje'), validators.maxLength(form.message, MAX)),
    consent: consent ? '' : 'Necesitamos tu permiso para responderte',
  };
  const show = (f: Field) => (touched[f] ? errors[f] : '');
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const blur = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true, consent: true });
    setServerError('');
    const first = (Object.keys(errors) as Field[]).find((k) => errors[k]);
    if (first) {
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    setSending(true);
    try {
      await sendContactMessage({ ...form, elapsedMs: Date.now() - shownAt.current });
      track('contact_submit', { subject: form.subject });
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '', website: '' });
      setConsent(false);
      setTouched({});
    } catch (err) {
      setServerError(errorMessage(err, 'No pudimos enviar tu mensaje. Revisa tu conexión e inténtalo otra vez.'));
    } finally {
      setSending(false);
    }
  }

  const inputCls = (f: Field) =>
    cn(
      'w-full px-4 py-3 rounded-2xl border-[1.5px] bg-white text-dark placeholder:text-bark/60 outline-none transition-all focus:ring-4',
      show(f) ? 'border-error focus:border-error focus:ring-error/15' : 'border-sand focus:border-primary focus:ring-primary/15',
    );

  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-screen bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <header className="max-w-2xl">
            <h1 className="font-heading font-extrabold text-dark leading-[0.95]" style={{ fontSize: 'clamp(38px, 5.4vw, 64px)', letterSpacing: '-0.045em' }}>
              Escríbenos
            </h1>
            <p className="text-bark text-lg mt-3">Respondemos en 1 día hábil. Si es sobre tu cuenta, escribe desde el email con el que te registraste.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 mt-10">
            <aside className="space-y-3 order-2 lg:order-1">
              <div className="bg-white rounded-card border border-sand p-5 flex items-start gap-3">
                <span className="w-10 h-10 bg-primary-soft text-primary rounded-xl flex items-center justify-center shrink-0"><Mail size={18} /></span>
                <div>
                  <h2 className="font-heading font-bold text-dark">Email</h2>
                  <ObfuscatedEmail className="text-sm text-primary font-semibold underline underline-offset-2 break-all" />
                </div>
              </div>
              <div className="bg-white rounded-card border border-sand p-5 flex items-start gap-3">
                <span className="w-10 h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center shrink-0"><MapPin size={18} /></span>
                <div>
                  <h2 className="font-heading font-bold text-dark">Dónde estamos</h2>
                  <p className="text-sm text-bark">{SITE.city}</p>
                </div>
              </div>
              <Link href="/business/register" className="bg-white rounded-card border border-sand p-5 flex items-start gap-3 card-hover">
                <span className="w-10 h-10 bg-accent-soft text-dark rounded-xl flex items-center justify-center shrink-0"><Store size={18} /></span>
                <span>
                  <span className="block font-heading font-bold text-dark">¿Quieres registrar tu negocio?</span>
                  <span className="block text-sm text-bark">Hazlo tú mismo en 5 minutos, gratis.</span>
                </span>
              </Link>
              <Link href="/help" className="bg-white rounded-card border border-sand p-5 flex items-start gap-3 card-hover">
                <span className="w-10 h-10 bg-rose/10 text-rose-dark rounded-xl flex items-center justify-center shrink-0"><HelpCircle size={18} /></span>
                <span>
                  <span className="block font-heading font-bold text-dark">Preguntas frecuentes</span>
                  <span className="block text-sm text-bark">Quizá tu respuesta ya está ahí.</span>
                </span>
              </Link>
            </aside>

            <div className="order-1 lg:order-2 bg-white rounded-card border border-sand p-6 md:p-8">
              {sent ? (
                <div className="text-center py-10 animate-bounce-in" role="status">
                  <span className="w-16 h-16 mx-auto rounded-full bg-secondary text-white flex items-center justify-center"><Check size={30} strokeWidth={3} /></span>
                  <h2 className="font-heading font-extrabold text-2xl text-dark mt-5">Mensaje enviado</h2>
                  <p className="text-bark mt-2">Te responderemos al email que nos dejaste en 1 día hábil.</p>
                  <button onClick={() => setSent(false)} className="mt-6 text-sm font-bold text-primary link-route">Escribir otro mensaje</button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby={serverError ? 'c-server' : undefined}>
                  {/* Trampa para bots: invisible para personas y lectores de pantalla */}
                  <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                    <label htmlFor="c-website">No completes este campo</label>
                    <input id="c-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-name" className="text-sm font-semibold text-dark block mb-1.5">Nombre</label>
                      <input id="c-name" name="name" autoComplete="name" value={form.name} onChange={set('name')} onBlur={blur('name')} className={inputCls('name')} placeholder="Tu nombre" aria-invalid={!!show('name')} aria-describedby="c-name-e" maxLength={80} />
                      <p id="c-name-e" className="text-sm text-error mt-1 min-h-[1.25rem]">{show('name')}</p>
                    </div>
                    <div>
                      <label htmlFor="c-email" className="text-sm font-semibold text-dark block mb-1.5">Email</label>
                      <input id="c-email" name="email" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={set('email')} onBlur={blur('email')} className={inputCls('email')} placeholder="tu@email.com" aria-invalid={!!show('email')} aria-describedby="c-email-e" maxLength={120} />
                      <p id="c-email-e" className="text-sm text-error mt-1 min-h-[1.25rem]">{show('email')}</p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-subject" className="text-sm font-semibold text-dark block mb-1.5">Asunto</label>
                    <select id="c-subject" name="subject" value={form.subject} onChange={set('subject')} onBlur={blur('subject')} className={inputCls('subject')} aria-invalid={!!show('subject')} aria-describedby="c-subject-e">
                      <option value="" disabled>Elige un asunto</option>
                      {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <p id="c-subject-e" className="text-sm text-error mt-1 min-h-[1.25rem]">{show('subject')}</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <label htmlFor="c-message" className="text-sm font-semibold text-dark">Mensaje</label>
                      <span className={cn('text-xs tabular-nums', form.message.length > MAX ? 'text-error' : 'text-bark')}>{form.message.length}/{MAX}</span>
                    </div>
                    <textarea id="c-message" name="message" value={form.message} onChange={set('message')} onBlur={blur('message')} className={cn(inputCls('message'), 'min-h-[160px] resize-y')} placeholder="Cuéntanos en qué podemos ayudarte" aria-invalid={!!show('message')} aria-describedby="c-message-e" />
                    <p id="c-message-e" className="text-sm text-error mt-1 min-h-[1.25rem]">{show('message')}</p>
                  </div>

                  <div>
                    <label className="flex items-start gap-3 text-sm text-bark cursor-pointer">
                      <input id="c-consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} onBlur={blur('consent')} className="mt-0.5 w-4 h-4 accent-primary" aria-invalid={!!show('consent')} aria-describedby="c-consent-e" />
                      <span>
                        Acepto que HuellaGo use estos datos para responder mi mensaje, según la{' '}
                        <Link href="/privacy" className="font-semibold text-primary underline underline-offset-2">política de privacidad</Link>.
                      </span>
                    </label>
                    <p id="c-consent-e" className="text-sm text-error mt-1 min-h-[1.25rem]">{show('consent')}</p>
                  </div>

                  {serverError && (
                    <p id="c-server" role="alert" className="text-sm text-error bg-error/5 rounded-xl px-4 py-3">{serverError}</p>
                  )}

                  <button type="submit" disabled={sending} className="w-full bg-primary text-white font-bold py-4 rounded-full shadow-button boop-btn hover:bg-primary-dark disabled:opacity-60 flex items-center justify-center gap-2 text-lg">
                    {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    {sending ? 'Enviando…' : 'Enviar mensaje'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
