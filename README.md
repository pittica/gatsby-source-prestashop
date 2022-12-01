# pittica/gatsby-source-prestashop

![License](https://img.shields.io/github/license/pittica/gatsby-source-prestashop)
![Version](https://img.shields.io/github/package-json/v/pittica/gatsby-source-prestashop)
![Release](https://img.shields.io/github/v/release/pittica/gatsby-source-prestashop)
![Gatsby Version](https://img.shields.io/npm/dependency-version/@pittica/gatsby-source-prestashop/peer/gatsby)
![React Version](https://img.shields.io/github/package-json/dependency-version/pittica/gatsby-source-prestashop/react)

## Description

[PrestaShop](https://www.prestashop-project.org/) source plugin for [GatsbyJS](https://www.gatsbyjs.org/).

## Install

[![npm](https://img.shields.io/npm/v/@pittica/gatsby-source-prestashop)](https://www.npmjs.com/package/@pittica/gatsby-source-prestashop)
[![npm](https://img.shields.io/npm/dm/@pittica/gatsby-source-prestashop)](https://www.npmjs.com/package/@pittica/gatsby-source-prestashop)

```shell
npm install @pittica/gatsby-source-prestashop
```

## Usage

The plugin provides source from a [PrestaShop](https://www.prestashop-project.org/) site.

## Configuration

Edit your **gatsby-config.js**.

```javascript
module.exports = {
  plugins: [
    {
      resolve: `@pittica/gatsby-source-prestashop`,
      options: {
        url: SHOP_URL,
        key: SHOP_KEY,
        locale: LOCALE,
        images: {
          download: false,
          format: {
            product: 'medium_default',
            category: 'category_default',
            manufacturer: 'manufacturer_default'
          },
          extension: 'jpg'
        }
      }
    },
  ],
}
```
### Options

* #### url
  Description: The URL of the PrestaShop installation.

  Required: **YES**.

  Type: **String**.
* #### key
  Description: The PrestaShop webservice key.

  Required: **YES**.

  Type: **String**.
* #### locale
  Description: The locale *iso_code* of the language.

  Required: **NO**.

  Type: **String**.
* #### images
  Description: Image settings.

  Required: **NO**.

  Type: **Object**.

  Default value: **true**.


## Copyright

(c) 2021, [Pittica S.r.l.s.](https://pittica.com).
