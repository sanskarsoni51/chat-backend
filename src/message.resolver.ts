/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args , Subscription} from '@nestjs/graphql';
import {  CreateMessageInput, Message } from './message.dto';
// import { Inject } from '@nestjs/common';
// import { PUB_SUB } from './pub-sub.constants';
import { PubSub } from 'graphql-subscriptions';
// import { MessageService } from './message.service';
// import { MessageEntity } from './message.entity';

const messages: Message[] = [];
const pubSub = new PubSub();

@Resolver()
export class MessageResolver {
  // constructor(private messageService: MessageService) {}

    // constructor(@Inject(PUB_SUB) private readonly pubSub: PubSub) {}

  // @Query(() => [MessageEntity])
  // async getMessage(): Promise<MessageEntity[]>{
  //   return await this.messageService.getAllMessages();
  // }
  @Query(() => [Message])
  async getMessage() {
    return messages;
  }

  // @Mutation(() => MessageEntity)
  // async createMessage(@Args('input') input: CreateMessageInput) {
  //   const message = await this.messageService.createMessage(input);
  //   return message;
  // }
  @Mutation(() => Message)
  createMessage(@Args('input') input: CreateMessageInput) {
    const message = { id: messages.length + 1, ...input };
    messages.push(message);
    pubSub.publish('newMessage', { newMessage: message }); // Publish the new message
    return message;
  }

  @Subscription(() => Message)
  newMessage() {
    return pubSub.asyncIterator('newMessage');
  }
  
}


// import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
// import { Message, CreateMessageInput } from './message.dto';
// import { Message as MessageEntity } from './entities/message.entity';
// import { Inject } from '@nestjs/common';
// import { PUB_SUB } from './pub-sub.constants';
// import { PubSub } from 'graphql-subscriptions'; // Import PubSub from graphql-subscriptions
// import { InjectRepository } from '@nestjs/typeorm';

// @Resolver()
// export class MessageResolver {
//   constructor(
//     @Inject(PUB_SUB) private readonly pubSub: PubSub,
//     @InjectRepository(MessageEntity)
//     private messageRepository: Repository<MessageEntity>,
//   ) {}

//   @Mutation(() => Message)
//   async createMessage(@Args('input') input: CreateMessageInput) {
//     const message = this.messageRepository.create(input);
//     await this.messageRepository.save(message);

//     // Emit the new message to all connected clients using PubSub
//     this.pubSub.publish('chatMessage', { chatMessage: message });

//     return message;
//   }

//   @Query(() => [Message])
//   async messages() {
//     return this.messageRepository.find();
//   }

//   @Subscription(() => Message, { type: 'string',
//     topics: 'chatMessage',
//   })
//   chatMessage(@Root() payload: { chatMessage: Message }) {
//     return payload.chatMessage;
//   }
// }
// function Root(): (target: MessageResolver, propertyKey: "chatMessage", parameterIndex: 0) => void {
//     throw new Error('Function not implemented.');
// }


