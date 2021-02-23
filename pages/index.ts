import {Vue, Component, Prop} from 'vue-property-decorator';
import Items from '~/../../react/hexabase-sdk/dist/items/items';
import { Item, ItemsResp } from '~/../../react/hexabase-sdk/dist/models/items';
import './index.css';

@Component
export default class IndexComponent extends Vue {
    message: string = 'this is a message'
    chatRoomItems: Item[] = [];

    created() {
        console.log('loading!')
        console.log(this.$store)
        this.fetchData();
    }

    async fetchData() {
        let item = new Items()
        let result = await item.getItemsAsync({ 
                project_id: 'newproject-1', 
                datastore_id: 'chat1', 
                per_page: 10, 
                page: 1, 
                use_display_id: true  
            })
        this.chatRoomItems = result.items
    }

    // get someValue() {
    //     return this.$store.state.chatMod.somefield
    // }
}