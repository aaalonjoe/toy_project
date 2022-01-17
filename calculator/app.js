$number = document.querySelector('.number');
$number.addEventListner('click', e => {
    document.forms.output.value = $number.value;
});
