import React from 'react';
import { UserProfile } from '../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Coins,
  BookOpen,
  GraduationCap,
  Search,
  CheckCircle2,
} from 'lucide-react';

interface HeroLandingProps {
  user: UserProfile;
  onStart: () => void;
  onSearchDemo: (query: string) => void;
  onOpenPublish: () => void;
  onViewOwnProfile?: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  user,
  onStart,
  onSearchDemo,
  onOpenPublish,
  onViewOwnProfile,
}) => {
  return (
    <div className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Background soft glow circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-100/60 to-transparent -z-10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold shadow-xs">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Marketplace universitario exclusivo para estudiantes</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          </div>
        </div>

        {/* Hero Title & Slogan */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            <span className="text-blue-600">UniMarket</span>
            <br />
            <span className="text-slate-800 text-2xl sm:text-4xl lg:text-5xl font-extrabold block mt-2">
              Compra, vende y aprende entre compañeros
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto pt-2">
            El espacio confiable para comprar libros y materiales académicos a buen precio, o contratar tutorías y servicios con compañeros de tu propia universidad.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 sm:pt-6">
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Empezar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenPublish}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-300 shadow-xs transition-all hover:border-slate-400 cursor-pointer"
            >
              Publicar un producto o servicio
            </button>
          </div>
        </div>

        {/* Interactive Wow-Moment Demo Banner */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Momento Wow con IA de Gemini</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              ¿Tienes un parcial difícil o necesitas pasar una materia?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-5">
              Nuestra búsqueda inteligente entiende tu necesidad y te devuelve al mismo tiempo el <strong>libro que necesitas</strong> y a un <strong>compañero de tu misma universidad que da tutorías</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onSearchDemo('necesito pasar Cálculo II')}
                className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-blue-600" />
                <span>Probar: "necesito pasar Cálculo II"</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full uppercase font-extrabold tracking-wider">
                  1 Clic
                </span>
              </button>

              <button
                onClick={() => onSearchDemo('bata de laboratorio')}
                className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-medium text-xs sm:text-sm transition-all border border-white/20 cursor-pointer"
              >
                Probar: "bata de laboratorio"
              </button>

              <button
                onClick={() => onSearchDemo('tutoría programación python')}
                className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-medium text-xs sm:text-sm transition-all border border-white/20 cursor-pointer"
              >
                Probar: "programación python"
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Value */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 sm:mt-14">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Coins className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1.5">Ahorra y gana dinero</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Consigue libros y calculadoras usadas hasta 70% más baratas, o monetiza tus conocimientos dando tutorías o diseñando para otros estudiantes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1.5">Solo comunidad universitaria</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Perfiles con correo institucional (.edu.co) y campus identificado para mayor confianza y cercanía en cada trato entre compañeros.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1.5">Trato directo en el campus</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sin intermediarios ni comisiones raras. Contactas al vendedor por WhatsApp y coordinan la entrega en la biblioteca, cafetería o facultad.
            </p>
          </div>
        </div>

        {/* Verified User Pill */}
        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={onViewOwnProfile}
            title="Ver tu perfil público universitario"
            className="inline-flex items-center text-xs text-slate-500 hover:text-blue-700 bg-white hover:bg-blue-50/80 px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-blue-300 transition-colors gap-2 cursor-pointer shadow-2xs"
          >
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>
              Navegando como <strong>{user.name}</strong> en <strong>{user.university}</strong>
            </span>
            <span className="text-[10px] text-blue-600 font-bold bg-blue-100/70 px-1.5 py-0.2 rounded-full">
              Ver perfil
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
