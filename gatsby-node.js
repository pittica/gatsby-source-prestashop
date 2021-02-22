const prestashop = require(`./src/prestashop`);
const webservice = require(`./src/client/webservice`);
const pageParser = require(`./src/parser/page`);
const productParser = require(`./src/parser/product`);

let locale = null;

exports.onPreBootstrap = async ({ reporter }, pluginOptions) => {
	if (pluginOptions.url && pluginOptions.key) {
		const client = webservice.create(pluginOptions);

		if (pluginOptions.locale) {
			const languages = await prestashop.languages(client, { filters: { iso_code: pluginOptions.locale } });

			if (languages && languages.length > 0) {
				this.locale = languages[0].id;

				reporter.info(`gatsby-source-prestashop: Loaded "${languages[0].name}" language.`);
			}
		}
	}
};

exports.sourceNodes = async ({ actions: { createNode }, createContentDigest, createNodeId }, pluginOptions) => {
	if (pluginOptions.url && pluginOptions.key) {
		const client = webservice.create({ ...pluginOptions, ...{ language: this.locale } });
		const products = await prestashop.products(client);
		const pages = await prestashop.pages(client);

		products.forEach((product) => {
			const content = productParser.parse(product);

			createNode({
				...content,
				id: createNodeId(`PrestashopProduct-${content.id}`),
				parent: null,
				children: [],
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
    }
  `);
};
