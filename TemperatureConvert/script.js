document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("button-convert").addEventListener("click", function () {
        var inputTemp = document.getElementById("input-temp").value;

        if (inputTemp === "") {
            inputTemp = 0;
            document.getElementById("input-temp").value = 0;
        }

        if (document.getElementById("celsius").checked) {
            var resultTemp = inputTemp;
        } else if (document.getElementById("kelvin").checked) {
            resultTemp = Number(inputTemp) + 273.15;
        } else if (document.getElementById("fahrenheit").checked) {
            resultTemp = Number(inputTemp) * 9 / 5 + 32;
        } else {
            resultTemp = "не выбрана шкала";
        }
        document.getElementById("result-temp").value = resultTemp;
    });
});