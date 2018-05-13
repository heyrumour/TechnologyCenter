/*fis编译配置*/
fis.set('project.files', ['static/**', 'views/**']);
fis.set('project.ignore', ['static/.eslintignore','static/.eslintrc', 'devPub', 'staticPub']);

//exports, module, require，define不压缩变量名
fis.config.set('settings.optimizer.uglify-js', {
    mangle: {
        except: 'exports, module, require, define'
    }
});

fis.media('develop').match('*.{css,js,es6,jpg,png,jpeg,gif,swf}', {
    domain : '',
    useHash: false
})
.match(/^\/views\/(.*)/i, {
    release: '/devPub/views/$1',
    url: '/devPub/views/$1'
})
.match(/^\/static\/(.*)/i, {
    release: '/devPub/$1',
    url: '/devPub/$1'
});

fis.media('prod').match('*.{css,js,es6,jpg,png,jpeg,gif,swf}', {
    domain : '',
    useHash: true
})
.match(/^\/views\/(.*)/i, {
    release: '/staticPub/views/$1',
    url: '/staticPub/views/$1'
})
.match(/^\/static\/(.*)/i, {
    release: '/staticPub/$1',
    url: '/$1'
})
//所有的非.min js文件压缩
.match(/.*\/+(?:(?!\.min).)+\.(?:js|es6)$/i, {
    optimizer: fis.plugin('uglify-js')
})
//所有的非.min css文件压缩
.match(/.*\/+(?:(?!\.min).)+\.css$/i, {
    useSprite: true,
    optimizer: fis.plugin('clean-css')
});


fis.match('views/common/*.html', {
	// 设置 release 为 FALSE，不再产出此文件
	release: false
});