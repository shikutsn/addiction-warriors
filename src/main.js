
import FilmsTotalComponent from "./components/films-total.js";
import MainNavigationComponent from "./components/main-navigation.js";
import PageController from "./controllers/page.js";
import UserRankComponent from "./components/user-rank.js";
import {generateFilms} from "./mock/films.js";
import {render} from "./utils/render.js";


const FILMS_ALL_COUNT = 13;


const films = generateFilms(FILMS_ALL_COUNT);
const filmsTotal = films.length;
const userFilmsWatched = films.reduce((total, it) => it.isWatched ? total + 1 : total, 0);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRankComponent(userFilmsWatched));

const siteMainElement = document.querySelector(`.main`);
const siteMainNavigationComponent = new MainNavigationComponent();
render(siteMainElement, siteMainNavigationComponent);

const siteFilmsTotalElement = document.querySelector(`.footer__statistics`);
render(siteFilmsTotalElement, new FilmsTotalComponent(filmsTotal));

const pageController = new PageController(siteMainElement, films);
pageController.render();
