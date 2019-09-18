/**
 * travel
 * app.ts
 * Created by Saim ÇAY on 17.09.2019
 */

export enum status {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    TOO_MANY_REQUESTS = 429
}

export const ONE_KM: number = 1000;

export const tripDTOPattern: any = ["_id", "startPoint", "endPoint", "date", "distance"];
