'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var renderError = function (message) {
    var errorMessage = errorTemplate.cloneNode(true);
    errorMessage.querySelector('.error__message').textContent = message;
    document.body.appendChild(errorMessage);

    var errorEscButtonHandler = function (evt) {
      if (window.util.isEscEvent(evt)) {
        document.body.removeChild(errorMessage);
        document.removeEventListener('keydown', errorEscButtonHandler);
        document.removeEventListener('click', errorClickHandler);
      }
    };
    document.addEventListener('keydown', errorEscButtonHandler);

    var errorClickHandler = function (evt) {
      if (evt.target !== errorMessage.querySelector('.error__button')) {
        document.body.removeChild(errorMessage);
        document.removeEventListener('click', errorClickHandler);
        document.removeEventListener('keydown', errorEscButtonHandler);
      }
    };
    document.addEventListener('click', errorClickHandler);

    errorMessage.querySelector('.error__button').addEventListener('click', function () {
      document.body.removeChild(errorMessage);
    });
  };

  var renderSuccess = function () {
    var successMessage = successTemplate.cloneNode(true);
    document.body.appendChild(successMessage);

    var successEscButtonHandler = function (evt) {
      if (window.util.isEscEvent(evt)) {
        document.removeEventListener('click', successClickHandler);
        document.removeEventListener('keydown', successEscButtonHandler);
        document.body.removeChild(successMessage);
      }
    };

    var successClickHandler = function () {
      document.removeEventListener('click', successClickHandler);
      document.removeEventListener('keydown', successEscButtonHandler);
      document.body.removeChild(successMessage);
    };

    if (successMessage) {
      document.addEventListener('keydown', successEscButtonHandler);
      document.addEventListener('click', successClickHandler);
    }
  };

  window.message = {
    renderError: renderError,

    renderSuccess: renderSuccess
  };
})();
