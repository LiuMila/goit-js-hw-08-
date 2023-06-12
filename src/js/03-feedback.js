var throttle = require('lodash.throttle');

const USER_DATA_KEY = 'feedback-form-state';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name = email]'),
  message: document.querySelector('textarea[name = message]'),
};

let formInputData = {};

setFormDataFromLocal();

refs.feedbackForm.addEventListener('input', throttle(onInput, 500));
refs.feedbackForm.addEventListener('submit', handleSubmit);

function onInput(evt) {
  formInputData[evt.target.name] = evt.target.value;

  localStorage.setItem(USER_DATA_KEY, JSON.stringify(formInputData));
}

function setFormDataFromLocal() {
  if (localStorage.getItem(USER_DATA_KEY)) {
    const data = JSON.parse(localStorage.getItem(USER_DATA_KEY));

    formInputData = { ...data };

    refs.email.value = data.email ? data.email : '';
    refs.message.value = data.message ? data.message : '';
  }
}

function handleSubmit(evt) {
  evt.preventDefault();

  const submitedData = { ...JSON.parse(localStorage.getItem(USER_DATA_KEY)) };

  if (Object.keys(submitedData).length === 0) {
    return alert('Поля вводу не можуть бути пустими!');
  }

  const isAllInputFilled =
    submitedData.hasOwnProperty('email') &&
    submitedData.hasOwnProperty('message');

  // console.log();
  if (!isAllInputFilled) {
    return alert('Всі поля мають бути заповнені!');
  }

  console.log(submitedData);

  evt.currentTarget.reset();

  localStorage.removeItem(USER_DATA_KEY);

  clearFormInputDataObj();
}

function clearFormInputDataObj() {
  for (const key of Object.keys(formInputData)) {
    delete formInputData[key];
  }
}