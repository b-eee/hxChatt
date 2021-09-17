import {Vue, Component, Prop} from 'vue-property-decorator';
import { Hexabase } from '~/../../react/hexabase-sdk/dist';
import Items from '~/../../react/hexabase-sdk/dist/items/items';
import { History as ItemMsgHistory, History2, Item, ItemHistories, UserInfoResp } from '~/../../react/hexabase-sdk/dist/models';
// import { ServerSent } from '~/../../react/hexabase-sdk/dist/services/sso';
// import {Hexabase} from 'hexabase-sdk';
import './index.css';

import * as signalR from "@microsoft/signalr";

@Component
export default class IndexComponent extends Vue {
    message: string = ''
    chatRoomItems = [] as Array<any>;
    items: Items = {} as Items;
    messages = [] as any;
    currentUser: UserInfoResp = {} as UserInfoResp;
    
    // current channel/event
    currentChan = '';

    // current selected item id 
    currentItemID = '';

    // message object key = eventID, value = messages
    messageHub = {} as any;

    connection: signalR.HubConnection = {} as signalR.HubConnection;

    created() {
        console.log('here!!')
        this.fetchData().then(() =>
        {
            // this.init_sso();
            this.chatRoomItems.forEach(room =>
            {
                // let eventName = `item_view_${room.i_id}_${this.currentUser.u_id}`;
                let eventName = this.channelEventID(room.i_id);
                console.log(eventName)
                this.connection.on(eventName, (msg) => {
                    console.log(msg)
                    this.messages.push(msg)
                    // this.messageHub[room.i_id].push()
                    // if(!this.messageHub[msg.eventID])
                    // {
                    //     this.messageHub[msg.eventID] = []
                    // };

                    // this.messageHub[msg.eventID].push(msg);
                });                
            })            
        });

        this.chatRoomItems = []

        this.connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5006/hub")
        .build();

        this.connection.start().catch(err => document.write(err));        
    }

    async fetchData(): Promise<void> {
        this.currentUser = await Hexabase.users().userInfoAsync();

        this.items = new Items()
        let result = await this.items.getItemsAsync({ 
                project_id: 'chat2_test', 
                datastore_id: 'chat1_test_db1', 
                per_page: 10, 
                page: 1, 
                use_display_id: true  
            })
        this.chatRoomItems = result.items
    }

    newMessage(e: any) {
        console.log(e)
        if(!this.currentItemID) return false;
        // this.connection.invoke('NewMessage', this.message)
        this.$axios.post(`https://localhost:5005/api/messages/${this.currentChan}`, {
            message: this.message,
            i_id: this.currentItemID
        })
        this.message = ''
    }

    channelEventID (i_id: string): string 
    {
        return `item_view_${i_id}_${this.currentUser.u_id}`;
    }

    async InitChanOnClck(e: any)
    {
        this.currentItemID = e.key;
        this.currentChan = this.channelEventID(e.key);
        // this.messages = this.messageHub[this.currentChan]

        this.$axios.get(`https://localhost:5005/api/messages/${e.key}`).then(
            res => {
                this.messages = res.data;
                // this.messageHub[this.currentChan] = res.data;
                // console.log(this.messageHub[this.currentChan])
            }
        )
    }

}