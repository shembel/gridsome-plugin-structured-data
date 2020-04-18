# gridsome-plugin-structured-data

A Gridsome plugin to add structured data (microdata), ogp and twittercard tags.
It also sets the standard title and description tag at the same time.

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

## Output example of an article page
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>The Great Minds Think Alike</title>
  <meta name="description" content="How much does culture influence creative thinking?">
  <meta itemscope itemtype="http://schema.org/Article" itemref="mdHeadline mdDescription mdImage mdDatePublished mdDateModified mdMainEntityOfPage mdAuthor" property="og:type" content="article">
  <meta id="mdHeadline" property="og:title" itemprop="headline" content="The Great Minds Think Alike">
  <meta id="mdDescription" property="og:description" itemprop="description" content="How much does culture influence creative thinking?">
  <meta id="mdImage" property="og:image" itemprop="image" content="https://example.com/img/ogp.jpg">
  <meta id="mdDatePublished" property="article:published_time" itemprop="datePublished" content="2015-02-05T08:00:00Z">
  <meta id="mdDateModified" property="article:modified_time" itemprop="dateModified" content="2015-02-06T08:00:00Z">
  <meta id="mdMainEntityOfPage" property="og:url" itemprop="mainEntityOfPage" content="https://example.com/2015/great-minds/">
  <meta id="mdAuthor" itemprop="author publisher" itemscope itemtype="http://schema.org/Organization" itemref="mdName mdLogo">
  <meta id="mdName" itemprop="name" property="og:site_name" content="The Example Times">
  <meta id="mdLogo" itemprop="logo" itemscope itemtype="http://schema.org/ImageObject" itemref="mdLogoUrl">
  <meta id="mdLogoUrl" property="og:image:alt" itemprop="url" content="https://example.com/img/logo.png">
  <meta property="fb:app_id" content="000000000000000">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@the_example_times">
  <meta name="twitter:creator" content="@example_editor">
  <link rel="canonical" href="https://example.com/2015/great-minds/">
</head>
...
```

## Output example of an top page
```html
<!DOCTYPE html>
<html lang="en">
<head>
<title>The Example Times</title>
  <meta name="description" content="Top page of The Example Times">
  <meta itemscope itemtype="http://schema.org/WebSite" itemref="mdUrl mdSiteName mdDescription mdImage mdDatePublished mdDateModified mdAuthor" property="og:type" content="website">
  <meta id="mdUrl" property="og:url" itemprop="url" content="https://example.com/">
  <meta id="mdSiteName" property="og:title" itemprop="name" content="The Example Times">
  <meta id="mdDescription" property="og:description" itemprop="description" content="Top page of The Example Times">
  <meta id="mdImage" property="og:image" itemprop="image" content="https://example.com/img/ogp.jpg">
  <meta id="mdDatePublished" property="article:published_time" itemprop="datePublished" content="2015-02-05T08:00:00Z">
  <meta id="mdDateModified" property="article:modified_time" itemprop="dateModified" content="2015-02-06T08:00:00Z">
  <meta id="mdAuthor" itemprop="author publisher" itemscope itemtype="http://schema.org/Organization" itemref="mdName mdLogo">
  <meta id="mdName" itemprop="name" property="og:site_name" content="The Example Times">
  <meta id="mdLogo" itemprop="logo" itemscope itemtype="http://schema.org/ImageObject" itemref="mdLogoUrl">
  <meta id="mdLogoUrl" property="og:image:alt" itemprop="url" content="https://example.com/img/logo.png">
  <meta property="fb:app_id" content="000000000000000">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@the_example_times">
  <meta name="twitter:creator" content="@example_editor">
  <link rel="canonical" href="https://example.com/">
</head>
...
```

## Inspiration

This is a fork of [brandonpittman/gridsome-plugin-ogp](https://github.com/brandonpittman/gridsome-plugin-ogp).
Thank you so much!