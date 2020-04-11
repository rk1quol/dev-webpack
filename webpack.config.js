// output.pathに指定するパスがOSによって異なることを
// 防ぐためにpathモジュールを読み込んでおく
const path = require('path')

module.exports = {
	watch: true,
	// モードの設定（モードの設定をしないとwebpack実行時に警告が出る）
	mode: 'development',
	// エントリポイントの設定
	entry: './src/js/app.js',
	// 出力の設定
	output: {
		//  出力するファイル名
		filename: 'bundle.js',
		//  出力先のパス
		path: path.resolve(__dirname, 'public/js'),
		// contentBaseを './public'にしているため、 ./public/js/となる
		publicPath: '/js/'
	},
	devServer: {
		// サーバー起動時にブラウザを自動的にリロードする
		open: true,
		// ポート番号
		port: 9000,
		// コンテンツのルートディレクトリ
		// 今回の場合、ブラウザ起動時に ./public/index.htmlが開かれる
		contentBase: './public'
	},
	module: {
		rules: [
			{
				//  ローダーの処理対象ファイル
				test: /\.js$/,
				//  ローダーの処理対象となるディレクトリ
				include: path.resolve(__dirname, 'src/js'),
				use: [
					{
						// 利用するローダー
						loader: 'babel-loader',
						// ローダーのオプション
						options: {
							presets: [['@babel/preset-env', { modules: false }]]
						}
					}
				],
			},
			{
				//  ローダーの処理対象ファイル
				test: /\.scss$/,
				//  ローダーの処理対象となるディレクトリ
				include: path.resolve(__dirname, 'src/sass'),
				use: [
					// 記述と逆の順番で実行される
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|jpg|gif)$/i,
				include: path.resolve(__dirname, 'src/img'),
				loader: 'url-loader'
			}
		]
	},
}