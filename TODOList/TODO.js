document.addEventListener("DOMContentLoaded", function () {

    var count = 0;
    document.getElementById("enter-data").onclick = function () {
        var fullName = document.getElementsByClassName("input");
        var table = document.createElement("table");

        table.className = "table-item";

        var tBody = document.createElement("tbody");

        for (var i = 0; i < fullName.length; i++) {
            var cell = document.createElement("td");
            cell.className = "list-item";
            cell.innerText = fullName[i].value;
            tBody.appendChild(cell);
        }

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
