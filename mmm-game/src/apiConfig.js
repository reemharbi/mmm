let apiUrl;
const expressPort = 5000;
const apiUrls = {
  production: '',
  development: `http://localhost:${expressPort}/api`
};

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

export default apiUrl;