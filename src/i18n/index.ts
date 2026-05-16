import { zh } from './zh';
import { en } from './en';

export type TranslationKeys = typeof zh;

export function getTranslation(locale: string): TranslationKeys {
  return locale === 'zh' ? zh : en;
}

export { zh, en };
