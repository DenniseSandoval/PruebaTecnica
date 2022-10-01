import { Request, Response } from 'express';
import {createClient} from '../controllers/client.controllers';

describe('Get all movements request', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let requestObject = {name: 'Juan Perez',
    address: 'Amazonas y NNUU',
    phone: '093877900',
    password: '5609',
    state: true};

    beforeEach(() => {
        mockRequest = {
          body: requestObject},
        mockResponse = {
            statusCode: 200,
            send: jest.fn().mockImplementation((result) => {
                requestObject = result;
            })
        };
    });

    test('Should respond with a 200 status code when create a client is sucessfull', async () => {
        const expectedStatusCode = 200;
        const expectedReponse = requestObject

        let response= createClient(mockRequest as Request, mockResponse as Response);        
        console.log(response)

        expect(mockResponse.statusCode).toBe(expectedStatusCode);
        expect(requestObject).toEqual(expectedReponse);
    });
});