import { createClient } from 'redis';
import type { RedisClientType } from 'redis'
import { config } from '@root/config';
abstract class BaseCache {
   client: RedisClientType;
   constructor() {
      this.client = createClient({ url: config.REDIS_HOST })
      this.client.connect();
      this.client.on("error", err => console.log('Redis Client Error :', err))
   }

}
export { BaseCache }


