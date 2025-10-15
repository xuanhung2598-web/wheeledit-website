// src/utils/loadTexts.ts
export async function loadTexts() {
  try {
    const res = await fetch('/data/texts.json');
    if (!res.ok) throw new Error('Cannot load texts.json');
    return await res.json();
  } catch (err) {
    console.error('Error loading texts.json:', err);
    return {};
  }
}
