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
  const insertData = (show) => comments.appendChild(show);
  return { retrieveData, insertData };
})();

const showDisplay = (function () {
  const displayShow = (show, container) => {
    return container.appendChild(show);
  };
  const buildShows = function (list) {
    const showListContainer = document.querySelector('.shows__list');
    showListContainer.innerHTML = '';
    list.forEach((show) => {
      return displayShow(show, showListContainer);
    });
  };
  {
    return buildShows;
  }
})();

const showController = (function () {
  //Create individual comment node element related functions
  const createNodeEl = (element, className, text) => {
    const node = document.createElement(element);
    node.classList.add(className);
    node.textContent = text;
    return node;
  };

  const createShowEl = (index, { date, venue, location }) => {
    const li = createNodeEl('li', 'show');
    const dateTextBox = createNodeEl('div', 'show__text-box');
    const dateTitle = createNodeEl('p', 'show__title', 'Date');
    if (index === 0) dateTitle.classList.add('show__title--first');
    const dateEl = createNodeEl('p', 'show__date', date);
    dateTextBox.appendChild(dateTitle);
    dateTextBox.appendChild(dateEl);
    const venueTextBox = createNodeEl('div', 'show__text-box');
    const venueTitle = createNodeEl('p', 'show__title', 'Venue');
    if (index === 0) venueTitle.classList.add('show__title--first');
    const venueEl = createNodeEl('p', 'show__venue', venue);
    venueTextBox.appendChild(venueTitle);
    venueTextBox.appendChild(venueEl);
    const locationTextBox = createNodeEl('div', 'show__text-box');
    const locationTitle = createNodeEl('p', 'show__title', 'Location');
    if (index === 0) locationTitle.classList.add('show__title--first');
    const locationEl = createNodeEl('p', 'show__location', location);
    locationTextBox.appendChild(locationTitle);
    locationTextBox.appendChild(locationEl);
    const btn = createNodeEl('button', 'show__btn', 'Buy Tickets');
    li.appendChild(dateTextBox);
    li.appendChild(venueTextBox);
    li.appendChild(locationTextBox);
    li.appendChild(btn);
    li.addEventListener('click', function () {
      li.classList.toggle('show--active');
    });
    li.addEventListener('mouseenter', function () {
      li.classList.add('show--hover');
    });
    li.addEventListener('mouseleave', function () {
      li.classList.remove('show--hover');
    });
    return li;
  };
  //Building an actual array of comment node el
  const createShowNodeList = function () {
    const shows = showData.retrieveData();
    return shows.map((show, index) => createShowEl(index, show));
  };
  //Starting the app
  const init = (function () {
    const showSection = document.querySelector('.shows');
    showSection.appendChild(createNodeEl('ul', 'shows__list'));
    const shows = createShowNodeList();
    showDisplay(shows);
  })();
})();

//Sticky navbar event listener
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  const height = nav.getBoundingClientRect().height;
  if (window.scrollY >= height) {
    nav.classList.add('nav__sticky');
  } else {
    nav.classList.remove('nav__sticky');
  }
});
