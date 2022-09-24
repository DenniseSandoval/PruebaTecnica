"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const client_routes_1 = __importDefault(require("./routes/client.routes"));
const account_routes_1 = __importDefault(require("./routes/account.routes"));
const movement_routes_1 = __importDefault(require("./routes/movement.routes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(client_routes_1.default, account_routes_1.default, movement_routes_1.default);
exports.default = app;
