import i18n
    from 'i18next';
import {
    initReactI18next
} from 'react-i18next';

import vi
    from './locales/vi.json';
import en
    from './locales/en.json';

const browserLanguage = navigator.language.startsWith('vi') ? 'vi' : 'en';

i18n
        .use(initReactI18next)
        .init({
            resources: {
                vi: {translation: vi},
                en: {translation: en}
            },
            lng: browserLanguage,
            fallbackLng: "en",
            interpolation: {
                escapeValue: false
            }
        });

export default i18n;