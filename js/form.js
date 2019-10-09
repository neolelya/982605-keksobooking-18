'use strict';

(function () {
  var MAX_PRICE = 1000000;

  var dialogWindow = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
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
    getCoordinates();
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

  var inputPriceMaxLimitHandler = function () {
    if (adPrice.value > MAX_PRICE) {
      adPrice.setCustomValidity('Максимально возможное значение для этого поля - ' + MAX_PRICE);
    } else {
      adPrice.setCustomValidity('');
    }
  };

  var MinPrices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var inputPriceEditHandler = function () {
    if (adPrice.validity.rangeUnderflow) {
      adPrice.setCustomValidity('Цена за данное предложение не может быть ниже ' + (MinPrices[adType.value.toUpperCase()]) + ' рублей за ночь');
    }
  };

  var inputTypeSelectHandler = function () {
    adPrice.min = MinPrices[adType.value.toUpperCase()];
    adPrice.placeholder = window.util.getNumberDigit(MinPrices[adType.value.toUpperCase()]);
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

  var resetFormDataHandler = function () {
    adPrice.placeholder = '5000';
    deactivateForm();
  };

  var activateForm = function () {
    dialogWindow.classList.remove('map--faded');
    setFormFieldsDisabled(false);
    adForm.classList.remove('ad-form--disabled');
    adTitle.addEventListener('invalid', inputTitleEditHandler);
    adPrice.addEventListener('input', inputPriceMaxLimitHandler);
    adType.addEventListener('input', inputTypeSelectHandler);
    adPrice.addEventListener('input', inputPriceEditHandler);
    adTimeIn.addEventListener('input', inputTimeInSelectHandler);
    adTimeOut.addEventListener('input', inputTimeOutSelectHandler);
    limitGuestsNumbers();
    adRoomNumber.addEventListener('input', limitGuestsNumbers);
    resetButton.addEventListener('click', resetFormDataHandler);
  };

  var deactivateForm = function () {
    dialogWindow.classList.add('map--faded');
    setFormFieldsDisabled(true);
    adForm.classList.add('ad-form--disabled');
    adTitle.removeEventListener('invalid', inputTitleEditHandler);
    adPrice.removeEventListener('input', inputPriceMaxLimitHandler);
    adType.removeEventListener('input', inputTypeSelectHandler);
    adPrice.removeEventListener('input', inputPriceEditHandler);
    adTimeIn.removeEventListener('input', inputTimeInSelectHandler);
    adTimeOut.removeEventListener('input', inputTimeOutSelectHandler);
    adRoomNumber.removeEventListener('input', limitGuestsNumbers);
    resetButton.removeEventListener('click', resetFormDataHandler);
  };

  var getCoordinates = function () {
    var MAIN_PIN_WIDTH = 62;
    var MAIN_PIN_HEIGHT = 82;
    var x = parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2;
    var y = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT;
    addressField.readOnly = true;
    addressField.value = x + ', ' + y;
    return addressField;
  };

  window.form = {
    buttonKeydownHandler: buttonKeydownHandler,

    activateAndFillAddress: activateAndFillAddress
  };
})();
