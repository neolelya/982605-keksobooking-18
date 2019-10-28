'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');


  var renderErrorMessage = function (errorMessage) {
    var newError = errorTemplate.cloneNode(true);
    newError.querySelector('.error__message').textContent = errorMessage;
    document.body.appendChild(newError);

    document.addEventListener('keydown', function (evt) {
      if (window.util.isEscEvent(evt)) {
        document.body.removeChild(newError);
      }
    });

    document.addEventListener('click', function (evt) {
      if (evt.target !== newError.querySelector('.error__button')) {
        newError.classList.add('visually-hidden');
      }
    });
    newError.querySelector('.error__button').addEventListener('click', function () {
      newError.classList.add('visually-hidden');
    });
  };

  var renderSuccessMessage = function () {
    var newSuccess = successTemplate.cloneNode(true);
    document.body.appendChild(newSuccess);

    var successEscButtonHandler = function (evt) {
      if (window.util.isEscEvent(evt)) {
        document.removeEventListener('click', successClickHandler);
        document.removeEventListener('keydown', successEscButtonHandler);
        document.body.removeChild(newSuccess);
      }
    };

    var successClickHandler = function () {
      document.removeEventListener('click', successClickHandler);
      document.removeEventListener('keydown', successEscButtonHandler);
      document.body.removeChild(newSuccess);
    };

    if (newSuccess) {
      document.addEventListener('keydown', successEscButtonHandler);
      document.addEventListener('click', successClickHandler);
    }
  };

  window.message = {
    renderErrorMessage: renderErrorMessage,

    renderSuccessMessage: renderSuccessMessage
  };
})();
