import React, { useState } from 'react';
import { Category, SearchState, UserProfile } from '../types';
import { formatCOP } from '../utils/formatters';
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  X,
  GraduationCap,
  RotateCcw,
  BookOpen,
  Laptop,
  Briefcase,
  Users,
  Package,
} from 'lucide-react';

interface FilterBarProps {
  searchState: SearchState;
  onSearchChange: (updated: Partial<SearchState>) => void;
  onExecuteSearch: (queryOverride?: string) => void;
  isSearchingAI: boolean;
  user: UserProfile;
  totalResults: number;
}

const CATEGORIES: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: 'Todos', label: 'Todos', icon: <Package className="w-4 h-4" /> },
  { id: 'Libros', label: 'Libros', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'Tecnología', label: 'Tecnología', icon: <Laptop className="w-4 h-4" /> },
  { id: 'Materiales', label: 'Materiales', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'Tutorías', label: 'Tutorías', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'Servicios', label: 'Servicios', icon: <Users className="w-4 h-4" /> },
];

const SUGGESTIONS = [
  { label: '⚡ necesito pasar Cálculo II', query: 'necesito pasar Cálculo II' },
  { label: '🥼 bata de laboratorio', query: 'bata de laboratorio' },
  { label: '🔢 calculadora casio', query: 'calculadora casio' },
  { label: '💻 tutoría programación python', query: 'tutoría programación python' },
  { label: '🎨 diseño posters y diapositivas', query: 'diseño posters' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchState,
  onSearchChange,
  onExecuteSearch,
  isSearchingAI,
  user,
  totalResults,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onExecuteSearch();
    }
  };

  const handleSuggestionClick = (query: string) => {
    onSearchChange({ query });
    onExecuteSearch(query);
  };

  const clearAllFilters = () => {
    onSearchChange({
      query: '',
      category: 'Todos',
      type: 'Todos',
      minPrice: 0,
      maxPrice: 1500000,
      onlyMyUniversity: false,
      sortBy: 'relevance',
    });
    onExecuteSearch('');
  };

  return (
    <div className="space-y-4">
      {/* Search Input Box */}
      <div className="relative flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-blue-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchState.query}
            onChange={(e) => onSearchChange({ query: e.target.value })}
            onKeyDown={handleKeyDown}
            placeholder="Busca en lenguaje natural: ej. 'necesito pasar Cálculo II' o 'bata de laboratorio'..."
            className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-xs font-medium placeholder:text-slate-400"
          />

          {searchState.query && (
            <button
              onClick={() => {
                onSearchChange({ query: '' });
                onExecuteSearch('');
              }}
              className="absolute right-24 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => onExecuteSearch()}
            disabled={isSearchingAI}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isSearchingAI ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-3.5 h-3.5" />
            )}
            <span>Buscar</span>
          </button>
        </div>

        {/* Toggle Filters Mobile / Desktop */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`px-4 py-3 sm:py-0 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 ${
            showAdvancedFilters || searchState.onlyMyUniversity || searchState.type !== 'Todos' || searchState.maxPrice < 1500000
              ? 'bg-blue-50 border-blue-300 text-blue-700'
              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filtros</span>
          {(searchState.onlyMyUniversity || searchState.type !== 'Todos' || searchState.maxPrice < 1500000) && (
            <span className="w-2 h-2 rounded-full bg-blue-600" />
          )}
        </button>
      </div>

      {/* Suggested Quick Searches Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-slate-400 font-bold shrink-0 text-[11px] uppercase tracking-wider">
          Sugerencias:
        </span>
        {SUGGESTIONS.map((sug) => (
          <button
            key={sug.label}
            onClick={() => handleSuggestionClick(sug.query)}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 text-slate-600 font-medium whitespace-nowrap transition-colors cursor-pointer shadow-2xs"
          >
            {sug.label}
          </button>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = searchState.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSearchChange({ category: cat.id })}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Advanced Collapsible Filters Panel */}
      {showAdvancedFilters && (
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Tipo de publicación
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
                {(['Todos', 'Producto', 'Servicio'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => onSearchChange({ type: t })}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      searchState.type === t
                        ? 'bg-white text-blue-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* University Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Filtro por universidad
              </label>
              <button
                type="button"
                onClick={() => onSearchChange({ onlyMyUniversity: !searchState.onlyMyUniversity })}
                className={`w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  searchState.onlyMyUniversity
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">Solo {user.university.split('(')[0] || 'mi universidad'}</span>
                </span>
                <span className={`w-3.5 h-3.5 rounded-full border shrink-0 ${searchState.onlyMyUniversity ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Ordenar resultados
              </label>
              <select
                value={searchState.sortBy}
                onChange={(e) => onSearchChange({ sortBy: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="relevance">Mayor relevancia (IA)</option>
                <option value="price-asc">Menor precio COP</option>
                <option value="price-desc">Mayor precio COP</option>
                <option value="rating">Mejor calificación</option>
              </select>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Rango de precio máximo:</span>
                <span className="text-blue-600 font-extrabold">{formatCOP(searchState.maxPrice)}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="1500000"
                step="10000"
                value={searchState.maxPrice}
                onChange={(e) => onSearchChange({ maxPrice: parseInt(e.target.value, 10) })}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 self-end cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          </div>
        </div>
      )}

      {/* Results Meta count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <p>
          Mostrando <strong>{totalResults}</strong> {totalResults === 1 ? 'publicación' : 'publicaciones'}
        </p>
        {searchState.onlyMyUniversity && (
          <span className="font-semibold text-blue-600 flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5" />
            Filtrado para {user.university}
          </span>
        )}
      </div>
    </div>
  );
};
