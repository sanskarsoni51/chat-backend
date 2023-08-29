/* eslint-disable prettier/prettier */
// import { HttpServer } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import {  SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { Server } from 'http';
 import { Server } from 'socket.io';



@WebSocketGateway()
export class MessageGateway implements OnModuleInit {

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    // this.server.on('connection')
  }


  @SubscribeMessage('newMessage')
  handleMessage(_client: any, payload: any): void {
    this.server.emit('newMessage', payload); // Broadcast message to all connected clients
  }

}




// export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;
//   path: '/graphql'
  

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   handleConnection(client: any, ..._args: any[]) {
//     console.log('Client connected', client.id);
//   }

//   handleDisconnect(client: any) {
//     console.log('Client disconnected', client.id);
//   }
//   @SubscribeMessage('newMessage')
//   handleMessage(_client: any, payload: any): void {
//     this.server.emit('newMessage', payload); // Broadcast message to all connected clients
//   }
// }

