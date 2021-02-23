import Vuex from 'vuex';
import ChatModule from './chatmodule';

const store = new Vuex.Store({
    modules: {
        chatMod: ChatModule
    }
})

// import { Store } from 'vuex'
// import { initialiseStores } from '~/utils/store-accessor'

// const initializer = (store: Store<any>) => initialiseStores(store)

// export const plugins = [initializer]
// export * from '~/utils/store-accessor'