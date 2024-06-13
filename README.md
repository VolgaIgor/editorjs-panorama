![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Panorama Image Tool

In general it's a copy of [editor-js/image@2.9.0](https://github.com/editor-js/image)

Changes:
* Removed paste confing
* Removed upload by URL
* Removed "with border" and "with background" tune
* Changed icon and title

## Installation
### Install via NPM
Get the package

```shell
$ npm i editorjs-panorama
```

Include module at your application

```javascript
import Panorama from 'editorjs-panorama';
```

### Load from CDN

You can load a specific version of the package from jsDelivr CDN.

Require this script on a page with Editor.js.

```html
<script src="https://cdn.jsdelivr.net/npm/editorjs-panorama"></script>
```

### Download to your project's source dir
1. Upload folder `dist` from repository
2. Add `dist/panorama.umd.js` file to your page.

## Usage
```javascript
var editor = EditorJS({
  // ...
  tools: {
    // ...
    panorama: {
      class: Panorama,
      config: {
        endpoints: {
          byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
        }
      }
    }
  },
  // ...
});
```