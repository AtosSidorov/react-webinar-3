import * as translations from './translations';

/**
 * Перевод фразы по словарю
 * @param lang {String} Код языка
 * @param text {String} Текст для перевода (вложенные ключи через точку)
 * @param [plural] {Number} Число для плюрализации
 * @returns {String} Переведенный текст
 */
export default function translate(lang, text, plural) {
  // Разбиваем ключ по точкам для вложенных структур
  const keys = text.split('.');
  let result = translations[lang];

  // Проходим по всем частям ключа
  keys.forEach(key => {
    result = result && key in result ? result[key] : null;
  });

  // Если результат не найден, возвращаем исходный текст
  if (!result) {
    // Вернем плоский ключ, если такой есть
    return translations[lang] && text in translations[lang]
      ? translations[lang][text]
      : text;
  }

  // Обрабатываем плюрализацию, если указано
  if (typeof plural !== 'undefined' && typeof result === 'object') {
    const key = new Intl.PluralRules(lang).select(plural);
    if (key in result) {
      result = result[key];
    }
  }

  return result;
}
