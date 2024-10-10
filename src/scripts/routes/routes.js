import MainPage from '../pages/MainPage';
import Favorite from '../pages/Favorite';
import Detail from '../pages/Detail';

const routes = {
  '/': MainPage, // default page
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
