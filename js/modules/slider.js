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
export default slider;