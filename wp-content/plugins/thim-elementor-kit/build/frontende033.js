/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend.scss":
/*!***************************!*\
  !*** ./src/frontend.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _frontend_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./frontend.scss */ "./src/frontend.scss");
/* eslint-disable @wordpress/no-unused-vars-before-return */

function thimEkitsHeaderSticky() {
  const stickys = document.querySelectorAll('.thim-ekits__sticky');
  stickys.forEach(sticky => {
    const headerHeight = sticky.offsetHeight + sticky.offsetTop;
    const parent = sticky.parentNode;
    const adminbar = document.querySelector('#wpadminbar');
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > parent.offsetTop) {
        sticky.classList.add('thim-ekits__sticky--is-sticky');
        if (adminbar) {
          sticky.classList.add('thim-ekits__sticky--adminbar');
        }
        parent.classList.add('thim-ekits--is-sticky');
        parent.style.height = headerHeight + 'px';
      } else {
        sticky.classList.remove('thim-ekits__sticky--is-sticky', 'thim-ekits__sticky--adminbar');
        parent.classList.remove('thim-ekits--is-sticky');
        parent.style.height = 'auto';
      }
    });
  });
}
function thimEkitsMenuHover() {
  const menuItems = document.querySelectorAll('.thim-ekits-menu__nav li.menu-item');
  menuItems.forEach(menuItem => {
    menuItem.addEventListener('mouseover', () => menuItem.classList.add('thim-ekits-menu__is-hover'));
    menuItem.addEventListener('mouseout', () => menuItem.classList.remove('thim-ekits-menu__is-hover'));
  });
}
function thimEkitsMenuOffset() {
  const menuItems = document.querySelectorAll('.thim-ekits-menu__content');
  const megaMenuOffset = li => {
    const winWidth = window.innerWidth,
      contentWidth = li.offsetWidth >= winWidth ? winWidth : li.offsetWidth,
      rect = li.parentNode.getBoundingClientRect(),
      isLeft = li.classList.contains('thim-ekits-menu__content--left'),
      isRight = li.classList.contains('thim-ekits-menu__content--right'),
      isCenter = li.classList.contains('thim-ekits-menu__content--center'),
      isContainer = li.classList.contains('thim-ekits-menu__content--container');
    if (!contentWidth) {
      return;
    }
    let toLeft = contentWidth - rect.right;
    let toRight = rect.left + contentWidth - winWidth;
    if (li.offsetWidth >= winWidth) {
      li.style.width = contentWidth + 'px';
      li.style.minWidth = contentWidth + 'px';
    }
    if (isContainer && li.offsetWidth < winWidth && li.dataset.container) {
      const containerEle = document.querySelector(li.dataset.container);
      if (containerEle) {
        toRight = toRight + (winWidth - containerEle.offsetWidth) / 2;
        toLeft = toLeft + (winWidth - containerEle.offsetWidth) / 2;
      }
    }
    if (isCenter) {
      const toLeft = (contentWidth + rect.width) / 2 - rect.right;
      const toRight = rect.left + (contentWidth + rect.width) / 2 - winWidth;
      if (document.body.classList.contains('rtl') && toLeft > 0) {
        li.style.marginLeft = toLeft + 'px';
      } else if (toRight > 0) {
        li.style.marginLeft = -toRight + 'px';
      }
    } else if (isLeft) {
      if (toLeft > 0) {
        li.style.right = -toLeft + 'px';
      } else {
        li.style.right = '0';
      }
    } else if (isRight) {
      if (toRight > 0) {
        li.style.left = -toRight + 'px';
      } else {
        li.style.left = '0';
      }
    }
  };
  menuItems.forEach(menuItem => megaMenuOffset(menuItem));
}
function thimEkitsMenuCanvas() {
  /** Add icon arrow down in menu has dropdown */
  // const menuDropdowns = document.querySelectorAll( '.thim-ekits-menu .thim-ekits-menu__has-dropdown, .thim-ekits-menu__mega-menu' );

  // menuDropdowns.forEach( ( menuDropdown ) => {
  // 	const dropdownIcon = menuDropdown.querySelector( '.thim-ekits-menu__dropdown-icon' );

  // 	dropdownIcon || menuDropdown.insertAdjacentHTML( 'beforeend', '<span class="thim-ekits-menu__dropdown-icon"></span>' );

  const menuBtns = document.querySelectorAll('.thim-ekits-menu__mobile');
  menuBtns.forEach(menuBtn => {
    const menuContainer = menuBtn.parentNode.querySelector('.thim-ekits-menu__container');
    const overlay = menuContainer.parentNode.querySelector('.thim-ekits-menu__mobile__overlay');
    const isOpened = menuBtn.parentNode.classList.contains('thim-ekits-menu--mobile-open');
    const openPopup = () => {
      menuBtn.parentNode.classList.add('thim-ekits-menu--mobile-open');
    };
    const closePopup = () => {
      menuBtn.parentNode.classList.remove('thim-ekits-menu--mobile-open');
    };
    if (!overlay) {
      menuContainer.insertAdjacentHTML('beforebegin', '<div class="thim-ekits-menu__mobile__overlay"></div>');
      const overlayEle = menuContainer.parentNode.querySelector('.thim-ekits-menu__mobile__overlay');
      overlayEle && overlayEle.addEventListener('click', closePopup);
    } else {
      overlay.addEventListener('click', closePopup);
    }
    const closeBtn = menuContainer.querySelector('.thim-ekits-menu__mobile__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closePopup);
    }
    // if ( ! closeBtn ) {
    // 	menuContainer.insertAdjacentHTML( 'beforeend', `<button class="thim-ekits-menu__mobile__close"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>` );
    //
    // 	const closeBtnEle = menuContainer.querySelector( '.thim-ekits-menu__mobile__close' );
    // 	closeBtnEle && closeBtnEle.addEventListener( 'click', closePopup );
    // } else {
    closeBtn.addEventListener('click', closePopup);
    // }

    menuBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      if (isOpened) {
        closePopup();
      } else {
        openPopup();
      }
    });
  });
  const dropdownIcon = document.querySelectorAll('.thim-ekits-menu__icon');
  const iconMenuBack = document.querySelector('.thim-ekits-menu__icon-menu-back');
  dropdownIcon.forEach(iconItem => {
    iconItem.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const isOpenedSubmenu = iconItem.parentNode.classList.contains('thim-ekits-menu__is-hover');
      const openSubmenu = () => {
        iconItem.parentNode.classList.add('thim-ekits-menu__is-hover');
      };
      const closeSubmenu = () => {
        iconItem.parentNode.classList.remove('thim-ekits-menu__is-hover');
      };
      if (isOpenedSubmenu) {
        closeSubmenu();
      } else {
        openSubmenu();
        if (iconMenuBack) {
          iconMenuBack.classList.add('show-icon');
        }
      }
    });
  });
  if (iconMenuBack) {
    iconMenuBack.addEventListener('click', e => {
      e.stopPropagation();
      const openSubmenus = document.querySelectorAll('.thim-ekits-menu__is-hover');
      if (openSubmenus.length > 0) {
        // Remove the thim-ekits-menu__is-hover class from the last (deepest) element
        openSubmenus[openSubmenus.length - 1].classList.remove('thim-ekits-menu__is-hover');
      }
      // Check if there are any elements with the class open-submenu left
      if (openSubmenus.length === 1) {
        // Remove the show-icon class from the icon-remove element
        iconMenuBack.classList.remove('show-icon');
      }
    });
  }
}
function thimEkitsScrollTop() {
  const scrollTop = document.getElementById('back-to-top-kits');
  const circle_progress = document.querySelector('.scroll-circle-progress');
  if (scrollTop) {
    if (circle_progress) {
      var progressPath = document.querySelector('.scroll-circle-progress path');
      var pathLength = progressPath.getTotalLength();
      progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
      progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
      progressPath.style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
      var updateProgress = function () {
        var scroll = jQuery(window).scrollTop();
        var height = jQuery(document).height() - jQuery(window).height();
        var progress = pathLength - scroll * pathLength / height;
        progressPath.style.strokeDashoffset = progress;
      };
      updateProgress();
      jQuery(window).scroll(updateProgress);
    }
    scrollTop.classList.add('hidden');
    jQuery(window).scroll(function () {
      if (jQuery(this).scrollTop() > 400) {
        scrollTop.classList.remove('hidden');
      } else {
        scrollTop.classList.add('hidden');
      }
    });
    scrollTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
function thimEkitsProgressTracker() {
  window.addEventListener('scroll', () => {
    const progressBar = document.querySelector('.thim-ekits-scrollProgressBar');
    const scrollPercentageText = document.querySelector('.thim-ekits-scrollPercentage');
    if (progressBar) {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolledPercentage = window.scrollY / scrollableHeight * 100;
      progressBar.style.width = scrolledPercentage + '%';
      if (scrollPercentageText) {
        scrollPercentageText.textContent = `${Math.round(scrolledPercentage)}%`;
      }
    }
  });
}
document.addEventListener('DOMContentLoaded', () => {
  // thimEkitsMenuHover();
  thimEkitsMenuCanvas();
  thimEkitsHeaderSticky();
  thimEkitsScrollTop();
  thimEkitsMenuOffset();
  thimEkitsProgressTracker();
  window.addEventListener('resize', () => {
    // thimEkitsMenuCanvas();
    thimEkitsMenuOffset();
  });
});
})();

/******/ })()
;
//# sourceMappingURL=frontend.js.map