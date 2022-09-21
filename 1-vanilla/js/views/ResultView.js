import View from './View.js';

const tag = '[Resultview]';

const ResultView = Object.create(View);

ResultView.messages = {
    NO_RESULT: '검색결과가 없습니다.',
};

ResultView.setup = function (el) {
    this.init(el);
};

ResultView.render = function (data = []) {
    // 받아온 데이터 여기서 render
    console.log(tag, 'render()', data);
    this.el.innerHTML = data.length ? this.getSearchResultsHtml(data) : this.messages.NO_RESULT;
    this.show();
};
ResultView.getSearchResultsHtml = function (data) {
    // debugger; // 와 이런게 있구나,,,, 메서드를 멈추는거라고함
    // 실제 api 작동시켜보니 debugger 를 타고 클라이언트에서 작동을 막았음
    return (
        data.reduce((html, item) => {
            html += this.getSearchItemHtml(item);
            return html;
        }, '<ul>') + '</ul>'
    ); // 맨날 += 안에 '<div> 같이 붙여넣엇엇는데... 이런 방법이 잇구나
};
ResultView.getSearchItemHtml = function (item) {
    return `<li><img src="${item.image}"><p>${item.name}</p></li>`;
};
ResultView.showResetResult = function (show = true) {
    this.style.display = show ? 'block' : 'none';
};

export default ResultView;
