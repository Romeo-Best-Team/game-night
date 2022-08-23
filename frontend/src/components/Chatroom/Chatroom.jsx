import {useEffect, useState} from 'react'
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window, LoadingIndicator, ChannelList } from 'stream-chat-react';
import axios from 'axios'
import './chatroom.css'
import 'stream-chat-react/dist/css/index.css'
// import * as dotenv from 'dotenv'
// dotenv.config()
// import express from 'express'

function Chatroom ({user}) {
    
    // const apiKey = REACT_APP_STREAM_API_KEY
    // console.log('api key', process.env.REACT_APP_STREAM_API_KEY)
    // console.log(process.env)
    // require('dotenv').config()
    // const apiKey = import.meta.env.VITE_STREAM_API_KEY
    // console.log(import.meta.env.VITE_STREAM_API_KEY)
    // console.log('process.env', process.env)
    // const user = {
    //     // we will get user from the database and it must include the user id for the chat use effect async function to work
    //     id: 'john',
    //     name: 'John',
    //     image: 'https://getstream.imgix.net/images/random_svf/FS.png',
    // }

    const getStreamAPI = async function () {
        const response = await axios.get('/streamapi')
        console.log('getstream api response.data', response.data.api, 'type', typeof(response.data.api))
        return response.data.api
    }

    const getToken = async function () {
        const response = await axios.get('/chattoken')
        console.log('gettoken response.data.token', response.data.token, 'type', typeof(response.data.token))
        return response.data.token
    }
    const [client, setClient] = useState(null)
    const [channel, setChannel] = useState(null)

    // filters only the channels that the user is a member of
    const filters = {type: 'messaging', members: {$in: [user.id]}}
    // puts the channel with the lattest message at the top
    const sort = {last_message_at: -1}

    useEffect(()=> {
        //this connects the client to the chat
        // console.log('USER.ID', user.id)
        // console.log('USER[ID]', user['id'])

        async function init() {
            // do i need to await getToken?
            const userToken = getToken()
            const chatClient = StreamChat.getInstance(getStreamAPI())
            //need to get this userToken from the backend
            // https://getstream.io/chat/docs/react/tokens_and_authentication/?language=javascript
            await chatClient.connectUser(user, userToken)
            

            //shouldn't need all this channel specific stuff since have channel list
            const channel = chatClient.channel('messaging', 'User1Chat', {
                // add as many custom fields as you'd like
                image: 'https://picsum.photos/200',
                // instead of name 
                name: 'User1Chat',
                members: [user['id']]
            })

            // await channel.create()
            setChannel(channel)
            
            await channel.watch()
            setClient(chatClient)

        }
        init()
        return () => { if (client) client.disconnectUser()}
    }, [])

    // if the channel or client hasn't been updated yet show a loading image
    // if (!channel || !client) return <LoadingIndicator />
    if (!client) return <LoadingIndicator />

    return (
        <Chat client = {client} theme = "messaging light">
        {/* <ChannelList 
        filters ={filters}
        sort = {sort}/>     */}
        {/* ChannelList will get all the channels so don't need next line */}
            <Channel channel = {channel}>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    )
}

export default Chatroom



// How to send a message:
// const message = await channel.sendMessage({
//     text: "Did you already see the trailer? https://www.youtube.com/watch?v=wA38GCX4Tb0",
//   });
  
//   return message;


// 17:00: https://www.youtube.com/watch?v=WjvZL0bnbIE&list=PLQ8qxSPP3G8D-qYKE0TnyyPlZ69HGebmM&index=26&t=8s
// https://dashboard.getstream.io/app/1205628/chat/rolespermissions/roles
// 'name': Channel Member permissions
// 'resources': ['UpdateChannelMembers]-> allows channel members to add members to a channel
// 'name: 'Users can create channels'
// resources: ['UpdateChannelMembers] -> allows users to add themselves and other users to a channel
// resources: ['ReadChannel']-> allows users to read public channels