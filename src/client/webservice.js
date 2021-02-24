const axios = require(`axios`);
const http = require(`http`);
const https = require(`https`);
const link = require(`../link`);

exports.create = ({ url, key, language }) => {
  const params = {};

  if (language) {
    params.language = language;
  }

  return axios.create({
    baseURL: link.api(url),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Output-Format': 'JSON'
    },
    params: params,
    auth: {
      username: key
    },
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    responseType: 'json',
    crossDomain: true
  });
};

exports.get = (client, endpoint, options) => {
  const p = { ...{ display: 'full', sort: { key: 'id', order: 'ASC' } }, ...options };
  const params = {
    display: p.display
  };

  if (p.sort) {
    params.sort = `[${p.sort.key}_${p.sort.order.toUpperCase()}]`;
  }

  if (p.language) {
    params.language = p.language;
  }

  if (p.filters && p.filters.length > 0) {
    Object.keys(p.filters).forEach((key) => {
      params[`filter[${key}]`] = p.filters[key];
    });
  }

  return client
    .get('/' + endpoint, {
      params: params
    })
    .then((response) => {
      if (response.data[endpoint] && response.data[endpoint].length > 0) {
        return response.data[endpoint];
      } else {
        return null;
      }
    });
};
