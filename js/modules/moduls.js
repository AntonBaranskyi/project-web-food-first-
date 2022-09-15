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
export default modal;
export {showModalContent};
export{closeModalContent};