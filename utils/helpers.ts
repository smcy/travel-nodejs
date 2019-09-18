/**
 * travel
 * helpers.ts
 * Created by Saim ÇAY on 17.09.2019
 */

/***
 * Generates a DTO(Data Transfer Object) from given object with pattern
 * @param {object} object
 * @param {string[]} objectPattern
 * @param options {object} change keys on dto.
 * @returns {object} DTO
 */
export function objectToDTO<T, K extends keyof T>(object: T, objectPattern: K[], options: any = {}): Pick<T, K> {
    const dto = {} as Pick<T, K>;
    objectPattern.map((key: K) => {
        if (options[key]) {
            const keyOption = options[key];
            if (keyOption.hasOwnProperty("apply")) {
                dto[keyOption.key] = object[key][keyOption["apply"]]();
            } else {
                dto[keyOption] = object[key];
            }
        } else {
            dto[key] = object[key];
        }
    });

    return dto;
}

/**
 * A compare function by distance
 * @param object1
 * @param object2
 * @return {number}
 */
interface Distance {
    distance: number;
}

export function sortByDistance<T extends Distance>(object1: T, object2: T): number {
    return object1.distance > object2.distance ? 1 : -1;
}
