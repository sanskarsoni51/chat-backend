/* eslint-disable prettier/prettier */

import { Injectable, OnModuleInit } from "@nestjs/common";
import { io,Socket } from "socket.io-client";


@Injectable()
export class socketClient implements OnModuleInit{
  public socketClient: Socket;

  constructor() {
    this.socketClient = io('http://localhost:3000/graphql')
  }
  onModuleInit() {
    this.registerConsumerEvents();
  }

  private registerConsumerEvents() {
    this.socketClient.on('connect', () => {
      console.log('connected to gateway')
    })
    this.socketClient.on('newMessage', (payload: any) => {
      console.log(payload);
    })
  }
}
























 

// function io(arg0: string): Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any> {
//   throw new Error("Function not implemented.");
// }
// import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, split } from "@apollo/client";
// import { getMainDefinition } from "@apollo/client/utilities";
// import { WebSocketLink } from "@apollo/link-ws";
// import { SubscriptionClient } from "subscriptions-transport-ws";

// // GraphQL HTTP API URL
// const httpUrl = "http://localhost:3000/graphql";

// // WebSocket API URL
// // const wsUrl = "ws://localhost:3000/graphql";

// // Create an http link
// const httpLink = new HttpLink({
//   uri: httpUrl
// });

// // Create a WebSocket link
// // const wsLink = new WebSocketLink({
// //   uri: wsUrl,
// //   options: {
// //     reconnect: true
// //   }
// // });

// const wsLink = new WebSocketLink(
//   new SubscriptionClient("ws://localhost:3000/graphql", {
//     reconnect: true
//   })
// );

// // Create a link that handles split requests between HTTP and WebSocket connections
// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

// // Create an Apollo Client instance
// export const apolloClient = new ApolloClient({
//   link: ApolloLink.from([link]),
//   cache: new InMemoryCache()
// });
