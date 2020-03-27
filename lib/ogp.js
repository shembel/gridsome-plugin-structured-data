export default function ({
	title,
	description,
	image,
	appId,
	twcard,
	ogtype
} = {}) {

	const pageTitle = title == process.env.GRIDSOME_SITE_NAME ? title : title + ' ' + process.env.GRIDSOME_TITLE_DELIMITER + ' ' + process.env.GRIDSOME_SITE_NAME
	
	const setTitle = [
		{
			key: 'itemName',
			itemprop: 'name',
			content: pageTitle
		},
		{
			key: 'twTitle',
			name: 'twitter:title',
			content: pageTitle
		},
		{
			key: 'ogTitle',
			property: 'og:title',
			content: pageTitle
		}
	]


	const setDescription = [
		{
			key: 'description',
			name: 'description',
			content: description
		},
		{
			key: 'itemDescription',
			itemprop: 'description',
			content: description
		},
		{
			key: 'twDescription',
			name: 'twitter:description',
			content: description
		},
		{
			key: 'ogDescription',
			property: 'og:description',
			content: description
		}
	]

	const setUrl = [
		{
			/*key: 'ogUrl',*/
			property: 'og:url',
			content: process.env.GRIDSOME_BASE_PATH + this.$route.path
		}
	]

	const setImage = [
		{
			key: 'itemImage',
			itemprop: 'image',
			content: process.env.GRIDSOME_BASE_PATH + image
		},
		{
			key: 'twImage',
			name: 'twitter:image',
			content: process.env.GRIDSOME_BASE_PATH + image
		},
		{
			key: 'ogImage',
			property: 'og:image',
			content: process.env.GRIDSOME_BASE_PATH + image
		}
	]

	const setAppId = [
		{
			key: 'fbAppid',
			property: 'fb:app_id',
			content: appId 
		}
	]

	const setTwcard = [
		{
			key: 'twCard',
			property: 'twitter:card',
			content: twcard 
		}
	]

	const setOgtype = [
		{
			key: 'ogType',
			property: 'og:type',
			content: ogtype 
		}
	]

	this.$once('hook:mounted', () => {
		this.$meta().refresh();
	});

	const metaArry = [
		...setUrl
	]
	title && metaArry.push(...setTitle);
	description && metaArry.push(...setDescription);
	image && metaArry.push(...setImage);
	appId && metaArry.push(...setAppId);
	twcard && metaArry.push(...setTwcard);
	ogtype && metaArry.push(...setOgtype);
	
	return {
		title,
		meta: metaArry
	}
}
