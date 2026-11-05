'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Smile } from 'lucide-react';

interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
  isOwn: boolean;
  pet?: string;
}

const MOCK_MESSAGES: ChatMessage[] = [
  { id: 'm1', user: 'María G.', avatar: 'M', text: 'Hola! Alguien sabe si hay estacionamiento cerca?', time: '09:15', isOwn: false, pet: '🐕 Toby' },
  { id: 'm2', user: 'Carlos Q.', avatar: 'C', text: 'Si! Hay estacionamiento en la calle de atras, es gratis los domingos', time: '09:18', isOwn: false, pet: '🐕 Luna' },
  { id: 'm3', user: 'Tu', avatar: 'T', text: 'Genial! Llevaremos agua extra por si acaso', time: '09:20', isOwn: true },
  { id: 'm4', user: 'Ana T.', avatar: 'A', text: 'Mi perrito Rocky esta super emocionado! 🐶', time: '09:22', isOwn: false, pet: '🐕 Rocky' },
  { id: 'm5', user: 'Luis M.', avatar: 'L', text: 'Alguien más va caminando desde Yanahuara?', time: '09:25', isOwn: false, pet: '🐕 Mia' },
  { id: 'm6', user: 'María G.', avatar: 'M', text: 'Yo voy desde ahi! Nos encontramos en el mirador?', time: '09:27', isOwn: false, pet: '🐕 Toby' },
];

interface EventChatProps {
  eventTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EventChat({ eventTitle, isOpen, onClose }: EventChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function sendMessage() {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      user: 'Tu',
      avatar: 'T',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    // Simulate reply
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, {
        id: `m${Date.now() + 1}`,
        user: 'María G.',
        avatar: 'M',
        text: 'Nos vemos ahi! 🐾',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: false,
        pet: '🐕 Toby',
      }]);
    }, 2000);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 md:w-96 z-50 animate-slide-up">
      <div className="bg-white rounded-card shadow-card-hover border border-sand overflow-hidden flex flex-col" style={{ height: '480px' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="text-white" />
            <div>
              <h3 className="text-white font-bold text-sm truncate max-w-[200px]">{eventTitle}</h3>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/70 text-[10px]">{messages.length} mensajes · 6 en linea</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Cerrar chat" className="text-white/70 hover:text-white boop-btn"><X size={18} /></button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-cream/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${msg.isOwn ? 'order-2' : ''}`}>
                {!msg.isOwn && (
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-rose text-white text-[8px] font-bold flex items-center justify-center">{msg.avatar}</div>
                    <span className="text-[10px] font-semibold text-bark">{msg.user}</span>
                    {msg.pet && <span className="text-[9px] text-bark/50">{msg.pet}</span>}
                  </div>
                )}
                <div className={`px-3 py-2 rounded-2xl text-sm ${msg.isOwn ? 'bg-primary text-white rounded-tr-md' : 'bg-white text-dark rounded-tl-md shadow-sm'}`}>
                  {msg.text}
                </div>
                <span className={`text-[9px] text-bark/40 mt-0.5 block ${msg.isOwn ? 'text-right' : ''}`}>{msg.time}</span>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-rose text-white text-[8px] font-bold flex items-center justify-center">M</div>
              <div className="bg-white px-3 py-2 rounded-2xl rounded-tl-md shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-bark/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-bark/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-bark/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-sand bg-white shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => setInput((v) => v + '🐾')} aria-label="Agregar una huellita" className="text-bark/60 hover:text-bark boop-btn"><Smile size={20} /></button>
            <input
              className="flex-1 px-3 py-2 rounded-full bg-cream border border-sand text-sm focus:border-primary outline-none"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} aria-label="Enviar mensaje" className="w-8 h-8 bg-primary rounded-full flex items-center justify-center boop-btn hover:bg-primary-dark transition-all">
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Floating chat button
export function ChatButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} aria-label="Abrir chat del evento" className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-card-hover flex items-center justify-center boop-btn hover:scale-110 transition-transform group">
      <MessageCircle size={24} className="text-white" />
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-white">3</div>
      <span className="absolute right-full mr-3 bg-dark text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat del evento
      </span>
    </button>
  );
}
