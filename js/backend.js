'use strict';

(function () {
  var TIMEOUT = 5000;

  var Url = {
    DOWNLOAD: 'https://js.dump.academy/keksobooking/data'
  };

  var StatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCodes.OK:
          onLoad(xhr.response);
          break;
        case StatusCodes.BAD_REQUEST:
          onError('Неверный запрос');
          break;
        case StatusCodes.UNAUTHORIZED:
          onError('Пользователь не авторизован');
          break;
        case StatusCodes.NOT_FOUND:
          onError('Ничего не найдено');
          break;
        case StatusCodes.INTERNAL_SERVER_ERROR:
          onError('Ошибка на стороне сервера');
          break;
        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var download = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);

    xhr.open('GET', Url.DOWNLOAD);
    xhr.send();
  };

  window.backend = {
    download: download
  };
})();
