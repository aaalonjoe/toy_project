
//============== 함수, 전역변수 정의부 ===================//

//게임 데이터 변수 (정답, 선택한숫자, 최소값, 최대값)
const gameDatas = {
    secret: Math.floor(Math.random() * 100) + 1, //실제 정답
    min: 1,
    max: 100,
    answer: null //사용자가 클릭한 아이콘 숫자
};


//숫자 아이콘 생성 함수
function makeIcons() {

    const $numbers = document.getElementById('numbers');

    for (let n = 1; n <= 100; n++) {
        const $div = document.createElement('div');
        $div.classList.add('icon');
        $div.textContent = n;
        $numbers.appendChild($div);
    }

}

// 범위 밖의 아이콘 삭제 처리
function clearIcons(target, isUp) {
    const $numbers = document.getElementById('numbers');

    let $delTarget = target;

    while ($delTarget) {          // 지워야할 타겟이 존재할 동안
        let $nextTarget = 
            isUp ? 
                $delTarget.previousElementSibling
                : $delTarget.nextElementSibling;
        $numbers.removeChild($delTarget);
        $delTarget = $nextTarget;
    }

}


// UP, DOWN인 경우의 처리
function processUpDownCase(isUp, target) {         // isUp이 트루면 if 아니면 else
    // 1. 애니메이션 처리
    const $up = document.querySelector('#up');
    const $down = document.querySelector('#down');

    if (isUp) {     // up이면?
        $up.classList.add('selected');
        $down.classList.remove('selected');
        gameDatas.min = gameDatas.answer + 1;
        document.querySelector('#begin').textContent = gameDatas.answer + 1;               
    } else {    // down이면?
        $down.classList.add('selected');
        $up.classList.remove('selected');
        gameDatas.max = gameDatas.answer - 1;
        document.querySelector('#end').textContent = gameDatas.answer - 1;
    }

    clearIcons(target, isUp);  

}

// 정답인 경우 처리할 일
function processCorrect(target) {
    // 1.축하박스 등장 처리
    const $finish = document.querySelector('#finish');
    $finish.classList.add('show');

    // 2. target에 id = "move" 부여
    target.setAttribute('id', 'move');
}

// 정답을 검증하는 함수
function checkAnswer(target) {
    
    // 객체 디스트럭쳐링
    const {secret, answer} = gameDatas;   // 키값을 넣어주면 됌

    if (secret === answer) {                     // 정답인경우
        processCorrect(target);        
    } else if (secret > answer) {              // up인 경우
        processUpDownCase(true, target);
    } else {                 // down인 경우
        processUpDownCase(false, target);
    }
}




//============== 메인 실행부 ===========================//
(function() {

    makeIcons();

    //아이콘 클릭 이벤트 부여
    const $numbers = document.querySelector('#numbers');
    $numbers.addEventListener('click', e => {
        if (!e.target.matches('#numbers .icon')) return;

        // console.log('아이콘이 클릭툄!');  // 콘솔로 테스트

        // console.log(e.target.textContent);   // 클릭한 숫자 찾기

        // 사용자가 선택한 숫자를 객체에 저장
        gameDatas.answer = +e.target.textContent;
        // console.log(gameDatas);             // 확인하기

        // 정답 검증
        checkAnswer(e.target);
    });

})();
