let apiUrl = '';

function getUrlForType(type) {
  switch (type) {
    case 'STAGING':
      return process.env.REACT_APP_API_STAGING_URL;
    case 'PROD':
      return process.env.REACT_APP_API_PROD_URL;
    case 'LOCAL':
      return process.env.REACT_APP_API_LOCAL_URL;
    default:
      throw new Error(`Specified API URL of (${type}) is invalid, please reference .env.example and update your env vars`);
  }
}

const apiType = process.env.REACT_APP_API_TYPE || process.env.REACT_APP_API_DEFAULT_TYPE;
apiUrl = getUrlForType(apiType); 

export { apiUrl };
