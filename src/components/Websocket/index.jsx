import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export default function Websocket() {
   const [paymentSuccesfull, setPaymentSuccesfull] = useState(false);
   const [payment, setPayment] = useState([]);
   let wsClient;

   useEffect(() => {

      wsClient = new W3CWebSocket('wss://localhost:3001/ws/' + '0xb6e76628BeB7872D2ade6AE9641bb390401c18ef');
      wsClient.onopen = () => {
         console.log('WebSocket Client Connected');
      };
      wsClient.onmessage = (message) => {
         console.log("onmessage");
         const messageData = message.data;
         let parsedData = undefined;

         if (message.data) {

            console.log({
               messageData
            })

            try {
               parsedData = JSON.parse(message.data);
            } catch (error) {
               console.log("no parseable data")
            }

            console.log({
               parsedData
            })

            // switch(parsedData.action) {
            //    case "Insert" :

            //    break;
            //    case "Update":

            //    break;
            //    case "Delete":

            //    break;
            // }

            if (parsedData !== undefined) {

               // bet
               if (parsedData.type === "GiftcardPayment") {
                  setPaymentSuccesfull(true);
                  setPayment(parsedData.data);
               }
            }
         }
      };
      wsClient.onclose = (message) => {
         console.log("onclose");
         console.log(message);
      };
   });
}