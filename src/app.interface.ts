import { statusCode } from "./app.enums";

export class ResModel {
    statusCode: statusCode;
    message: string;
    model: any;
}