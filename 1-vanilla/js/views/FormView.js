import View from './View.js';
// View 파일에서 "기능" 불러옴

const tag = '[FormView]';
// 파일마다 태그네임같은거 왜 붙이는거지...? 무슨 기능하는 파일인지 알기 쉬우라고?
// 1. MVC 별로 폴더 구분 해주신건 알거같음! (이것만 알거같음!)
// 2. 각 파일마다 변수명이 tag 공통인걸 보아
//    필요할 때에 어느 파일에서 불러와진건지 알기 쉬우라고일수도잇지않을가
//    ,,,,,,,,,,,,,,,,,,,,,,maybe for the debugging,,,,,,,,,,,,,,,,,,,,,,

const FormView = Object.create(View); // 지정된 프로토타입 객체 및 속성을 갖는 새 객체를 만듦
console.log(FormView);

FormView.setup = function (el) {
    this.init(el); // MainController 에서 넘겨준 form 태그를 여기서 사용함
    this.inputEl = el.querySelector('[type=text]');
    this.resetEl = el.querySelector('[type=reset]');
    this.showResetBtn();
};

FormView.showResetBtn = function (show = false) {
    this.resetEl.style.display = show ? 'block' : 'none';
};

export default FormView;
