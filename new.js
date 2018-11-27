var apples = '42';

(function () {
    console.log('I had ' + apples + ' apples');

    var apples = '2';

    console.log('Now I have ' + apples + ' apples');
})();

(function () {
    var apples;
    console.log('I had ' + apples + ' apples');

    apples = '2';

    console.log('Now I have ' + apples + ' apples');
})();
