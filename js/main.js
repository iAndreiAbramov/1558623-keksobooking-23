import { generateAdsHTML } from './modules/generate-ads-html.js';
import { disableForms, enableForms } from './modules/init.js';
import { replaceSubmitHandler } from './modules/forms.js';


window.addEventListener('DOMContentLoaded', () => {
  generateAdsHTML(3);
  replaceSubmitHandler('.ad-form');

  // disableForms();
  // Для проверки работоспособности функции включения форм
  // временно предусмотрена их активация при клике в область над картой
  // document.querySelector('.promo').addEventListener('click', enableForms);
});
