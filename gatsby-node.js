const { createFileNodeFromBuffer } = require(`gatsby-source-filesystem`);

const prestashop = require(`./src/prestashop`);
const webservice = require(`./src/client/webservice`);
const link = require(`./src/link`);
const pageParser = require(`./src/parser/page`);
const productParser = require(`./src/parser/product`);

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    url: Joi.string().required().description(`The URL of the PrestaShop installation.`),
    key: Joi.string().required().description(`The PrestaShop webservice key.`),
    locale: Joi.string().description(`The locale "iso_code" of the language.`),
    images: Joi.object({
      download: Joi.boolean().description(`A value indicating whether download images from products.`).default(false),
      format: Joi.object({
        product: Joi.string().default('medium_default'),
        category: Joi.string().default('category_default'),
        manufacturer: Joi.string().default('manufacturer_default')
      })
        .description(`Image formats.`)
        .default(),
      extension: Joi.string().description(`Image extension.`).default('jpg')
    })
      .description(`Image settings.`)
      .default()
  });
};

exports.sourceNodes = async (
  { actions: { createNode }, reporter, createContentDigest, createNodeId },
  pluginOptions
) => {
  if (pluginOptions.url && pluginOptions.key) {
    const client = webservice.create(pluginOptions);
    const languages = await prestashop.languages(client, { filters: { iso_code: pluginOptions.locale } });

    if (languages && languages.length > 0) {
      client.defaults.params.language = languages[0].id;

      reporter.info(`[gatsby-source-prestashop] Loaded "${languages[0].name}" language.`);
    }

    const products = await prestashop.products(client);
    const pages = await prestashop.pages(client);

    products.forEach((product) => {
      const content = productParser.parse(product, pluginOptions);

      createNode({
        ...content,
        id: createNodeId(`PrestashopProduct-${content.id}`),
        parent: null,
        children: [],
        imageData: {
          productId: product.id,
          imageId: product.id_default_image,
          link: link.image.product(pluginOptions.url, {
            id: product.id_default_image,
            format: pluginOptions.images.format.product,
            extension: pluginOptions.images.extension.toLowerCase()
          })
        },
        internal: {
          type: `PrestashopProduct`,
          content: JSON.stringify(content),
          contentDigest: createContentDigest(content)
        }
      });
    });

    pages.forEach((page) => {
      const content = pageParser.parse(page);

      createNode({
        ...content,
        id: createNodeId(`PrestashopPage-${content.id}`),
        parent: null,
        children: [],
        internal: {
          type: `PrestashopPage`,
          content: content.content,
          contentDigest: createContentDigest(content)
        }
      });
    });
  }
};

exports.onCreateNode = async ({ node, actions: { createNode }, cache, createNodeId }, pluginOptions) => {
  if (pluginOptions.images.download && node.internal.type === 'PrestashopProduct' && node.imageData !== null) {
    if (node.imageData.imageId) {
      const client = webservice.create(pluginOptions);
      const buffer = await prestashop.image(client, node.imageData);

      if (buffer !== null) {
        const fileNode = await createFileNodeFromBuffer({
          buffer,
          cache,
          createNode,
          createNodeId,
          name: node.imageData.imageId
        });

        if (fileNode) {
          node.image___NODE = fileNode.id;
        }
      }
    }
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type PrestashopPage implements Node {
      id: ID!
      title: String!
      keywords: String
      excerpt: String
      slug: String!
      content: String
    }
    type PrestashopProduct implements Node {
      id: ID!
      productId: Int
      name: String!
      excerpt: String
      description: String
      manufacturerName: String
      manufacturerId: Int
      link: String!
      image: File @link(from: "image___NODE")
    }
  `);
};
