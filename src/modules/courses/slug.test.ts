import { describe, expect, it } from 'vitest';

import { normalizeSlugPart, resolveSlugInput } from './slug';

describe('normalizeSlugPart', () => {
  it('transliterates cyrillic text into a latin slug', () => {
    expect(normalizeSlugPart('Первый контакт с клиентом')).toBe('pervyy-kontakt-s-klientom');
  });

  it('removes punctuation and duplicate separators', () => {
    expect(normalizeSlugPart('  Test / slug --- draft  ')).toBe('test-slug-draft');
  });
});

describe('resolveSlugInput', () => {
  it('uses normalized slug when provided', () => {
    expect(
      resolveSlugInput({
        slug: 'Мой новый курс',
        fallback: 'Не должен использоваться',
      }),
    ).toBe('moy-novyy-kurs');
  });

  it('falls back to title when slug is empty after normalization', () => {
    expect(
      resolveSlugInput({
        slug: '***',
        fallback: 'Курс для новичков',
      }),
    ).toBe('kurs-dlya-novichkov');
  });
});
