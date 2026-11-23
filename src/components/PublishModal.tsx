import React, { useState } from 'react';
import { ListingItem, UserProfile, ListingType, Category, ProductCondition, ServiceMode } from '../types';
import {
  X,
  PlusCircle,
  Sparkles,
  Tag,
  DollarSign,
  Phone,
  Building2,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onPublish: (newItem: ListingItem) => void;
}

const PRESET_IMAGES = [
  { label: 'Libros / Apuntes', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80' },
  { label: 'Tutoría / Estudio', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=700&q=80' },
  { label: 'Calculadora / Tech', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=700&q=80' },
  { label: 'Laboratorio / Medicina', url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=700&q=80' },
  { label: 'Diseño / Creativo', url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=700&q=80' },
  { label: 'Programación / PC', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=700&q=80' },
];

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onPublish,
}) => {
  const [type, setType] = useState<ListingType>('Producto');
  const [category, setCategory] = useState<Exclude<Category, 'Todos'>>('Libros');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<ProductCondition>('Usado - Buen estado');
  const [serviceMode, setServiceMode] = useState<ServiceMode>('Por hora');
  const [description, setDescription] = useState('');
  const [whatsapp, setWhatsapp] = useState(currentUser.whatsapp || '+57 318 456 7890');
  const [campus, setCampus] = useState(currentUser.campus || 'Campus Central');
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0].url);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedSuccess, setEnhancedSuccess] = useState(false);

  if (!isOpen) return null;

  // Handle AI Enhance description
  const handleEnhanceWithAI = async () => {
    if (!title.trim()) {
      alert('Por favor escribe al menos un título antes de mejorar con IA');
      return;
    }

    setIsEnhancing(true);
    setEnhancedSuccess(false);

    try {
      const res = await fetch('/api/enhance-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          type,
          category,
          rawText: description,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.enhanced) {
          setDescription(data.enhanced);
          setEnhancedSuccess(true);
          setTimeout(() => setEnhancedSuccess(false), 3000);
        }
      }
    } catch (err) {
      console.warn('Error mejorando con IA:', err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    const numPrice = parseInt(price.replace(/\D/g, ''), 10) || 0;

    const newItem: ListingItem = {
      id: `listing-${Date.now()}`,
      title: title.trim(),
      type,
      category,
      price: numPrice,
      condition: type === 'Producto' ? condition : undefined,
      serviceMode: type === 'Servicio' ? serviceMode : undefined,
      description: description.trim() || 'Publicado recientemente por un estudiante.',
      sellerName: currentUser.name,
      sellerUniversity: currentUser.university,
      sellerCampus: campus,
      sellerPhone: whatsapp,
      sellerEmail: currentUser.email,
      rating: 5.0,
      reviewCount: 1,
      verifiedStudent: true,
      image: selectedImage,
      badge: 'Nuevo',
      tags: [title.toLowerCase(), category.toLowerCase(), type.toLowerCase()],
      createdAt: new Date().toISOString(),
    };

    onPublish(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <PlusCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">Publicar en UniMarket</h3>
              <p className="text-xs text-blue-100">
                Tu publicación aparecerá de inmediato en los resultados
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Type Toggle: Producto vs Servicio */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              ¿Qué deseas ofrecer?
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setType('Producto');
                  if (category === 'Tutorías') setCategory('Libros');
                }}
                className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  type === 'Producto'
                    ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>📦 Producto Físico</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setType('Servicio');
                  if (category === 'Libros' || category === 'Materiales') setCategory('Tutorías');
                }}
                className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  type === 'Servicio'
                    ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>🎓 Servicio / Tutoría</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Título de la publicación
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                type === 'Producto'
                  ? 'Ej. Libro Cálculo Trascendentes Tempranas Stewart 8va Ed.'
                  : 'Ej. Tutorías de Cálculo II (Integrales y Parciales)'
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            />
          </div>

          {/* Category & Condition/Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white font-medium"
              >
                {type === 'Producto' ? (
                  <>
                    <option value="Libros">Libros</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Materiales">Materiales</option>
                  </>
                ) : (
                  <>
                    <option value="Tutorías">Tutorías</option>
                    <option value="Servicios">Servicios</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {type === 'Producto' ? 'Estado del artículo' : 'Modalidad de cobro'}
              </label>
              {type === 'Producto' ? (
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as ProductCondition)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white font-medium"
                >
                  <option value="Nuevo">Nuevo</option>
                  <option value="Usado - Como nuevo">Usado - Como nuevo</option>
                  <option value="Usado - Buen estado">Usado - Buen estado</option>
                  <option value="Usado - Aceptable">Usado - Aceptable</option>
                </select>
              ) : (
                <select
                  value={serviceMode}
                  onChange={(e) => setServiceMode(e.target.value as ServiceMode)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white font-medium"
                >
                  <option value="Por hora">Por hora</option>
                  <option value="Por asesoría">Por asesoría</option>
                  <option value="Por proyecto">Por proyecto</option>
                  <option value="A convenir">A convenir</option>
                </select>
              )}
            </div>
          </div>

          {/* Price (COP) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Precio en COP</span>
              <span className="text-[11px] text-slate-500 font-normal">
                Pesos Colombianos
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                required
                min="1000"
                step="1000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="45000"
                className="w-full pl-8 pr-16 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-bold"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-xs">
                COP
              </span>
            </div>
          </div>

          {/* Description with "Mejorar con IA" */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Descripción</span>
              </label>

              {/* Enhance with Gemini button */}
              <button
                type="button"
                onClick={handleEnhanceWithAI}
                disabled={isEnhancing}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                {isEnhancing ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Mejorando...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span>✨ Mejorar con IA</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el estado del producto, temas que cubres en la tutoría o lugar preferido de encuentro en el campus..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {enhancedSuccess && (
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Descripción optimizada con IA exitosamente.</span>
              </p>
            )}
          </div>

          {/* Preset Photo Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>Selecciona una imagen ilustrativa</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRESET_IMAGES.map((img) => (
                <button
                  type="button"
                  key={img.label}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === img.url
                      ? 'border-blue-600 ring-2 ring-blue-500/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-white text-center py-0.5 truncate px-1">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>WhatsApp de contacto</span>
              </label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+57 318 456 7890"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Lugar de entrega en el campus</span>
              </label>
              <input
                type="text"
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                placeholder="Ej. Biblioteca Central / Cafetería"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Publicar de inmediato</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
