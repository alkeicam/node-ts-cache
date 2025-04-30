import { ICacheItem, IStorage } from "node-ts-cache"
import { IMemoryCacheOptions } from "./memory-types"
export * from "./memory-types"

export class MemoryStorage implements IStorage {
    private memCache: any = {}
    private shouldClone: boolean = false; // by default no cloning (default behaviour)

    constructor(options?:IMemoryCacheOptions) {
        if(options){
            this.shouldClone = options.clone
        }
    }

    public async getItem(key: string): Promise<ICacheItem | undefined> {
        let response;
        if(this.shouldClone){
            response = JSON.parse(JSON.stringify(this.memCache[key]));
        }else{
            response = this.memCache[key]
        }
        return response;
    }

    public async setItem(key: string, content: any): Promise<void> {
        this.memCache[key] = content
    }

    public async clear(): Promise<void> {
        this.memCache = {}
    }
}
