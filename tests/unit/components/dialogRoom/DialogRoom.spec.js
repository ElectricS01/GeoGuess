import DialogRoom from '@/components/dialogroom/DialogRoom.vue';
import settingsStore from '@/store/modules/settings.store';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import appInit from '../../testutils/appInit';
import { describe, it, beforeEach, expect } from 'vitest';

const args = appInit(createLocalVue());

describe('DialogRoom.vue', () => {
    let store;
    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                settingsStore,
            },
        });
    });

    it('render', () => {
        const wrapper = shallowMount(DialogRoom, {
            ...args,
            store,
        });

        expect(wrapper).toMatchSnapshot();
    });
});
