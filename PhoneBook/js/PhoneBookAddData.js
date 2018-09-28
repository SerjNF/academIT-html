$(function () {
        var buttonEnter = $('#enter-data');
        var buttonResetFilter = $('#reset-filter');
        var buttonDelChecked = $('#del-checked');
        var statusInput = [true, true, true];

        $('#error-soname').hide();
        $('#error-name').hide();
        $('#error-phone').hide();

        var soname = $('#soname');
        soname.keyup(function () {
            if (validateInput(soname, 0)) {
                $("#error-soname").show();
            } else {
                $("#error-soname").hide();
            }
            btn_validator();
        });


        var name = $('#name');
        name.keyup(function () {
            if (validateInput(name, 1)) {
                $("#error-name").show();
            } else {
                $("#error-name").hide();
            }
            btn_validator();
        });


        var phone = $('#phone');
        phone.keyup(function () {
            if (validateInput(phone, 2)) {
                $("#error-phone").show();
            } else {
                $("#error-phone").hide();
            }
            btn_validator();
        });


        function validateInput(elem, numberInStatus) {
            var phoneRegex = /^([+]7|8)[0-9]{10}$/;
            var nameRegex = /^([A-ЯЁа-яё][а-яё]+)|([a-zA-Z][a-z]+)/;
            if (elem.attr("type") === "text" ? elem.val().search(nameRegex) !== -1 : phone.val().search(phoneRegex) === 0) {
                elem.removeClass("error").addClass("ok");
                statusInput[numberInStatus] = false;
                return false;
            } else if (elem.val().search(/^$/) !== -1) {
                elem.removeClass("error").removeClass("ok");
                statusInput[numberInStatus] = true;
            } else {
                elem.addClass("error");
                return true
            }
        }


        function btn_validator() {
            if (!statusInput.some(function (e) {
                return e === true;
            })) {
                buttonEnter.attr("disabled", false);

            } else {
                buttonEnter.attr("disabled", true);
            }
        }


        var filter = $('#filter-input');
        filter.keyup(function () {
            filtered(filter);
        });


        function filtered(fil) {
            $.each($(".row"), function (i, obj) {
                    var child = Array.prototype.slice.call(obj.querySelectorAll(".for-filter"));
                    obj.hidden = child.every(function (elem) {
                        return elem.textContent.toLowerCase().indexOf(fil.val().toLowerCase(), 0) === -1;
                    });
                }
            )
        }


        buttonResetFilter.click(function () {
            var tr = $("tr");
            tr.each(function (i, e) {
                e.hidden = false;
            });
            filter.val("");
        });


        $('#check-all').on('change', function () {
            var checkList = $(".check-box").not(":hidden");
            if (this.checked) {
                $.each(checkList, function (i, obj) {
                    obj.checked = true;
                });
            } else {
                $.each(checkList, function (i, obj) {
                    obj.checked = false;
                });
            }
        });


        function Contact(soname, name, phone) {
            this.soname = soname;
            this.name = name;
            this.phone = phone;
        }


        function openAlert(title, phoneNumber) {
            $(".dialog").text("Номер " + phoneNumber.val() + " уже внесен в книгу").dialog({
                autoOpen: false,
                modal: true,
                title: title,
                buttons: {
                    "Close": function () {
                        $(this).dialog("close");
                    }
                }
            });
            $(".dialog").dialog("open");
            filter.val(phoneNumber.val());
            filtered(phoneNumber);
        }


        function clearField() {
            soname.val("");
            soname.removeClass("ok");
            name.val("");
            name.removeClass("ok");
            phone.val("");
            phone.removeClass("ok");
            statusInput = [true, true, true];
        }


        function addDataToTable(contact) {
            var row = createRows(contact);
            var body = $('#body-table');
            row.appendTo(body);
            reloadFirstCells();
            buttonEnter.attr("disabled", true);
        }


        function createRows(contact) {
            var tr = $("<tr></tr>").addClass("row");
            $("<td></td>").addClass("for-check").addClass("for-del").append($("<input type='checkbox' class='check-box'>")).appendTo(tr);
            $("<td></td>").addClass("col1").addClass("firstCell").appendTo(tr);
            var index = 2;
            $.each(contact, function (key, data) {
                var td = $("<td></td>");
                td.addClass("list-item").addClass("col" + index).addClass("for-filter");
                td.text(data);
                td.appendTo(tr);
                index++;
            });
            delButton().appendTo(tr);
            return tr;
        }


        buttonEnter.click(function () {
            if (!checkPhone(phone)) {
                return;
            }
            var contact = new Contact(soname.val(), name.val(), phone.val());
            clearField();
            addDataToTable(contact);

        });


        function checkPhone(phone) {
            var phones = $(".col4");
            var phoneArray = Array.prototype.slice.call(phones);
            if (!phoneArray.some(function (e) {
                return e.innerHTML === phone.val();
            })) {
                return true;
            } else {
                var text =
                    openAlert("Номер существует", phone);
                return false;
            }
        }


        function delButton() {
            var delButton = $("<input type ='button' class='del-data button' value='удалить' />");
            delButton.click(function () {
                var text = "Действительно удалить контакт" + ((delButton.parent()).prev()).val();
                $.when(delDialog("Удалить контакт", text)).then(function (status) {
                    if (status === "Yes") {
                        delButton.closest("tr").remove();
                        reloadFirstCells();
                    }
                })
            });
            var td = $("<td></td>");
            delButton.appendTo(td);
            return td;
        }


        function reloadFirstCells() {
            var cells = $(".firstCell");
            cells.each(function (index, e) {
                e.innerText = index + 1;
            });
        }

        buttonDelChecked.click(function () {
            var checkedList = $(".for-del :checked");
            if (checkedList.length === 0) {
                $(".dialog").text("Нет выбранных номеров").dialog({
                    autoOpen: true,
                    modal: true,
                    title: "Предупреждений",
                    buttons: {
                        "Close": function () {
                            $(this).dialog("close");
                        }
                    }
                });
                return;
            }
            var lastWord = checkedList.length < 5 ? " контакт(а)" : " контактов";
            var text = "Действительно удалить " + checkedList.length + lastWord;
            $.when(delDialog("Удалить контакты", text)).then(function (status) {
                if (status === "Yes") {
                    checkedList.each(function (i, elem) {
                        elem.closest("tr").remove();
                    });
                    $('#check-all').prop('checked', false);
                    reloadFirstCells();
                }
            })
        });


        function delDialog(title, text) {
            var def = $.Deferred();
            $(".delete-dialog").text(text).dialog({
                autoOpen: true,
                modal: true,
                title: title,
                buttons: {
                    "Ok": function () {
                        // returned = true;
                        $(this).dialog("close");
                        def.resolve("Yes");
                    },

                    "Close": function () {
                        $(this).dialog("close");
                        def.resolve("No");
                    }
                }
            });
            return def.promise();
        }
    }
);
