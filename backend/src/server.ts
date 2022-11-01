import App from './app';
import userRouter from './routes/UserRouter';

const server = new App();

server.addRouter(userRouter.getRouter());

export default server;
