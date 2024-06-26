import { createLocalVue } from '@vue/test-utils';
import countryNamePlugin from '/src/plugins/countryNamePlugin';
import { describe, it, expect } from 'vitest';

describe('countryNamePlugin.js', () => {
    const factory = () => {
        const Vue = createLocalVue();
        Vue.use(countryNamePlugin);
        return Vue;
    };
    it('$countryNameLocale should return Tunisie if french', () => {
        const Vue = factory();

        Vue.prototype.i18n = {
            locale: 'fr',
        };
        expect(Vue.prototype.$countryNameLocale('TN')).toBe('Tunisie');
    });

    it('$countryNameLocale should return Tunisia if it', () => {
        const Vue = factory();

        Vue.prototype.i18n = {
            locale: 'it',
        };
        expect(Vue.prototype.$countryNameLocale('TN')).toBe('Tunisia');
    });
});
