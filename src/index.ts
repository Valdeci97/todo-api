import 'dotenv/config';
import server from './server';

const PORT = process.env.PORT || 3001;

server.start(PORT);
