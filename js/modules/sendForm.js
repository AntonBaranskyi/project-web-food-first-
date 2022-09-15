/*jshint esversion: 11 */
import {closeModalContent,showModalContent} from './moduls';
import {postData} from '../services/services';
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

        postData('http://localhost:3000/requests', json)
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
        showModalContent('.modal');
    }, 4000);
}

}
export default forms;
