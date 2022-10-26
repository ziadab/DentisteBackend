import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@/routes/offices.route';
import validateEnv from '@utils/validateEnv';
import PationsRoute from './routes/pations.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new PationsRoute()]);

app.listen();
