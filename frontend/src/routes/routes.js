const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  loginPage: () => ['login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  usersPath: () => [apiPath, 'signup'].join('/'),
};
