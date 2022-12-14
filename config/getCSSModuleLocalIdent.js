/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const loaderUtils = require('loader-utils');
const path = require('path');

const CUSTOM_ENV = process.env.REACT_APP_ENV;
const PREFIX = process.env.CSS_MODULE_PREFIX ?? '';

module.exports = function getLocalIdent(context, localIdentName, localName, options) {
  // Use the filename or folder name, based on some uses the index.js / index.module.(css|scss|sass) project style
  const fileNameOrFolder = context.resourcePath.match(/index\.module\.(css|scss|sass)$/)
    ? '[folder]'
    : '[name]';
  // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
  const hash = loaderUtils.getHashDigest(
    path.posix.relative(context.rootContext, context.resourcePath) + localName,
    'md5',
    'base64',
    Number(process.env.CSS_MODULE_HASH_LENGTH) || 5
  );

  // Use loaderUtils to find the file or folder name
  const className = loaderUtils.interpolateName(
    context,
    CUSTOM_ENV === 'production' || CUSTOM_ENV === 'production-hydrate'
      ? hash
      : fileNameOrFolder + '_' + localName + '__' + hash,
    options
  );
  // Remove the .module that appears in every classname when based on the file and replace all "." with "_".
  return `${PREFIX}${className.replace('.module_', '_').replace(/\./g, '_')}`;
};
