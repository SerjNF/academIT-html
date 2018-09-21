document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("enter-data").addEventListener("click", function () {
        var table = document.createElement("table");
        table.className = "table-item";

        var tBody = document.createElement("tbody");
        var tr = document.createElement("tr");
        var fullName = document.getElementsByClassName("input");
        var itemLi = document.createElement("li");
        itemLi.className = "item";

        var nameList = Array.prototype.slice.call(fullName);

        if (nameList.some(elem => {
            return elem.value === "";
        })) {
            alert("Все поля должны быть заполнены");
            return;
        }

        nameList.forEach(function (elem) {
            var cell = document.createElement("td");
            cell.className = "list-item";
            cell.innerText = elem.value;
            tr.appendChild(cell);
            elem.value = "";
        });

        var delButton = document.createElement("input");
        delButton.type = "button";
        delButton.value = "удалить";
        delButton.addEventListener("click", function () {
            delButton.closest("li").remove();
        });

        tr.appendChild(delButton);
        tBody.appendChild(tr);
        table.appendChild(tBody);
        itemLi.appendChild(table);

        document.getElementById("list").appendChild(itemLi);
    });
});
