import {Vue, Component, Prop} from 'vue-property-decorator';
import { Hexabase } from '~/../../react/hexabase-sdk/dist';
// import {Hexabase} from 'hexabase-sdk';
import Items from '~/../../react/hexabase-sdk/dist/items/items';
import { ItemHistories, History as ItemMsgHistory, History2 } from '~/../../react/hexabase-sdk/dist/models/histories';
import { Item, ItemsResp } from '~/../../react/hexabase-sdk/dist/models/items';
import { UserInfoResp } from '~/../../react/hexabase-sdk/dist/models/users';
import { ServerSent } from '~/../../react/hexabase-sdk/dist/services/sso';
import './index.css';

@Component
export default class IndexComponent extends Vue {
    message: string = 'this is a message'
    chatRoomItems: Item[] = [];
    items: Items = {} as Items;
    messages: ItemHistories = {} as ItemHistories;
    currentUser: UserInfoResp = {} as UserInfoResp;
    sse: ServerSent = {} as ServerSent;

    created() {
        this.fetchData().then(() =>
        {
            this.init_sso();
        });
    }

    async fetchData(): Promise<void> {
        this.currentUser = await Hexabase.users().userInfoAsync();

        this.items = new Items()
        let result = await this.items.getItemsAsync({ 
                project_id: 'chat1_test', 
                datastore_id: 'chat1_test_db1', 
                per_page: 10, 
                page: 1, 
                use_display_id: true  
            })
        this.chatRoomItems = result.items
    }

    async init_sso() {
        this.sse = Hexabase.serverSent();
        var conn = await this.sse.connectByWsAndUser();
        conn.onerror = function(ev: Event) 
        {
            // console.log(ev)
        }
    }

    async InitChanOnClck(e: any)
    {
        this.messages = await this.items.getItemHistories(`chat1`, e.key);
        this.sse.addEventListener(`item_view_${e.key}_${this.currentUser.u_id}`, (e: any) =>
        {
            this.messages.histories.unshift({
                history: {
                    username: e.message.username,
                    comment: e.message.comment
                } as History2
            } as ItemMsgHistory);
        })
    }

}