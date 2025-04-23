import i18n from "i18next";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// create a fallback system locale
const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale

i18n.init({
    fallbackLng: 'en',
    resources: {
        en: {
            translation: require('../../locales/en.json')
        }
    }
});

export default (lng) => i18n.getFixedT(lng || systemLocale);