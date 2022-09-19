import FormView from '../views/FormView.js';
const tag = '[MainController]';

export default {
    // export 안에 감싸야지 import 한 파일에서 불러와짐
    init() {
        // console.log(tag, 'init()'); //FormView.js 에 써놓은 tag명에 대한 추측이 이게 맞나
        FormView.setup(document.querySelector('form')) // >  FormView.js 에서 setup
            .on('@submit', (e) => this.onSubmit(e.detail.input));
    },
    onsubmit(input) {
        console.log(tag, 'onsubmit()', input);
    },
};
