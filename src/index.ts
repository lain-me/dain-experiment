import { Dain } from './stack/dain';

process.env.USER = process.env.USER || '';

new Dain({name : process.env.USER});
