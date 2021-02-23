# pittica/gatsby-source-prestashop

![License](https://img.shields.io/github/license/pittica/gatsby-source-prestashop)
![Version](https://img.shields.io/github/package-json/v/pittica/gatsby-source-prestashop)
![Release](https://img.shields.io/github/v/release/pittica/gatsby-source-prestashop)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/pittica/gatsby-source-prestashop/dev/gatsby)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/pittica/gatsby-source-prestashop/dev/react)
[![npm](https://img.shields.io/npm/v/@pittica/gatsby-source-prestashop)](https://www.npmjs.com/package/@pittica/gatsby-source-prestashop)

## Description

[PrestaShop](https://www.prestashop.com/) source plugin for [GatsbyJS](https://www.gatsbyjs.org/).

## Install

[![npm](https://img.shields.io/npm/v/@pittica/gatsby-source-prestashop)](https://www.npmjs.com/package/@pittica/gatsby-source-prestashop)

```shell
npm install @pittica/gatsby-source-prestashop
```

## Usage

The plugin provides source from a [PrestaShop](https://www.prestashop.com/) site.

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
        locale: LOCALE
      }
    },
  ],
}
```

## Copyright

(c) 2021, Pittaca S.r.l.s.
