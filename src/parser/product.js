const link = require('../link');

exports.parse = (product, { url }) => {
  return {
    id: product.id,
    productId: product.id,
    name: product.name,
    excerpt: product.description_short ? product.description_short : null,
    description: product.description ? product.description : null,
    manufacturerName: product.manufacturer_name ? product.manufacturer_name : null,
    manufacturerId: product.id_manufacturer ? product.id_manufacturer : null,
    link: link.controller(url, 'product', { id: product.id })
  };
};
