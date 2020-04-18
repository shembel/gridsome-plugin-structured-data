export default function (config, options, context) {
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
	
	const pageTitle = (!title || title == siteName) ? siteName + ' - ' + shortDiscription : title + ' ' + delimiter + ' ' + siteName
	//context.appOptions.metaInfo.titleTemplate = ''
	const modifiedDate = ((ogtype == 'website' && !modified) || modified == 'now') ? new Date().toISOString() : modified || published

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
			itemref: 'mdUrl mdSiteName mdDescription mdImage mdDatePublished mdDateModified mdAuthor',
			property: 'og:type',
			content: ogtype
		}
	]
	const metaArticle = [
		{
			itemscope: 'itemscope',
			itemtype: 'http://schema.org/Article',
			itemref: 'mdHeadline mdDescription mdImage mdDatePublished mdDateModified mdMainEntityOfPage mdAuthor',
			property: 'og:type',
			content: ogtype
		}
	]

	const metaUrl = [
		{
			id: 'mdUrl',
			property: 'og:url',
			itemprop: 'url',
			content: baseUrl + context.router.currentRoute.path//+ this.$route.path
		}
	]
	const metaSiteName = [
		{
			id: 'mdSiteName',
			property: 'og:title',
			itemprop: 'name',
			content: siteName
		}
	]

	const metaHeadline = [
		{
			id: 'mdHeadline',
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
			content: baseUrl + imagePath
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
			content: baseUrl + context.router.currentRoute.path//+ this.$route.path
		}
	]

	const metaAuthor = [
		{
			id: 'mdAuthor',
			itemprop: 'author publisher',
			itemscope: 'itemscope',
			itemtype: 'http://schema.org/Organization',
			itemref: 'mdName mdLogo mdSiteUrl'
		},
		{
			id: 'mdName',
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

	const htmlPref = {
		prefix: 'fb: http://www.facebook.com/2008/fbml',
	}


	//const tagTitle = title || siteName
	const metaArry = [
		...metaUrl
	]
	const linkArry = [
		...linkCanonical
	]
	let arrrsObj = {}

	description && metaArry.push(...metaDescription);
	(ogtype == 'website') && metaArry.push(...metaWebsite);
	(ogtype != 'website') && metaArry.push(...metaArticle);
	(ogtype == 'website') && metaArry.push(...metaUrl);
	(ogtype == 'website') && metaArry.push(...metaSiteName);
	(ogtype != 'website') && metaArry.push(...metaHeadline);
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

	appId && Object.assign(arrrsObj, htmlPref);
	
	
	//this.$once('hook:mounted', () => {
	//	this.$meta().refresh();
	//});

	return {
		title: pageTitle,
		meta: metaArry,
		link: linkArry,
		htmlAttrs: arrrsObj
	}
}
