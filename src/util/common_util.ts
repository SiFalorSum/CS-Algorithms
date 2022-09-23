import * as fs from 'node:fs';

/**
 * Asynchronous load of text file.
 * @async
 * @param {string} filePath - Relative or full path to file
 * @returns {Promise<string>}
 */
export function loadFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

/**
 * A JSON parser with type checking.
 * @param data - A valid JSON string.
 * @param typeGuard - Function to check that objects conform to the provided type.
 * @returns Returns an array of objects of the provided type.
 */
export function parseJSONtoType<T>(data: string, typeGuard: (obj: any) => obj is T): T[] {
    let parsed = JSON.parse(data);
    if ( !Array.isArray(parsed) ) parsed = [parsed];

    parsed.forEach((o: any) => {
        if ( !typeGuard(o) ) throw new Error("Type mismatch: Unexpected object from JSON.");
    });
    return parsed as T[];
}
