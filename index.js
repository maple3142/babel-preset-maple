const path = require('path')

module.exports = (api, opts = {}) => {
	if (typeof opts.env === 'undefined') {
		if (opts.type === 'browser') {
			opts.env = {
				targets: {
					browsers: ['>=10%']
				}
			}
		} else {
			opts.env = {
				targets: {
					node: 'current'
				}
			}
		}
		if (opts.esmodules && opts.env.targets) {
			opts.env.targets.esmodules = opts.esmodules
		}
	}

	const rc = {
		presets: [[require('babel-preset-env').default, opts.env]],
		plugins: [
			require.resolve('babel-plugin-transform-decorators-legacy'),
			require.resolve('babel-plugin-transform-class-properties'),
			[
				require.resolve('babel-plugin-transform-runtime'),
				{
					helpers: false,
					polyfill: false,
					regenerator: true,
					moduleName: path.dirname(require.resolve('babel-runtime/package'))
				}
			],
			[
				require.resolve('babel-plugin-transform-object-rest-spread'),
				{
					useBuiltIns: true
				}
			]
		]
	}
	if (opts.jsx === 'vue') {
		rc.presets.push(require.resolve('babel-preset-vue'))
	} else if (opts.jsx === 'react') {
		rc.plugins.push(require.resolve('babel-plugin-transform-react-jsx'))
		rc.plugins.push(require.resolve('babel-plugin-react-require'))
	} else {
		rc.plugins.push([require.resolve('babel-plugin-transform-react-jsx'), { pragma: opts.jsx || 'h' }])
	}
	return rc
}
