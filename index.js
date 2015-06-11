var through = require('through2'),
  gutil = require('gulp-util'),
  path = require('path'),
  util = require('g-file'),
  scan = require('css-resources'),
  isRelativeUrl = require('is-relative-url'),
  debug = require('g-debug'),
  md5Path = require('md5-image-path');


module.exports = function(opts) {

  var filesPath = (opts && opts.path) ?  opts.path : '../img';

  return through.obj(function(file, enc, cb) {
    if(file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
      return cb();
    }

    if(!file.contents){
      return cb();
    }

    var output = scan(file.contents.toString());

    if(!Array.isArray(output)) {
      cb(new gutil.PluginError('gulp-replace-image', 'Scan CSS files failed'));
      return;
    }
    var newCss = file.contents.toString();
    output.forEach(function(item) {
      var str = md5UrlPath(file, item);
      if(str && str[0] && str[0].md5) {
        var newPath = path.join(filesPath, str[0].md5 + path.extname(item.path));
        newCss = newCss.replace(item.path, newPath);
      } else {
        debug.warn('文件 ' + file.path + ' 中的图片 ' + item.path + ' 不存在');
      }
    }.bind(this));
    try {
      file.contents = new Buffer(newCss);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-replace-image', err));
    }
    cb(null, file);
  });
}

function md5UrlPath(file, item) {
  var str = isRelativeUrl(item.path) ? path.resolve(path.dirname(file.path), item.path) : item.path;
  return md5Path({
    files: str
  });
}