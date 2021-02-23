import {Module, VuexModule} from 'vuex-module-decorators';

@Module({
    name: 'chats',
    stateFactory: true,
    namespaced: true
})
export default class ChatModule extends VuexModule {
    somefield: string = 'somedata'
}