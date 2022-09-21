import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import SearchModel from '../models/SearchModel.js';
import TabView from '../views/TabView.js';

const tag = '[MainController]';

export default {
    // export 안에 감싸야지 import 한 파일에서 불러와짐
    init() {
        FormView.setup(document.querySelector('form')) // >  FormView.js 에서 setup
            .on('@submit', (e) => this.onSubmit(e.detail.input)) // 1. FormView 엔터 발생 시 실행
            .on('@reset', (e) => this.onResetForm());

        TabView.setup(document.querySelector('#tabs'));
        ResultView.setup(document.querySelector('#search-result'));

        this.selectedTab = '추천 검색어';
        TabView.setActiveTabs(this.selectedTab);
    },
    search(query) {
        // 3. 실행 시
        console.log(tag, 'search()', query);
        // search api
        // 실제 search api를 통해 데이터를 얻어옴
        SearchModel.list(query).then((data) => {
            this.onSearchResult(data); // 그 데이터를 받아서 함수 실행
        });
        // this.onSearchResult([]); // 그 데이터를 받아서 함수 실행
    },
    onSubmit(input) {
        //2.실행 시
        console.log(tag, 'onsubmit()', input);
        this.search(input); // 2-1. 검색 요청을 위해 search 실행
    },
    onResetForm() {
        console.log(tag, 'onResetForm()');
        ResultView.hide(); // form의 reset 버튼 클릭시 검색결과 리스트 끔.
    },
    onSearchResult(data) {
        // 4. 실행
        ResultView.render(data); // 4-1 . 데이터를 받아서 ResultView의 render 함수로 넘겨줌
    },
};
