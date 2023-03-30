import dotenv from 'dotenv';
dotenv.config();
import cloudinary from 'cloudinary'
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
   public CLOUD_NAME: string | undefined
   public CLOUD_KEY: string | undefined
   public CLOUD_SECRET: string | undefined
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
      this.CLOUD_NAME = process.env.CLOUD_NAME || ''
      this.CLOUD_KEY = process.env.CLOUD_KEY || ''
      this.CLOUD_SECRET = process.env.CLOUD_SECRET || ''
   }
   public validateConfig(): void {
      for (const [key, value] of Object.entries(this)) {
         if (value === undefined) throw new Error(`Configuration : ${key} is undefined`)
      }
   }
   public cloudinaryConfig(): void {
      cloudinary.v2.config({
         cloud_name: this.CLOUD_NAME,
         api_key: this.CLOUD_KEY,
         api_secret: this.CLOUD_SECRET
      })
   }
}
export const config: Config = new Config() 