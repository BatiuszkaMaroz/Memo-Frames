/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./sw-base.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./sw-base.js":
/*!********************!*\
  !*** ./sw-base.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');\nself.importScripts('./scripts/idb.js'); //-----------------------CONFIG-----------------------//\n\nworkbox.setConfig({\n  debug: false\n});\nself.skipWaiting();\nself.clients.claim(); //-----------------------POSTS-FETCH-----------------------//\n\nconst postUrl = 'https://memoframes-c2a63.firebaseio.com/posts.json';\nconst postStore = 'fetched-posts';\nworkbox.routing.registerRoute(postUrl, args => {\n  return fetch(args.event.request).then(res => {\n    const clonedRes = res.clone();\n    clearData(postStore).then(() => {\n      clonedRes.json().then(data => {\n        for (const key in data) {\n          addData(postStore, data[key]);\n        }\n      });\n    });\n    return res;\n  });\n});\nworkbox.routing.registerRoute(new RegExp(/.*firebasestorage\\.googleapis\\.com.*/), new workbox.strategies.StaleWhileRevalidate({\n  cacheName: 'MemoFrames-Post_Images'\n}));\nworkbox.routing.registerRoute(new RegExp('/'), new workbox.strategies.StaleWhileRevalidate({\n  cacheName: 'MemoFrames-Static'\n})); //-----------------------PRECACHING-----------------------//\n\nworkbox.core.setCacheNameDetails({\n  prefix: 'MemoFrames_Precache'\n});\nworkbox.precaching.cleanupOutdatedCaches();\nworkbox.precaching.precacheAndRoute([{'revision':'b5765d438c41db6064c00c4dacdd4884','url':'icons/android/icon_144x144.b5765d438c41db6064c00c4dacdd4884.png'},{'revision':'74556a696f81a6bdfe3ea40f56d0f0c6','url':'icons/android/icon_192x192.74556a696f81a6bdfe3ea40f56d0f0c6.png'},{'revision':'4a2ffdd21a258fdecfa5bd2d8b6a4ff1','url':'icons/android/icon_256x256.4a2ffdd21a258fdecfa5bd2d8b6a4ff1.png'},{'revision':'94c688aefdb8b851de90ba62b51fd9fb','url':'icons/android/icon_36x36.94c688aefdb8b851de90ba62b51fd9fb.png'},{'revision':'ee37ba6bdaadcb37ccc16408889607c5','url':'icons/android/icon_384x384.ee37ba6bdaadcb37ccc16408889607c5.png'},{'revision':'efd33e5ffdad0993595ace5eebd85146','url':'icons/android/icon_48x48.efd33e5ffdad0993595ace5eebd85146.png'},{'revision':'863f597def34a276127f5703d8fb9402','url':'icons/android/icon_512x512.863f597def34a276127f5703d8fb9402.png'},{'revision':'e2bd80b612359ef0e2b5b3be94b81731','url':'icons/android/icon_72x72.e2bd80b612359ef0e2b5b3be94b81731.png'},{'revision':'c27f55985ff2e96e333ed8730a4fd08e','url':'icons/android/icon_96x96.c27f55985ff2e96e333ed8730a4fd08e.png'},{'revision':'40e446052b1b61bb581a86a0c8935364','url':'icons/ios/icon_1024x1024.40e446052b1b61bb581a86a0c8935364.png'},{'revision':'e56fa90755b048ce8be08b39dba18e2c','url':'icons/ios/icon_1024x1024.e56fa90755b048ce8be08b39dba18e2c.png'},{'revision':'af962bbcb057bf43427357241f3a0592','url':'icons/ios/icon_120x120.af962bbcb057bf43427357241f3a0592.png'},{'revision':'d6f5b1ee73948efdda6dcc6adbde074e','url':'icons/ios/icon_152x152.d6f5b1ee73948efdda6dcc6adbde074e.png'},{'revision':'fa568401d2672d35eec610ab68e95b87','url':'icons/ios/icon_167x167.fa568401d2672d35eec610ab68e95b87.png'},{'revision':'4295a3f01404efedd81b687058c2abfb','url':'icons/ios/icon_180x180.4295a3f01404efedd81b687058c2abfb.png'},{'revision':'49deccd9e7e25d8537267ea6e90c94ef','url':'images/logo-big.png'},{'revision':'691c5acbe1140b9dbcaf74b620c186bc','url':'images/logo-small.png'},{'revision':'5cc4e7a46887101cd16d2cdaac79680e','url':'index.html'},{'revision':'5c99b43c13cb77186300351b80e4f66f','url':'manifest.5c99b43c13cb77186300351b80e4f66f.json'},{'revision':'47a497e5bdbfa175aca485c836528986','url':'scripts/app.js'}]);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdy1iYXNlLmpzP2VlODQiXSwibmFtZXMiOlsic2VsZiIsImltcG9ydFNjcmlwdHMiLCJ3b3JrYm94Iiwic2V0Q29uZmlnIiwiZGVidWciLCJza2lwV2FpdGluZyIsImNsaWVudHMiLCJjbGFpbSIsInBvc3RVcmwiLCJwb3N0U3RvcmUiLCJyb3V0aW5nIiwicmVnaXN0ZXJSb3V0ZSIsImFyZ3MiLCJmZXRjaCIsImV2ZW50IiwicmVxdWVzdCIsInRoZW4iLCJyZXMiLCJjbG9uZWRSZXMiLCJjbG9uZSIsImNsZWFyRGF0YSIsImpzb24iLCJkYXRhIiwia2V5IiwiYWRkRGF0YSIsIlJlZ0V4cCIsInN0cmF0ZWdpZXMiLCJTdGFsZVdoaWxlUmV2YWxpZGF0ZSIsImNhY2hlTmFtZSIsImNvcmUiLCJzZXRDYWNoZU5hbWVEZXRhaWxzIiwicHJlZml4IiwicHJlY2FjaGluZyIsImNsZWFudXBPdXRkYXRlZENhY2hlcyIsInByZWNhY2hlQW5kUm91dGUiLCJfX1dCX01BTklGRVNUIl0sIm1hcHBpbmdzIjoiQUFBQUEsSUFBSSxDQUFDQyxhQUFMLENBQ0UseUVBREY7QUFJQUQsSUFBSSxDQUFDQyxhQUFMLENBQW1CLGtCQUFuQixFLENBRUE7O0FBRUFDLE9BQU8sQ0FBQ0MsU0FBUixDQUFrQjtBQUFFQyxPQUFLLEVBQUU7QUFBVCxDQUFsQjtBQUVBSixJQUFJLENBQUNLLFdBQUw7QUFDQUwsSUFBSSxDQUFDTSxPQUFMLENBQWFDLEtBQWIsRyxDQUVBOztBQUVBLE1BQU1DLE9BQU8sR0FBRyxvREFBaEI7QUFDQSxNQUFNQyxTQUFTLEdBQUcsZUFBbEI7QUFFQVAsT0FBTyxDQUFDUSxPQUFSLENBQWdCQyxhQUFoQixDQUE4QkgsT0FBOUIsRUFBdUNJLElBQUksSUFBSTtBQUM3QyxTQUFPQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsS0FBTCxDQUFXQyxPQUFaLENBQUwsQ0FBMEJDLElBQTFCLENBQStCQyxHQUFHLElBQUk7QUFDM0MsVUFBTUMsU0FBUyxHQUFHRCxHQUFHLENBQUNFLEtBQUosRUFBbEI7QUFDQUMsYUFBUyxDQUFDWCxTQUFELENBQVQsQ0FBcUJPLElBQXJCLENBQTBCLE1BQU07QUFDOUJFLGVBQVMsQ0FBQ0csSUFBVixHQUFpQkwsSUFBakIsQ0FBc0JNLElBQUksSUFBSTtBQUM1QixhQUFLLE1BQU1DLEdBQVgsSUFBa0JELElBQWxCLEVBQXdCO0FBQ3RCRSxpQkFBTyxDQUFDZixTQUFELEVBQVlhLElBQUksQ0FBQ0MsR0FBRCxDQUFoQixDQUFQO0FBQ0Q7QUFDRixPQUpEO0FBS0QsS0FORDtBQU9BLFdBQU9OLEdBQVA7QUFDRCxHQVZNLENBQVA7QUFXRCxDQVpEO0FBY0FmLE9BQU8sQ0FBQ1EsT0FBUixDQUFnQkMsYUFBaEIsQ0FDRSxJQUFJYyxNQUFKLENBQVcsc0NBQVgsQ0FERixFQUVFLElBQUl2QixPQUFPLENBQUN3QixVQUFSLENBQW1CQyxvQkFBdkIsQ0FBNEM7QUFDMUNDLFdBQVMsRUFBRTtBQUQrQixDQUE1QyxDQUZGO0FBT0ExQixPQUFPLENBQUNRLE9BQVIsQ0FBZ0JDLGFBQWhCLENBQ0UsSUFBSWMsTUFBSixDQUFXLEdBQVgsQ0FERixFQUVFLElBQUl2QixPQUFPLENBQUN3QixVQUFSLENBQW1CQyxvQkFBdkIsQ0FBNEM7QUFDMUNDLFdBQVMsRUFBRTtBQUQrQixDQUE1QyxDQUZGLEUsQ0FPQTs7QUFFQTFCLE9BQU8sQ0FBQzJCLElBQVIsQ0FBYUMsbUJBQWIsQ0FBaUM7QUFDL0JDLFFBQU0sRUFBRTtBQUR1QixDQUFqQztBQUlBN0IsT0FBTyxDQUFDOEIsVUFBUixDQUFtQkMscUJBQW5CO0FBQ0EvQixPQUFPLENBQUM4QixVQUFSLENBQW1CRSxnQkFBbkIsQ0FBb0NsQyxJQUFJLENBQUNtQyxhQUF6QyIsImZpbGUiOiIuL3N3LWJhc2UuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJzZWxmLmltcG9ydFNjcmlwdHMoXHJcbiAgJ2h0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS93b3JrYm94LWNkbi9yZWxlYXNlcy81LjAuMC93b3JrYm94LXN3LmpzJyxcclxuKTtcclxuXHJcbnNlbGYuaW1wb3J0U2NyaXB0cygnLi9zY3JpcHRzL2lkYi5qcycpO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNPTkZJRy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuXHJcbndvcmtib3guc2V0Q29uZmlnKHsgZGVidWc6IGZhbHNlIH0pO1xyXG5cclxuc2VsZi5za2lwV2FpdGluZygpO1xyXG5zZWxmLmNsaWVudHMuY2xhaW0oKTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1QT1NUUy1GRVRDSC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuXHJcbmNvbnN0IHBvc3RVcmwgPSAnaHR0cHM6Ly9tZW1vZnJhbWVzLWMyYTYzLmZpcmViYXNlaW8uY29tL3Bvc3RzLmpzb24nO1xyXG5jb25zdCBwb3N0U3RvcmUgPSAnZmV0Y2hlZC1wb3N0cyc7XHJcblxyXG53b3JrYm94LnJvdXRpbmcucmVnaXN0ZXJSb3V0ZShwb3N0VXJsLCBhcmdzID0+IHtcclxuICByZXR1cm4gZmV0Y2goYXJncy5ldmVudC5yZXF1ZXN0KS50aGVuKHJlcyA9PiB7XHJcbiAgICBjb25zdCBjbG9uZWRSZXMgPSByZXMuY2xvbmUoKTtcclxuICAgIGNsZWFyRGF0YShwb3N0U3RvcmUpLnRoZW4oKCkgPT4ge1xyXG4gICAgICBjbG9uZWRSZXMuanNvbigpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgYWRkRGF0YShwb3N0U3RvcmUsIGRhdGFba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlcztcclxuICB9KTtcclxufSk7XHJcblxyXG53b3JrYm94LnJvdXRpbmcucmVnaXN0ZXJSb3V0ZShcclxuICBuZXcgUmVnRXhwKC8uKmZpcmViYXNlc3RvcmFnZVxcLmdvb2dsZWFwaXNcXC5jb20uKi8pLFxyXG4gIG5ldyB3b3JrYm94LnN0cmF0ZWdpZXMuU3RhbGVXaGlsZVJldmFsaWRhdGUoe1xyXG4gICAgY2FjaGVOYW1lOiAnTWVtb0ZyYW1lcy1Qb3N0X0ltYWdlcycsXHJcbiAgfSksXHJcbik7XHJcblxyXG53b3JrYm94LnJvdXRpbmcucmVnaXN0ZXJSb3V0ZShcclxuICBuZXcgUmVnRXhwKCcvJyksXHJcbiAgbmV3IHdvcmtib3guc3RyYXRlZ2llcy5TdGFsZVdoaWxlUmV2YWxpZGF0ZSh7XHJcbiAgICBjYWNoZU5hbWU6ICdNZW1vRnJhbWVzLVN0YXRpYycsXHJcbiAgfSksXHJcbik7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tUFJFQ0FDSElORy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuXHJcbndvcmtib3guY29yZS5zZXRDYWNoZU5hbWVEZXRhaWxzKHtcclxuICBwcmVmaXg6ICdNZW1vRnJhbWVzX1ByZWNhY2hlJyxcclxufSk7XHJcblxyXG53b3JrYm94LnByZWNhY2hpbmcuY2xlYW51cE91dGRhdGVkQ2FjaGVzKCk7XHJcbndvcmtib3gucHJlY2FjaGluZy5wcmVjYWNoZUFuZFJvdXRlKHNlbGYuX19XQl9NQU5JRkVTVCk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./sw-base.js\n");

/***/ })

/******/ });