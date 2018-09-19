document.addEventListener("DOMContentLoaded", function () {

    var count = 0;
    document.getElementById("enter-data").onclick = function () {
        var table = document.createElement("table");
        table.className = "table-item";

        var tBody = document.createElement("tbody");

        var fullName = document.getElementsByClassName("input");
        var nameList  = Array.prototype.slice.call(fullName);

        nameList.forEach(function (elem) {
                var cell = document.createElement("td");
                cell.className = "list-item";
                cell.innerText = elem.value;
                tBody.appendChild(cell);
                elem.value = "";
        });

        var delButton = document.createElement("input");
        delButton.type = "button";
        delButton.value = "удалить";
        delButton.onclick = function (c) {
            return function () {
                let buttonId = "item" + c;
                document.getElementById(buttonId).remove();
            };
        }(count);

        tBody.appendChild(delButton);
        table.appendChild(tBody);

        var itemLi = document.createElement("li");
        itemLi.className = "item";
        itemLi.setAttribute("id", "item" + count);
        itemLi.appendChild(table);

        document.getElementById("list").appendChild(itemLi);
        count++;
    };
});
