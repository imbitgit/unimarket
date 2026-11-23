import { ListingItem, UserProfile } from '../types';

export function formatCOP(amount: number): string {
  const formatted = new Intl.NumberFormat('es-CO', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount);
  return `$ ${formatted} COP`;
}

export function isValidInstitutionalEmail(email: string): boolean {
  if (!email || !email.includes('@')) return false;
  const lower = email.toLowerCase().trim();
  // Accepts .edu.co, .edu, univalle.edu.co, unal.edu.co, etc.
  return (
    lower.endsWith('.edu.co') ||
    lower.endsWith('.edu') ||
    lower.includes('.edu.') ||
    lower.includes('unal.edu.co') ||
    lower.includes('correounivalle.edu.co') ||
    lower.includes('uniandes.edu.co') ||
    lower.includes('javeriana.edu.co')
  );
}

export function buildWhatsAppLink(item: ListingItem, buyer: UserProfile): string {
  // Strip non-digits from phone number
  const cleanPhone = item.sellerPhone.replace(/\D/g, '');
  
  const greeting = `¡Hola ${item.sellerName.split(' ')[0]}!`;
  const subject = item.type === 'Producto' 
    ? `vi tu producto en UniMarket: *"${item.title}"* por ${formatCOP(item.price)}.`
    : `vi tu servicio en UniMarket: *"${item.title}"* (${item.serviceMode || 'tarifa'} ${formatCOP(item.price)}).`;
    
  const campusDelivery = item.sellerCampus 
    ? ` Me encuentro en ${buyer.university} (${buyer.campus || buyer.city}) y me gustaría coordinar para entrega/sesión.`
    : ` Soy estudiante de ${buyer.university}.`;

  const closing = ` ¿Sigue disponible? ¡Muchas gracias!`;

  const fullMessage = `${greeting} Mi nombre es ${buyer.name}, ${subject}${campusDelivery}${closing}`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMessage)}`;
}
