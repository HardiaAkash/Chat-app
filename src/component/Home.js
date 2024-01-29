import React, { useState } from 'react'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import axios from 'axios';
import OpenAI from "openai";
import botImage from "../8-r0qaFTjxmryVm4x.png"

// const api_key = "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"
export const Home = () => {
  const [messages, setMessages] = useState([{
    message: "Hello, I am ControlF5 bot!",
    sender: "ChatGPT"

  }])
  const [typing, setTyping] = useState(false)
  const [limit, setLimit] = useState(10)
  const [chatLike, setChatLike] = useState("Explain like 10 year of experience in cybersecurity")
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
  const handleSend = async (message, file) => {
    ////////////////
    if (limit > 0) {
      const newMessage = {
        message: message,
        sender: "user",
        direction: "outgoing"
      }
      const newMessages = [...messages, newMessage]
  
      setMessages(newMessages)
      setTyping(true)
      
      await processMessageToGPT(newMessages)
      setLimit(prev => prev - 1);
    }
    else{
      return alert("Exhuasted")
    }

  }
  //////////////////chatgpt//////////////////////
  const processMessageToGPT = async (chatMessages) => {

    let apiMessages = chatMessages.map((items, index) => {
      let role = ""
      if (items.sender === "ChatGPT") {
        role = "assistant"
      } else {
        role = "user"
      }
      return { role: role, content: items.message }
    })
    ////system message should be industry or chatbot usage specific

    const systemMessage = {
      role: "system",
      content: chatLike
    }
 console.log(systemMessage);
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [systemMessage, ...apiMessages]
    }
    // const chatCompletion = await openai.chat.completions.create(apiRequestBody);
    // console.log(chatCompletion);
    await axios.post("https://api.openai.com/v1/chat/completions", apiRequestBody, {
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }).then((data) => {
      console.log(data.data.choices[0].message.content);
      setMessages([...chatMessages, {
        message: data.data.choices[0].message.content,
        sender: "ChatGPT"
      }])
      setTyping(false)
    }).catch((error) => {
      console.error(error);
      setTyping(false)
      
    });
  }

  return (
    <>
      <div className="container">
        <div style={{ position: "relative", height: "80vh" , top:"10px"}}>
          {`Free Available Message ${limit}`}
          <div className='mb-2 p-1'>
            <input type="text" maxLength={100} onChange={(e)=> setChatLike(e.target.value)} value={chatLike} />
          </div>
          <MainContainer>
            <ChatContainer>
              <MessageList scrollBehavior='smooth' typingIndicator={typing ? <TypingIndicator content="CtrlF5 is typing" /> : null}>
                {
                  messages.map((message, i) => {
                    return (
                      <Message key={i} model={message} className={message.sender === 'ChatGPT' ? 'sent ' : 'received'}>
                        {message.sender === 'ChatGPT' ? <Avatar src={botImage} name='CtrlF5' size="md" status="available"/> : ""}
                        <Message.Header sender={message.sender}/>
                        <Message.Content>{message.message}</Message.Content>
                      </Message>
                    )
                  })
                }

              </MessageList>
              <MessageInput placeholder="Type message here" onSend={handleSend} attachButton={false} style={{
                background: "white"
              }} />
            </ChatContainer>
          </MainContainer>
        </div>;
      </div>
    </>

  )
}
