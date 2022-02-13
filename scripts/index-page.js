import getRelativeDate from './date.js';

const commentData = (function () {
  const comments = [
    {
      name: 'Connor Walton',
      date: 1613597582000,
      comment:
        'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
      imgURL:
        'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-1.jpg',
    },
    {
      name: 'Emilie Beach',
      date: 1610227982000,
      comment:
        'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
      imgURL:
        'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-1.jpg',
    },
    {
      name: 'Miles Acosta',
      date: 1608499982000,
      comment:
        "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
      imgURL:
        'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-1.jpg',
    },
  ];
  const retrieveData = () => comments;
  const insertData = (comment) => comments.unshift(comment);
  return { retrieveData, insertData };
})();

const commentDisplay = (function () {
  const buildComments = function (commentList) {
    const commnetListContainer = document.querySelector('.comments__list');
    commnetListContainer.innerHTML = '';
    commentList.forEach((comment) => {
      return commnetListContainer.appendChild(comment);
    });
  };

  return buildComments;
})();

// eslint-disable-next-line no-unused-vars
const commentController = (function () {
  //Create individual comment node element
  const createNodeEl = (element, className, text, src, alt) => {
    const node = document.createElement(element);
    node.classList.add(className);
    node.textContent = text;
    node.setAttribute('src', src);
    node.setAttribute('alt', alt);
    return node;
  };

  const createComment = ({ name, date, comment, imgURL }) => {
    const currentDate = new Date().getTime();
    const li = createNodeEl('li', 'comment');
    const imgNode = createNodeEl(
      'img',
      'comment__avatar',
      undefined,
      imgURL,
      'default avatar'
    );
    const textBox = createNodeEl('div', 'comment__text-box');
    const author = createNodeEl('p', 'comment__author', name);
    const dateNode = createNodeEl(
      'time',
      'comment__date',
      getRelativeDate(currentDate, date)
    );
    const commentText = createNodeEl('p', 'comment__text', comment);
    li.appendChild(imgNode);
    li.appendChild(textBox);
    textBox.appendChild(author);
    textBox.appendChild(dateNode);
    textBox.appendChild(commentText);
    return li;
  };
  //Building an actual array of comments
  const createCommentNodeList = () => {
    const comments = commentData.retrieveData();
    return comments.map((comment) => createComment(comment));
  };
  //Retrieve values from form and event listener
  const formValidate = () => {
    const name = document.querySelector('.form__name');
    const comment = document.querySelector('.form__comment');
    if (!name.value) name.classList.add('form__error');
    if (!comment.value) comment.classList.add('form__error');
    if (!name.value || !comment.value) return false;
  };

  const getFormValues = () => {
    const name = document.querySelector('.form__name').value;
    const comment = document.querySelector('.form__comment').value;
    const date = new Date().getTime();
    //Default avatar image
    const imgURL = './assets/images/Mohan-muruge.jpg';

    return {
      name,
      comment,
      date,
      imgURL,
    };
  };

  const inputEventListener = () => {
    const name = document.querySelector('.form__name');
    const comment = document.querySelector('.form__comment');
    const inputs = [name, comment];
    inputs.forEach((input) => {
      input.addEventListener('change', function removeRedOutline() {
        input.classList.remove('form__error');
      });
    });
  };

  const addFormEventListener = () => {
    const form = document.querySelector('.form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      //Validate form values, stop the submit action if it is false
      if (formValidate() === false) return;
      //Extract Form info and insert data into comments array
      commentData.insertData(getFormValues());
      //Asks display to rebuild the comment list and show new comments
      commentDisplay(createCommentNodeList());
      //Clear Inputs
      e.target.name.value = '';
      e.target.comment.value = '';
    });
  };
  //Starting the app
  const init = () => {
    //Add Form event listener
    inputEventListener();
    addFormEventListener();
    //Create list and append comment list container when the app runs
    const commentSection = document.querySelector('.comments');
    commentSection.appendChild(createNodeEl('ul', 'comments__list'));
    //Retrieve data and convert it into node element list and display it
    const comments = createCommentNodeList();
    commentDisplay(comments);
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
