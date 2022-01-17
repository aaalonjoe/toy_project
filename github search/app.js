
// 메인이미지 클릭시 깃허브로 이동
const $link = 'https://github.com';

document.querySelector('.logo').addEventListener('click', e => {
    window.open($link);
});

const URL = 'https://api.github.com';


// 프로필 렌더링 함수
function renderingProfile() {
    let userId = document.getElementById('search').value;
    const result = fetch(URL + '/users/' + `${userId}`, {
        headers: {
            Authorization: "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"
        }

    });
    

    result.then(res => res.json())
    .then(user => {

        if (user.message === "Not Found") {
            closeProfileCard();
            noneProfile();
        } else {
            openProfileCard();
             // 사진
            document.querySelector('.card div:first-child img')
            .setAttribute('src', user.avatar_url);
            const $img = document.querySelector('.card div:first-child img');
            const $imgLink = $link + '/' + userId; 
            $img.setAttribute('href', user.html_url);
            $img.addEventListener('click', e => {
            window.open($imgLink);
            });


            // 프로필 렌더링
            document.getElementById('user-id').textContent = user.login;
            document.getElementById('user-name').textContent = user.name;
            document.getElementById('followers').textContent = user.followers;
            document.getElementById('following').textContent = user.following;
            document.getElementById('public-repos').textContent = user.public_repos;
        }
        
    });

    const result2 = fetch(URL + '/users/' + `${userId}` + '/repos?sort=update' ,{
        headers: {
            Authorization: "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"
        }
    });
    result2.then(res => res.json())
        .then(userRepos => {
            
        // 저장소 링크, 이름, 언어 렌더링
        document.querySelector('.repo1 a').setAttribute('href', userRepos[0].html_url);
        document.querySelector('.repo1-name').textContent = userRepos[0].name;
        repoLang(userId, userRepos[0].name, '.repo1-lang');

        document.querySelector('.repo2 a').setAttribute('href', userRepos[1].html_url);
        document.querySelector('.repo2-name').textContent = userRepos[1].name;
        repoLang(userId, userRepos[1].name, '.repo2-lang');

        document.querySelector('.repo3 a').setAttribute('href', userRepos[2].html_url);
        document.querySelector('.repo3-name').textContent = userRepos[2].name;
        repoLang(userId, userRepos[2].name, '.repo3-lang');

    });

}

// 위 3개 인수를 매개변수로 받아서
function repoLang(userId, repoName, repoClass) {
    // const repoName = "js_study_1";
    const result3 = fetch(URL + '/repos/' + `${userId}` + '/' + `${repoName}` + '/languages' ,{
        headers: {
            Authorization: "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"
        }
    });

    // 키를 빈 배열에 담아 렌더링 
    result3.then(res => res.json()).then(repoLang => {
    
        let keyname = [];
        for(let key in repoLang) {
            keyname.push(key);
        }
        document.querySelector(repoClass).textContent = keyname;

    });

}

// 프로필카드오픈 이벤트
function openProfileCard() {
    document.querySelector('.card').style.display = 'flex';
}

function closeProfileCard() {
    document.querySelector('.card').style.display = 'none';
}

function noneProfile() {
    document.querySelector('.nonecard').style.display = 'flex';
}

function enterEvent() {

    const $enter = document.getElementById('search');
    $enter.addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            console.log('엔터!');
            const $input = document.querySelector('.search-box input');
            if ($input.value.trim() === '') {    
                $input.setAttribute('placeholder', '바르게 입력하세요.');
            } else {
                renderingProfile();
            }
        }
    });
}

// 즉시실행 함수

(function() {

    // 검색버튼 이벤트
    const $search = document.querySelector('.search-img');
    enterEvent();
    $search.addEventListener('click', e => {
        e.preventDefault();
        
    const $input = document.querySelector('.search-box input');
    if ($input.value.trim() === '') {    
        $input.setAttribute('placeholder', '바르게 입력하세요.');
    } else {
        renderingProfile();
    }

    

});


})();