# topics2keywords
> Sync github topics to npm keywords.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

![snapshot](https://tva1.sinaimg.cn/large/0081Kckwgy1gk87ynhkbaj30u60asasp.jpg)

## usage
```shell
# 1. install
npm install -g @feizheng/topics2keywords

# 2. go to your project
cd ~/github/topics2keywords

# 3. execute the cli
t2k -u afeiship

# 4. your package.json `keywords` key updated
```

~~~
Usage: t2k [options]

Options:
  -V, --version            output the version number
  -u, --username <string>  github username(default: github username).
  -h, --help               display help for command
~~~

## license
Code released under [the MIT license](https://github.com/afeiship/topics2keywords/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@feizheng/topics2keywords
[version-url]: https://npmjs.org/package/@feizheng/topics2keywords

[license-image]: https://img.shields.io/npm/l/@feizheng/topics2keywords
[license-url]: https://github.com/afeiship/topics2keywords/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@feizheng/topics2keywords
[size-url]: https://github.com/afeiship/topics2keywords/blob/master/dist/topics2keywords.min.js

[download-image]: https://img.shields.io/npm/dm/@feizheng/topics2keywords
[download-url]: https://www.npmjs.com/package/@feizheng/topics2keywords
