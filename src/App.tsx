/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ListingItem, UserProfile, SearchState, StudentProfile } from './types';
import { INITIAL_LISTINGS, INITIAL_USER_PROFILE } from './data/mockData';
import { getStudentProfile } from './data/studentProfiles';
import { performIntelligentSearch } from './services/aiSearch';
import { Header } from './components/Header';
import { HeroLanding } from './components/HeroLanding';
import { FilterBar } from './components/FilterBar';
import { ListingCard } from './components/ListingCard';
import { ListingDetailModal } from './components/ListingDetailModal';
import { WhatsAppContactModal } from './components/WhatsAppContactModal';
import { ProfileModal } from './components/ProfileModal';
import { PublishModal } from './components/PublishModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import {
  Sparkles,
  GraduationCap,
  Plus,
  Compass,
  Home,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  PackageX,
} from 'lucide-react';

export default function App() {
  // 1. User Profile State (persisted in localStorage)
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('unimarket_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading stored profile:', e);
    }
    return INITIAL_USER_PROFILE;
  });

  // 2. Listings State (persisted in localStorage)
  const [listings, setListings] = useState<ListingItem[]>(() => {
    try {
      const saved = localStorage.getItem('unimarket_listings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading stored listings:', e);
    }
    return INITIAL_LISTINGS;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('unimarket_user_profile', JSON.stringify(user));
    } catch (e) {
      console.warn('Error saving user profile:', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('unimarket_listings', JSON.stringify(listings));
    } catch (e) {
      console.warn('Error saving listings:', e);
    }
  }, [listings]);

  // 3. Navigation View
  const [activeView, setActiveView] = useState<'home' | 'explore'>('home');

  // 4. Search & Filter State
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    category: 'Todos',
    type: 'Todos',
    maxPrice: 1500000,
    minPrice: 0,
    onlyMyUniversity: false,
    sortBy: 'relevance',
  });

  // AI Search Results
  const [aiAdvisor, setAiAdvisor] = useState<string | null>(null);
  const [aiMatchMap, setAiMatchMap] = useState<Record<string, { score: number; reason: string }>>({});
  const [isSearchingAI, setIsSearchingAI] = useState(false);

  // 5. Modals State
  const [selectedDetailItem, setSelectedDetailItem] = useState<ListingItem | null>(null);
  const [contactItem, setContactItem] = useState<ListingItem | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [viewingProfile, setViewingProfile] = useState<StudentProfile | null>(null);

  const handleOpenStudentProfile = (sellerName: string) => {
    const profile = getStudentProfile(sellerName, listings, user);
    setViewingProfile(profile);
  };

  // 6. Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Perform search (AI or fallback)
  const executeSearch = async (queryOverride?: string) => {
    const q = (queryOverride !== undefined ? queryOverride : searchState.query).trim();

    if (!q) {
      setAiAdvisor(null);
      setAiMatchMap({});
      return;
    }

    setIsSearchingAI(true);
    try {
      const res = await performIntelligentSearch(q, listings);
      if (res.success && res.matches) {
        const map: Record<string, { score: number; reason: string }> = {};
        res.matches.forEach((m) => {
          map[m.id] = { score: m.score, reason: m.reason };
        });
        setAiMatchMap(map);
        setAiAdvisor(res.aiAdvisor || null);
      }
    } catch (err) {
      console.error('Error executing search:', err);
    } finally {
      setIsSearchingAI(false);
    }
  };

  // Handle Demo Search from Hero
  const handleHeroDemoSearch = (query: string) => {
    setSearchState((prev) => ({
      ...prev,
      query,
      category: 'Todos',
      type: 'Todos',
    }));
    setActiveView('explore');
    executeSearch(query);
  };

  // Handle publishing new item
  const handlePublish = (newItem: ListingItem) => {
    setListings((prev) => [newItem, ...prev]);
    showToast(`¡Tu publicación "${newItem.title}" ya está activa en UniMarket!`);
    setActiveView('explore');
  };

  // Compute filtered & sorted listings
  const filteredListings = useMemo(() => {
    return listings
      .filter((item) => {
        // Category filter
        if (searchState.category !== 'Todos' && item.category !== searchState.category) {
          return false;
        }

        // Type filter (Producto vs Servicio)
        if (searchState.type !== 'Todos' && item.type !== searchState.type) {
          return false;
        }

        // Price filter
        if (item.price > searchState.maxPrice) {
          return false;
        }

        // Only my university filter
        if (searchState.onlyMyUniversity) {
          const isSame =
            item.sellerUniversity.toLowerCase().includes(user.university.toLowerCase()) ||
            user.university.toLowerCase().includes(item.sellerUniversity.toLowerCase()) ||
            (user.university.includes('Univalle') && item.sellerUniversity.includes('Univalle'));
          if (!isSame) return false;
        }

        // Search query filter (if active query and AI matches exist, give priority to matches)
        if (searchState.query.trim()) {
          const hasAiMatches = Object.keys(aiMatchMap).length > 0;
          if (hasAiMatches) {
            // Keep if in AI matches
            return !!aiMatchMap[item.id];
          } else {
            // Fallback string matching
            const q = searchState.query.toLowerCase();
            const matchTitle = item.title.toLowerCase().includes(q);
            const matchDesc = item.description.toLowerCase().includes(q);
            const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
            const matchSeller = item.sellerName.toLowerCase().includes(q);
            return matchTitle || matchDesc || matchTags || matchSeller;
          }
        }

        return true;
      })
      .sort((a, b) => {
        // If sorting by relevance and AI matches exist
        if (searchState.sortBy === 'relevance' && Object.keys(aiMatchMap).length > 0) {
          const scoreA = aiMatchMap[a.id]?.score || 0;
          const scoreB = aiMatchMap[b.id]?.score || 0;
          if (scoreB !== scoreA) return scoreB - scoreA;
        }

        // Always give slight priority boost to user's same university so it stands out
        const aIsMyUni = a.sellerUniversity.includes(user.university.slice(0, 10)) ? 1 : 0;
        const bIsMyUni = b.sellerUniversity.includes(user.university.slice(0, 10)) ? 1 : 0;

        if (searchState.sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (searchState.sortBy === 'price-desc') {
          return b.price - a.price;
        }
        if (searchState.sortBy === 'rating') {
          return b.rating - a.rating;
        }

        // Default: same university boost then recency
        if (bIsMyUni !== aIsMyUni) return bIsMyUni - aIsMyUni;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [listings, searchState, aiMatchMap, user.university]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 text-xs sm:text-sm font-semibold max-w-md">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Global Header */}
      <Header
        user={user}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenOwnPublicProfile={() => handleOpenStudentProfile(user.name)}
        onOpenPublish={() => setIsPublishModalOpen(true)}
        onNavigateHome={() => setActiveView('home')}
        onNavigateExplore={() => setActiveView('explore')}
        activeView={activeView}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'home' ? (
          <div>
            <HeroLanding
              user={user}
              onStart={() => setActiveView('explore')}
              onSearchDemo={handleHeroDemoSearch}
              onOpenPublish={() => setIsPublishModalOpen(true)}
              onViewOwnProfile={() => handleOpenStudentProfile(user.name)}
            />

            {/* Featured Preview Section on Home */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Publicaciones destacadas en tu campus
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Artículos y servicios con entrega directa en <strong>{user.university}</strong>
                  </p>
                </div>

                <button
                  onClick={() => setActiveView('explore')}
                  className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas ({listings.length})</span>
                  <span>→</span>
                </button>
              </div>

              {/* Sample 4 items grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {listings.slice(0, 4).map((item) => (
                  <ListingCard
                    key={item.id}
                    item={item}
                    currentUser={user}
                    onContact={(it) => setContactItem(it)}
                    onViewDetail={(it) => setSelectedDetailItem(it)}
                    onViewSellerProfile={handleOpenStudentProfile}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Pantalla 3: Explorar / Resultados */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Top Filter and Search Bar */}
            <div className="mb-6">
              <FilterBar
                searchState={searchState}
                onSearchChange={(updated) => setSearchState((prev) => ({ ...prev, ...updated }))}
                onExecuteSearch={executeSearch}
                isSearchingAI={isSearchingAI}
                user={user}
                totalResults={filteredListings.length}
              />
            </div>

            {/* AI Advisor Banner (when active) */}
            {aiAdvisor && (
              <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/50 to-blue-50 border border-blue-200/80 shadow-xs animate-in fade-in duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-0.5">
                      Asistente Inteligente UniMarket (Gemini AI)
                    </h4>
                    <p className="text-sm font-medium text-slate-800 leading-relaxed">
                      {aiAdvisor}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Results Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredListings.map((item) => (
                  <ListingCard
                    key={item.id}
                    item={item}
                    currentUser={user}
                    onContact={(it) => setContactItem(it)}
                    onViewDetail={(it) => setSelectedDetailItem(it)}
                    onViewSellerProfile={handleOpenStudentProfile}
                    aiMatchReason={aiMatchMap[item.id]?.reason}
                  />
                ))}
              </div>
            ) : (
              /* Empty Results State */
              <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 max-w-xl mx-auto my-8 shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <PackageX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  No encontramos publicaciones con esos filtros
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-sm mx-auto">
                  Intenta buscar con otros términos o amplía el rango de precio. O sé el primero en publicar lo que necesitas.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSearchState({
                        query: '',
                        category: 'Todos',
                        type: 'Todos',
                        minPrice: 0,
                        maxPrice: 1500000,
                        onlyMyUniversity: false,
                        sortBy: 'relevance',
                      });
                      executeSearch('');
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                  >
                    Restablecer filtros
                  </button>
                  <button
                    onClick={() => setIsPublishModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm transition-colors"
                  >
                    Publicar ahora
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">UniMarket</span>
            <span>— Compra, vende y aprende entre compañeros.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>MVP Universitario Colombia</span>
            <span>•</span>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="text-blue-600 hover:underline font-semibold"
            >
              Cambiar universidad activa
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Mobile Nav */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-40 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl p-2 flex items-center justify-around">
        <button
          onClick={() => setActiveView('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold ${
            activeView === 'home' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Inicio</span>
        </button>

        <button
          onClick={() => setActiveView('explore')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold ${
            activeView === 'explore' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Explorar</span>
        </button>

        <button
          onClick={() => setIsPublishModalOpen(true)}
          className="flex items-center gap-1 py-2 px-3.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-600/30"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Publicar</span>
        </button>
      </div>

      {/* Modals */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onSave={(updated) => {
          setUser(updated);
          showToast(`Perfil actualizado para ${updated.name} en ${updated.university}`);
        }}
      />

      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        currentUser={user}
        onPublish={handlePublish}
      />

      <ListingDetailModal
        item={selectedDetailItem}
        currentUser={user}
        isOpen={!!selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        onContact={(it) => setContactItem(it)}
        onViewSellerProfile={handleOpenStudentProfile}
      />

      <StudentProfileModal
        profile={viewingProfile}
        currentUser={user}
        listings={listings}
        isOpen={!!viewingProfile}
        onClose={() => setViewingProfile(null)}
        onSelectListing={(it) => setSelectedDetailItem(it)}
        onContactSeller={(it) => setContactItem(it)}
        onEditOwnProfile={() => setIsProfileModalOpen(true)}
      />

      <WhatsAppContactModal
        item={contactItem}
        buyer={user}
        isOpen={!!contactItem}
        onClose={() => setContactItem(null)}
      />
    </div>
  );
}
