import React from 'react';
import { ListingItem, UserProfile } from '../types';
import { formatCOP } from '../utils/formatters';
import {
  X,
  Star,
  Building2,
  GraduationCap,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Tag,
  Share2,
  Calendar,
} from 'lucide-react';

interface ListingDetailModalProps {
  item: ListingItem | null;
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onContact: (item: ListingItem) => void;
  onViewSellerProfile?: (sellerName: string) => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  item,
  currentUser,
  isOpen,
  onClose,
  onContact,
  onViewSellerProfile,
}) => {
  if (!isOpen || !item) return null;

  const isFromSameUniversity =
    item.sellerUniversity.trim().toLowerCase() === currentUser.university.trim().toLowerCase() ||
    (currentUser.university.includes('Univalle') && item.sellerUniversity.includes('Univalle'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button Floating */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto">
          {/* Main Photo Banner */}
          <div className="relative w-full aspect-16/9 bg-slate-900">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-600 text-white uppercase tracking-wider">
                    {item.type}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md">
                    {item.category}
                  </span>
                  {item.condition && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md">
                      {item.condition}
                    </span>
                  )}
                  {item.serviceMode && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md">
                      {item.serviceMode}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {item.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            {/* Price & Highlight */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Precio acordado
                </span>
                <p className="text-3xl font-black text-slate-900">
                  {formatCOP(item.price)}
                </p>
                {item.serviceMode && (
                  <p className="text-xs text-slate-500 font-medium">{item.serviceMode}</p>
                )}
              </div>

              {isFromSameUniversity && (
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>¡Publicado por un compañero de tu misma universidad!</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Descripción detallada
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                {item.description}
              </p>
            </div>

            {/* Campus Meeting / Delivery Location */}
            {item.sellerCampus && (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Lugar de encuentro habitual:</strong>
                  <p className="text-blue-800">{item.sellerCampus}</p>
                </div>
              </div>
            )}

            {/* Seller Card */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div
                onClick={() => {
                  onClose();
                  onViewSellerProfile?.(item.sellerName);
                }}
                className="flex items-center gap-3 cursor-pointer group"
                title={`Ver perfil de ${item.sellerName}`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 group-hover:bg-blue-700 text-white font-black text-lg flex items-center justify-center transition-colors shadow-sm">
                  {item.sellerName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-slate-900 group-hover:text-blue-600 text-sm transition-colors">
                      {item.sellerName}
                    </p>
                    <span title="Estudiante verificado">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.sellerUniversity}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span className="font-extrabold text-amber-900 text-sm">
                    {item.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-500">({item.reviewCount})</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewSellerProfile?.(item.sellerName);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-blue-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  Ver perfil completo
                </button>
              </div>
            </div>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-white transition-colors"
          >
            Cerrar
          </button>

          <button
            onClick={() => {
              onContact(item);
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>Contactar a {item.sellerName.split(' ')[0]} por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
