import React, { useState } from 'react';
import { StudentProfile, ListingItem, UserProfile } from '../types';
import { formatCOP } from '../utils/formatters';
import {
  X,
  Star,
  Building2,
  GraduationCap,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Clock,
  BookOpen,
  CheckCircle2,
  Edit3,
} from 'lucide-react';

interface StudentProfileModalProps {
  profile: StudentProfile | null;
  currentUser: UserProfile;
  listings: ListingItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectListing: (item: ListingItem) => void;
  onContactSeller: (item: ListingItem) => void;
  onEditOwnProfile?: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  profile,
  currentUser,
  listings,
  isOpen,
  onClose,
  onSelectListing,
  onContactSeller,
  onEditOwnProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews' | 'about'>('listings');
  const [listingTypeFilter, setListingTypeFilter] = useState<'all' | 'Producto' | 'Servicio'>('all');

  if (!isOpen || !profile) return null;

  const isOwnProfile =
    profile.id === 'current-user' ||
    profile.name.trim().toLowerCase() === currentUser.name.trim().toLowerCase();

  const isFromSameUniversity =
    profile.university.trim().toLowerCase() === currentUser.university.trim().toLowerCase() ||
    (currentUser.university.includes('Univalle') && profile.university.includes('Univalle')) ||
    (currentUser.university.includes('UNAL') && profile.university.includes('UNAL'));

  // Get active listings for this student
  const studentListings = listings.filter(
    (l) => l.sellerName.toLowerCase().trim() === profile.name.toLowerCase().trim()
  );

  const filteredStudentListings = studentListings.filter((l) => {
    if (listingTypeFilter === 'all') return true;
    return l.type === listingTypeFilter;
  });

  const handleGeneralWhatsApp = () => {
    const cleanPhone = profile.phone.replace(/\D/g, '');
    const greeting = `¡Hola ${profile.name.split(' ')[0]}! Vi tu perfil de estudiante en UniMarket. Soy ${currentUser.name} de ${currentUser.university}. Me gustaría consultar sobre tus productos o servicios.`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Responsive Modal Card with single full-height scrollable container */}
      <div className="relative w-full max-w-2xl lg:max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] sm:max-h-[90vh] flex flex-col">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer shadow-md"
          title="Cerrar perfil"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* UNIFIED SCROLLABLE CONTAINER: holds all student info and content in a single integrated div */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Cover Header Banner */}
          <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 pt-7 pb-12 sm:pb-16 px-4 sm:px-8 text-white">
            <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-52 sm:w-64 h-52 sm:h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            {/* Badges on top */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pr-8">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-200" />
                Estudiante Verificado (.edu.co)
              </span>

              {isFromSameUniversity && (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-400/25 text-emerald-100 border border-emerald-300/40">
                  <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  De tu universidad
                </span>
              )}

              {isOwnProfile && (
                <span className="text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-amber-950">
                  Tu perfil público
                </span>
              )}
            </div>
          </div>

          {/* Integrated Profile Body: Avatar, Details, Tabs & Content in ONE single continuous div */}
          <div className="px-4 sm:px-8 pb-6 relative -mt-10 sm:-mt-12 space-y-5">
            {/* Avatar & Main Info Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
              <div className="flex items-end gap-3 sm:gap-4">
                <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-2xl bg-white p-1 sm:p-1.5 shadow-xl ring-4 ring-white shrink-0">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-xl sm:text-3xl flex items-center justify-center shadow-inner">
                    {profile.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>

                <div className="pt-1 sm:pt-0 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
                      {profile.name}
                    </h2>
                    <span title="Estudiante verificado">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" />
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-blue-700 flex items-center gap-1 mt-0.5">
                    <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">{profile.career} • {profile.semester}</span>
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                    <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{profile.university} ({profile.city})</span>
                  </p>
                </div>
              </div>

              {/* Action buttons inside top header */}
              <div className="flex items-center gap-2 self-start sm:self-auto w-full sm:w-auto pt-1 sm:pt-0">
                {isOwnProfile ? (
                  <button
                    onClick={() => {
                      onClose();
                      onEditOwnProfile?.();
                    }}
                    className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editar mis datos</span>
                  </button>
                ) : (
                  <button
                    onClick={handleGeneralWhatsApp}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
                    <span>Contactar por WhatsApp</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="p-1">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Calificación
                </span>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-500" />
                  <span className="text-xs sm:text-sm font-black text-slate-900">{profile.rating.toFixed(1)}</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500">({profile.dealsCount})</span>
                </div>
              </div>

              <div className="p-1 border-l border-slate-200">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Publicaciones
                </span>
                <p className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">
                  {studentListings.length} activas
                </p>
              </div>

              <div className="p-1 border-t sm:border-t-0 sm:border-l border-slate-200">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Responde en
                </span>
                <div className="flex items-center justify-center gap-1 mt-0.5 text-emerald-700 font-bold text-[11px] sm:text-xs">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>&lt; 1 hora</span>
                </div>
              </div>

              <div className="p-1 border-t sm:border-t-0 sm:border-l border-slate-200">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  En UniMarket
                </span>
                <p className="text-[11px] sm:text-xs font-bold text-slate-700 mt-0.5 truncate">
                  Desde {profile.joinedDate}
                </p>
              </div>
            </div>

            {/* Seamless Tab Navigation Bar */}
            <div className="flex items-center gap-1 sm:gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('listings')}
                className={`pb-2.5 sm:pb-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'listings'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Publicaciones ({studentListings.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 sm:pb-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Opiniones ({profile.reviews.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className={`pb-2.5 sm:pb-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'about'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Sobre el estudiante</span>
              </button>
            </div>

            {/* Integrated Content Sections: Rendered directly in the main flow */}

            {/* TAB 1: LISTINGS */}
            {activeTab === 'listings' && (
              <div className="space-y-3.5 pt-1">
                {/* Type Sub-filter */}
                {studentListings.length > 1 && (
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
                      <button
                        onClick={() => setListingTypeFilter('all')}
                        className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          listingTypeFilter === 'all' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
                        }`}
                      >
                        Todos ({studentListings.length})
                      </button>
                      <button
                        onClick={() => setListingTypeFilter('Producto')}
                        className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          listingTypeFilter === 'Producto' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600'
                        }`}
                      >
                        Productos ({studentListings.filter((l) => l.type === 'Producto').length})
                      </button>
                      <button
                        onClick={() => setListingTypeFilter('Servicio')}
                        className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          listingTypeFilter === 'Servicio' ? 'bg-white text-violet-700 shadow-2xs' : 'text-slate-600'
                        }`}
                      >
                        Servicios ({studentListings.filter((l) => l.type === 'Servicio').length})
                      </button>
                    </div>
                  </div>
                )}

                {/* Listings Grid */}
                {filteredStudentListings.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredStudentListings.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 sm:p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white hover:shadow-md transition-all flex gap-3 group cursor-pointer"
                        onClick={() => {
                          onClose();
                          onSelectListing(item);
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <span
                                className={`text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                                  item.type === 'Producto'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-violet-50 text-violet-700'
                                }`}
                              >
                                {item.type}
                              </span>
                              <span className="text-[10px] text-slate-500 font-medium truncate">
                                {item.category}
                              </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h4>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                            <span className="text-xs sm:text-sm font-black text-slate-900">
                              {formatCOP(item.price)}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                                onContactSeller(item);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] sm:text-[11px] font-bold transition-colors cursor-pointer"
                            >
                              Contactar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-xs text-slate-500">
                      No hay publicaciones activas con este filtro.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-3 pt-1">
                {profile.reviews.length > 0 ? (
                  profile.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-3.5 sm:p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                            {rev.authorName.slice(0, 1)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">{rev.authorName}</p>
                            <p className="text-[10px] text-slate-400">{rev.authorUniversity}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-500" />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400 ml-1">{rev.date}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-2.5 sm:p-3 rounded-xl border border-slate-100">
                        "{rev.comment}"
                      </p>

                      {rev.itemTitle && (
                        <p className="text-[10px] text-slate-500 font-medium">
                          Trato sobre: <span className="text-blue-600">{rev.itemTitle}</span>
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
                    Aún no tiene opiniones registradas de compañeros.
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ABOUT & CAMPUS */}
            {activeTab === 'about' && (
              <div className="space-y-4 pt-1">
                {/* Bio */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Presentación del compañero
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200">
                    {profile.bio}
                  </p>
                </div>

                {/* Preferred Meeting Locations */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Puntos habituales de entrega en el campus</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {profile.preferredMeetingLocations.map((loc, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 sm:p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900 font-medium flex items-center gap-2"
                      >
                        <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification & Safety */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Confianza Universitaria UniMarket</span>
                  </div>
                  <p className="leading-relaxed">
                    Este compañero está verificado con correo institucional oficial{' '}
                    <code className="font-mono bg-white px-1.5 py-0.5 rounded text-emerald-900 font-bold break-all">
                      {profile.email}
                    </code>.
                    Las entregas y sesiones se coordinan de forma segura dentro de las instalaciones universitarias.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer: Action bar pinned at the bottom */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 sm:py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-white transition-colors cursor-pointer"
          >
            Cerrar
          </button>

          {!isOwnProfile && (
            <button
              onClick={handleGeneralWhatsApp}
              className="py-2 sm:py-2.5 px-4 sm:px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>Escribir por WhatsApp a {profile.name.split(' ')[0]}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
