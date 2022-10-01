"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const movements_controllers_1 = require("../controllers/movements.controllers");
describe('Get all movements request', () => {
    let mockRequest;
    let mockResponse;
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
        mockRequest = {};
        mockResponse = {
            statusCode: 200,
            send: jest.fn().mockImplementation((result) => {
                responseObject = result;
            })
        };
    });
    test('Should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedStatusCode = 200;
        const expectedReponse = responseObject;
        let response = (0, movements_controllers_1.getMovements)(mockRequest, mockResponse);
        console.log(response);
        expect(mockResponse.statusCode).toBe(expectedStatusCode);
        expect(responseObject).toEqual(expectedReponse);
    }));
});
