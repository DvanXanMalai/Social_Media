import { Client } from "pg";

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'social_media',
    user: 'postgres',
    password: 'root'
})

client.connect()
    .then(() => console.log('connected to postgresql'))
    .catch(err => console.error('connection error', err.stack))