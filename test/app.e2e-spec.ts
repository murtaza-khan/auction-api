import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest'
import { factory } from 'fakingoose'

describe('Auth controller', () => {
    let catModel;
    let app;
    const catFactory = factory<CatDocument>(CatDocument, {}).setGlobalObjectIdOptions({ tostring: false })
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [MongooseModule.forRootAsync({
                useFactory: async () => {
                    const mongod = new MongoMemoryServer();
                    const uri = await mongod.getUri();
                    return {
                        uri: uri
                    }
                }
            }), CatModule]
        })
            .compile()



        app = moduleFixture.createNestApplication()
        catModel = moduleFixture.get<Model<CatDocument>>(getModelToken(Cat.name))
        await app.init()
    })

    beforeEach(() => {
        // populate the DB with 1 cat using fakingoose
        const mockCat = catFactory.generate()
        return catModel.create(mockCat)
    })

    afterEach(() =>
        catModel.remove({})
    )

    it('GET /cats', () => {
        return request(app.getHttpServer())
            .get('/cats')
            .expect(200)
            .expect(res => {
                expect(res.body.length > 0).toBe(true)
            })
    })

    afterAll(() => {
        app.close()
    })
})