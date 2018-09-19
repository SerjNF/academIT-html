document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("button-convert").onclick = function () {
        let inputTemp = document.getElementById("input-temp").value;

        if (inputTemp === "") {
            inputTemp = 0;
            document.getElementById("input-temp").value = 0;
        }

        const radioButton = document.getElementsByName("scale");
        let resultTemp;

        if (radioButton[0].checked) {
            resultTemp = inputTemp;
        } else if (radioButton[1].checked) {
            resultTemp = Number(inputTemp) + 273;
        } else if (radioButton[2].checked) {
            resultTemp = Number(inputTemp) * 9 / 5 + 32;
        } else {
            resultTemp = "не выбрана шкала";
        }
        document.getElementById("result-temp").value = resultTemp;
    };

});