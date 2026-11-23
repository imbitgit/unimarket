import React from 'react';
import { UserProfile } from '../types';
import { Plus, GraduationCap, MapPin, Sparkles, Building2 } from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  onOpenProfile: () => void;
  onOpenOwnPublicProfile?: () => void;
  onOpenPublish: () => void;
  onNavigateHome: () => void;
  onNavigateExplore: () => void;
  activeView: 'home' | 'explore';
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenProfile,
  onOpenOwnPublicProfile,
  onOpenPublish,
  onNavigateHome,
  onNavigateExplore,
  activeView,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onNavigateHome}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Uni<span className="text-blue-600">Market</span>
                </span>
                <span className="hidden sm:inline-flex items-center text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  MVP Colombia
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Compra, vende y aprende entre compañeros
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={onNavigateHome}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeView === 'home'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={onNavigateExplore}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeView === 'explore'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Explorar Marketplace
            </button>
          </nav>

          {/* User Quick Profile & Publish CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Profile Badge */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl p-1">
              <button
                onClick={onOpenOwnPublicProfile}
                title="Ver tu perfil público de estudiante"
                className="flex items-center gap-2 p-1 sm:px-2 rounded-lg hover:bg-white text-left transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="hidden lg:block text-xs leading-tight">
                  <p className="font-semibold text-slate-800 line-clamp-1 flex items-center gap-1">
                    <span>{user.name}</span>
                    <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                      Mi perfil
                    </span>
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium truncate">
                    {user.university.split('(')[1]?.replace(')', '') || user.university.slice(0, 15)}
                  </p>
                </div>
              </button>

              <button
                onClick={onOpenProfile}
                title="Editar datos de mi universidad y correo"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-colors cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Publish CTA Button */}
            <button
              onClick={onOpenPublish}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden xs:inline">Publicar</span>
              <span className="xs:hidden">Crear</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
