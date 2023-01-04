// 프로미스를 반환하는 API 호출 함수
function fetchItems() {
    return new Promise(function (resolve, reject) {
        var items = [1, 2, 3];
        resolve(items);
    });
}
async function logItems() {
    // await 의 대상은 항상 프로미스 반환 함수가 됨
    var resultItems = await fetchItems();
    console.log(resultItems); // [1,2,3]
}
// --------------------------------------------------------------------------------

function fetchUser() {
    var url = 'https://jsonplaceholder.typicode.com/users/1';
    return fetch(url).then(function (response) {
        console.log(response);
        return response.json(); // JSON 데이터를 javascript 객체로 변환해줌
    });
}
function fetchTodo() {
    var url = 'https://jsonplaceholder.typicode.com/todos/1';
    return fetch(url).then(function (response) {
        console.log(response);
        return response.json(); // JSON 데이터를 javascript 객체로 변환해줌
    });
}

// 1. fetchUser() - 사용자 정보 호출
// 2. 받아온 사용자 아이디가 1 이면 할 일 정보 "호출"
// 3. 받아온 할 일 정보의 제목을 콘솔에 "출력"

/*
async function logTodoTitle() {
    var user = await fetchUser(); // 사용자 정보 호출 함           // 1.
    if (user.id === 1) {
        // 받아온 사용자 아이디 === 1
        var todo = await fetchTodo(); //  ㄴ 할 일 정보 호출       // 2.
        console.log(todo.title); // 3.
        console.log(' :)'); // 3.
    }
}
*/

async function logTodoTitle() {
    // async
    try {
        // try
        var user = await fetchUser();
        if (user.id === 1) {
            var todo = await fetchTodo();
            // console.log(todo);
            document.querySelector('pre').textContent = `${todo.title}`;
        }
    } catch (error) {
        // console.log(error);
    }
}
logTodoTitle();

// --------------------------------------------------------------------------------
/*
    ★ 변수 특징 정리

    - 선언 단계: 변수명을 등록하여 자바스크립트 엔진에 변수의 존재를 알린다.
    - 초기화 단계: 값을 저장하기 위한 메모리 공간을 확보하고 암묵적으로 undefined를 할당해 초기화한다.
*/

// [★ let]
// console.log(letName);    // output: Uncaught ReferenceError: name is not defined
// let은 호이스팅은 되지만 선언과 초기화 단계가 따로 진행됨
// 선언단계 ~ 초기화 단계 시작 지점까지 변수를 참조할수 없음 (존재하지만 초기화도 되지 않은 상태이므로 할당받은 값을 찾을수 X)

// 1. 새로운 값 가질수 있음
// 2. 재할당 가능함. 변경 가능한 변수.
// 3. but 블럭범위에서만 사용이 가능함.

let letName;
// console.log(letName); // undefined

// [★ const]
//   ㄴ 엘리먼트를 받아올때 사용하는것이 좋다고 함.
//      ㄴ 내 생각에는 구조를 짤 때에, 불변적이어야 한다고 생각되는 변수를 const에 담는게 좋을 듯.
//      ㄴ 아니면 오브젝트 구조가 더이상 변함이 없어야 할 때...? 근데 그럴 때가 있나 싶음.... 아직 많이 안짜봐서 그런가
// const의 "원시값"은 재할당이 불가
// const firstName = 'constName';
// firstName = 'changeConstName'; // ★★★★★★★재할당 불가 // 오류 뜸

// console.log(firstName); //Uncaught ReferenceError: Cannot access 'firstName' before initialization

// let 과 const 는 호이스팅(스크립트를 최초로 읽을때 변수부터 읽어들여-선언단계-, 블럭 최상단에서 변수를 불러도 변수가 불러와지는것) 문제를
// 해결하기 위해서 사용된다고 했지만 아직 더 짜보고 경험해야 어느 때에 쓰이는지 알 수 있을듯....

// 객체 안 밸류값의 재할당은 가능함.
const firstName = {
    eng: 'song',
};
// console.log(firstName);
firstName.eng = 'TEST const value change';
// firstName.name = 'song';
console.log(firstName);
// --------------------------------------------------------------------------------

// ES5
const myArray = ['진수', '영철', '영희', 5];
let arr1 = myArray.map(function (item) {
    return (item += 'ES5');
});
console.log(arr1);

// ES6
let arr2 = myArray.map((item) => item + 'ES6');
console.log(arr2);

// --------------------------------------------------------------------------------

// ES6
const contacts = {
    familyName: '이',
    name: '영희',
    age: 22,
};

// 오브젝트에 정의한 key 값과 동일한 변수를 할당한 후, 오브젝트를 넣어주어야 함
// 속성 이름과 동일하지 않은 변수 할당 시 undefined 반환
let { familyName, name: otherName, age } = contacts;
// const arr = ['광희', '지수', '영철', 20];
const arr__1 = ['광희1', '지수1', '영철1', 20];
const arr__2 = ['광희2', '지수2', '영철2', 20];
const arr__3 = ['광희3', '지수3', '영철3', 20];
const input = document.querySelector('#test_01');
let arr = [];
let idKey = input.value;
input.addEventListener('keyup', (ev) => {
    if (ev.keyCode === 13) {
        idKey = input.value;

        if (idKey == 1) arr = arr__1;
        else if (idKey == 2) arr = arr__2;
        else if (idKey == 3) arr = arr__3;

        let [val1, val2, val3] = arr;
    }
});

// 수정사항 만들기
