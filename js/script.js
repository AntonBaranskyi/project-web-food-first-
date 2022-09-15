/*jshint esversion: 11 */

import tabs from './modules/tabs';
import calc from './modules/calc';
import menuCard from './modules/menuCard';
import timer from './modules/timer';
import slider from'./modules/slider';
import sendForm from './modules/sendForm';
import moduls from './modules/moduls';

tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
calc();
menuCard();
timer('.timer','2022-10-15');
slider();
sendForm();
moduls('.btn-modal','.modal');