/* eslint-disable prettier/prettier */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MessageResolver } from './message.resolver';
import { MessageGateway } from "./chat.gateway";
import { socketClient } from './websocket';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.dto';
// import { MessageEntity } from './message.entity';
// import { MessageRepository } from './message.repository';



@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': {
          path: '/graphql'
        }
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sanskar@51',
      database: 'chat-backend',
      entities: [Message],
      // repositories: [MessageRepository],
      synchronize: true, // Use carefully in production
    }),
  ],
  providers: [MessageResolver, MessageGateway,socketClient],
})
export class AppModule {}