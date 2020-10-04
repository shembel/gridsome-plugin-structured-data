export default function (config, options, context, _this) {
	//console.log(context.appOptions.metaInfo.titleTemplate);
	const {
		title,
		shortDiscription,
		siteName,
		delimiter = '-',
		baseUrl,
		description,
		published,
		modified,
		imagePath,
		logoPath,
		appId,
		twcard,
		twsite,
		twcreator,
		ogtype = 'article'
	} = Object.assign({}, config, options)
	
	const pageTitle = (!title || title == siteName) ? siteName + ' - ' + shortDiscription : title;
	// const pageTitle = (!title || title == siteName) ? siteName + ' - ' + shortDiscription : title + ' ' + delimiter + ' ' + siteName
	//context.appOptions.metaInfo.titleTemplate = ''
	const modifiedDate = ((ogtype == 'website' && !modified) || modified == 'now') ? new Date().toISOString() : modified || published
	const pageImage = imagePath && (imagePath.slice(0, 4) ==='http') ? imagePath : baseUrl + imagePath || ''

	const metaDescription = [
		{
			name: 'description',
			content: description
		}
	]

	const metaWebsite = [
		{
			itemscope: 'itemscope',
			itemtype: 'http://schema.org/WebSite',
			itemref: 'mdTitle mdUrl mdDescription mdImage mdDatePublished mdDateModified mdAuthor',
			property: 'og:type',
			content: ogtype
		},
		{
			id: 'mdTitle',
			property: 'og:title',
			itemprop: 'name',
			content: siteName
		}
	]

	const metaUrl = [
		{
			id: 'mdUrl',
			property: 'og:url',
			itemprop: 'url',
			content: baseUrl + context.router.currentRoute.path//+ _this.$route.path
		}
	]

	const metaArticle = [
		{
			itemscope: 'itemscope',
			itemtype: 'http://schema.org/Article',
			itemref: 'mdTitle mdDescription mdImage mdDatePublished mdDateModified mdMainEntityOfPage mdAuthor',
			property: 'og:type',
			content: ogtype
		},
		{
			id: 'mdTitle',
			property: 'og:title',
			itemprop: 'headline',
			content: pageTitle
		}
	]

	const metaBlog = [
		{
			itemscope: 'itemscope',
			itemtype: 'http://schema.org/Blog',
			itemref: 'mdTitle mdDescription mdImage mdDatePublished mdDateModified',
			property: 'og:type',
			content: ogtype
		},
		{
			id: 'mdTitle',
			property: 'og:title',
			itemprop: 'headline',
			content: pageTitle
		}
	]

	const metaBlogPosting = [
		{
			itemscope: 'itemscope',
			itemtype: 'http://schema.org/BlogPosting',
			itemref: 'mdTitle mdDescription mdImage mdDatePublished mdDateModified',
			property: 'og:type',
			content: ogtype
		},
		{
			id: 'mdTitle',
			property: 'og:title',
			itemprop: 'headline',
			content: pageTitle
		}
	]

	const metaMdDesc = [
		{
			id: 'mdDescription',
			property: 'og:description',
			itemprop: 'description',
			content: description
		}
	]

	const metaImage = [
		{
			id: 'mdImage',
			property: 'og:image',
			itemprop: 'image',
			content: pageImage
		}
	]

	const metaPubDate = [
		{
			id: 'mdDatePublished',
			property: 'article:published_time',
			itemprop: 'datePublished',
			content: published
		}
	]
	const metaModDate = [
		{
			id: 'mdDateModified',
			property: 'article:modified_time',
			itemprop: 'dateModified',
			content: modifiedDate
		}
	]

	const metaEntity = [
		{
			id: 'mdMainEntityOfPage',
			property: 'og:url',
			itemprop: 'mainEntityOfPage',
			content: baseUrl + context.router.currentRoute.path//+ _this.$route.path
		}
	]

	const metaAuthor = [
		{
			id: 'mdAuthor',
			itemprop: 'author publisher',
			itemscope: 'itemscope',
			itemtype: 'http://schema.org/Organization',
			itemref: 'mdAuthorName mdLogo mdSiteUrl'
		},
		{
			id: 'mdAuthorName',
			property: 'og:site_name',
			itemprop: 'name',
			content: siteName
		},
		{
			id: 'mdSiteUrl',
			itemprop: 'url',
			content: baseUrl
		}
	]

	const metaLogo = [
		{
			id: 'mdLogo',
			itemprop: 'logo',
			itemscope: 'itemscope',
			itemtype: 'http://schema.org/ImageObject',
			itemref: 'mdLogoUrl'
		},
		{
			id: 'mdLogoUrl',
			property: 'og:image:alt',
			itemprop: 'url',
			content: baseUrl + logoPath
		}
	]

	const metaAppId = [
		{
			property: 'fb:app_id',
			content: appId 
		}
	]
	const metaTwcard = [
		{
			name: 'twitter:card',
			content: twcard 
		}
	]
	const metaTwsite = [
		{
			name: 'twitter:site',
			content: twsite 
		}
	]
	const metaTwcreator = [
		{
			name: 'twitter:creator',
			content: twcreator 
		}
	]

	const linkCanonical = [
		{
			rel: 'canonical',
			href: baseUrl + context.router.currentRoute.path//+ this.$route.path
		}
	]

	/*const htmlPref = {
		prefix: 'fb: http://www.facebook.com/2008/fbml',
	}*/


	const metaArry = []
	const linkArry = [
		...linkCanonical
	]
	//let arrrsObj = {}

	description && metaArry.push(...metaDescription);
	(ogtype == 'website') && metaArry.push(...metaWebsite);
	(ogtype == 'website') && metaArry.push(...metaUrl);
	switch (ogtype.toLowerCase()) {
		case 'article':
			metaArry.push(...metaArticle);
			break;
		case 'blog':
			metaArry.push(...metaBlog);
			break;
		case 'blogposting':
			metaArry.push(...metaBlogPosting);
			break;
	}
	description && metaArry.push(...metaMdDesc);
	imagePath && metaArry.push(...metaImage);
	published && metaArry.push(...metaPubDate);
	modifiedDate && metaArry.push(...metaModDate);
	(ogtype != 'website') && metaArry.push(...metaEntity);
	siteName && metaArry.push(...metaAuthor);
	logoPath && metaArry.push(...metaLogo);
	appId && metaArry.push(...metaAppId);
	twcard && metaArry.push(...metaTwcard);
	twsite && metaArry.push(...metaTwsite);
	twcreator && metaArry.push(...metaTwcreator);

	//appId && Object.assign(arrrsObj, htmlPref);
	
	
	//_this.$once('hook:mounted', () => {
	//	_this.$meta().refresh();
	//});

	return {
		title: pageTitle,
		meta: metaArry,
		link: linkArry//,
		//htmlAttrs: arrrsObj
	}
}
