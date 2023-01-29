import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Connection, connect, Model } from 'mongoose';
import { Item, ItemSchema } from '../src/item/models/item.model';
import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('AppController', () => {
  let app: INestApplication;

  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let itemModel: Model<Item>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoose.set('strictQuery', false);
    mongoConnection = (await connect(uri)).connection;
    itemModel = mongoConnection.model('Item', ItemSchema);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
    await app.close();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should create a coupon for selected products', async () => {
    const response = await request(app.getHttpServer())
      .post('/item/')
      .send({
        name: 'Mac2023',
        price: '200000',
        category: 'computer',
        brand: 'apple',
        location: {
          lat: '0.0222555',
          long: '23544847',
        },
      })
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11cnRhemFraGFuQGdtYWlsLmNvbSIsInN1YiI6IjYzZDJiYzJmZWNjMmY3ZGYyODNjZjBmNyIsInVzZXJSb2xlIjoiQURNSU4iLCJpYXQiOjE2NzUwMTU3MTh9.2UAV7qtQlsvf38rM5VZb1zSPY2csjwOTjy5-AeNQuHY',
      );

    const responseBody = { ...response.body };
    expect(responseBody.success).toEqual(true);
  });
});
