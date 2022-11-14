import App from '../../app';
import userRouter from './routes/userRouter';
import loginRouter from './routes/loginRouter';

const server = new App();

server.addRouter(userRouter.getRouter());
server.addRouter(loginRouter.getRouter());

server.addErrorMiddleware();

export default server;
