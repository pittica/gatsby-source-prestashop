const webservice = require('./client/webservice');

exports.pages = (client, options) =>
  webservice.get(client, 'content_management_system', {
    ...{
      sort: {
        key: 'position',
        order: 'ASC'
      }
    },
    ...options
  });

exports.products = (client, options) => webservice.get(client, 'products', options);

exports.languages = (client, options) => webservice.get(client, 'languages', options);

exports.image = (client, { productId, imageId }) => {
  if (productId && imageId) {
    return client
      .get(`/images/products/${productId}/${imageId}`, { responseType: 'arraybuffer' })
      .then((response) => {
        if (response.status === 200) {
          const buffer = Buffer.from(response.data, 'binary');

          if (Buffer.isBuffer(buffer)) {
            return buffer;
          } else {
            return null;
          }
        }
      });
  } else {
    return null;
  }
};
