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
  product: (base, { id, extension, format }) => {
    return this.image.splitted(base, { id, type: 'p', extension, format });
  },
  category: (base, { id, extension, format }) => {
    return this.image.base(base, { id, type: 'c', extension, format });
  },
  manufacturer: (base, { id, extension, format }) => {
    return this.image.base(base, { id, type: 'm', extension, format });
  },
  cms: (base, { id, extension, format }) => {
    return this.image.base(base, { id, type: 'cms', extension, format });
  },
  splitted: (base, { id, type, extension, format }) => {
    if (id) {
      return (
        new URL('/img', base).href +
        `/${type}/${this.split(id)}/${id}${format ? '-' + format : ''}.${extension ? extension : 'jpg'}`
      );
    } else {
      return null;
    }
  },
  base: (base, { id, type, extension, format }) => {
    if (id) {
      return (
        new URL('/img', base).href + `/${type}/${id}${format ? '-' + format : ''}.${extension ? extension : 'jpg'}`
      );
    } else {
      return null;
    }
  }
};

exports.split = (id) => {
  return Array.from(id.toString()).join('/');
};
