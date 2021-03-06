const docCreate = require('./creates/doc');
const docTrigger = require('./triggers/doc');
const collectionTrigger = require('./triggers/collection');
const authentication = require('./authentication');

const handleHTTPError = (response, z) => {
  if (response.status >= 400) {
    throw new Error(`Unexpected status code ${response.status}`);
  }
  return response;
};

const addHeaders = (request, z, bundle) => {
  request.headers['Content-Type'] = 'application/json';
  request.headers.Accept = 'application/json';
  request.headers.Authorization = `Bearer ${bundle.authData.api_token}`;
  return request;
};

const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
    addHeaders
  ],

  afterResponse: [
    handleHTTPError
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [collectionTrigger.key]: collectionTrigger,
    [docTrigger.key]: docTrigger
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [docCreate.key]: docCreate,
  }
};

// Finally, export the app.
module.exports = App;
