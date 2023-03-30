import dotenv from 'dotenv';
dotenv.config();
class Config {
   public DB_PORT: string | undefined
   public DB_NAME: string | undefined
   public DB_USER: string | undefined
   public DB_PASSWORD: string | undefined
   public NODE_ENV: string | undefined
   public JWT_TOKEN: string | undefined
   public SECRET_KEY_ONE: string | undefined
   public SECRET_KEY_TWO: string | undefined
   public CLIENT_URL: string | undefined
   public REDIS_HOST: string | undefined
   constructor() {
      this.DB_PORT = process.env.DB_PORT || ''
      this.DB_NAME = process.env.DB_NAME || ''
      this.DB_USER = process.env.DB_USER || ''
      this.DB_PASSWORD = process.env.DB_PASSWORD || ''
      this.NODE_ENV = process.env.NODE_ENV || ''
      this.JWT_TOKEN = process.env.JWT_TOKEN || '1234'
      this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || ''
      this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || ''
      this.CLIENT_URL = process.env.CLIENT_URL || ''
      this.REDIS_HOST = process.env.REDIS_HOST || ''
   }
   public validateConfig(): void {
      for (const [key, value] of Object.entries(this)) {
         if (value === undefined) throw new Error(`Configuration : ${key} is undefined`)
      }
   }
}
export const config: Config = new Config() 