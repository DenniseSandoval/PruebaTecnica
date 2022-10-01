import { Request, Response } from 'express';
import {getMovements} from '../controllers/movements.controllers';

describe('Get all movements request', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseObject = [{
        'Numero Cuenta': '478758',
        Tipo: 'Ahorros',
        'Saldo Inicial': 2000,
        Estado: 'true',
        Fecha: '2022-09-24T05:00:00.000Z',
        Movimiento: -575,
        'Saldo disponible': 1425,
        Cliente: 'Jose Lema'
      }];

    beforeEach(() => {
        mockRequest = {
        };
        mockResponse = {
            statusCode: 200,
            send: jest.fn().mockImplementation((result) => {
                responseObject = result;
            })
        };
    });

    test('Should respond with a 200 status code', async () => {
        const expectedStatusCode = 200;
        const expectedReponse = responseObject

        let response= getMovements(mockRequest as Request, mockResponse as Response);        
        console.log(response)

        expect(mockResponse.statusCode).toBe(expectedStatusCode);
        expect(responseObject).toEqual(expectedReponse);
    });
});