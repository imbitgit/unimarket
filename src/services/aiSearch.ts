import { ListingItem, AISearchResult } from '../types';

export async function performIntelligentSearch(
  query: string,
  items: ListingItem[]
): Promise<AISearchResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    return { success: true, matches: [] };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500); // 6.5s timeout for snappy UX

    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: trimmed,
        items,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.success && Array.isArray(data.matches)) {
        return {
          success: true,
          aiAdvisor: data.aiAdvisor,
          matches: data.matches,
        };
      }
    }
  } catch (err) {
    console.warn('Búsqueda por IA no disponible o pausada, ejecutando respaldo por palabras clave:', err);
  }

  // Fallback to local keyword and semantic heuristic search
  return localKeywordSearch(trimmed, items);
}

export function localKeywordSearch(query: string, items: ListingItem[]): AISearchResult {
  const normalizedQuery = normalizeString(query);
  const words = normalizedQuery.split(/\s+/).filter((w) => w.length > 1);

  // Special detection for "cálculo", "calculo", "calculo 2", "calculo ii"
  const isCalculo2 =
    normalizedQuery.includes('calculo 2') ||
    normalizedQuery.includes('calculo ii') ||
    (normalizedQuery.includes('calculo') && (normalizedQuery.includes('pasar') || normalizedQuery.includes('2') || normalizedQuery.includes('ii')));

  const scored = items
    .map((item) => {
      let score = 0;
      const titleNorm = normalizeString(item.title);
      const descNorm = normalizeString(item.description);
      const tagsNorm = item.tags.map(normalizeString);
      const catNorm = normalizeString(item.category);

      // Calculation 2 special synergy
      if (isCalculo2) {
        if (titleNorm.includes('calculo') || tagsNorm.includes('calculo') || tagsNorm.includes('calculo 2') || tagsNorm.includes('calculo ii')) {
          score += 100;
        }
      }

      // Check title matches
      if (titleNorm.includes(normalizedQuery)) score += 80;
      for (const word of words) {
        if (titleNorm.includes(word)) score += 30;
        if (tagsNorm.some((t) => t.includes(word))) score += 25;
        if (descNorm.includes(word)) score += 12;
        if (catNorm.includes(word)) score += 15;
      }

      let reason = 'Coincidencia con el título o descripción.';
      if (item.type === 'Producto' && (titleNorm.includes('libro') || titleNorm.includes('stewart'))) {
        reason = 'Material bibliográfico para estudiar teoría y resolver talleres.';
      } else if (item.type === 'Servicio' && (titleNorm.includes('tutoria') || titleNorm.includes('clase'))) {
        reason = 'Acompañamiento personalizado para preparar parciales y resolver dudas.';
      } else if (item.category === 'Tecnología' || item.category === 'Materiales') {
        reason = 'Herramienta práctica requerida para tus cursos y laboratorios.';
      }

      return {
        id: item.id,
        score,
        reason,
      };
    })
    .filter((res) => res.score > 0)
    .sort((a, b) => b.score - a.score);

  let advisor = '';
  if (isCalculo2) {
    advisor = '💡 Para superar Cálculo II encontramos el libro guía de Stewart para ejercicios y un tutor destacado de tu universidad para preparar parciales.';
  } else if (scored.length > 0) {
    advisor = `💡 Encontramos ${scored.length} opciones entre productos y servicios que coinciden con tu búsqueda.`;
  }

  return {
    success: true,
    aiAdvisor: advisor,
    matches: scored,
    fallback: true,
  };
}

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}
