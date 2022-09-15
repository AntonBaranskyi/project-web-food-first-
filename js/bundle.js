/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*jshint esversion: 11 */

function calc() {
    let result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('choose-sex')) {
        sex = localStorage.getItem('choose-sex');
    } else {
        sex = 'female';
        localStorage.setItem('choose-sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }


    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }


    function calcData() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '___';
        } else if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio));
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio));
        }
    }
    calcData();

    function caclStaticData(parentSelector, activeClass) {
        let elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                let target = e.target;

                if (target.getAttribute('data-ratio')) {
                    ratio = +target.getAttribute('data-ratio');
                    localStorage.setItem('choose-ratio', +target.getAttribute('data-ratio'));
                } else if (target.getAttribute('id')) {
                    sex = target.getAttribute('id');
                    localStorage.setItem('choose-sex', target.getAttribute('id'));
                }
                console.log(ratio, sex);
                elements.forEach(item => item.classList.remove(activeClass));
                target.classList.add(activeClass);
            });
            calcData();
        });
    }
    caclStaticData('#gender', 'calculating__choose-item_active');
    caclStaticData('.calculating__choose_big', 'calculating__choose-item_active');

    function calcDynamicData(element) {
        let input = document.querySelector(element);

        input.addEventListener('input', () => {
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcData();
        });
    }
    calcDynamicData('#height');
    calcDynamicData('#weight');
    calcDynamicData('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/menuCard.js":
/*!********************************!*\
  !*** ./js/modules/menuCard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/*jshint esversion: 11 */

function menuCard() {
    
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourse)('http://localhost:3000/menu')
        .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
        }) => {
            let element = document.createElement('div');
            element.classList.add('menu__item');

            element.innerHTML = `<img src="${img}" alt="${altimg}">
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${price}</span> грн/день</div>
            </div>
            `;
            document.querySelector('.menu .container').append(element);
        });
    }

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuCard);

/***/ }),

/***/ "./js/modules/moduls.js":
/*!******************************!*\
  !*** ./js/modules/moduls.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModalContent": () => (/* binding */ closeModalContent),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModalContent": () => (/* binding */ showModalContent)
/* harmony export */ });
/*jshint esversion: 11 */
function showModalContent(modalSelector) {
    let modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // прибираємо скрол при відкритті модул 
}

function closeModalContent(modalSelector) {
    let modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';

}
function modal(triggerSelector,modalSelector) {
    //Modal window

    const buttonsTrigger = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);

    buttonsTrigger.forEach(item => {
        item.addEventListener('click',()=> showModalContent(modalSelector));
    });




    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalWindow.classList.contains('show')) { // якщо користувач нажав Escape - вихід з модального вікна 
            closeModalContent(modalSelector);
        }
    });

    modalWindow.addEventListener('click', (event) => {
        let target = event.target;

        if (target === modalWindow || target.classList.contains('modal__close')) {
            closeModalContent(modalSelector);
        }

    });

    showModalContent(modalSelector);
    closeModalContent();

    setTimeout(showModalContent, 50000);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/sendForm.js":
/*!********************************!*\
  !*** ./js/modules/sendForm.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _moduls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moduls */ "./js/modules/moduls.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/*jshint esversion: 11 */


function forms (){
    // send data from form to server

let forms = document.querySelectorAll('form');

let messages = {
    'sucsec': 'Операція пройшла успішно',
    'fail': 'Щось пішло не так',
    'loading': 'Триває завантаження...'
};



function sendFormData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let formData = new FormData(form);

        let json = JSON.stringify(Object.fromEntries(formData.entries()));

        let obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });

        (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                saySmthToUser(messages.sucsec);
                console.log(data);
            }).catch(() => {
                saySmthToUser(messages.fail);
            }).finally(() => {
                form.reset();
            });
    });
}
forms.forEach(item => {
    sendFormData(item);
});

function saySmthToUser(message) {
    let oldDialog = document.querySelector('.modal__dialog');
    oldDialog.classList.add('hide');

    let newDialog = document.createElement('div');
    newDialog.classList.add('modal__dialog');
    document.querySelector('.modal').append(newDialog);

    newDialog.innerHTML = `
    <div class="modal__content">
    <div data-close class="modal__close">×</div>
                    <div class="modal__title">${message}</div>
     </div>`;


    setTimeout(() => {
        newDialog.classList.add('hide');

        oldDialog.classList.remove('hide');
        oldDialog.classList.add('show');
        (0,_moduls__WEBPACK_IMPORTED_MODULE_0__.showModalContent)('.modal');
    }, 4000);
}

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*jshint esversion: 11 */

function slider() {
    let btnPrev = document.querySelector('.offer__slider-prev'),
        btnNext = document.querySelector('.offer__slider-next'),
        slides = document.querySelectorAll('.offer__slide'),
        index = 1,
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slider = document.querySelector('.offer__slider'),
        dots = [];

    showSlide(1);

    function showSlide(n) {
        if (n > slides.length) {
            index = 1;
        }
        if (n < 1) {
            index = slides.length;
        }

        slides.forEach(slide => {
            slide.classList.add('hide');
        });
        slides[index - 1].classList.add('show');
        slides[index - 1].classList.remove('hide');

        if (current.textContent < 10) {
            current.textContent = `0${index}`;
        } else {
            total.textContent = `${index}`;
        }
    }

    function plussSlides(n) {
        showSlide(index += n);
    }
    btnPrev.addEventListener('click', () => {
        plussSlides(-1);

        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[index - 1].style.opacity = 1;
    });

    btnNext.addEventListener('click', () => {
        plussSlides(1);

        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[index - 1].style.opacity = 1;
    });

    if (total.textContent < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = `${slides.length}`;
    }


    slider.style.position = `relative`;
    let nav = document.createElement('ul');
    nav.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(nav);

    for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        nav.append(dot);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.push(dot);
    }

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*jshint esversion: 11 */
function tabs(tabsSelector,tabsContentSelector,TabsParentSelector,activeClass) {
    // Tabs
    let tab = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(TabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tab.forEach(item => {
            item.classList.remove(activeClass); // прибираємо клас активності
        });
    }

    function showTabContent(i = 1) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tab[i].classList.add(activeClass); // добавляємо клас активності
    }

    hideTabContent();
    showTabContent();
    // делигирование событий 
    tabsParent.addEventListener('click', event => {
        let target = event.target; // отримуємо елемент на який клікнули

        if (target && target.classList.contains(tabsSelector.slice(1))) { // перевіряємо чи клікнули саме на таб
            tab.forEach((item, i) => {
                if (target == item) { // якщо елемент кліку == елементу перебору табів
                    hideTabContent(); // приховуємо всі інші таби
                    showTabContent(i); //показуємо той на який клікнули (або який перебирається)
                }
            });
        }
    });


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*jshint esversion: 11 */
//Timer

function timer(id, deadline){

    function getTimeRemaning(endTime) {
        let days, hours, minutes, seconds;
        let t = Date.parse(endTime) - Date.parse(new Date()); //рахуємо дедлайн в мс 
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24) % 24); // к-сть мс в с множимо на к-сть сек в хвилині і тд
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor(t / (1000 * 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }
    
    
        return { // результат ф-ї об'єкт 
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    
    function getZero(num) { // ф-я яка добавляє 0 до чисел 
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    
    function setClock(selector, endTime) {
        // дістаємо всі необхідні змінні зі сторніки
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
    
    
        let update = setInterval(updateClock, 1000); // запускаємо інтервал , який оновлює ф-ї кожгу сек
    
        updateClock(); // викликаєм ф-ю , щоб прибрати мигання на сторінці
    
    
        function updateClock() {
    
            let t = getTimeRemaning(endTime); // результат першої ф-ї
    
            // запис данних з ф-ї на сторінку
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
    
            if (t.total <= 0) { // якщо таймер закінчився - зупиняєм інтервал
                clearInterval(update);
            }
        }
    }
    setClock(id, deadline);
    
    
    //ставимо дедлайн
    
    //пишемо ф-ю яка рахує різницю та переводить данні (повертає об'єкт)
    
    //пешемо ф-ю яка дістає елементи та обновлює часи
    
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResourse": () => (/* binding */ getResourse),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
/*jshint esversion: 11 */
let postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

let getResourse = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url},status:${res.status}`);
    }

    return await res.json();
};




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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_menuCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/menuCard */ "./js/modules/menuCard.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_sendForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/sendForm */ "./js/modules/sendForm.js");
/* harmony import */ var _modules_moduls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/moduls */ "./js/modules/moduls.js");
/*jshint esversion: 11 */









(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
(0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_modules_menuCard__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"])('.timer','2022-10-15');
(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])();
(0,_modules_sendForm__WEBPACK_IMPORTED_MODULE_5__["default"])();
(0,_modules_moduls__WEBPACK_IMPORTED_MODULE_6__["default"])('.btn-modal','.modal');
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map