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

export default tabs;