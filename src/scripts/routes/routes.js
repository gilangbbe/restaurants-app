import MainPage from '../pages/mainPage';
import Favorite from '../pages/Favorite';
import Detail from '../pages/Detail';

const routes = {
  '/': MainPage, // default page
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
