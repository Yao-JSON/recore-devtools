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

console.log(chrome.devtools); // chrome.devtools.panels.create('Recore', 'icons/128.png', 'devtools.html',(panel) => {
//   console.log(panel);
// })

/**
 * create Recore panel 
 */

var _chrome = chrome,
    devtools = _chrome.devtools,
    runtime = _chrome.runtime;

class CreateRecore {
  constructor() {
    this.isCreatedRecore = false; // 是否已经创建 Recore panel

    this.isPanelLoaded = false; // 是否已经加载 Recore panel

    this.isPanelShown = false;
    this.checkCount = 0; // 检查创建的次数

    this.checkVueInterval = null;
    this.init();
  }

  init() {
    this.createPanelIfHasRecore();
    this.checkVueInterval = setInterval(this.createPanelIfHasRecore.bind(this), 1000); // 监听 onMessage

    runtime.onMessage.addListener(request => {
      if (request === 'recore-panel-load') {
        this.onPanelLoad();
      }
    });
  }

  createPanelIfHasRecore() {
    if (this.isCreatedRecore || this.checkCount++ > 30) {
      clearInterval(this.checkVueInterval);
      return;
    }

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
  }

  onPanelShown() {
    this.isPanelShown = true;
    runtime.sendMessage('recore-panel-shown');

    if (this.isPanelLoaded) {}

    console.log('Recore panel shown');
  }

  onPanelHidden() {
    this.isPanelShown = false;
    runtime.sendMessage('recore-panel-hidden');
    console.log('Recore panel hidden');
  }

  onPanelLoad() {
    this.isPanelLoaded = true;
  }

}

new CreateRecore();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NyYy9kZXZ0b29scy1iYWNrZ3JvdW5kLmpzIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJjaHJvbWUiLCJkZXZ0b29scyIsInJ1bnRpbWUiLCJDcmVhdGVSZWNvcmUiLCJjb25zdHJ1Y3RvciIsImlzQ3JlYXRlZFJlY29yZSIsImlzUGFuZWxMb2FkZWQiLCJpc1BhbmVsU2hvd24iLCJjaGVja0NvdW50IiwiY2hlY2tWdWVJbnRlcnZhbCIsImluaXQiLCJjcmVhdGVQYW5lbElmSGFzUmVjb3JlIiwic2V0SW50ZXJ2YWwiLCJiaW5kIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJyZXF1ZXN0Iiwib25QYW5lbExvYWQiLCJjbGVhckludGVydmFsIiwicGFuZWxzIiwiY3JlYXRlIiwicGFuZWwiLCJvblBhbmVsSGlkZGVuIiwib25TaG93biIsIm9uUGFuZWxTaG93biIsIm9uSGlkZGVuIiwic2VuZE1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlDLE1BQU0sQ0FBQ0MsUUFBbkIsRSxDQUVBO0FBQ0E7QUFDQTs7QUFDQTs7OztjQUkrQkQsTTtJQUF0QkMsUSxXQUFBQSxRO0lBQVVDLE8sV0FBQUEsTzs7QUFFbkIsTUFBTUMsWUFBTixDQUFtQjtBQUNqQkMsYUFBVyxHQUFHO0FBQ1osU0FBS0MsZUFBTCxHQUF1QixLQUF2QixDQURZLENBQ2tCOztBQUM5QixTQUFLQyxhQUFMLEdBQXFCLEtBQXJCLENBRlksQ0FFZ0I7O0FBQzVCLFNBQUtDLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLENBQWxCLENBSlksQ0FJUzs7QUFDckIsU0FBS0MsZ0JBQUwsR0FBd0IsSUFBeEI7QUFDQSxTQUFLQyxJQUFMO0FBQ0Q7O0FBRURBLE1BQUksR0FBRztBQUNMLFNBQUtDLHNCQUFMO0FBQ0EsU0FBS0YsZ0JBQUwsR0FBd0JHLFdBQVcsQ0FBQyxLQUFLRCxzQkFBTCxDQUE0QkUsSUFBNUIsQ0FBaUMsSUFBakMsQ0FBRCxFQUF5QyxJQUF6QyxDQUFuQyxDQUZLLENBR0w7O0FBQ0FYLFdBQU8sQ0FBQ1ksU0FBUixDQUFrQkMsV0FBbEIsQ0FBK0JDLE9BQUQsSUFBYTtBQUN6QyxVQUFHQSxPQUFPLEtBQUssbUJBQWYsRUFBb0M7QUFDbEMsYUFBS0MsV0FBTDtBQUNEO0FBQ0YsS0FKRDtBQUtEOztBQUVETix3QkFBc0IsR0FBRztBQUN2QixRQUFHLEtBQUtOLGVBQUwsSUFBd0IsS0FBS0csVUFBTCxLQUFxQixFQUFoRCxFQUFvRDtBQUNsRFUsbUJBQWEsQ0FBQyxLQUFLVCxnQkFBTixDQUFiO0FBQ0E7QUFDRDs7QUFDRFMsaUJBQWEsQ0FBQyxLQUFLVCxnQkFBTixDQUFiO0FBQ0EsU0FBS0osZUFBTCxHQUF1QixJQUF2QjtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsS0FBckI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0FOLFlBQVEsQ0FBQ2tCLE1BQVQsQ0FBZ0JDLE1BQWhCLENBQXVCLFFBQXZCLEVBQWlDLGVBQWpDLEVBQWtELGVBQWxELEVBQW9FQyxLQUFELElBQVU7QUFDM0U7QUFDQSxVQUFHLEtBQUtDLGFBQVIsRUFBdUI7QUFDckJELGFBQUssQ0FBQ0UsT0FBTixDQUFjUixXQUFkLENBQTBCLEtBQUtTLFlBQS9CO0FBQ0FILGFBQUssQ0FBQ0ksUUFBTixDQUFlVixXQUFmLENBQTJCLEtBQUtPLGFBQWhDO0FBQ0Q7QUFDRixLQU5EO0FBT0Q7O0FBRURFLGNBQVksR0FBRztBQUNiLFNBQUtqQixZQUFMLEdBQW9CLElBQXBCO0FBQ0FMLFdBQU8sQ0FBQ3dCLFdBQVIsQ0FBb0Isb0JBQXBCOztBQUNBLFFBQUcsS0FBS3BCLGFBQVIsRUFBdUIsQ0FFdEI7O0FBQ0RSLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaO0FBQ0Q7O0FBRUR1QixlQUFhLEdBQUc7QUFDZCxTQUFLZixZQUFMLEdBQW9CLEtBQXBCO0FBQ0FMLFdBQU8sQ0FBQ3dCLFdBQVIsQ0FBb0IscUJBQXBCO0FBQ0E1QixXQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBWjtBQUNEOztBQUVEa0IsYUFBVyxHQUFHO0FBQ1osU0FBS1gsYUFBTCxHQUFxQixJQUFyQjtBQUNEOztBQXhEZ0I7O0FBNERuQixJQUFJSCxZQUFKLEciLCJmaWxlIjoiZGV2dG9vbHMtYmFja2dyb3VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwL3NyYy9kZXZ0b29scy1iYWNrZ3JvdW5kLmpzXCIpO1xuIiwiY29uc29sZS5sb2coY2hyb21lLmRldnRvb2xzKTtcblxuLy8gY2hyb21lLmRldnRvb2xzLnBhbmVscy5jcmVhdGUoJ1JlY29yZScsICdpY29ucy8xMjgucG5nJywgJ2RldnRvb2xzLmh0bWwnLChwYW5lbCkgPT4ge1xuLy8gICBjb25zb2xlLmxvZyhwYW5lbCk7XG4vLyB9KVxuLyoqXG4gKiBjcmVhdGUgUmVjb3JlIHBhbmVsIFxuICovXG5cbiBjb25zdCB7IGRldnRvb2xzLCBydW50aW1lIH0gPSBjaHJvbWU7XG4gXG5jbGFzcyBDcmVhdGVSZWNvcmUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlzQ3JlYXRlZFJlY29yZSA9IGZhbHNlOyAvLyDmmK/lkKblt7Lnu4/liJvlu7ogUmVjb3JlIHBhbmVsXG4gICAgdGhpcy5pc1BhbmVsTG9hZGVkID0gZmFsc2U7IC8vIOaYr+WQpuW3sue7j+WKoOi9vSBSZWNvcmUgcGFuZWxcbiAgICB0aGlzLmlzUGFuZWxTaG93biA9IGZhbHNlO1xuICAgIHRoaXMuY2hlY2tDb3VudCA9IDA7IC8vIOajgOafpeWIm+W7uueahOasoeaVsFxuICAgIHRoaXMuY2hlY2tWdWVJbnRlcnZhbCA9IG51bGw7XG4gICAgdGhpcy5pbml0KCk7IFxuICB9XG4gIFxuICBpbml0KCkge1xuICAgIHRoaXMuY3JlYXRlUGFuZWxJZkhhc1JlY29yZSgpO1xuICAgIHRoaXMuY2hlY2tWdWVJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMuY3JlYXRlUGFuZWxJZkhhc1JlY29yZS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgICAvLyDnm5HlkKwgb25NZXNzYWdlXG4gICAgcnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QpID0+IHtcbiAgICAgIGlmKHJlcXVlc3QgPT09ICdyZWNvcmUtcGFuZWwtbG9hZCcpIHtcbiAgICAgICAgdGhpcy5vblBhbmVsTG9hZCgpO1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjcmVhdGVQYW5lbElmSGFzUmVjb3JlKCkge1xuICAgIGlmKHRoaXMuaXNDcmVhdGVkUmVjb3JlIHx8IHRoaXMuY2hlY2tDb3VudCArKyA+IDMwKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuY2hlY2tWdWVJbnRlcnZhbClcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmNoZWNrVnVlSW50ZXJ2YWwpXG4gICAgdGhpcy5pc0NyZWF0ZWRSZWNvcmUgPSB0cnVlO1xuICAgIHRoaXMuaXNQYW5lbExvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNQYW5lbFNob3duID0gZmFsc2U7XG4gICAgZGV2dG9vbHMucGFuZWxzLmNyZWF0ZSgnUmVjb3JlJywgJ2ljb25zLzEyOC5wbmcnLCAnZGV2dG9vbHMuaHRtbCcsIChwYW5lbCkgPT57XG4gICAgICAvLyBwYW5lbCBsb2FkZWRcbiAgICAgIGlmKHRoaXMub25QYW5lbEhpZGRlbikge1xuICAgICAgICBwYW5lbC5vblNob3duLmFkZExpc3RlbmVyKHRoaXMub25QYW5lbFNob3duKTtcbiAgICAgICAgcGFuZWwub25IaWRkZW4uYWRkTGlzdGVuZXIodGhpcy5vblBhbmVsSGlkZGVuKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBvblBhbmVsU2hvd24oKSB7XG4gICAgdGhpcy5pc1BhbmVsU2hvd24gPSB0cnVlO1xuICAgIHJ1bnRpbWUuc2VuZE1lc3NhZ2UoJ3JlY29yZS1wYW5lbC1zaG93bicpO1xuICAgIGlmKHRoaXMuaXNQYW5lbExvYWRlZCkge1xuXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdSZWNvcmUgcGFuZWwgc2hvd24nKTtcbiAgfVxuXG4gIG9uUGFuZWxIaWRkZW4oKSB7XG4gICAgdGhpcy5pc1BhbmVsU2hvd24gPSBmYWxzZTtcbiAgICBydW50aW1lLnNlbmRNZXNzYWdlKCdyZWNvcmUtcGFuZWwtaGlkZGVuJyk7XG4gICAgY29uc29sZS5sb2coJ1JlY29yZSBwYW5lbCBoaWRkZW4nKTtcbiAgfVxuXG4gIG9uUGFuZWxMb2FkKCkge1xuICAgIHRoaXMuaXNQYW5lbExvYWRlZCA9IHRydWU7XG4gIH1cbn1cblxuXG5uZXcgQ3JlYXRlUmVjb3JlKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==