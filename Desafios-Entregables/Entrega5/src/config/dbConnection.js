import mongoose from 'mongoose';
import {config} from './config.js';

await mongoose.connect(config.mongo.url, { serverSelectionTimeoutMS: 5000 });
console.log('Base de datos conectada....')