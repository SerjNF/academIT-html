document.addEventListener("DOMContentLoaded", function () {
    // полифил
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }

    if (!Element.prototype.remove) {
        Element.prototype.remove = function remove() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) {
                    return node;
                }
                else {
                    node = node.parentElement;
                }
            }
            return null;
        };
    }

    //кнопка удалить
    function delButton() {
        var delButton = document.createElement("input");
        delButton.type = "button";
        delButton.value = "удалить";
        delButton.addEventListener("click", function () {
            delButton.closest("tr").remove();
            reloadFirstCells();
        });
        return delButton;
    }

    // строка таблицы
    function createRows(nameList) {
        var tr = document.createElement("tr");
        var firstCell = document.createElement("td");
        firstCell.className = "col1";
        firstCell.className = "firstCell";
        tr.appendChild(firstCell);

        nameList.forEach(function (elem, index) {
            var cell = document.createElement("td");
            cell.className = "list-item";
            cell.className = "col" + (index + 2);
            cell.innerText = elem.value;
            tr.appendChild(cell);
            elem.value = "";
        });
        var trLast = document.createElement("td");
        trLast.className = "list-item";
        trLast.className = "col5";
        trLast.appendChild(delButton());
        tr.appendChild(trLast);
        return tr;
    }

    // номера в списке
    function reloadFirstCells() {
        var firstCells = document.getElementsByClassName("firstCell");
        var firstCellsList = Array.prototype.slice.call(firstCells);
        firstCellsList.forEach(function (e, index) {
            e.innerText = index + 1;
        });
    }

    // кнопка добавить
    document.getElementById("enter-data").addEventListener("click", function () {
        var fullName = document.getElementsByClassName("input");
        var nameList = Array.prototype.slice.call(fullName);

        if (nameList.some(function (elem) {
            return elem.value === "";
        })) {
            alert("Все поля должны быть заполнены");
            return;
        }
        var row = createRows(nameList);
        document.getElementById("body-table").appendChild(row);
        reloadFirstCells();
    });
});
