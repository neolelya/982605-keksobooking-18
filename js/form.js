'use strict';

(function () {
  var MAX_PRICE = 1000000;

  var adForm = document.querySelector('.ad-form');
  var addressField = document.querySelector('#address');
  var adTitle = adForm.querySelector('#title');
  var adPrice = adForm.querySelector('#price');
  var adType = adForm.querySelector('#type');
  var adTimeIn = adForm.querySelector('#timein');
  var adTimeOut = adForm.querySelector('#timeout');
  var adRoomNumber = adForm.querySelector('#room_number');
  var adCapacity = adForm.querySelector('#capacity');
  var resetButton = adForm.querySelector('.ad-form__reset');

  var activateAndFillAddress = function () {
    activateForm();
  };

  var buttonKeydownHandler = function (evt) {
    if (window.util.isEnterEvent(evt)) {
      activateForm();
    }
  };

  var setFormFieldsDisabled = function (value) {
    var formFields = document.querySelectorAll('.ad-form input, .ad-form select, .map__filters input, .map__filters select');

    for (var i = 0; i < formFields.length; i++) {
      formFields[i].disabled = value;
    }
  };

  var inputTitleEditHandler = function () {
    if (adTitle.validity.tooShort) {
      adTitle.setCustomValidity('Заголовок вашего объявления должен содержать минимум из 30 символов');
    } else if (adTitle.validity.tooLong) {
      adTitle.setCustomValidity('Заголовок вашего объявления должен содержать максимум 100 символов');
    } else if (adTitle.validity.valueMissing) {
      adTitle.setCustomValidity('Это поле обязательное для заполнения');
    } else {
      adTitle.setCustomValidity('');
    }
  };

  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var setPriceLimitValidity = function () {
    if (adPrice.value < MinPrice[adType.value.toUpperCase()]) {
      adPrice.setCustomValidity('Минимально возможное значение для этого поля - ' + MinPrice[adType.value.toUpperCase()]);
    } else if (adPrice.value > MAX_PRICE) {
      adPrice.setCustomValidity('Максимально возможное значение для этого поля - ' + MAX_PRICE);
    } else {
      adPrice.setCustomValidity('');
    }
  };

  var inputPriceEditHandler = function () {
    if (adPrice.validity.rangeUnderflow) {
      adPrice.setCustomValidity('Цена за данное предложение не может быть ниже ' + (MinPrice[adType.value.toUpperCase()]) + ' рублей за ночь');
    }
  };

  var inputTypeSelectHandler = function () {
    adPrice.min = MinPrice[adType.value.toUpperCase()];
    adPrice.placeholder = window.util.getNumberDigit(MinPrice[adType.value.toUpperCase()]);
    setPriceLimitValidity();
  };

  var inputTimeInSelectHandler = function () {
    switch (adTimeIn.value) {
      case '12:00':
        adTimeOut.value = '12:00';
        break;
      case '13:00':
        adTimeOut.value = '13:00';
        break;
      case '14:00':
        adTimeOut.value = '14:00';
        break;
    }
  };

  var inputTimeOutSelectHandler = function () {
    switch (adTimeOut.value) {
      case '12:00':
        adTimeIn.value = '12:00';
        break;
      case '13:00':
        adTimeIn.value = '13:00';
        break;
      case '14:00':
        adTimeIn.value = '14:00';
        break;
    }
  };

  var limitGuestsNumbers = function () {
    var guests = [0, 1, 2, 3];

    var RoomsGuestsAdditions = {
      1: [2],
      2: [2, 1],
      3: [2, 1, 0],
      100: [3]
    };

    adCapacity[RoomsGuestsAdditions[adRoomNumber.value][0]].selected = true;

    for (var i = 0; i < guests.length; i++) {
      if (RoomsGuestsAdditions[adRoomNumber.value].includes(guests[i])) {
        adCapacity[guests[i]].disabled = false;
      } else {
        adCapacity[guests[i]].disabled = true;
      }
    }
  };

  var resetFormData = function () {
    window.pins.mainPinResetCoordinates();
    adPrice.placeholder = '5000';
    deactivateForm();
    window.map.deactivateMap();
  };

  var formFocusoutHandler = function (evt) {
    evt.target.classList.remove('invalid');
  };

  var formUploadHandler = function () {
    resetFormData();
    adForm.reset();
    window.message.renderSuccessMessage();
  };

  var formErrorHandler = function (errorMessage) {
    window.message.renderErrorMessage(errorMessage);
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.backend.upload(formData, formUploadHandler, formErrorHandler);
    var invalidInputs = Array.from(adForm.querySelectorAll('input:invalid, select:invalid, textarea:invalid'));
    invalidInputs.forEach(function (elem) {
      elem.classList.add('invalid');
    });
  };

  var activateForm = function () {
    setFormFieldsDisabled(false);
    adForm.classList.remove('ad-form--disabled');
    adTitle.addEventListener('invalid', inputTitleEditHandler);
    adPrice.addEventListener('input', setPriceLimitValidity);
    adType.addEventListener('input', inputTypeSelectHandler);
    adPrice.addEventListener('invalid', inputPriceEditHandler);
    adTimeIn.addEventListener('input', inputTimeInSelectHandler);
    adTimeOut.addEventListener('input', inputTimeOutSelectHandler);
    limitGuestsNumbers();
    adRoomNumber.addEventListener('input', limitGuestsNumbers);
    adForm.addEventListener('submit', formSubmitHandler);
    adForm.addEventListener('focusout', formFocusoutHandler);
    resetButton.addEventListener('click', resetFormData);
  };

  var deactivateForm = function () {
    setFormFieldsDisabled(true);
    adForm.classList.add('ad-form--disabled');
    adTitle.removeEventListener('invalid', inputTitleEditHandler);
    adPrice.removeEventListener('input', setPriceLimitValidity);
    adType.removeEventListener('input', inputTypeSelectHandler);
    adPrice.removeEventListener('input', inputPriceEditHandler);
    adTimeIn.removeEventListener('input', inputTimeInSelectHandler);
    adTimeOut.removeEventListener('input', inputTimeOutSelectHandler);
    adRoomNumber.removeEventListener('input', limitGuestsNumbers);
    adForm.removeEventListener('submit', formSubmitHandler);
    adForm.removeEventListener('focusout', formFocusoutHandler);
    resetButton.removeEventListener('click', resetFormData);
  };

  var setCoordinates = function (x, y) {
    addressField.value = x + ', ' + y;
    return addressField;
  };

  window.form = {
    buttonKeydownHandler: buttonKeydownHandler,

    activateAndFillAddress: activateAndFillAddress,

    setCoordinates: setCoordinates
  };
})();
