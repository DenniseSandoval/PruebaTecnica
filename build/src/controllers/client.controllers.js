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
exports.deleteClient = exports.updateClient = exports.createClient = void 0;
const Client_1 = require("../entities/Client");
const Person_1 = require("../entities/Person");
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, gender, age, id, address, phone, password, state } = req.body;
        const client = new Client_1.Client();
        client.password = password;
        client.state = state;
        const person = new Person_1.Person();
        person.name = name;
        person.gender = gender;
        person.age = age;
        person.id = id;
        person.address = address;
        person.phone = phone;
        person.client = client;
        client.name = name;
        client.gender = gender;
        client.age = age;
        client.id = id;
        client.address = address;
        client.phone = phone;
        yield person.save();
        return res.json(client);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createClient = createClient;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield Client_1.Client.findOneBy({ clientId: req.params.id });
        Client_1.Client.update({ clientId: req.params.id }, req.body);
        Person_1.Person.update({ personId: req.params.id }, req.body);
        if (!client)
            return res.status(404).json({ message: 'No existe cliente' });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateClient = updateClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield Client_1.Client.delete({ clientId: req.params.id });
        if (client.affected === 0) {
            return res.status(404).json({ message: 'No existe cliente' });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteClient = deleteClient;
