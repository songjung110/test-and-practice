import View from './View.js';
// View 파일에서 "기능" 불러옴

const tag = '[FormView]';
// 파일마다 태그네임같은거 왜 붙이는거지...? 무슨 기능하는 파일인지 알기 쉬우라고?
// 1. MVC 별로 폴더 구분 해주신건 알거같음! (이것만 알거같음!)
// 2. 각 파일마다 변수명이 tag 공통인걸 보아
//    필요할 때에 어느 파일에서 불러와진건지 알기 쉬우라고일수도잇지않을가
//    ,,,,,,,,,,,,,,,,,,,,,,maybe for the debugging,,,,,,,,,,,,,,,,,,,,,,
// 강의에서 디버깅을 위한거라고 말해주심 추측한게 맞아서 기분좋음

const FormView = Object.create(View); // 지정된 프로토타입 객체 및 속성을 갖는 새 객체를 만듦

// setup메서드 - element 주입 받아서 내부적으로 속성을 갖게 함
FormView.setup = function (el) {
    this.init(el); // MainController 에서 넘겨준 form 태그를 init 함수를 이용해 this 전환되게 함
    this.inputEl = el.querySelector('[type=text]');
    this.resetEl = el.querySelector('[type=reset]');
    this.showResetBtn(false);
    this.bindEvents();
    return this;
};
FormView.showResetBtn = function (show = true) {
    this.resetEl.style.display = show ? 'block' : 'none';
};
FormView.bindEvents = function () {
    this.inputEl.addEventListener('keyup', (e) => this.onKeyup(e));
    this.resetEl.addEventListener('click', (e) => this.onClickReset(e));
};
FormView.onKeyup = function (e) {
    const enter = 13;
    this.showResetBtn(this.inputEl.value.length); // length 0 값 자체가 false 로 계산되는 js라서 이렇게 처리가 가능한듯!!
    if (!this.inputEl.value.length) this.emit('@reset');
    if (e.keyCode !== enter) return;
    // 여기까지 따라 쓰면서 ..................  form에 들어가야할 "기능"은 전부 FormView.js 안에서만 쓰여야만함
    // [추측임]
    // 1. 디버깅을 편하게 하기 위해?
    // 2. 코드의 깔끔함을 위해
    // 3. 유지보수 할 때에도 편할거같음 form 을 안쓴다는 조건 하에 해당하는 import만 주석처리 하면 되니까 ????

    this.emit('@submit', { input: this.inputEl.value }); // 메인 컨트롤러에 위임
    /*
        ★★ 이벤트 구현 시 "기능"이 "해당 "엘리먼트 (또는 컴포넌트)" 에서 
             직접 작용하는 기능인지 재고 해본 후 기능을 구현해야함
             위와같이 enter keyup이 이루어졌을때 "검색 영역이 열리는 기능"은 
             FormView.js 에서의 역할이 아니므로 enter keyup의 작동만 
             MainController.js 로 보내주면 된다.
     */
};
FormView.onClickReset = function () {
    this.emit('@reset');
    this.showResetBtn(false);
};

export default FormView;
