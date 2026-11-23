import React from 'react';
import { ListingItem, UserProfile } from '../types';
import { formatCOP } from '../utils/formatters';
import {
  Star,
  Building2,
  GraduationCap,
  MessageCircle,
  Eye,
  CheckCircle2,
  Tag,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ListingCardProps {
  item: ListingItem;
  currentUser: UserProfile;
  onContact: (item: ListingItem) => void;
  onViewDetail: (item: ListingItem) => void;
  onViewSellerProfile?: (sellerName: string) => void;
  aiMatchReason?: string;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  item,
  currentUser,
  onContact,
  onViewDetail,
  onViewSellerProfile,
  aiMatchReason,
}) => {
  // Check if this item is from the user's university
  const isFromSameUniversity =
    item.sellerUniversity.trim().toLowerCase() === currentUser.university.trim().toLowerCase() ||
    (currentUser.university.includes('Univalle') && item.sellerUniversity.includes('Univalle')) ||
    (currentUser.university.includes('UNAL') && item.sellerUniversity.includes('UNAL')) ||
    (currentUser.university.includes('Andes') && item.sellerUniversity.includes('Andes'));

  const isProduct = item.type === 'Producto';

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-200 hover:shadow-lg flex flex-col overflow-hidden ${
        isFromSameUniversity
          ? 'border-blue-300 ring-2 ring-blue-500/20 hover:border-blue-500'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Top Media & Badges */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onViewDetail(item)}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Category & Type badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10">
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-xs ${
              isProduct
                ? 'bg-emerald-600/90 text-white'
                : 'bg-violet-600/90 text-white'
            }`}
          >
            {item.type}
          </span>
          <span className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-black/60 text-white backdrop-blur-md">
            {item.category}
          </span>
        </div>

        {/* Highlight "De tu universidad" badge */}
        {isFromSameUniversity && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-900/30 border border-blue-400">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>De tu universidad</span>
            </span>
          </div>
        )}

        {/* Price Tag overlay on bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
          <div>
            <p className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-md">
              {formatCOP(item.price)}
            </p>
            {item.serviceMode && (
              <span className="text-[11px] font-medium text-slate-200 drop-shadow-xs">
                {item.serviceMode}
              </span>
            )}
            {item.condition && (
              <span className="text-[11px] font-medium text-slate-200 drop-shadow-xs">
                {item.condition}
              </span>
            )}
          </div>

          {/* Quick view button overlay */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail(item);
            }}
            className="p-2 rounded-xl bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md transition-colors"
            title="Ver detalles"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* AI Recommendation Reason Banner (if present from AI search) */}
      {aiMatchReason && (
        <div className="bg-blue-50/90 border-b border-blue-100 px-4 py-2 flex items-start gap-2 text-xs text-blue-900">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
          <p className="line-clamp-2 leading-relaxed">
            <strong className="font-semibold">Recomendado:</strong> {aiMatchReason}
          </p>
        </div>
      )}

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Title */}
          <h3
            onClick={() => onViewDetail(item)}
            className="font-bold text-slate-900 text-base leading-snug line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
          >
            {item.title}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Seller Info & Meta */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs">
            {/* Seller name & university (clickable for full student profile) */}
            <div
              onClick={() => onViewSellerProfile?.(item.sellerName)}
              title={`Ver perfil universitario de ${item.sellerName}`}
              className="flex items-center gap-2 min-w-0 pr-2 group/seller cursor-pointer rounded-lg p-1 -m-1 hover:bg-blue-50/70 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-blue-100 group-hover/seller:bg-blue-600 group-hover/seller:text-white text-blue-700 font-bold text-[11px] flex items-center justify-center shrink-0 transition-colors">
                {item.sellerName.slice(0, 1)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 group-hover/seller:text-blue-600 truncate flex items-center gap-1 transition-colors">
                  <span className="truncate">{item.sellerName}</span>
                  {item.verifiedStudent && (
                    <span title="Estudiante verificado">
                      <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                    </span>
                  )}
                </p>
                <p className="text-[10px] text-slate-500 group-hover/seller:text-blue-700 font-medium truncate flex items-center gap-1">
                  <Building2 className="w-3 h-3 shrink-0" />
                  <span className="truncate">{item.sellerUniversity.split('(')[0] || item.sellerUniversity}</span>
                  <span className="text-[9px] text-blue-600 opacity-0 group-hover/seller:opacity-100 font-bold transition-opacity">
                    • Ver perfil
                  </span>
                </p>
              </div>
            </div>

            {/* Rating Stars */}
            <div
              onClick={() => onViewSellerProfile?.(item.sellerName)}
              title="Ver calificaciones de compañeros"
              className="flex items-center gap-1 shrink-0 bg-amber-50 hover:bg-amber-100/80 px-2 py-1 rounded-lg border border-amber-200/60 cursor-pointer transition-colors"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="font-bold text-amber-900 text-xs">{item.rating.toFixed(1)}</span>
              <span className="text-[10px] text-slate-400">({item.reviewCount})</span>
            </div>
          </div>

          {/* Contact Button via WhatsApp */}
          <button
            onClick={() => onContact(item)}
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm shadow-sm shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>Contactar por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
