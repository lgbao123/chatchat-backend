import { createClient } from 'redis';
import type { RedisClientType } from 'redis'
import { config } from '@root/config';
import { BaseCache } from './base.cache';
class RedisConnection extends BaseCache {
   constructor() {
      super()
   }
   public async connect(): Promise<void> {
      try {
         const res = await this.client.ping();
         console.log(res);

      } catch (error) {
         console.log(">>>RedisConnection Error:", error);
      }
   }
}

export const redisConnection: RedisConnection = new RedisConnection();
