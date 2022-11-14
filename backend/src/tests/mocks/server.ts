import App from '../../app';
import userRouter from './routes/userRouter';

const server = new App();

server.addRouter(userRouter.getRouter());

server.addErrorMiddleware();

export default server;
