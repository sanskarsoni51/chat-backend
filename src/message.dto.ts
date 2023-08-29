/* eslint-disable prettier/prettier */
import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field()
  id: number;

  @Field()
  content: string;

  @Field()
  senderId: number;

  @Field()
  receiverId: number;
}

@InputType()
export class CreateMessageInput {
  @Field()
  content: string;

  @Field()
  senderId: number;

  @Field()
  receiverId: number;
}

@ObjectType()
export class NewMessagePayload {
  @Field()
  newMessage: Message;
}