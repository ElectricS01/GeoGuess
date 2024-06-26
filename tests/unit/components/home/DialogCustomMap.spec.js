import DialogCustomMap from '@/components/home/DialogCustomMap.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import appInit from '../../testutils/appInit';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import Vuex from 'vuex';
import homeStore from '@/store/modules/home.store';

const args = appInit(createLocalVue());
describe('DialogCustomMap.vue', () => {
    let store, actions;
    beforeEach(() => {
        actions = {
            loadGeoJsonFromUrl: vi.fn(),
            setGeoJson: vi.fn(),
            setGeoJsonString: vi.fn(),
        };
        store = new Vuex.Store({
            modules: {
                homeStore: {
                    state: homeStore.state,
                    getters: homeStore.getters,
                    actions,
                },
            },
        });
    });
    it('methods', () => {
        const wrapper = shallowMount(DialogCustomMap, { ...args, store });
        wrapper.vm.onChangeTextArea('sdsd');
        expect(actions.setGeoJsonString).toBeCalledWith(
            expect.anything(),
            'sdsd'
        );

        expect(wrapper.vm.checkIfStringGeoJsonValid('')).toBe(false);
    });

    it('watch', async () => {
        const wrapper = shallowMount(DialogCustomMap, { ...args, store });

        const file = new File(['foo'], 'foo.txt');
        wrapper.setData({ file: file });
        wrapper.vm.$nextTick(() => {
            wrapper.vm.$nextTick(() => {
                expect(actions.setGeoJsonString).toBeCalledWith(
                    expect.anything(),
                    'foo'
                );
            });
        });
        wrapper.setData({ url: 'https://url.geojson' });
        wrapper.vm.$nextTick(() => {
            expect(actions.loadGeoJsonFromUrl).toBeCalledWith(
                expect.anything(),
                'https://url.geojson'
            );
        });

        expect(wrapper.vm.rulesUrl[0]('sdsd')).toBeFalsy();
        wrapper.vm.checkIfStringGeoJsonValid = vi.fn();
        expect(wrapper.vm.rulesTextArea[0]('abc')).toBeFalsy();
        expect(wrapper.vm.checkIfStringGeoJsonValid).toBeCalledWith('abc');
    });
});
