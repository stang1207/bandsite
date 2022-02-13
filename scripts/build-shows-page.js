const showData = (function () {
  const shows = [
    {
      date: 'Mon Sept 06 2021',
      venue: 'Ronald Lane',
      location: 'San Francisco, CA',
    },
    {
      date: 'Tue Sept 21 2021',
      venue: 'Pier 3 East',
      location: 'San Francisco, CA',
    },
    {
      date: 'Fri Oct 15 2021',
      venue: 'View Lounge',
      location: 'San Francisco, CA',
    },
    {
      date: 'Sat Nov 06 2021',
      venue: 'Hyatt Agency',
      location: 'San Francisco, CA',
    },
    {
      date: 'Fri Nov 26 2021',
      venue: 'Moscow Center',
      location: 'San Francisco, CA',
    },
    {
      date: 'Wed Dec 15 2021',
      venue: 'Press Club',
      location: 'San Francisco, CA',
    },
  ];
  const retrieveData = () => shows;
  const insertData = (show) => shows.appendChild(show);
  return { retrieveData, insertData };
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
    node.classList.add(className);
    node.textContent = text;
    return node;
  };

  const createShowColumn = (title, data, index) => {
    const showColumnBox = createNodeEl('div', 'show__text-box');
    const showColumnTitle = createNodeEl('p', 'show__title', title);
    if (index === 0) showColumnTitle.classList.add('show__title--first');
    const dataEl = createNodeEl('p', 'show__date', data);
    showColumnBox.appendChild(showColumnTitle);
    showColumnBox.appendChild(dataEl);
    return showColumnBox;
  };

  const createShowEl = ({ date, venue, location }, index) => {
    const li = createNodeEl('li', 'show');
    const dateColumn = createShowColumn('Date', date, index);
    const venueColumn = createShowColumn('Venue', venue, index);
    const locationColumn = createShowColumn('Location', location, index);
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
  const createShowNodeList = () => {
    const shows = showData.retrieveData();
    return shows.map((show, index) => createShowEl(show, index));
  };
  //Starting the app
  const init = () => {
    const showSection = document.querySelector('.shows');
    showSection.appendChild(createNodeEl('ul', 'shows__list'));
    const shows = createShowNodeList();
    showDisplay(shows);
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
