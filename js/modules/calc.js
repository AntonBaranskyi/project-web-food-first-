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
export default calc;