import { getRelativeDate } from './date.js';

const commentData = (function () {
  const retrieveData = async () => {
    try {
      const res = await axios.get(
        'https://project-1-api.herokuapp.com/comments?api_key=59ce12e0-2cae-4ec7-a0e0-2db89231ba1c'
      );
      return res.data.map((comment) => {
        return {
          imgURL:
            'https://icon-library.com/images/avatar-icon-png/avatar-icon-png-1.jpg',
          ...comment,
        };
      });
    } catch (err) {
      console.log(er);
    }
  };
  const insertData = async (comment) => {
    //wtf
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      await axios.post(
        'https://project-1-api.herokuapp.com/comments?api_key=59ce12e0-2cae-4ec7-a0e0-2db89231ba1c',
        { ...comment },
        config
      );
    } catch (err) {
      throw new Error(err.message);
    }
  };
  const deleteData = async (id) => {
    try {
      await axios.delete(
        `https://project-1-api.herokuapp.com/comments/${id}?api_key=59ce12e0-2cae-4ec7-a0e0-2db89231ba1c`
      );
    } catch (err) {
      throw new Error(err.message);
    }
  };
  return { retrieveData, insertData, deleteData };
})();
const commentDisplay = (function () {
  const buildComments = function (commentList) {
    const commnetListContainer = document.querySelector('.comments__list');
    commnetListContainer.innerHTML = '';
    commentList.forEach((comment) => {
      return commnetListContainer.prepend(comment);
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
    if (text) node.textContent = text;
    if (src) node.setAttribute('src', src);
    if (alt) node.setAttribute('alt', alt);
    return node;
  };
  const createComment = ({ name, timestamp: date, comment, imgURL, id }) => {
    const currentDate = new Date().getTime();
    const li = createNodeEl('li', 'comment');
    const imgNode = createNodeEl(
      'img',
      'comment__avatar',
      '',
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
    const commentDeleteBtn = createNodeEl(
      'button',
      'comment__delete-btn',
      'Delete'
    );
    commentDeleteBtn.addEventListener('click', () => deleteCommentEvent(id));
    li.appendChild(imgNode);
    li.appendChild(textBox);
    textBox.appendChild(author);
    textBox.appendChild(dateNode);
    textBox.appendChild(commentText);
    textBox.appendChild(commentDeleteBtn);
    return li;
  };
  //Building an actual array of comments
  const createCommentNodeList = async () => {
    const comments = await commentData.retrieveData();
    return comments.map((comment) => createComment(comment));
  };

  const refetchComments = async () => {
    const newComments = await createCommentNodeList();
    return commentDisplay(newComments);
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
    return {
      name,
      comment,
    };
  };
  //Delete Event, delete event listener is added in the createComment function
  const deleteCommentEvent = async (id) => {
    await commentData.deleteData(id);
    refetchComments();
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
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      //Validate form values, stop the submit action if it is false
      if (formValidate() === false) return;
      //Extract Form info and insert data into comments array
      const comment = getFormValues();
      await commentData.insertData(comment);
      //Asks display to rebuild the comment list and show new comments
      refetchComments();
      //Clear Inputs
      e.target.name.value = '';
      e.target.comment.value = '';
    });
  };
  //Starting the app
  const init = async () => {
    try {
      //Add Form event listener
      inputEventListener();
      addFormEventListener();
      //Create list and append comment list container when the app runs
      const commentSection = document.querySelector('.comments');
      commentSection.appendChild(createNodeEl('ul', 'comments__list'));
      //Retrieve data and convert it into node element list and display it
      const comments = await createCommentNodeList();
      commentDisplay(comments);
    } catch (err) {
      throw new Error(err.message);
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
