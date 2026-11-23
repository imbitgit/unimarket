import React, { useState } from 'react';
import { ListingItem, UserProfile } from '../types';
import { formatCOP, buildWhatsAppLink } from '../utils/formatters';
import {
  X,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Building2,
  MapPin,
} from 'lucide-react';

interface WhatsAppContactModalProps {
  item: ListingItem | null;
  buyer: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppContactModal: React.FC<WhatsAppContactModalProps> = ({
  item,
  buyer,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !item) return null;

  const defaultGreeting = `¡Hola ${item.sellerName.split(' ')[0]}!`;
  const subject = item.type === 'Producto'
    ? `vi tu producto en UniMarket: *"${item.title}"* por ${formatCOP(item.price)}.`
    : `vi tu servicio en UniMarket: *"${item.title}"* (${item.serviceMode || 'tarifa'} ${formatCOP(item.price)}).`;

  const campusDelivery = item.sellerCampus
    ? ` Me encuentro en ${buyer.university} (${buyer.campus || buyer.city}) y me gustaría coordinar para entrega o sesión.`
    : ` Soy estudiante de ${buyer.university}.`;

  const fullMessage = `${defaultGreeting} Mi nombre es ${buyer.name}, ${subject}${campusDelivery} ¿Sigue disponible? ¡Muchas gracias!`;

  const cleanPhone = item.sellerPhone.replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-snug">
                Contactar a {item.sellerName.split(' ')[0]}
              </h3>
              <p className="text-xs text-emerald-100">
                Trato directo entre estudiantes por WhatsApp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Item summary */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <img
              src={item.image}
              alt={item.title}
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                {item.type} • {item.category}
              </span>
              <p className="text-sm font-bold text-slate-900 truncate">{item.title}</p>
              <p className="text-xs font-black text-slate-700">{formatCOP(item.price)}</p>
            </div>
          </div>

          {/* Seller Trust Badge */}
          <div className="flex items-center justify-between text-xs px-1 text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              {item.sellerUniversity}
            </span>
            <span className="flex items-center gap-1 font-semibold text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              Compañero Verificado
            </span>
          </div>

          {/* Pre-filled Message Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Mensaje prellenado listo para enviar:
              </label>
              <button
                onClick={handleCopy}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar mensaje</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-slate-800 leading-relaxed font-sans select-all">
              {fullMessage}
            </div>
          </div>

          {/* Direct CTA */}
          <div className="pt-2">
            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>Abrir chat de WhatsApp</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              Se abrirá WhatsApp Web o la app con el número <strong>{item.sellerPhone}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
