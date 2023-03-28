export default {
  translation: {
    errors: {
      network: 'Проверьте подключение к сети!',
      server: 'Неполадки с сервером',
      loginValidation: 'Неверные имя пользователя или пароль',
      authorizationError: 'Пользователь с таким именем уже есть',
      tooShortName: 'Слишком короткое имя',
      tooLongName: 'Слишком длинное имя',
      requiredField: 'Обязательное поле',
      tooShortPassword: 'Слишком короткий пароль',
      tooLongPassword: 'Слишком длинный пароль',
      passwordsDontMatch: 'Пароли не совпадают',
      mustBeUnique: 'Должно быть уникальным',
      symbolsLength: 'От 3 до 20 символов',
    },
    signInPage: {
      h1Text: 'Вход',
      loginButton: 'Войти в чат',
      footerMessage: 'Нет аккаунта? ',
      registrationLink: 'Регистрация',
      placeholders: {
        username: 'Ваш ник',
        password: 'Пароль',
      },
    },
    signUpPage: {
      h1Text: 'Регистрация',
      registerButton: 'Зарегистрироваться',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
    },
    mainPage: {
      hexlet: 'Hexlet Chat',
      signOut: 'Выйти',
    },
    errorPage: {
      h1Text: 'Страница не найдена',
      redirectMessage: 'Но вы можете перейти ',
      redirectLink: 'на главную страницу',
    },
    channels: {
      channels: 'Каналы',
      dropdownToggle: {
        delete: 'Удалить',
        rename: 'Переименовать',
      },
    },
    messages: {
      messagesCounter: {
        messagesCount_zero: ' сообщений',
        messagesCount_one: ' сообщение',
        messagesCount_few: ' сообщения',
        messagesCount_many: ' сообщений',
      },
      newMessage: 'Введите сообщение...',
      placeholder: 'Новое сообщение',
      sendMessage: 'Отправить',
    },
    modals: {
      cancelButton: 'Отменить',
      addModal: {
        addChannel: 'Добавить канал',
        addButton: 'Добавить',
      },
      removeModal: {
        removeChannel: 'Удалить канал',
        deleteButton: 'Удалить',
        message: 'Уверены?',
      },
      renameModal: {
        renameChannel: 'Переименовать канал',
        renameButton: 'Отправить',
      },
    },
  },
};
