import {generateAdsHTML} from './modules/generate-ads-html.js';
import {disableForms, enableForms} from './modules/form.js';


window.addEventListener('DOMContentLoaded', () => {
  generateAdsHTML(3);

  disableForms();
  // Для проверки работоспособности функции включения форм
  // временно предусмотрена их активация при клике в произвольном месте
  document.body.addEventListener('click', enableForms);
});
