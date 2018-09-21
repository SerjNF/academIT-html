document.addEventListener("DOMContentLoaded", function () {
    (function () {
        var list = [3, 4, 6, 7, 32, 2, 4, 6, 3, 36, 78, 456, 12, 45];
        console.log("array: " + list);
        list.sort(function (a, b) {
            return a - b;
        });
        console.log("sorted array: " + list);

        var firstFiveNumbers = list.slice(0, 5);
        console.log("first 5 numbers array: " + firstFiveNumbers);

        var lastFiveNumbers = list.slice(list.length - 5);
        console.log("last 5 numbers array: " + lastFiveNumbers);

        var sumEvenNumber = list.reduce(function (sum, currentValue) {
            if (currentValue % 2 === 0) {
                return sum + currentValue;
            } else {
                return sum;
            }
        }, 0);
        console.log("sum all even numbers: " + sumEvenNumber);

        var list1 = Object.create(Array.prototype);
        for (let i = 1; i <= 100; i++) {
            list1.push(i);
        }
        console.log("Array 100 numbers:" + list1);

        var listWithFilter = list1.filter(function (value) {
            return value % 2 === 0;
        }).map(function (value) {
            return value * value;
        });

        console.log("Array square even numbers:" + listWithFilter);
        console.log("length listSquare:" + listWithFilter.length);
    })();

});