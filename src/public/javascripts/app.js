import MainService from './mainService.js';
import '../stylesheets/style.scss';

window.addEventListener('DOMContentLoaded', () => {
  const targetEl = document.querySelector('#root');

  const service = new MainService({ targetEl });
  const datalist = [1, 2, 3, 4, [5, 6, [7]]];
  const subHtml = service.init(datalist);

  targetEl.innerHTML += `datalist is ${subHtml}`;
});
