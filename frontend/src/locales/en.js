export default {
  translation: {
    errors: {
      network: 'Check your network connection!',
      server: 'Server issues',
      loginValidation: 'Wrong username or password',
      authorizationError: "There's already a user with the same nickname",
      tooShortName: "Name's too short",
      tooLongName: "Name's too long",
      requiredField: 'This field is required',
      tooShortPassword: "Password's too short",
      tooLongPassword: "Password's too long",
      passwordsDontMatch: "Passwords don't match",
      mustBeUnique: 'Must be unique',
      symbolsLength: 'From 3 to 20 characters',
    },
    signInPage: {
      h1Text: 'Sign In',
      loginButton: 'Enter chat',
      footerMessage: "Don't you have an account? ",
      registrationLink: 'Register here',
      placeholders: {
        username: 'Your nickname',
        password: 'Password',
      },
    },
    signUpPage: {
      h1Text: 'Sign Up',
      registerButton: 'Register',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm password',
    },
    mainPage: {
      hexlet: 'Hexlet Chat',
      signOut: 'Sign Out',
    },
    errorPage: {
      h1Text: "404. Page's not found",
      redirectMessage: 'But you can redirect to the ',
      redirectLink: 'main page',
    },
    channels: {
      channels: 'Channels',
      dropdownToggle: {
        delete: 'Remove',
        rename: 'Rename',
      },
    },
    messages: {
      messagesCounter: {
        messagesCount_zero: ' messages',
        messagesCount_one: ' message',
        messagesCount_other: ' messages',
      },
      newMessage: 'Enter your message...',
      placeholder: 'New message',
      sendMessage: 'Send',
    },
    modals: {
      cancelButton: 'Cancel',
      addModal: {
        addChannel: 'Add channel',
        addButton: 'Add',
      },
      removeModal: {
        removeChannel: 'Remove channel',
        deleteButton: 'Remove',
        message: 'Are you sure?',
      },
      renameModal: {
        renameChannel: 'Rename channel',
        renameButton: 'Rename',
      },
    },
  },
};