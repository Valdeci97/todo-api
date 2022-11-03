import App from './app';
import userRouter from './routes/UserRouter';
import loginRouter from './routes/LoginRouter';

const server = new App();

server.addRouter(userRouter.getRouter());
server.addRouter(loginRouter.getRouter());

server.addErrorMiddleware();

export default server;
