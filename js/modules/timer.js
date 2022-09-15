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
export default timer;