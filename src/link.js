const { relativeTimeRounding } = require('moment');

exports.controller = (base, controller, { id, key }) => {
  const url = new URL('/index.php', base).href;
  const params = new URLSearchParams();

  params.append('controller', controller);

  if (id) {
    params.append(key ? key : `id_${controller}`, id);
  }

  return `${url}?${params.toString()}`;
};

exports.api = (base) => new URL('/api', base).href;

exports.image = {
  product: (base, { productId, imageId }) => {
    if (productId && imageId) {
      return new URL('/api', base).href + `/images/products/${productId}/${imageId}`;
    } else {
      return null;
    }
  }
};
