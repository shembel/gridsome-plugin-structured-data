import sd from './lib/sd';

export default function (Vue, options, context) {
	Vue.prototype.$sd = (pageOptions) => {
		//console.log(context);
		//console.log(sd(options, finalOptions, context));
		//console.log(this);
		return sd(options, pageOptions, context);
	}
}