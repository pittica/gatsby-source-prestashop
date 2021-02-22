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
