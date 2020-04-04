# gridsome-plugin-structured-data

A Gridsome plugin to add structured data (microdata), ogp and twittercard tags.
It also sets the standard title and description tag at the same time.

This is a fork of [brandonpittman/gridsome-plugin-ogp](https://github.com/brandonpittman/gridsome-plugin-ogp).

## Install

```sh
$ npm i colus-img/gridsome-plugin-structured-data
```

## Usage

Add in your `gridsome.config.js` like this:

```javascript

const siteName = 'your site`s name'
const baseUrl = 'https://example.com'
const titleDelimiter = '|'
const siteDescription = 'some descriptions of your site'

module.exports = {
	siteName: siteName,
	siteUrl: baseUrl,
	titleTemplate: '%s',
	siteDescription: siteDescription,
	plugins: [
		{
			use: 'gridsome-plugin-structured-data',
			options: {
				siteName: siteName,
				shortDiscription: 'websiteDesign and bookDesign', //in top page title is 'siteName' - 'shortDiscription'
				baseUrl: baseUrl,
				delimiter: titleDelimiter,
				description: siteDescription,
				published: '2020-04-01T00:00:00+09:00', //Published date/time of your site in ISO8601 format
				imagePath: '/path/to/ogp-image', //Default ogp image.
				logoPath: '/path/to/logo-image', //Raster image. Don't use svg.
				appId: '000000000000000', //option, facebook app id
				twcard: 'summary_large_image', //option, one of summary, summary_large_image, app, or player.
				twsite: '@siteAcount', //option, @name for your website.
				twcreator: '@creatorAcount' //option, @name for the content creator.
			}
		}
	]
}
```

Then, in Index.vue file, adjust the metaInfo hook like this:

```javascript
metaInfo() {
	return {
		...this.$sd({
			ogtype: 'website' //article or website. Default is article
		})
	}
}
```

Then, in any page or template component you have, adjust the metaInfo hook
like this:

```javascript
metaInfo() {
	return {
		...this.$sd({
			title: 'page-title',
			description: 'some descriptions of the page',
			image: '/path/to/page-image', //option, If not, the default ogp image will be used 
			published: '2020-04-01T00:00:00+09:00', //Published date/time of the page in ISO8601 format
			modified: '2020-04-02T00:00:00+09:00', //option, Modified date/time of the page in ISO8601 format. 'now' is keyword to set date.now for such as list page. 
		})
	}
}
```
