import app from './app.js';
import http from 'http';

import {PORT }from "./util/config.js";

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});