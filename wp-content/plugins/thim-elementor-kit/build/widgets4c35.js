/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/widgets.scss":
/*!**************************!*\
  !*** ./src/widgets.scss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/widgets/js/archive-course.js":
/*!******************************************!*\
  !*** ./src/widgets/js/archive-course.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ArchiveCourse)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_1__);


const SEKELETON = `<ul class="lp-skeleton-animation">
		<li style="width:100%"></li>
		<li style="width:100%"></li>
		<li style="width:100%"></li>
		<li style="width:100%"></li>
		<li style="width:100%"></li>
	</ul>`;
function ArchiveCourse() {
  if (!document.querySelectorAll('.thim-ekits-archive-course__skeleton').length) {
    return;
  }
  const elements = document.querySelectorAll('.thim-ekits-archive-course');
  async function getResponse(ele, params) {
    const courseEle = ele.querySelector('.thim-ekits-course__inner');
    const resultCount = ele.querySelector('.thim-ekits-archive-course__topbar__result');
    const paginationEle = ele.querySelectorAll('.thim-ekits-archive-course__pagination');
    courseEle.insertAdjacentHTML('beforebegin', SEKELETON);
    courseEle.innerHTML = '';
    try {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        method: 'POST',
        path: 'thim-ekit/archive-course/get-courses',
        data: {
          ...params
        }
      });
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      paginationEle && paginationEle.forEach(pagination => {
        pagination.remove();
      });
      courseEle.innerHTML = response.data?.courses || '';
      courseEle.insertAdjacentHTML('afterend', response.data?.pagination || '');
      resultCount && (resultCount.textContent = response.data?.result_count || '');
      pagination(ele, {
        ...params,
        paged: response.data?.page || 1
      });
    } catch (error) {
      courseEle.insertAdjacentHTML('beforebegin', `<div>${error.message || 'Error when run ajax'}</div>`);
    } finally {
      const skeletons = ele.querySelectorAll('.lp-skeleton-animation');
      [...skeletons].map(ele => ele.remove());
    }
  }
  function pagination(ele, params) {
    const paginationEle = ele.querySelectorAll('.thim-ekits-archive-course__pagination');
    paginationEle.forEach(elePav => {
      const paginations = elePav.querySelectorAll('a.page-numbers');
      paginations.forEach(pagination => {
        pagination && pagination.addEventListener('click', e => {
          e.preventDefault();
          let page = params.page;
          if (pagination.classList.contains('prev')) {
            page = params.page - 1;
          } else if (pagination.classList.contains('next')) {
            page = params.page + 1;
          } else {
            page = parseInt(pagination.textContent.replace(/\D/g, ''));
          }
          getResponse(ele, {
            ...params,
            paged: page
          });
        });
      });
    });
  }
  function orderby(ele, params) {
    const orderby = ele.querySelector('select[name="order_by"]');
    orderby && orderby.addEventListener('change', e => {
      getResponse(ele, {
        ...params,
        orderby: orderby.value,
        params_url: lpData.urlParams
      });
    });
  }
  if ('IntersectionObserver' in window) {
    const eleObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const ele = entry.target;
          if (ele.dataset.atts) {
            getResponse(ele, {
              atts: ele.dataset.atts,
              params_url: lpData.urlParams
            }, true);

            //orderby( ele, { atts: ele.dataset.atts } );
          }
          eleObserver.unobserve(ele);
        }
      });
    });
    [...elements].map(ele => eleObserver.observe(ele));
  }
}

/***/ }),

/***/ "./src/widgets/js/archive-loadmore.js":
/*!********************************************!*\
  !*** ./src/widgets/js/archive-loadmore.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ thimEkitLoadMoreArchive)
/* harmony export */ });
function thimEkitLoadMoreArchive(parent = '.thim-ekits-archive-course', inner = '.thim-ekits-course__inner') {
  const archive = document.querySelector(parent);
  if (!archive) {
    return;
  }
  const innerHtml = archive.querySelector(inner);
  const loadMoreButton = archive.querySelector('.thim-ekits-archive__loadmore-button');
  const elSpinner = archive.querySelector('.thim-ekits-archive__loadmore-spinner');
  const loadMoreBtn = archive.querySelector('.thim-ekits-archive__loadmore-btn');
  const loadMoreData = archive.querySelector('.thim-ekits-archive__loadmore-data');
  if (!loadMoreData) {
    return;
  }
  let isLoading = false;
  let currentPage = loadMoreData.dataset.page ? parseInt(loadMoreData.dataset.page) : 1;
  const maxPage = loadMoreData.dataset.maxPage ? parseInt(loadMoreData.dataset.maxPage) : 1;
  const isInfinityScroll = loadMoreData.dataset.infinityScroll ? parseInt(loadMoreData.dataset.infinityScroll) : false;
  const beforeLoading = () => {
    isLoading = true;
    elSpinner.classList.remove('hide');
    if (loadMoreBtn) {
      loadMoreBtn.disabled = true;
    }
  };
  const afterLoading = () => {
    isLoading = false;
    elSpinner.classList.add('hide');
    if (loadMoreBtn) {
      loadMoreBtn.disabled = false;
    }
  };
  const handleInfiniteScroll = () => {
    // Use observer to check if the element is visible in the viewport
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (isLoading) {
          return;
        }
        if (entry.isIntersecting) {
          handlePostsQuery();
        }
      });
    });
    observer.observe(loadMoreData);
  };
  const handlePostsQuery = () => {
    const nextPageUrl = loadMoreData.dataset.nextPage;
    if (currentPage >= maxPage) {
      return;
    }
    beforeLoading();
    currentPage++;
    return fetch(nextPageUrl).then(response => response.text()).then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const nextData = doc.querySelector('.thim-ekits-archive__loadmore-data');
      const nextPosts = doc.querySelector(inner);
      loadMoreData.dataset.page = nextData.dataset.page;
      loadMoreData.dataset.nextPage = nextData.dataset.nextPage;
      innerHtml.insertAdjacentHTML('beforeend', nextPosts.innerHTML);
      if (!nextData.dataset.nextPage || currentPage >= maxPage) {
        loadMoreButton && loadMoreButton.remove();
      }
      afterLoading();
    });
  };
  loadMoreBtn && loadMoreBtn.addEventListener('click', e => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    if (currentPage >= maxPage && loadMoreButton) {
      loadMoreButton.remove();
      return;
    }
    handlePostsQuery();
  });
  if (isInfinityScroll) {
    handleInfiniteScroll();
  }
}

/***/ }),

/***/ "./src/widgets/js/copy-to-clipboard.js":
/*!*********************************************!*\
  !*** ./src/widgets/js/copy-to-clipboard.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CopyToClipboard)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/widgets/js/utils.js");

function CopyToClipboard() {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.thimClick)('.social-share-toggle', '.share-toggle-icon', '.content-widget-social-share');
  var copyTextareaBtn = document.querySelector('.btn-clipboard');
  if (copyTextareaBtn) {
    copyTextareaBtn.addEventListener('click', function (event) {
      var copyTextarea = document.querySelector('.clipboard-value');
      copyTextarea.focus();
      copyTextarea.select();
      try {
        var successful = document.execCommand('copy');
        var msg = copyTextareaBtn.getAttribute('data-copied');
        copyTextareaBtn.innerHTML = msg + '<span class="tooltip">' + msg + '</span>';
      } catch (err) {}
    });
  }
}

/***/ }),

/***/ "./src/widgets/js/countdown.js":
/*!*************************************!*\
  !*** ./src/widgets/js/countdown.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThimCountDown)
/* harmony export */ });
class ThimCountDown extends elementorModules.frontend.handlers.Base {
  onInit() {
    const self = this;
    const $countDown = this.$element.find('.thim-ekits-countdown-wrapper');
    if (!$countDown) {
      return;
    }
    this.elements = {
      days: $countDown.find('.countdown-days'),
      hours: $countDown.find('.countdown-hours'),
      minutes: $countDown.find('.countdown-minutes'),
      seconds: $countDown.find('.countdown-seconds')
    };
    this.endTime = new Date($countDown.data('date_end') * 1000);
    setInterval(function () {
      self.updateClock();
    }, 100);
  }
  updateClock() {
    const self = this,
      timeRemaining = this.getTimeRemaining(this.endTime);
    jQuery.each(timeRemaining.parts, function (timePart) {
      const $element = self.elements[timePart];
      let value = this.toString();
      if (1 === value.length) {
        value = 0 + value;
      }
      if ($element.length) {
        $element.text(value);
      }
    });
  }
  getTimeRemaining(endTime) {
    const timeRemaining = endTime - new Date();
    let seconds = Math.floor(timeRemaining / 1000 % 60),
      minutes = Math.floor(timeRemaining / 1000 / 60 % 60),
      hours = Math.floor(timeRemaining / (1000 * 60 * 60) % 24),
      days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    if (days < 0 || hours < 0 || minutes < 0) {
      seconds = minutes = hours = days = 0;
    }
    return {
      total: timeRemaining,
      parts: {
        days,
        hours,
        minutes,
        seconds
      }
    };
  }
}

/***/ }),

/***/ "./src/widgets/js/course-item-section.js":
/*!***********************************************!*\
  !*** ./src/widgets/js/course-item-section.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getOffsetPopupFooterHeight: () => (/* binding */ getOffsetPopupFooterHeight),
/* harmony export */   getOffsetPopupHeaderHeight: () => (/* binding */ getOffsetPopupHeaderHeight),
/* harmony export */   stickySidebar: () => (/* binding */ stickySidebar)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/widgets/js/utils.js");


// get height class ekit-popup-header and set variable.
const getOffsetPopupHeaderHeight = element => {
  const popupHeader = element.querySelector('.ekit-popup-header');
  if (popupHeader) {
    const position = window.getComputedStyle(popupHeader).getPropertyValue('position');
    if (position === 'absolute' || position === 'fixed') {
      const popupHeaderHeight = popupHeader.offsetHeight;
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.setVariable)(element, '--thim-ekit-popup-header-height', popupHeaderHeight + 'px');
    }
    if (elementorFrontend.isEditMode()) {
      elementor.channels.editor.on('change', function (view) {
        // if popupHeader contain data-id value is view.container.id.
        if (popupHeader.dataset.id === view.container.id) {
          const changed = view.container.settings.changed;
          if (changed?.position === 'absolute' || changed?.position === 'fixed') {
            const popupHeaderHeight = popupHeader.offsetHeight;
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.setVariable)(element, '--thim-ekit-popup-header-height', popupHeaderHeight + 'px');
          } else {
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.setVariable)(element, '--thim-ekit-popup-header-height', '0px');
          }
        }
      });
    }
  }
};

// get height class ekit-popup-footer and set variable.
const getOffsetPopupFooterHeight = element => {
  const popupFooter = element.querySelector('.ekit-popup-footer');
  if (popupFooter) {
    const position = window.getComputedStyle(popupFooter).getPropertyValue('position');
    if (position === 'absolute' || position === 'fixed') {
      const popupFooterHeight = popupFooter.offsetHeight;
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.setVariable)(element, '--thim-ekit-popup-footer-height', popupFooterHeight + 'px');
    }
    if (elementorFrontend.isEditMode()) {
      elementor.channels.editor.on('change', function (view) {
        // if popupFooter contain data-id value is view.container.id.
        if (popupFooter.dataset.id === view.container.id) {
          const changed = view.container.settings.changed;
          if (changed?.position === 'absolute' || changed?.position === 'fixed') {
            const popupFooterHeight = popupFooter.offsetHeight;
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.setVariable)(element, '--thim-ekit-popup-footer-height', popupFooterHeight + 'px');
          } else {
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.setVariable)(element, '--thim-ekit-popup-footer-height', '0px');
          }
        }
      });
    }
  }
};
const stickySidebar = element => {
  // sticky sidebar use fixed position.
  const popupCourse = element.querySelector('#popup-course');
  if (popupCourse) {
    const stickySidebar = popupCourse.querySelector('#ekit-sticky-sidebar');
    if (stickySidebar) {
      const eConInner = stickySidebar.querySelector('.e-con-inner');
      const popupContentRight = popupCourse.querySelector('.wrapper-popup-content-right');
      if (eConInner && popupContentRight) {
        const setSticky = () => {
          // only run in desktop.
          if (window.innerWidth <= 1024) {
            return;
          }
          const popupCourseRect = popupCourse.getBoundingClientRect();
          const popupContentRightRect = popupContentRight.getBoundingClientRect();
          const widthSidebarItems = stickySidebar.offsetWidth + 'px';
          if (popupCourseRect.top <= 0 && popupContentRightRect.top <= 0) {
            eConInner.style.position = 'fixed';
            eConInner.style.top = '0';
            eConInner.style.left = stickySidebar.offsetLeft + 'px';
            eConInner.style.width = 'var(--thim-width-sidebar-items, ' + widthSidebarItems + ')';
          } else {
            eConInner.style.position = 'relative';
            eConInner.style.top = 'auto';
            eConInner.style.left = 'auto';
            eConInner.style.width = '100%';
          }
        };

        // when scroll, set eConInner fixed position.
        window.addEventListener('scroll', setSticky);

        // when window resize, set eConInner fixed position.
        window.addEventListener('resize', setSticky);
      }
    }
  }
};

/***/ }),

/***/ "./src/widgets/js/draw-svg.jquery.js":
/*!*******************************************!*\
  !*** ./src/widgets/js/draw-svg.jquery.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery DrawSVG v1.1.0 (Oct 05 2016) - http://lcdsantos.github.io/jquery-drawsvg/
 *
 * Copyright (c) 2016 Leonardo Santos; MIT License
 *
 */
(function (factory) {
  /* global define */
  /* istanbul ignore next */
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  'use strict';

  var pluginName = 'drawsvg',
    defaults = {
      duration: 1000,
      stagger: 200,
      easing: 'swing',
      reverse: false,
      callback: $.noop
    },
    DrawSvg = function () {
      var fn = function fn(elm, options) {
        var _this = this,
          opts = $.extend(defaults, options);
        _this.$elm = $(elm);
        if (!_this.$elm.is('svg')) {
          return;
        }
        _this.options = opts;
        _this.$paths = _this.$elm.find('path');
        _this.totalDuration = opts.duration + opts.stagger * _this.$paths.length;
        _this.duration = opts.duration / _this.totalDuration;
        _this.$paths.each(function (index, elm) {
          var pathLength = elm.getTotalLength();
          elm.pathLen = pathLength;
          elm.delay = opts.stagger * index / _this.totalDuration;
          elm.style.strokeDasharray = [pathLength, pathLength].join(' ');
          elm.style.strokeDashoffset = pathLength;
        });

        // _this.$elm.attr('class', function (index, classNames) {
        // 	return [classNames, pluginName + '-initialized'].join(' ');
        // });
      };
      fn.prototype.getVal = function (p, easing) {
        return 1 - $.easing[easing](p, p, 0, 1, 1);
      };
      fn.prototype.progress = function progress(prog) {
        var _this = this,
          opts = _this.options,
          duration = _this.duration;
        _this.$paths.each(function (index, elm) {
          var elmStyle = elm.style;
          if (prog === 1) {
            elmStyle.strokeDashoffset = 0;
          } else if (prog === 0) {
            elmStyle.strokeDashoffset = elm.pathLen + 'px';
          } else if (prog >= elm.delay && prog <= duration + elm.delay) {
            var p = (prog - elm.delay) / duration;
            elmStyle.strokeDashoffset = _this.getVal(p, opts.easing) * elm.pathLen * (opts.reverse ? -1 : 1) + 'px';
          }
        });
      };
      fn.prototype.animate = function animate() {
        var _this = this;

        // _this.$elm.attr('class', function (index, classNames) {
        // 	return [classNames, pluginName + '-animating'].join(' ');
        // });

        $({
          len: 0
        }).animate({
          len: 1
        }, {
          easing: 'linear',
          duration: _this.totalDuration,
          step: function (now, fx) {
            _this.progress.call(_this, now / fx.end);
          },
          complete: function () {
            _this.options.callback.call(this);

            // _this.$elm.attr('class', function (index, classNames) {
            // 	return classNames.replace(pluginName + '-animating', '');
            // });
          }
        });
      };
      return fn;
    }();

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (method, args) {
    return this.each(function () {
      var data = $.data(this, pluginName);
      data && '' + method === method && data[method] ? data[method](args) : $.data(this, pluginName, new DrawSvg(this, method));
    });
  };
});

/***/ }),

/***/ "./src/widgets/js/draw-svg.js":
/*!************************************!*\
  !*** ./src/widgets/js/draw-svg.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SVGDraw)
/* harmony export */ });
/* harmony import */ var _draw_svg_jquery_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draw-svg.jquery.js */ "./src/widgets/js/draw-svg.jquery.js");
/* harmony import */ var _draw_svg_jquery_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_draw_svg_jquery_js__WEBPACK_IMPORTED_MODULE_0__);

function SVGDraw($scope, $) {
  let wrapper = $('.icon-svg-draw', $scope);
  if (!wrapper.length) {
    return;
  }
  let svg_icon = $('svg', wrapper),
    settings = wrapper.data('settings'),
    speed = settings.speed,
    is_loop = settings.loop,
    direction = settings.direction,
    offset = settings.offset,
    draw_interval,
    addOrSubtract,
    stepCount = 0,
    $doc = $(document),
    $win = $(window),
    max = $doc.height() - $win.height();
  function dashReset() {
    let largestDash = 0,
      largestPath = '';
    $('path', svg_icon).each(function () {
      let dashArray = $(this).css('stroke-dasharray');
      let dashArrayValue = parseInt(dashArray);
      if (dashArrayValue > largestDash) {
        largestDash = dashArrayValue;
        largestPath = $(this);
      }
    });
    if (largestDash < 3999 && largestDash / 2 > 600 && settings.fill === 'fill-svg') {
      let offset = largestPath.css('stroke-dashoffset');
      offset = parseInt(offset);
      if (offset < largestDash / 2) {
        wrapper.addClass(settings.fill);
      }
    }
  }
  function stepProgress() {
    dashReset();
    if (addOrSubtract) {
      stepCount += 0.01;
      if (stepCount >= 1) {
        addOrSubtract = false;
        if (settings.fill === 'fill-svg') {
          wrapper.removeClass('fillout-svg').addClass(settings.fill);
        }
      }
    } else if (direction === 'restart') {
      stepCount = 0;
      addOrSubtract = true;
    } else {
      stepCount -= 0.01;
      if (stepCount <= 0) {
        addOrSubtract = true;
      }
    }
    // console.log(stepCount)
    return stepCount;
  }
  if (svg_icon.parent().hasClass('page-scroll')) {
    $win.on('scroll', function () {
      let step = ($win.scrollTop() - offset) / max;
      let offsetTop = svg_icon.offset().top,
        viewPort = $win.innerHeight(),
        offsetBottom = offsetTop - viewPort;
      if (offsetTop > $win.scrollTop() && offsetBottom < $win.scrollTop()) {
        step = ($win.scrollTop() - offset - offsetBottom) / viewPort;
        svg_icon.drawsvg('progress', step);
      }
      dashReset();
    });
  } else if (svg_icon.parent().hasClass('page-load')) {
    let lastSvg = '';
    let drawSvg = setInterval(function () {
      let currentSvg = svg_icon.html();
      svg_icon.drawsvg('progress', stepProgress());
      if (is_loop === 'no') {
        stepProgress();
      }
      if (currentSvg === lastSvg && is_loop === 'no') {
        wrapper.addClass(settings.fill);
        clearInterval(drawSvg);
      }
      lastSvg = currentSvg;
    }, speed);
  } else if (svg_icon.parent().hasClass('hover')) {
    svg_icon.hover(function (e) {
      e.stopPropagation();
      var re_hover = svg_icon.drawsvg({
        duration: speed * 100,
        callback: function () {
          wrapper.addClass(settings.fill);
        }
      });
      re_hover.drawsvg('animate');
    }, function () {});
  }
}

/***/ }),

/***/ "./src/widgets/js/list-block-tabs.js":
/*!*******************************************!*\
  !*** ./src/widgets/js/list-block-tabs.js ***!
  \*******************************************/
/***/ (() => {

(function ($) {
  'use strict';

  $(document).ready(function () {
    list_block_tab.init();
  });
  var list_block_tab = window.list_block_tab = {
    data: {},
    init: function () {
      this.nav_tabs();
    },
    nav_tabs: function () {
      var $sc = $('.thim-block-tabs');
      if ($sc.length == 0) {
        return;
      }
      $sc.on('click', '.nav-tabs a', function (e) {
        e.preventDefault();
        $sc = $(this).parents('.thim-block-tabs');
        var current_cat = $sc.find('.nav-tabs .cat-item.active a').attr('data-cat');
        $sc.find('.nav-tabs li').removeClass('active');
        $(this).parents('li').addClass('active');
        var params = $sc.attr('data-params'),
          category = $(this).attr('data-cat'),
          sc_id = $sc.attr('id');
        var data = {
          action: 'thim_load_content',
          category: category,
          params: params
        };
        list_block_tab.data[sc_id + current_cat] = $sc.find('.loop-wrapper').html();
        $sc.find('.loop-wrapper').removeClass('fadeIn');
        if (list_block_tab.data[sc_id + category]) {
          setTimeout(function () {
            $sc.find('.loop-wrapper').html(list_block_tab.data[sc_id + category]);
            $sc.find('.loop-wrapper').addClass('fadeIn');
          }, 300);
        } else {
          $.ajax({
            type: 'POST',
            url: ekits_script.ajax_url,
            data: data,
            beforeSend: function () {
              $sc.addClass('loading');
            },
            success: function (res) {
              if (res.success) {
                $sc.find('.loop-wrapper').html(res.data);
                $sc.find('.loop-wrapper').addClass('fadeIn');
              }
              $sc.removeClass('loading');
            },
            error: function (xhr, status) {
              alert(xhr.statusText);
            }
          });
        }
      });
    }
  };
})(jQuery);

/***/ }),

/***/ "./src/widgets/js/mini-cart.js":
/*!*************************************!*\
  !*** ./src/widgets/js/mini-cart.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniCart)
/* harmony export */ });
function MiniCart() {
  const cart = document.querySelector('.thim-ekits-mini-cart.side-cart'),
    cartBtn = cart && cart.querySelector('.minicart-icon'),
    closePopup = cart && cart.querySelector('.thim-ekits-mini-cart__close');
  if (!cart) {
    return;
  }
  const isCartOpen = () => {
    return cart.classList.contains('thim-ekits-mini-cart--is-show');
  };
  const showCart = () => {
    if (isCartOpen()) {
      return;
    }
    cart.classList.add('thim-ekits-mini-cart--is-show');
  };
  const hideCart = () => {
    if (!isCartOpen()) {
      return;
    }
    cart.classList.remove('thim-ekits-mini-cart--is-show');
  };
  const toggleCart = () => {
    if (isCartOpen()) {
      hideCart();
    } else {
      showCart();
    }
  };
  const onKeyDown = e => {
    if (e.keyCode === 27) {
      hideCart();
    }
  };
  cartBtn && cartBtn.addEventListener('click', e => {
    e.preventDefault();
    toggleCart();
  });
  document.addEventListener('click', e => {
    if (!isCartOpen()) {
      return;
    }
    const target = e.target;
    if (target.closest('.thim-ekits-mini-cart__content') || target.closest('.minicart-icon')) {
      return;
    }
    hideCart();
  });

  // Click close button.
  closePopup && closePopup.addEventListener('click', e => {
    e.preventDefault();
    hideCart();
  });
  document.addEventListener('keydown', onKeyDown, false); // click ESC button will hide popup
  jQuery(document.body).on('added_to_cart', showCart); // WooCommerce is required jQuery
}

/***/ }),

/***/ "./src/widgets/js/modal.js":
/*!*********************************!*\
  !*** ./src/widgets/js/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModalPopup)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/widgets/js/utils.js");

function ModalPopup() {
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.thimClick)('.thim-ekits-search-form__toggle', '.search-form-hoverbutton', '.ekits-modal__container');

  /* Opening modal window function */
  function openModal() {
    /* Get trigger element */
    var modalButton = document.getElementsByClassName('modalbutton');
    var inputSearch = document.getElementsByClassName('thim-ekits-search');

    /* Set onclick event handler for all trigger elements */
    for (var i = 0; i < modalButton.length; i++) {
      modalButton[i].onclick = function (e) {
        e.preventDefault();
        var target = this.getAttribute('href').substr(1);
        var modalWindow = document.getElementById(target);
        setTimeout(() => {
          if (inputSearch.length > 0) {
            inputSearch[0].focus();
          }
        }, 300);
        modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open';
      };
    }
  }
  function stopModal() {
    var videos = document.querySelectorAll('iframe, video');
    Array.prototype.forEach.call(videos, function (video) {
      if (video.tagName.toLowerCase() === 'video') {
        video.pause();
      } else {
        var src = video.src;
        video.src = src;
      }
    });
  }
  function closeModal() {
    /* Get close button */
    var closeButton = document.getElementsByClassName('ModalClose');
    var closeOverlay = document.getElementsByClassName('ModalOverlay');

    /* Set onclick event handler for close buttons */
    for (var i = 0; i < closeButton.length; i++) {
      closeButton[i].onclick = function () {
        var modalWindow = this.parentNode.parentNode;
        modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        stopModal();
      };
    }

    /* Set onclick event handler for modal overlay */
    for (var i = 0; i < closeOverlay.length; i++) {
      closeOverlay[i].onclick = function () {
        var modalWindow = this.parentNode;
        modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        stopModal();
      };
    }
  }

  /* Handling domready event IE9+ */
  function ready(fn) {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /* Triggering modal window function after dom ready */
  ready(openModal);
  ready(closeModal);
}

/***/ }),

/***/ "./src/widgets/js/motion-effects.js":
/*!******************************************!*\
  !*** ./src/widgets/js/motion-effects.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MotionEffects)
/* harmony export */ });
/**
 * Motion Effects Handler
 *
 * @author Nhamdv
 * Code is poetry
 */
class MotionEffects extends elementorModules.frontend.handlers.Base {
  __construct() {
    super.__construct(...arguments);
    this.toggle = elementorFrontend.debounce(this.toggle, 200);
  }
  onInit() {
    super.onInit();
    this.effects = {
      mouseTrack: {
        interaction: 'mouseMove',
        actions: ['translateXY']
      },
      tilt: {
        interaction: 'mouseMove',
        actions: ['tilt']
      }
    };
    this.toggle();
  }
  getDefaultSettings() {
    return {
      selectors: {
        container: '.elementor-widget-container'
      }
    };
  }
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $container: this.$element.find(selectors.container)
    };
  }
  bindEvents() {
    elementorFrontend.elements.$window.on('resize', this.toggle);
  }
  unbindEvents() {
    elementorFrontend.elements.$window.off('resize', this.toggle);
  }
  prepareOptions(name) {
    const elementSettings = this.getElementSettings(),
      interactions = {};
    jQuery.each(elementSettings, (key, value) => {
      const keyRegex = new RegExp('thim_ekit_' + name + '_(.+)_effect'),
        keyMatches = key.match(keyRegex);
      if (!keyMatches || !value || value === 'no') {
        return;
      }
      const options = {},
        effectName = keyMatches[1];
      jQuery.each(elementSettings, (subKey, subValue) => {
        const subKeyRegex = new RegExp('thim_ekit_' + name + '_' + effectName + '_(.+)'),
          subKeyMatches = subKey.match(subKeyRegex);
        if (!subKeyMatches) {
          return;
        }
        const subFieldName = subKeyMatches[1];
        if ('effect' === subFieldName) {
          return;
        }
        if ('object' === typeof subValue) {
          subValue = Object.keys(subValue.sizes).length ? subValue.sizes : subValue.size;
        }
        options[subKeyMatches[1]] = subValue;
      });
      const effect = this.effects[effectName],
        interactionName = effect.interaction;
      if (!interactions[interactionName]) {
        interactions[interactionName] = {};
      }
      effect.actions.forEach(action => interactions[interactionName][action] = options);
    });
    let $element = this.$element,
      $dimensionsElement;
    const elementType = this.getElementType();
    if (!['section', 'container'].includes(elementType)) {
      $dimensionsElement = $element;
      let childElementSelector;
      if ('column' === elementType) {
        childElementSelector = '.elementor-widget-wrap';
      } else {
        childElementSelector = '.elementor-widget-container';
      }
      $element = $element.find('> ' + childElementSelector);
    }
    const options = {
      interactions,
      elementSettings,
      $element,
      $dimensionsElement,
      classes: {
        element: 'thim-ekit-motion-fx-element',
        parent: 'thim-ekit-motion-fx-parent',
        container: 'thim-ekit-motion-fx-container'
      }
    };
    return options;
  }
  activate(name) {
    const options = this.prepareOptions(name);
    if (jQuery.isEmptyObject(options.interactions)) {
      return;
    }
    this[name] = new MotionFx(options);
  }
  deactivate(name) {
    if (this[name]) {
      this[name].destroy();
      delete this[name];
    }
  }
  toggle() {
    const currentDeviceMode = elementorFrontend.getCurrentDeviceMode(),
      elementSettings = this.getElementSettings();
    ['motion_fx', 'background_motion_fx'].forEach(name => {
      const devices = elementSettings[name + '_devices'],
        isCurrentModeActive = !devices || -1 !== devices.indexOf(currentDeviceMode);
      if (isCurrentModeActive && elementSettings['thim_ekit_' + name + '_mouse']) {
        if (this[name]) {
          this.refreshInstance(name);
        } else {
          this.activate(name);
        }
      } else {
        this.deactivate(name);
      }
    });
  }
  refreshInstance(instanceName) {
    const instance = this[instanceName];
    if (!instance) {
      return;
    }
    const preparedOptions = this.prepareOptions(instanceName);
    instance.setSettings(preparedOptions);
    instance.refresh();
  }
  onElementChange(propertyName) {
    if (/motion_fx_((mouse)|(devices))$/.test(propertyName)) {
      this.toggle();
    }
    const propertyMatches = propertyName.match('(_motion_fx)');
    if (propertyMatches) {
      const instanceName = 'motion_fx';
      this.refreshInstance(instanceName);
      if (!this[instanceName]) {
        this.activate(instanceName);
      }
    }
  }
  onDestroy() {
    super.onDestroy();
    ['motion_fx', 'background_motion_fx'].forEach(name => {
      this.deactivate(name);
    });
  }
}
class MotionFx extends elementorModules.ViewModule {
  getDefaultSettings() {
    return {
      $element: null,
      $dimensionsElement: null,
      interactions: {},
      classes: {
        element: 'thim-ekit-motion-fx-element',
        parent: 'thim-ekit-motion-fx-parent',
        container: 'thim-ekit-motion-fx-container'
      }
    };
  }
  initInteractionsTypes() {
    this.interactionsTypes = {
      mouseMove
    };
  }
  runInteractions() {
    const _this = this;
    const settings = this.getSettings();
    jQuery.each(settings.interactions, (interactionName, actions) => {
      this.interactions[interactionName] = new this.interactionsTypes[interactionName]({
        motionFX: this,
        callback() {
          const _len = arguments.length,
            args = new Array(_len);
          for (let _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          jQuery.each(actions, (actionName, actionData) => _this.actions.runAction(actionName, actionData, ...args));
        }
      });
      this.interactions[interactionName].run();
    });
  }
  destroyInteractions() {
    jQuery.each(this.interactions, (interactionName, interaction) => interaction.destroy());
    this.interactions = {};
  }
  refresh() {
    this.actions.setSettings(this.getSettings());
    this.actions.refresh();
    this.destroyInteractions();
    this.runInteractions();
  }
  destroy() {
    this.destroyInteractions();
    this.actions.refresh();
    const settings = this.getSettings();
    this.$element.removeClass(settings.classes.element);
    this.elements.$parent.removeClass(settings.classes.parent);
  }
  onInit() {
    super.onInit();
    const settings = this.getSettings();
    this.$element = settings.$element;
    this.elements.$parent = this.$element.parent();
    this.$element.addClass(settings.classes.element);
    this.elements.$parent = this.$element.parent();
    this.elements.$parent.addClass(settings.classes.parent);
    settings.$targetElement = this.$element;
    this.interactions = {};
    this.actions = new Actions(settings);
    this.initInteractionsTypes();
    this.runInteractions();
  }
}
class Actions extends elementorModules.Module {
  getStep(passedPercents, options) {
    return this.getElementStep(passedPercents, options);
  }
  getElementStep(passedPercents, options) {
    return -(passedPercents - 50) * options.speed;
  }
  translateX(actionData, passedPercents) {
    actionData.axis = 'x';
    actionData.unit = 'px';
    this.transform('translateX', passedPercents, actionData);
  }
  translateY(actionData, passedPercents) {
    actionData.axis = 'y';
    actionData.unit = 'px';
    this.transform('translateY', passedPercents, actionData);
  }
  translateXY(actionData, passedPercentsX, passedPercentsY) {
    this.translateX(actionData, passedPercentsX);
    this.translateY(actionData, passedPercentsY);
  }
  tilt(actionData, passedPercentsX, passedPercentsY) {
    const options = {
      speed: actionData.speed / 10,
      direction: actionData.direction
    };
    this.rotateX(options, passedPercentsY);
    this.rotateY(options, 100 - passedPercentsX);
  }
  rotateX(actionData, passedPercents) {
    actionData.axis = 'x';
    actionData.unit = 'deg';
    this.transform('rotateX', passedPercents, actionData);
  }
  rotateY(actionData, passedPercents) {
    actionData.axis = 'y';
    actionData.unit = 'deg';
    this.transform('rotateY', passedPercents, actionData);
  }
  transform(action, passedPercents, actionData) {
    if (actionData.direction) {
      passedPercents = 100 - passedPercents;
    }
    this.updateRulePart('transform', action, this.getStep(passedPercents, actionData) + actionData.unit);
  }
  updateRulePart(ruleName, key, value) {
    if (!this.rulesVariables[ruleName]) {
      this.rulesVariables[ruleName] = {};
    }
    if (!this.rulesVariables[ruleName][key]) {
      this.rulesVariables[ruleName][key] = true;
      this.updateRule(ruleName);
    }
    const cssVarKey = `--thim-ekit-${key}`;
    this.$element[0].style.setProperty(cssVarKey, value);
  }
  updateRule(ruleName) {
    let value = '';
    value += this.concatTransformMotionEffectCSSProperties(ruleName);
    this.$element.css(ruleName, value);
  }
  concatTransformMotionEffectCSSProperties(ruleName) {
    let value = '';
    jQuery.each(this.rulesVariables[ruleName], variableKey => {
      value += `${variableKey}(var(--thim-ekit-${variableKey}))`;
    });
    return value;
  }
  runAction(actionName, actionData, passedPercents) {
    if (actionData.affectedRange) {
      if (actionData.affectedRange.start > passedPercents) {
        passedPercents = actionData.affectedRange.start;
      }
      if (actionData.affectedRange.end < passedPercents) {
        passedPercents = actionData.affectedRange.end;
      }
    }
    const _len = arguments.length,
      args = new Array(_len > 3 ? _len - 3 : 0);
    for (let _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }
    this[actionName](actionData, passedPercents, ...args);
  }
  refresh() {
    this.rulesVariables = {};
    this.$element.css({
      transform: '',
      'will-change': ''
    });
  }
  onInit() {
    this.$element = this.getSettings('$targetElement');
    this.refresh();
  }
}
class mouseMove extends elementorModules.ViewModule {
  constructor() {
    super(...arguments);
    this.onInsideViewport = () => {
      this.run();
      this.animationFrameRequest = requestAnimationFrame(this.onInsideViewport);
    };
  }
  __construct(options) {
    this.motionFX = options.motionFX;
    if (!this.intersectionObservers) {
      this.setElementInViewportObserver();
    }
  }
  setElementInViewportObserver() {
    this.intersectionObserver = elementorModules.utils.Scroll.scrollObserver({
      callback: event => {
        if (event.isInViewport) {
          this.onInsideViewport();
        } else {
          this.removeAnimationFrameRequest();
        }
      }
    });
    const observedElement = this.motionFX.elements.$parent[0];
    this.intersectionObserver.observe(observedElement);
  }
  runCallback() {
    const callback = this.getSettings('callback');
    callback(...arguments);
  }
  removeIntersectionObserver() {
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(this.motionFX.elements.$parent[0]);
    }
  }
  removeAnimationFrameRequest() {
    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }
  }
  destroy() {
    this.removeAnimationFrameRequest();
    this.removeIntersectionObserver();
  }
  onInit() {
    super.onInit();
    this.oldMousePosition = {};
    this.mousePosition = {};
  }
  bindEvents() {
    if (!this.mouseTracked) {
      elementorFrontend.elements.$window.on('mousemove', event => {
        this.mousePosition = {
          x: event.clientX,
          y: event.clientY
        };
      });
      this.mouseTracked = true;
    }
  }
  run() {
    const mousePosition = this.mousePosition,
      oldMousePosition = this.oldMousePosition;
    if (oldMousePosition.x === mousePosition.x && oldMousePosition.y === mousePosition.y) {
      return;
    }
    this.oldMousePosition = {
      x: mousePosition.x,
      y: mousePosition.y
    };
    const passedPercentsX = 100 / innerWidth * mousePosition.x,
      passedPercentsY = 100 / innerHeight * mousePosition.y;
    this.runCallback(passedPercentsX, passedPercentsY);
  }
}

/***/ }),

/***/ "./src/widgets/js/reading-time-post.js":
/*!*********************************************!*\
  !*** ./src/widgets/js/reading-time-post.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThimEkitsReading)
/* harmony export */ });
function ThimEkitsReading() {
  if (document.getElementsByClassName('thim-ekits-js-progress').length > 0) {
    const html = document.documentElement;
    const progressBar = document.querySelector('.thim-ekits-js-progress');
    const progressUpdate = () => {
      const height = html.scrollHeight;
      const vh = html.clientHeight;
      progressBar.setAttribute('value', scrollY / (height - vh) * 100);
    };
    const progressScroll = () => {
      const scrollY = html.scrollTop;
      if (scrollY > 0) {
        requestAnimationFrame(progressUpdate);
      } else {
        progressBar.setAttribute('value', 0);
      }
    };
    const progressResize = () => requestAnimationFrame(progressUpdate);
    window.addEventListener('scroll', progressScroll, false);
    window.addEventListener('resize', progressResize, false);
  }
  if (document.getElementsByClassName('thim-ekit-single-post__content').length > 0 && document.getElementsByClassName('thim-kits-time').length > 0) {
    var words = document.querySelector('.thim-ekit-single-post__content').textContent.trim();
    var estimation = document.querySelector('.thim-kits-time');
    var results_text = estimation.getAttribute('data-results', 0);
    function EstimateReadingTime(str, results_text) {
      function WordCount(str) {
        return str.split(' ').length;
      }
      function Replace_text(times, results_text) {
        return results_text.replace('{times}', '<span class="number-time">' + times + '</span>');
      }
      var conditon_times = Math.floor(WordCount(str) / 200 * 60 / 60),
        second = Math.floor(WordCount(str) / 200 * 60) + ekits_script.text_second,
        min_second = Math.floor(WordCount(str) % 200 / 200 * 60) + ekits_script.text_second,
        minutes = Math.floor(WordCount(str) / 200) + ekits_script.text_minutes;
      if (conditon_times < 1) {
        var times = second;
      } else {
        var times = minutes + '&nbsp;' + min_second;
      }
      return Replace_text(times, results_text);
    }
    estimation.innerHTML = EstimateReadingTime(words, results_text);
  }
}

/***/ }),

/***/ "./src/widgets/js/tabs.js":
/*!********************************!*\
  !*** ./src/widgets/js/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThimEkitsTabs)
/* harmony export */ });
/** https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role */
function ThimEkitsTabs() {
  const tabList = document.querySelector('.thim-ekit-tablist [role="tablist"]');
  if (!tabList) {
    return;
  }
  const tabs = document.querySelectorAll('.thim-ekit-tablist [role="tab"]');

  // Add a click event handler to each tab
  tabs.forEach(tab => {
    tab.addEventListener('click', changeTabs);
  });

  // Enable arrow navigation between tabs in the tab list
  let tabFocus = 0;
  tabList.addEventListener('keydown', e => {
    // Move right
    if (e.keyCode === 39 || e.keyCode === 37) {
      tabs[tabFocus].setAttribute('tabindex', -1);
      if (e.keyCode === 39) {
        tabFocus++;
        // If we're at the end, go to the start
        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
        // Move left
      } else if (e.keyCode === 37) {
        tabFocus--;
        // If we're at the start, move to the end
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      }
      tabs[tabFocus].setAttribute('tabindex', 0);
      tabs[tabFocus].focus();
    }
  });
}
function changeTabs(e) {
  const target = e.currentTarget;
  const parent = target.parentNode;
  const grandparent = parent.parentNode;

  // Remove all current selected tabs
  if (grandparent.classList.contains('thim-accordion-sections')) {
    grandparent.querySelectorAll('[aria-selected="true"]').forEach(t => t.setAttribute('aria-selected', false));
  } else {
    parent.querySelectorAll('[aria-selected="true"]').forEach(t => t.setAttribute('aria-selected', false));
  }

  // Set this tab as selected
  target.setAttribute('aria-selected', true);

  // Hide all tab panels
  grandparent.querySelectorAll('[role="tabpanel"]').forEach(p => p.setAttribute('hidden', true));

  // Show the selected panel
  grandparent.parentNode.querySelector(`#${target.getAttribute('aria-controls')}`).removeAttribute('hidden');
}
(function ($) {
  'use strict';

  $(document).on('click', '.thim-ekit-tablist a[href^="#"]', function (event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - 100
    }, 500);
    $('.thim-ekit-tablist').find('.active').removeClass('active');
    $(this).addClass('active');
  });
})(jQuery);

/***/ }),

/***/ "./src/widgets/js/thim-slider.js":
/*!***************************************!*\
  !*** ./src/widgets/js/thim-slider.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThimSlider)
/* harmony export */ });
class ThimSlider extends elementorModules.frontend.handlers.SwiperBase {
  getDefaultSettings() {
    return {
      selectors: {
        carousel: '.thim-ekits-sliders',
        gallery: '.thim-ekits-gallery-thumbs',
        slideContent: '.swiper-slide',
        sliderMobile: '.thim-ekits-mobile-sliders'
      }
    };
  }
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    const elements = {
      $swiperContainer: this.$element.find(selectors.carousel),
      $swiperGallery: this.$element.find(selectors.gallery),
      $swiperSliderMobile: this.$element.find(selectors.sliderMobile)
    };
    elements.$slides = elements.$swiperContainer.find(selectors.slideContent);

    // add Slider for mobile with layout default
    // elements.$swiperSliderMobile = elements.$swiperSliderMobile.find(' > div');

    return elements;
  }
  getSwiperOptions() {
    const elementSettings = this.getElementSettings(),
      slidesToShow = +elementSettings.slidesPerView || 3,
      isSingleSlide = 1 === slidesToShow,
      elementorBreakpoints = elementorFrontend.config.breakpoints,
      defaultSlidesToShowMap = {
        small_mobile: 1,
        mobile: 1,
        tablet: isSingleSlide ? 1 : 2
      };
    let swiperOptions = {
      slidesPerView: slidesToShow,
      loop: 'yes' === elementSettings.slider_loop,
      speed: elementSettings.slider_speed,
      //handleElementorBreakpoints: true,
      freeMode: false,
      watchSlidesProgress: true
    };
    if (this.elements.$swiperContainer.hasClass('thim-ekits-testimonial__avatars')) {
      swiperOptions = {
        slidesPerView: 'auto',
        loop: true,
        loopedSlides: +elementSettings.slidesPerView || 3,
        speed: elementSettings.slider_speed,
        handleElementorBreakpoints: true,
        centeredSlides: true,
        slideToClickedSlide: true,
        watchSlidesProgress: true
      };
      if ('yes' === elementSettings.slider_autoplay) {
        swiperOptions.autoplay = {
          delay: elementSettings.autoplay_speed,
          disableOnInteraction: 'yes' === elementSettings.pause_on_interaction
        };
      }
    } else {
      swiperOptions.breakpoints = {};
      let lastBreakpointSlidesToShowValue = slidesToShow,
        screenName;
      Object.keys(elementorBreakpoints).reverse().forEach(breakpointName => {
        if (elementorBreakpoints[breakpointName] == '1660') {
          screenName = 'widescreen';
        } else if (elementorBreakpoints[breakpointName] == '768') {
          screenName = 'tablet';
        } else if (elementorBreakpoints[breakpointName] == '480') {
          screenName = 'mobile';
        } else if (elementorBreakpoints[breakpointName] == '0') {
          screenName = 'mobile';
        }
        const defaultSlidesToShow = defaultSlidesToShowMap[screenName] ? defaultSlidesToShowMap[screenName] : lastBreakpointSlidesToShowValue;
        swiperOptions.breakpoints[elementorBreakpoints[breakpointName]] = {
          slidesPerView: +elementSettings['slidesPerView_' + screenName] || defaultSlidesToShow,
          slidesPerGroup: +elementSettings['slidesPerGroup_' + screenName] || 1,
          spaceBetween: +elementSettings['spaceBetween_' + screenName] || elementSettings.spaceBetween
        };
        lastBreakpointSlidesToShowValue = +elementSettings['slidesPerView_' + screenName] || defaultSlidesToShow;
      });
    }
    if ('yes' === elementSettings.centered_slides) {
      swiperOptions.centeredSlides = true;
    }
    if ('yes' === elementSettings.slider_autoplay) {
      swiperOptions.autoplay = {
        delay: elementSettings.autoplay_speed,
        disableOnInteraction: 'yes' === elementSettings.pause_on_interaction
      };
    }
    if (isSingleSlide) {
      swiperOptions.effect = elementSettings.effect;
      if ('fade' === elementSettings.effect) {
        swiperOptions.fadeEffect = {
          crossFade: true
        };
      }
    } else {
      swiperOptions.slidesPerGroup = +elementSettings.slidesPerGroup || 1;
    }
    if (elementSettings.direction) {
      swiperOptions.handleElementorBreakpoints = true;
    }
    if (elementSettings.spaceBetween) {
      swiperOptions.spaceBetween = elementSettings.spaceBetween;
    }
    if ('yes' === elementSettings.slider_show_arrow) {
      swiperOptions.navigation = {
        prevEl: `.elementor-element-${this.getID()} .thim-slider-nav-prev`,
        nextEl: `.elementor-element-${this.getID()} .thim-slider-nav-next`
      };
    }
    switch (elementSettings.slider_show_pagination) {
      case 'number':
        swiperOptions.pagination = {
          el: `.elementor-element-${this.getID()} .thim-slider-pagination`,
          clickable: true,
          renderBullet(index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          }
        };
        break;
      case 'scrollbar':
        swiperOptions.scrollbar = {
          el: `.elementor-element-${this.getID()} .thim-slider-pagination`,
          hide: true
        };
        break;
      case 'bullets':
      case 'progressbar':
      case 'fraction':
        swiperOptions.pagination = {
          el: `.elementor-element-${this.getID()} .thim-slider-pagination`,
          type: elementSettings.slider_show_pagination,
          clickable: true
        };
        break;
      case 'yes':
        swiperOptions.pagination = {
          el: `.elementor-element-${this.getID()} .thim-slider-pagination`,
          type: 'bullets',
          clickable: true
        };
        break;
    }
    return swiperOptions;
  }
  getSwiperOptionsGallery(carousel) {
    const elementSettings = this.getElementSettings();
    let swiper_opt_gallery = {
      loop: true,
      slidesPerView: 1,
      speed: elementSettings.slider_speed
    };
    swiper_opt_gallery.spaceBetween = 30;
    if (this.elements.$swiperContainer.hasClass('thim-ekits-testimonial__avatars')) {
      swiper_opt_gallery = {
        loop: true,
        // slidesPerView: 1,
        loopedSlides: +elementSettings.slidesPerView || 3,
        speed: elementSettings.slider_speed,
        autoplay: false
      };
    } else {
      swiper_opt_gallery.thumbs = {
        swiper: carousel
      };
      if ('yes' === elementSettings.slider_show_arrow) {
        swiper_opt_gallery.navigation = {
          prevEl: `.elementor-element-${this.getID()} .thim-slider-nav-prev`,
          nextEl: `.elementor-element-${this.getID()} .thim-slider-nav-next`
        };
      }
    }
    if ('yes' === elementSettings.slider_autoplay && !this.elements.$swiperContainer.hasClass('thim-ekits-testimonial__avatars')) {
      swiper_opt_gallery.autoplay = {
        delay: elementSettings.autoplay_speed,
        disableOnInteraction: 'yes' === elementSettings.pause_on_interaction
      };
    }
    return swiper_opt_gallery;
  }
  async onInit(...args) {
    super.onInit(...args);
    const elementSettings = this.getElementSettings();
    if (this.elements.$swiperSliderMobile.length) {
      this.originalHTML = this.elements.$swiperSliderMobile.html();
      if (window.innerWidth <= 768) {
        this.initMobileSwiper();
      }
      this.eventsMobile();
    }
    if (!this.elements.$swiperContainer.length || 2 > this.elements.$slides.length) {
      return;
    }

    // const Swiper = elementorFrontend.utils.swiper;
    const Swiper = elementorFrontend.utils.swiper;
    this.swiper = await new Swiper(this.elements.$swiperContainer, this.getSwiperOptions());

    // Expose the swiper instance in the frontend
    this.elements.$swiperContainer.data('swiper', this.swiper);

    // gallery slider
    if (this.elements.$swiperGallery.length) {
      this.swiper_gallery = await new Swiper(this.elements.$swiperGallery, this.getSwiperOptionsGallery(this.swiper));
      this.elements.$swiperGallery.data('swiper', this.swiper_gallery);
      if (this.elements.$swiperContainer.hasClass('thim-ekits-testimonial__avatars')) {
        this.swiper_gallery.controller.control = this.swiper;
        this.swiper.controller.control = this.swiper_gallery;
        if ('yes' === elementSettings.pause_on_hover) {
          this.$element.on('mouseenter', () => {
            this.swiper.autoplay.stop();
          }).on('mouseleave', () => {
            this.swiper.autoplay.start();
          });
        }
      }
    }
    if ('yes' === elementSettings.pause_on_hover) {
      this.togglePauseOnHover(true);
    }
  }
  updateSwiperOption(propertyName) {
    const elementSettings = this.getElementSettings(),
      newSettingValue = elementSettings[propertyName],
      params = this.swiper.params;

    // Handle special cases where the value to update is not the value that the Swiper library accepts.
    switch (propertyName) {
      case 'autoplay_speed':
        params.autoplay.delay = newSettingValue;
        break;
      case 'speed':
        params.speed = newSettingValue;
        break;
    }
    this.swiper.update();
  }
  getChangeableProperties() {
    return {
      pause_on_hover: 'pauseOnHover',
      autoplay_speed: 'delay',
      speed: 'speed'
    };
  }
  onElementChange(propertyName) {
    const changeableProperties = this.getChangeableProperties();
    if (changeableProperties[propertyName]) {
      // 'pause_on_hover' is implemented by the handler with event listeners, not the Swiper library.
      if ('pause_on_hover' === propertyName) {
        const newSettingValue = this.getElementSettings('pause_on_hover');
        this.togglePauseOnHover('yes' === newSettingValue);
      } else {
        this.updateSwiperOption(propertyName);
      }
    }
  }

  // onEditSettingsChange(propertyName) {
  // 	if ('activeItemIndex' === propertyName) {
  // 		this.swiper.slideToLoop(this.getEditSettings('activeItemIndex') - 1);
  // 	}
  // }
  mobileOptions() {
    const elementSettings = this.getElementSettings();
    let swiperOptions = {
      slidesPerView: 1,
      simulateTouch: true,
      loop: true,
      speed: 500,
      spaceBetween: 20,
      breakpoints: {
        481: {
          slidesPerView: 2
        }
      }
    };

    // if ( elementSettings.mobile_spaceBetween ) {
    // 	swiperOptions.spaceBetween = elementSettings.mobile_spaceBetween;
    // } else {
    // 	swiperOptions.spaceBetween= 20;
    // }

    swiperOptions.pagination = {
      el: `.elementor-element-${this.getID()} .mobile-slider-pagination`,
      type: 'bullets',
      clickable: true
    };
    if ('yes' === elementSettings.slider_mobile_autoplay) {
      swiperOptions.autoplay = {
        delay: elementSettings.autoplay_speed_mobile,
        disableOnInteraction: true
      };
    }
    return swiperOptions;
  }
  initMobileSwiper() {
    const Swiper = elementorFrontend.utils.swiper;
    if (!this.swiper) {
      this.elements.$swiperSliderMobile.addClass('swiper').html(`
				<div class="swiper-wrapper">
					${this.elements.$swiperSliderMobile.children().map((_, el) => `<div class="swiper-slide">${el.outerHTML}</div>`).get().join('')}
				</div>
				<div class="mobile-slider-pagination"></div>
			`);
      // Khởi tạo Swiper
      this.swiper = new Swiper(this.elements.$swiperSliderMobile[0], this.mobileOptions());
    }
  }
  onMobileResize() {
    if (window.innerWidth <= 767) {
      if (!this.swiper) {
        this.initMobileSwiper();
      }
    } else if (this.swiper) {
      // destroy slider
      super.onDestroy(true, true);
      this.swiper = null;
      this.elements.$swiperSliderMobile.removeClass('swiper swiper-initialized swiper-horizontal swiper-pointer-events').html(this.originalHTML);
    }
  }
  eventsMobile() {
    window.addEventListener('resize', this.onMobileResize.bind(this));
  }
}

/***/ }),

/***/ "./src/widgets/js/utils.js":
/*!*********************************!*\
  !*** ./src/widgets/js/utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setVariable: () => (/* binding */ setVariable),
/* harmony export */   thimClick: () => (/* binding */ thimClick),
/* harmony export */   thimEkitsGetCookie: () => (/* binding */ thimEkitsGetCookie),
/* harmony export */   thimEkitsSetCookie: () => (/* binding */ thimEkitsSetCookie)
/* harmony export */ });
function thimEkitsSetCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
function thimEkitsGetCookie(cname) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
function setVariable(element, variable, value) {
  element.style.setProperty(variable, value);
}
function thimClick(element, iconBtn, inner) {
  const wrappers = document.querySelectorAll(element);
  if (!wrappers.length) {
    return;
  }
  wrappers.forEach(wrapper => {
    const clickBtn = wrapper.querySelector(iconBtn);
    const class_open = element.replace('.', '') + '__open';
    const closeElement = wrapper.querySelector(element + '__close');
    const isOpenElement = () => wrapper.classList.contains(class_open);
    const showElement = () => {
      if (!isOpenElement()) {
        wrapper.classList.add(class_open);
      }
    };
    const hideElement = () => {
      if (isOpenElement()) {
        wrapper.classList.remove(class_open);
      }
    };
    const toggleElement = () => {
      if (isOpenElement()) {
        hideElement();
      } else {
        showElement();
      }
    };
    const onKeyDown = e => {
      if (e.keyCode === 27) {
        hideElement();
      }
    };
    if (clickBtn) {
      clickBtn.onclick = function (e) {
        e.preventDefault();
        toggleElement();
      };
    }
    document.addEventListener('click', e => {
      if (!isOpenElement()) {
        return;
      }
      const target = e.target;
      if (target.closest(inner) || target.closest(iconBtn)) {
        return;
      }
      hideElement();
    });
    if (closeElement) {
      closeElement.addEventListener('click', e => {
        e.preventDefault();
        hideElement();
      });
    }
    document.addEventListener('keydown', onKeyDown, false);
  });
}

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["url"];

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = window["jQuery"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/widgets.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _widgets_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./widgets.scss */ "./src/widgets.scss");
/* harmony import */ var _widgets_js_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widgets/js/tabs */ "./src/widgets/js/tabs.js");
/* harmony import */ var _widgets_js_mini_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widgets/js/mini-cart */ "./src/widgets/js/mini-cart.js");
/* harmony import */ var _widgets_js_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./widgets/js/modal */ "./src/widgets/js/modal.js");
/* harmony import */ var _widgets_js_thim_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./widgets/js/thim-slider */ "./src/widgets/js/thim-slider.js");
/* harmony import */ var _widgets_js_countdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./widgets/js/countdown */ "./src/widgets/js/countdown.js");
/* harmony import */ var _widgets_js_archive_course__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./widgets/js/archive-course */ "./src/widgets/js/archive-course.js");
/* harmony import */ var _widgets_js_archive_loadmore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./widgets/js/archive-loadmore */ "./src/widgets/js/archive-loadmore.js");
/* harmony import */ var _widgets_js_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./widgets/js/copy-to-clipboard */ "./src/widgets/js/copy-to-clipboard.js");
/* harmony import */ var _widgets_js_reading_time_post__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./widgets/js/reading-time-post */ "./src/widgets/js/reading-time-post.js");
/* harmony import */ var _widgets_js_motion_effects__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./widgets/js/motion-effects */ "./src/widgets/js/motion-effects.js");
/* harmony import */ var _widgets_js_course_item_section__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./widgets/js/course-item-section */ "./src/widgets/js/course-item-section.js");
/* harmony import */ var _widgets_js_list_block_tabs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./widgets/js/list-block-tabs */ "./src/widgets/js/list-block-tabs.js");
/* harmony import */ var _widgets_js_list_block_tabs__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_widgets_js_list_block_tabs__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _widgets_js_draw_svg_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./widgets/js/draw-svg.js */ "./src/widgets/js/draw-svg.js");




// import thimEkitsGridListPosts from './widgets/js/gridlist';


// When release LP version 4.2.6 along time, we will comment these line.
// It handle for old version of Thim El Kit < 1.1.8


// When release LP version 4.2.6 along time, we will comment these line.



// import thimEkitsTriggerOrderby from './widgets/js/orderby';
// import thimEkitsGridList from './widgets/js/gridlist-course';
// import thimEkitsOfferEnd from './widgets/js/offerend';

/**
 * Motion Effects
 */




if (!window.ThimEkits) {
  window.ThimEkits = {
    ThimSlider: _widgets_js_thim_slider__WEBPACK_IMPORTED_MODULE_4__["default"],
    ThimEkitsTab: _widgets_js_tabs__WEBPACK_IMPORTED_MODULE_1__["default"],
    ThimCountDown: _widgets_js_countdown__WEBPACK_IMPORTED_MODULE_5__["default"]
  };
}
document.addEventListener('DOMContentLoaded', () => {
  (0,_widgets_js_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_widgets_js_mini_cart__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_widgets_js_modal__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_widgets_js_archive_course__WEBPACK_IMPORTED_MODULE_6__["default"])();
  //thimEkitsTriggerOrderby();
  // thimEkitsOfferEnd();
  (0,_widgets_js_reading_time_post__WEBPACK_IMPORTED_MODULE_9__["default"])();
});

// callback in Elementor Editor.
document.body.addEventListener('thimEkitsEditor:init', function () {
  (0,_widgets_js_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_widgets_js_mini_cart__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_widgets_js_modal__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_widgets_js_reading_time_post__WEBPACK_IMPORTED_MODULE_9__["default"])();
});

// callback in Elementor Editor.
document.body.addEventListener('thimEkitsEditor:miniCart', _widgets_js_mini_cart__WEBPACK_IMPORTED_MODULE_2__["default"]);
jQuery(window).on('elementor/frontend/init', () => {
  const addHandler = $element => {
    elementorFrontend.elementsHandler.addHandler(_widgets_js_thim_slider__WEBPACK_IMPORTED_MODULE_4__["default"], {
      $element
    });
    elementorFrontend.elementsHandler.addHandler(_widgets_js_tabs__WEBPACK_IMPORTED_MODULE_1__["default"], {
      $element
    });
  };
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-list-course.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-list-product.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-list-blog.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-post-related.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-course-related.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-testimonial.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-team.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-list-event.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-product-related.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-countdown.default', $element => {
    elementorFrontend.elementsHandler.addHandler(_widgets_js_countdown__WEBPACK_IMPORTED_MODULE_5__["default"], {
      $element
    });
  });
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-search-form.default', _widgets_js_modal__WEBPACK_IMPORTED_MODULE_3__["default"]);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-social-share.default', _widgets_js_copy_to_clipboard__WEBPACK_IMPORTED_MODULE_8__["default"]);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-reading-time-post.default', _widgets_js_reading_time_post__WEBPACK_IMPORTED_MODULE_9__["default"]);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-loop-product-countdown.default', $element => {
    elementorFrontend.elementsHandler.addHandler(_widgets_js_countdown__WEBPACK_IMPORTED_MODULE_5__["default"], {
      $element
    });
  });
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-course-offer-end.default', $element => {
    elementorFrontend.elementsHandler.addHandler(_widgets_js_countdown__WEBPACK_IMPORTED_MODULE_5__["default"], {
      $element
    });
  });

  //
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-tab.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-slider.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-course-item-section.default', $element => {
    (0,_widgets_js_course_item_section__WEBPACK_IMPORTED_MODULE_11__.getOffsetPopupHeaderHeight)($element[0]);
    (0,_widgets_js_course_item_section__WEBPACK_IMPORTED_MODULE_11__.getOffsetPopupFooterHeight)($element[0]);
    (0,_widgets_js_course_item_section__WEBPACK_IMPORTED_MODULE_11__.stickySidebar)($element[0]);

    // when window resize, get height class ekit-popup-header and set variable.
    window.addEventListener('resize', () => {
      (0,_widgets_js_course_item_section__WEBPACK_IMPORTED_MODULE_11__.getOffsetPopupHeaderHeight)($element[0]);
      (0,_widgets_js_course_item_section__WEBPACK_IMPORTED_MODULE_11__.getOffsetPopupFooterHeight)($element[0]);
    });
  });
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-archive-course.default', $element => {
    (0,_widgets_js_archive_loadmore__WEBPACK_IMPORTED_MODULE_7__["default"])('.thim-ekits-archive-course', '.thim-ekits-course__inner');
  });
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-archive-post.default', $element => {
    (0,_widgets_js_archive_loadmore__WEBPACK_IMPORTED_MODULE_7__["default"])('.thim-ekit-archive-post', '.thim-ekit-archive-post__inner');
  });
  // Icon box draw svg
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-icon-box.default', _widgets_js_draw_svg_js__WEBPACK_IMPORTED_MODULE_13__["default"]);
  elementorFrontend.hooks.addAction('frontend/element_ready/svg-draw.default', _widgets_js_draw_svg_js__WEBPACK_IMPORTED_MODULE_13__["default"]);

  // Mouse effects.
  // Apply for all widgets.
  elementorFrontend.elementsHandler.attachHandler('global', _widgets_js_motion_effects__WEBPACK_IMPORTED_MODULE_10__["default"], null);
});
})();

/******/ })()
;
//# sourceMappingURL=widgets.js.map