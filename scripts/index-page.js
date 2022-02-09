import getRelativeDate from './date.js';

const commentData = (function () {
  const comments = [
    {
      name: 'Connor Walton',
      date: 1613597582000,
      comment:
        'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
    },
    {
      name: 'Emilie Beach',
      date: 1610227982000,
      comment:
        'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
    },
    {
      name: 'Miles Acosta',
      date: 1608499982000,
      comment: `I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.`,
    },
  ];
  const retrieveData = () => comments;
  const insertData = (comment) => comments.unshift(comment);
  return { retrieveData, insertData };
})();

const commentDisplay = (function () {
  const displayComment = (comment, container) => {
    return container.appendChild(comment);
  };
  const buildComments = function (list) {
    const commnetListContainer = document.querySelector('.comments__list');
    commnetListContainer.innerHTML = '';
    list.forEach((comment) => {
      return displayComment(comment, commnetListContainer);
    });
  };
  {
    return buildComments;
  }
})();

const commentController = (function () {
  //Create individual comment node element related functions
  const createNodeEl = (element, className, text) => {
    const node = document.createElement(element);
    node.classList.add(className);
    node.textContent = text;
    return node;
  };
  const createImgNode = (src, alt, className) => {
    const img = document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    img.classList.add(className);
    return img;
  };
  const createComment = ({
    name,
    date,
    comment,
    img = 'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-1.jpg',
  }) => {
    const currentDate = new Date().getTime();
    const li = createNodeEl('li', 'comment');
    const imgNode = createImgNode(img, 'default avatar', 'comment__avatar');
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
  //Building an actual array of comment node el
  const createCommentNodeList = function () {
    const comments = commentData.retrieveData();
    return comments.map((comment) => createComment(comment));
  };
  //Retrieve values from form and event listener
  const getFormValues = () => {
    const name = document.querySelector('.form__name').value;
    const comment = document.querySelector('.form__comment').value;
    if (!name || !comment) return;
    const date = new Date().getTime();
    return { name, date, comment };
  };
  const addFormEventListener = function () {
    const form = document.querySelector('.form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      //Extract Form info
      const commentObj = getFormValues();
      //Insert data into database array
      commentData.insertData(commentObj);
      //Asks View objects to rebuilt the comment list and new comments
      commentDisplay(createCommentNodeList());
      //Clear Inputs
      e.target.name.value = '';
      e.target.comment.value = '';
    });
  };
  //Starting the app
  const init = (function () {
    //Add Form event listener
    addFormEventListener();
    //Create list and append comment list container when the app runs
    const commentSection = document.querySelector('.comments');
    commentSection.appendChild(createNodeEl('ul', 'comments__list'));
    //Retrieve data and convert it into node element list and display it
    const comments = createCommentNodeList();
    commentDisplay(comments);
  })();
})();
