'use strict';

(function () {

  var requestData = {
    url: {
      LOAD: 'https://js.dump.academy/candyshop/data',
      UPLOAD: 'https://js.dump.academy/candyshop'
    },
    timeout: {
      LOAD: 10000,
      UPLOAD: 5000
    },
    status: {
      OK: 200
    },
    message: {
      ERROR_LOAD: 'Произошла ошибка во время загрузки. Статус ответа: ',
      ERROR_SERVER: 'Произошла ошибка соединения',
      ERROR_TIMEOUT: 'Запрос не успел выполниться за '
    }
  };


})();
