// 1. 활율정보 들고오기
// 2. 드랍다운 리스트에서 아이템 선택하면 아이템 변경
// 3. 금액 입력하면 환전
// 4. 드랍다운 리스트에서 아이템 선택하면 다시 그기준으로 환전
// 5. 숫자를 한국어로 읽게하기
// 6. 반대로 밑에 박스에서 숫자를 바꿔도 위 박스에 환율 적용

let currencyRatio = {
    USD: {
        KRW: 1184.62,
        USD: 1,
        VND: 22797,
        unit: "달러"
    },
    KRW: {
        KRW: 1,
        USD: 0.00084,
        VND: 19.24,
        unit: "원"
    },
    VND: {
        VND: 1,
        USD: 0.000044,
        KRW: 0.052,
        unit: "동"
    }
}

let fromCurrency = 'USD';
let toCurrency = 'USD';

// console.log(currencyRatio.USD.unit);

document.querySelectorAll('#from-currency-list a')
        .forEach(menu => menu.addEventListener('click', function() {
            // 1. 버튼 가져오기
            // 2. 버튼 값 바꾸기
            document.getElementById('from-button').textContent = this.textContent;
            // 3. 선택된 currency값 변수에 저장
            fromCurrency = this.textContent;
        }));
document.querySelectorAll('#to-currency-list a')
        .forEach(menu => menu.addEventListener('click', function() {
            // 1. 버튼 가져오기
            // 2. 버튼 값 바꾸기
            document.getElementById('to-button').textContent = this.textContent;
            // 3. 선택된 currency값 변수에 저장
            toCurrency = this.textContent;
            convert();
        }));



        // 1. 키 입력하는 순간
        // 2. 환전이 되서
        // 3. 환전된 값이 보인다.

function convert() {
    // 1. 환전
    // 얼마환전? 가지고있는 돈뭐야? 뭐로 바꿀거야?
    // 돈 * 환율 = 환전금액
    let amount = document.getElementById('from-input').value;
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
    
    document.getElementById('to-input').value = convertedAmount;
}

// 반대로 밑에서 숫자바꿔도 위에 박스에 환율 적용
// 숫자를 한국어로 읽는법
