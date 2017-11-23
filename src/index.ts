import { App } from './stack/app';

process.env.USER = process.env.USER || '';

new App({name : process.env.USER});
