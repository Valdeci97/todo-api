import App from '../../app';
import userRouter from './routes/userRouter';
import loginRouter from './routes/loginRouter';
import taskRouter from './routes/taskRouter';
import taskTimeRouter from './routes/taskTimeRouter';

const server = new App();

server.addRouter(userRouter.getRouter());
server.addRouter(loginRouter.getRouter());
server.addRouter(taskRouter.getRouter());
server.addRouter(taskTimeRouter.getRouter());

server.addErrorMiddleware();

export default server;
