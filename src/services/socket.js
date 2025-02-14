import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001';

export const Socket = io(SOCKET_URL);
