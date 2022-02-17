import { getReadableDate } from './date.js';

const showData = (function () {
  const retrieveData = async () => {
    try {
      const res = await axios.get(
        'https://project-1-api.herokuapp.com/showdates?api_key=59ce12e0-2cae-4ec7-a0e0-2db89231ba1c'
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  return retrieveData;
})();

const showDisplay = (function () {
  const buildShows = (showList) => {
    const showListContainer = document.querySelector('.shows__list');
    showListContainer.innerHTML = '';
    showList.forEach((show) => {
      return showListContainer.appendChild(show);
    });
  };
  return buildShows;
})();

// eslint-disable-next-line no-unused-vars
const showController = (function () {
  //Create individual comment node element related functions
  const createNodeEl = (element, className, text) => {
    const node = document.createElement(element);
    if (className) node.classList.add(className);
    if (text) node.textContent = text;
    return node;
  };

  const createShowColumn = (title, data, dataClassName, index) => {
    const showColumnBox = createNodeEl('div', 'show__text-box');
    const showColumnTitle = createNodeEl('p', 'show__title', title);
    if (index === 0) showColumnTitle.classList.add('show__title--first');
    const dataEl = createNodeEl('p', dataClassName, data);
    showColumnBox.appendChild(showColumnTitle);
    showColumnBox.appendChild(dataEl);
    return showColumnBox;
  };

  const createShowEl = ({ date, place: venue, location }, index) => {
    const li = createNodeEl('li', 'show');
    const dateColumn = createShowColumn(
      'Date',
      getReadableDate(+date),
      'show__date',
      index
    );
    const venueColumn = createShowColumn('Venue', venue, 'show__venue', index);
    const locationColumn = createShowColumn(
      'Location',
      location,
      'show__location',
      index
    );
    const btn = createNodeEl('button', 'show__btn', 'Buy Tickets');

    li.appendChild(dateColumn);
    li.appendChild(venueColumn);
    li.appendChild(locationColumn);
    li.appendChild(btn);

    li.addEventListener('click', () => li.classList.toggle('show--active'));
    li.addEventListener('mouseenter', () => li.classList.add('show--hover'));
    li.addEventListener('mouseleave', () => li.classList.remove('show--hover'));
    return li;
  };
  //Building an actual array of comment node el
  const createShowNodeList = async () => {
    try {
      const shows = await showData();
      return shows.map((show, index) => createShowEl(show, index));
    } catch (err) {
      console.log(err);
    }
  };
  //Starting the app
  const init = async () => {
    try {
      const showSection = document.querySelector('.shows');
      showSection.appendChild(createNodeEl('ul', 'shows__list'));
      const shows = await createShowNodeList();
      return showDisplay(shows);
    } catch (err) {
      console.log(err);
    }
  };
  init();
})();

//Sticky navbar
const header = document.querySelector('.header');
const navbar = document.querySelector('.nav');
const createStickyNavbar = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) navbar.classList.add('nav__sticky');
  else navbar.classList.remove('nav__sticky');
};
const headerObserver = new IntersectionObserver(createStickyNavbar, {
  root: null,
  threshold: 0,
  rootMargin: `-${navbar.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);
