import { z } from 'zod';
import 'dotenv/config';

export const envSchema = z.object({
    PORT            : z.coerce.number().default(5000), 
    NODE_ENV        : z.enum(['dev', 'test', 'production']).default('dev'),
    JWT_SIGNATURE   : z.string(), 
    HOST            : z.string(), 
    AUTH_SCRET      : z.string().default('qwe789asd456zxc123') 
});

const _env = envSchema.safeParse(process.env);

if(_env.success === false) {
    console.error('❌ Invalid enviroment variables.', _env.error.format());

    throw new Error('Invalid enviroment variables.');
}   

export const env = _env.data;
