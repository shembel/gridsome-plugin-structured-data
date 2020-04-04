import sd from './lib/sd';

export default function (Vue, options, context) {
	Vue.prototype.$sd = (finalOptions) => {
		//console.log(context);
		//console.log(sd(options, finalOptions, context));
		return sd(options, finalOptions, context);
	}
}