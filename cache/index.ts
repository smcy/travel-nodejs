/**
 * travel
 * index.ts
 * Created by Saim ÇAY on 17.09.2019
 */

import NodeCache from "node-cache";

class Cache {
    private cache: NodeCache;

    constructor(ttl: number) {
        this.cache = new NodeCache({stdTTL: ttl});
    }

    public get(key: string, callback) {
        let value = this.cache.get(key);
        if (value) {
            return Promise.resolve(value);
        }

        value = callback();

        if (value instanceof Promise) {
            return value.then((data) => {
                this.cache.set(key, data);
                return data;
            });
        } else {
            this.cache.set(key, value);
            return Promise.resolve(value);
        }
    }

    public delete(keys: string | string[]) {
        this.cache.del(keys);
    }

    public flush() {
        this.cache.flushAll();
    }
}

export default Cache;
