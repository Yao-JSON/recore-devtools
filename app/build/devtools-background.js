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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/src/devtools-background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/src/devtools-background.js":
/*!****************************************!*\
  !*** ./app/src/devtools-background.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint no-undef:0 */
var _chrome = chrome,
    devtools = _chrome.devtools,
    runtime = _chrome.runtime;

class CreateRecore {
  constructor() {
    _defineProperty(this, "createPanelIfHasRecore", () => {
      if (this.isCreatedRecore || this.checkCount > 30) {
        clearInterval(this.checkVueInterval);
        return;
      }

      this.checkCount += 1;
      clearInterval(this.checkVueInterval);
      this.isCreatedRecore = true;
      this.isPanelLoaded = false;
      this.isPanelShown = false;
      devtools.panels.create('Recore', 'icons/128.png', 'devtools.html', panel => {
        // panel loaded
        if (this.onPanelHidden) {
          panel.onShown.addListener(this.onPanelShown);
          panel.onHidden.addListener(this.onPanelHidden);
        }
      });
    });

    _defineProperty(this, "onPanelShown", () => {
      this.isPanelShown = true;
      runtime.sendMessage('recore-panel-shown');

      if (this.isPanelLoaded) {
        this.onPanelLoad();
      }

      console.log('Recore panel shown');
    });

    _defineProperty(this, "onPanelHidden", () => {
      this.isPanelShown = false;
      runtime.sendMessage('recore-panel-hidden');
      console.log('Recore panel hidden');
    });

    _defineProperty(this, "onPanelLoad", () => {
      this.isPanelLoaded = true;
      console.log('panel onLoad');
    });

    this.isCreatedRecore = false; // 是否已经创建 Recore panel

    this.isPanelLoaded = false; // 是否已经加载 Recore panel

    this.isPanelShown = false;
    this.checkCount = 0; // 检查创建的次数

    this.checkVueInterval = null;
  }

  init() {
    this.createPanelIfHasRecore();
    this.checkVueInterval = setInterval(this.createPanelIfHasRecore, 1000); // 监听 onMessage

    runtime.onMessage.addListener(request => {
      if (request === 'recore-panel-load') {
        this.onPanelLoad();
      }
    });
  }

}

var RecoreDevtols = new CreateRecore();
RecoreDevtols.init();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NyYy9kZXZ0b29scy1iYWNrZ3JvdW5kLmpzIl0sIm5hbWVzIjpbImNocm9tZSIsImRldnRvb2xzIiwicnVudGltZSIsIkNyZWF0ZVJlY29yZSIsImNvbnN0cnVjdG9yIiwiaXNDcmVhdGVkUmVjb3JlIiwiY2hlY2tDb3VudCIsImNsZWFySW50ZXJ2YWwiLCJjaGVja1Z1ZUludGVydmFsIiwiaXNQYW5lbExvYWRlZCIsImlzUGFuZWxTaG93biIsInBhbmVscyIsImNyZWF0ZSIsInBhbmVsIiwib25QYW5lbEhpZGRlbiIsIm9uU2hvd24iLCJhZGRMaXN0ZW5lciIsIm9uUGFuZWxTaG93biIsIm9uSGlkZGVuIiwic2VuZE1lc3NhZ2UiLCJvblBhbmVsTG9hZCIsImNvbnNvbGUiLCJsb2ciLCJpbml0IiwiY3JlYXRlUGFuZWxJZkhhc1JlY29yZSIsInNldEludGVydmFsIiwib25NZXNzYWdlIiwicmVxdWVzdCIsIlJlY29yZURldnRvbHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO2NBQzhCQSxNO0lBQXRCQyxRLFdBQUFBLFE7SUFBVUMsTyxXQUFBQSxPOztBQUVsQixNQUFNQyxZQUFOLENBQW1CO0FBQ2pCQyxhQUFXLEdBQUc7QUFBQSxvREFtQlcsTUFBTTtBQUM3QixVQUFJLEtBQUtDLGVBQUwsSUFBd0IsS0FBS0MsVUFBTCxHQUFrQixFQUE5QyxFQUFrRDtBQUNoREMscUJBQWEsQ0FBQyxLQUFLQyxnQkFBTixDQUFiO0FBQ0E7QUFDRDs7QUFDRCxXQUFLRixVQUFMLElBQW1CLENBQW5CO0FBQ0FDLG1CQUFhLENBQUMsS0FBS0MsZ0JBQU4sQ0FBYjtBQUNBLFdBQUtILGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxXQUFLSSxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsV0FBS0MsWUFBTCxHQUFvQixLQUFwQjtBQUNBVCxjQUFRLENBQUNVLE1BQVQsQ0FBZ0JDLE1BQWhCLENBQXVCLFFBQXZCLEVBQWlDLGVBQWpDLEVBQWtELGVBQWxELEVBQW9FQyxLQUFELElBQVc7QUFDNUU7QUFDQSxZQUFJLEtBQUtDLGFBQVQsRUFBd0I7QUFDdEJELGVBQUssQ0FBQ0UsT0FBTixDQUFjQyxXQUFkLENBQTBCLEtBQUtDLFlBQS9CO0FBQ0FKLGVBQUssQ0FBQ0ssUUFBTixDQUFlRixXQUFmLENBQTJCLEtBQUtGLGFBQWhDO0FBQ0Q7QUFDRixPQU5EO0FBT0QsS0FwQ2E7O0FBQUEsMENBc0NDLE1BQU07QUFDbkIsV0FBS0osWUFBTCxHQUFvQixJQUFwQjtBQUNBUixhQUFPLENBQUNpQixXQUFSLENBQW9CLG9CQUFwQjs7QUFDQSxVQUFJLEtBQUtWLGFBQVQsRUFBd0I7QUFDdEIsYUFBS1csV0FBTDtBQUNEOztBQUNEQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxvQkFBWjtBQUNELEtBN0NhOztBQUFBLDJDQStDQyxNQUFNO0FBQ25CLFdBQUtaLFlBQUwsR0FBb0IsS0FBcEI7QUFDQVIsYUFBTyxDQUFDaUIsV0FBUixDQUFvQixxQkFBcEI7QUFDQUUsYUFBTyxDQUFDQyxHQUFSLENBQVkscUJBQVo7QUFDRCxLQW5EYTs7QUFBQSx5Q0FxREEsTUFBTTtBQUNsQixXQUFLYixhQUFMLEdBQXFCLElBQXJCO0FBQ0FZLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFDRCxLQXhEYTs7QUFDWixTQUFLakIsZUFBTCxHQUF1QixLQUF2QixDQURZLENBQ2tCOztBQUM5QixTQUFLSSxhQUFMLEdBQXFCLEtBQXJCLENBRlksQ0FFZ0I7O0FBQzVCLFNBQUtDLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxTQUFLSixVQUFMLEdBQWtCLENBQWxCLENBSlksQ0FJUzs7QUFDckIsU0FBS0UsZ0JBQUwsR0FBd0IsSUFBeEI7QUFDRDs7QUFFRGUsTUFBSSxHQUFHO0FBQ0wsU0FBS0Msc0JBQUw7QUFDQSxTQUFLaEIsZ0JBQUwsR0FBd0JpQixXQUFXLENBQUMsS0FBS0Qsc0JBQU4sRUFBOEIsSUFBOUIsQ0FBbkMsQ0FGSyxDQUdMOztBQUNBdEIsV0FBTyxDQUFDd0IsU0FBUixDQUFrQlYsV0FBbEIsQ0FBK0JXLE9BQUQsSUFBYTtBQUN6QyxVQUFJQSxPQUFPLEtBQUssbUJBQWhCLEVBQXFDO0FBQ25DLGFBQUtQLFdBQUw7QUFDRDtBQUNGLEtBSkQ7QUFLRDs7QUFsQmdCOztBQTREbkIsSUFBTVEsYUFBYSxHQUFHLElBQUl6QixZQUFKLEVBQXRCO0FBRUF5QixhQUFhLENBQUNMLElBQWQsRyIsImZpbGUiOiJkZXZ0b29scy1iYWNrZ3JvdW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hcHAvc3JjL2RldnRvb2xzLWJhY2tncm91bmQuanNcIik7XG4iLCIvKiBlc2xpbnQgbm8tdW5kZWY6MCAqL1xuY29uc3QgeyBkZXZ0b29scywgcnVudGltZSB9ID0gY2hyb21lO1xuXG5jbGFzcyBDcmVhdGVSZWNvcmUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlzQ3JlYXRlZFJlY29yZSA9IGZhbHNlOyAvLyDmmK/lkKblt7Lnu4/liJvlu7ogUmVjb3JlIHBhbmVsXG4gICAgdGhpcy5pc1BhbmVsTG9hZGVkID0gZmFsc2U7IC8vIOaYr+WQpuW3sue7j+WKoOi9vSBSZWNvcmUgcGFuZWxcbiAgICB0aGlzLmlzUGFuZWxTaG93biA9IGZhbHNlO1xuICAgIHRoaXMuY2hlY2tDb3VudCA9IDA7IC8vIOajgOafpeWIm+W7uueahOasoeaVsFxuICAgIHRoaXMuY2hlY2tWdWVJbnRlcnZhbCA9IG51bGw7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuY3JlYXRlUGFuZWxJZkhhc1JlY29yZSgpO1xuICAgIHRoaXMuY2hlY2tWdWVJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMuY3JlYXRlUGFuZWxJZkhhc1JlY29yZSwgMTAwMCk7XG4gICAgLy8g55uR5ZCsIG9uTWVzc2FnZVxuICAgIHJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0KSA9PiB7XG4gICAgICBpZiAocmVxdWVzdCA9PT0gJ3JlY29yZS1wYW5lbC1sb2FkJykge1xuICAgICAgICB0aGlzLm9uUGFuZWxMb2FkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVQYW5lbElmSGFzUmVjb3JlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmlzQ3JlYXRlZFJlY29yZSB8fCB0aGlzLmNoZWNrQ291bnQgPiAzMCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmNoZWNrVnVlSW50ZXJ2YWwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNoZWNrQ291bnQgKz0gMTtcbiAgICBjbGVhckludGVydmFsKHRoaXMuY2hlY2tWdWVJbnRlcnZhbCk7XG4gICAgdGhpcy5pc0NyZWF0ZWRSZWNvcmUgPSB0cnVlO1xuICAgIHRoaXMuaXNQYW5lbExvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNQYW5lbFNob3duID0gZmFsc2U7XG4gICAgZGV2dG9vbHMucGFuZWxzLmNyZWF0ZSgnUmVjb3JlJywgJ2ljb25zLzEyOC5wbmcnLCAnZGV2dG9vbHMuaHRtbCcsIChwYW5lbCkgPT4ge1xuICAgICAgLy8gcGFuZWwgbG9hZGVkXG4gICAgICBpZiAodGhpcy5vblBhbmVsSGlkZGVuKSB7XG4gICAgICAgIHBhbmVsLm9uU2hvd24uYWRkTGlzdGVuZXIodGhpcy5vblBhbmVsU2hvd24pO1xuICAgICAgICBwYW5lbC5vbkhpZGRlbi5hZGRMaXN0ZW5lcih0aGlzLm9uUGFuZWxIaWRkZW4pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25QYW5lbFNob3duID0gKCkgPT4ge1xuICAgIHRoaXMuaXNQYW5lbFNob3duID0gdHJ1ZTtcbiAgICBydW50aW1lLnNlbmRNZXNzYWdlKCdyZWNvcmUtcGFuZWwtc2hvd24nKTtcbiAgICBpZiAodGhpcy5pc1BhbmVsTG9hZGVkKSB7XG4gICAgICB0aGlzLm9uUGFuZWxMb2FkKCk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdSZWNvcmUgcGFuZWwgc2hvd24nKTtcbiAgfVxuXG4gIG9uUGFuZWxIaWRkZW4gPSgpID0+IHtcbiAgICB0aGlzLmlzUGFuZWxTaG93biA9IGZhbHNlO1xuICAgIHJ1bnRpbWUuc2VuZE1lc3NhZ2UoJ3JlY29yZS1wYW5lbC1oaWRkZW4nKTtcbiAgICBjb25zb2xlLmxvZygnUmVjb3JlIHBhbmVsIGhpZGRlbicpO1xuICB9XG5cbiAgb25QYW5lbExvYWQgPSAoKSA9PiB7XG4gICAgdGhpcy5pc1BhbmVsTG9hZGVkID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZygncGFuZWwgb25Mb2FkJyk7XG4gIH1cbn1cblxuY29uc3QgUmVjb3JlRGV2dG9scyA9IG5ldyBDcmVhdGVSZWNvcmUoKTtcblxuUmVjb3JlRGV2dG9scy5pbml0KCk7XG4iXSwic291cmNlUm9vdCI6IiJ9