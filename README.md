# gridsome-plugin-ogp

Adding OGP meta tags to every page can be a pain. This plugin aims to alleviate
that pain. Add the plugin to your project like so.

```sh
npm i colus/gridsome-plugin-ogp#feat/enable-ovrwrite
```

Add `.env` file to your project root. like this...

```
GRIDSOME_BASE_PATH=https://example.com
GRIDSOME_SITE_NAME=your-site-name
GRIDSOME_TITLE_DELIMITER=|
```

In `gridsome.config.js`...

```javascript
module.exports = {
  siteName: process.env.GRIDSOME_SITE_NAME,
  siteUrl: process.env.GRIDSOME_BASE_PATH,
  titleTemplate: '%s ' + process.env.GRIDSOME_TITLE_DELIMITER + ' ' + process.env.GRIDSOME_SITE_NAME,
  siteDescription: 'your-description',
  plugins: [
    {
      use: 'gridsome-plugin-ogp'
    }
  ]
}
```

Then, in App.vue or Default.vue file, set default value.

```javascript
<static-query>
  query {
    metadata {
      siteName
      siteDescription
    }
  }
</static-query>

<script>
metaInfo() {
  return {
    ...this.$ogp({
      title: this.$static.metadata.siteName,
      description: this.$static.metadata.siteDescription,
      image: '/your-image-path/image-name-1.jpg',
      appId: 'someFacebookAppID',
      twcard: 'summary_large_image',
      ogtype: 'article'
    })
  }
}
</script>
```

Then, in any page or template component you have, adjust the `metaInfo` hook
like so.

```javascript
metaInfo() {
  return {
    ...this.$ogp({
      title: 'your-title',
      image: '/your-image-path/image-name-2.jpg',
    })
  }
}
```

This will then populate the meta tags needed for Facebook, Google, and Twitter.
It will also set the standard page title and description at the same time.
