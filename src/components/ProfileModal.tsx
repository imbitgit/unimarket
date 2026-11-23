import React, { useState } from 'react';
import { UserProfile } from '../types';
import { UNIVERSITIES_COLOMBIA } from '../data/mockData';
import { isValidInstitutionalEmail } from '../utils/formatters';
import {
  X,
  GraduationCap,
  Mail,
  User,
  MapPin,
  Building2,
  Phone,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSave: (updated: UserProfile) => void;
  isInitialSetup?: boolean;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
  isInitialSetup = false,
}) => {
  const [formData, setFormData] = useState<UserProfile>(user);
  const [touchedEmail, setTouchedEmail] = useState(false);

  if (!isOpen) return null;

  const isEmailValid = isValidInstitutionalEmail(formData.email);

  const handleUniversityChange = (uniName: string) => {
    const selectedUni = UNIVERSITIES_COLOMBIA.find((u) => u.name === uniName);
    setFormData((prev) => ({
      ...prev,
      university: uniName,
      city: selectedUni ? selectedUni.city : prev.city,
      campus: selectedUni && selectedUni.campuses[0] ? selectedUni.campuses[0] : prev.campus,
      // If email was empty or default domain, update domain suggestion
      email: selectedUni && prev.email.includes('@')
        ? `${prev.email.split('@')[0]}@${selectedUni.domain}`
        : prev.email,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
    onClose();
  };

  const selectedUniConfig = UNIVERSITIES_COLOMBIA.find((u) => u.name === formData.university);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-snug">
                {isInitialSetup ? 'Configura tu perfil de estudiante' : 'Perfil rápido de estudiante'}
              </h3>
              <p className="text-xs text-blue-100">
                Demo MVP: Sin contraseñas ni registros engorrosos
              </p>
            </div>
          </div>
          {!isInitialSetup && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Nombre completo</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej. Brigitte Chávez"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-medium"
            />
          </div>

          {/* University Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Universidad</span>
            </label>
            <select
              value={formData.university}
              onChange={(e) => handleUniversityChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-medium bg-white"
            >
              {UNIVERSITIES_COLOMBIA.map((uni) => (
                <option key={uni.name} value={uni.name}>
                  {uni.name} - {uni.city}
                </option>
              ))}
            </select>
          </div>

          {/* Campus and City (2 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Sede / Campus</span>
              </label>
              <input
                type="text"
                value={formData.campus}
                onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                placeholder="Ej. Campus Meléndez"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Ciudad
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Ej. Cali"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Institutional Email with Validation */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Correo institucional</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-500 lowercase">
                (debe terminar en .edu.co o similar)
              </span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onBlur={() => setTouchedEmail(true)}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setTouchedEmail(true);
                }}
                placeholder="ejemplo@correounivalle.edu.co"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors ${
                  touchedEmail && !isEmailValid
                    ? 'border-amber-400 bg-amber-50/40 focus:ring-amber-500'
                    : isEmailValid
                    ? 'border-emerald-400 bg-emerald-50/30 focus:ring-emerald-500'
                    : 'border-slate-300 focus:ring-blue-600'
                }`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isEmailValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : touchedEmail ? (
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                ) : null}
              </div>
            </div>

            {/* Validation Feedback */}
            {touchedEmail && !isEmailValid && (
              <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                <span>⚠️ Por favor ingresa un correo con dominio universitario (ej. tu_nombre@{selectedUniConfig?.domain || 'univalle.edu.co'}).</span>
              </p>
            )}
            {isEmailValid && (
              <p className="text-xs text-emerald-700 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Correo universitario verificado para la demo.</span>
              </p>
            )}
          </div>

          {/* WhatsApp for contact */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Número de WhatsApp para coordinar tratos</span>
            </label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="+57 318 456 7890"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-medium"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Se utilizará al presionar "Contactar" para que los compañeros te reconozcan.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Continuar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
