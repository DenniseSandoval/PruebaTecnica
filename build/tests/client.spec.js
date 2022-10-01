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
const client_controllers_1 = require("../controllers/client.controllers");
describe('Get all movements request', () => {
    let mockRequest;
    let mockResponse;
    let requestObject = { name: 'Juan Perez',
        address: 'Amazonas y NNUU',
        phone: '093877900',
        password: '5609',
        state: true };
    beforeEach(() => {
        mockRequest = {
            body: requestObject
        },
            mockResponse = {
                statusCode: 200,
                send: jest.fn().mockImplementation((result) => {
                    requestObject = result;
                })
            };
    });
    test('Should respond with a 200 status code when create a client is sucessfull', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedStatusCode = 200;
        const expectedReponse = requestObject;
        let response = (0, client_controllers_1.createClient)(mockRequest, mockResponse);
        console.log(response);
        expect(mockResponse.statusCode).toBe(expectedStatusCode);
        expect(requestObject).toEqual(expectedReponse);
    }));
});
