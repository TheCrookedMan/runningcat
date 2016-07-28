(function() {
    var areaScroller;
    $.get('/edit-profile.template', {
        memberId: userInfo.memberId
    }).success(function(data) {
        $(".edit-profile form").html(data);
        init();
    });

    $("body").on("click", "#idcard", function(ev) {
        this.blur();
        $('#idcardModal').modal({
            relatedTarget: this,
            onConfirm: function(options) {
                var value = this.$dialog.find("input").val();
                if ("" != value && !regCardId.test(value)) {
                    modal.alert("身份证格式错误！");
                    return false;
                } else {
                    $(this.relatedTarget).val(value);
                }
            },
            onCancel: function() {}
        });
        ev.stopPropagation();
    });

    $("body").on("click", "#height", function(ev) {
        this.blur();
        $('#heightModal').modal({
            relatedTarget: this,
            onConfirm: function(options) {
                var value = this.$dialog.find("input").val();
                if (!common.regInteger(value)) {
                    modal.alert("请输入正确的数字！");
                    return false;
                } else {
                    $(this.relatedTarget).val(value);
                }
            },
            onCancel: function() {}
        });
        ev.stopPropagation();
    });

    $("body").on("click", "#weight", function(ev) {
        this.blur();
        $('#beforeWeightModal').modal({
            relatedTarget: this,
            onConfirm: function(options) {
                var value = this.$dialog.find("input").val();
                if (!common.regBeforeWeight(value)) {
                    modal.alert("请输入正确的数字！");
                    return false;
                } else {
                    $(this.relatedTarget).val(value);
                }
            },
            onCancel: function() {}
        });
        ev.stopPropagation();
    });

    $("body").on("click", "#sex", function(ev) {
        this.blur();
        var sexValue = $("#sexInputBox").val();
        if (sexValue == 1) {
            $("#choiceSexModal .male").addClass("cur");
            $("#choiceSexModal .female").removeClass("cur");
        } else {
            $("#choiceSexModal .male").removeClass("cur");
            $("#choiceSexModal .female").addClass("cur");
        }
        $('#choiceSexModal').modal({
            relatedTarget: this,
            onConfirm: function(options) {
                var value = this.$dialog.find("a.cur").data("value");
                $("#sexInputBox").val(value);
                var text = this.$dialog.find("a.cur").text();
                $(this.relatedTarget).val(text);
            },
            onCancel: function() {}
        });
        ev.stopPropagation();
    });

    $('#choiceSexModal').on("click", ".select-attr a", function(ev) {
        $(this).siblings().removeClass("cur");
        $(this).addClass("cur");
        ev.stopPropagation();
    });

    $("body").on("click", "#blood", function(ev) {
        $('#bloodModal').modal({
            relatedTarget: this,
            onConfirm: function(options) {
                var value = this.$dialog.find("a.cur").text();
                $(this.relatedTarget).val(value);
            },
            onCancel: function() {}
        });

        ev.stopPropagation();
    });

    $('#bloodModal').on("click", ".select-attr a", function(ev) {
        $(this).siblings().removeClass("cur");
        $(this).addClass("cur");
        ev.stopPropagation();
    });

    $("body").on("click", "#married", function(ev) {
        $('#marriedModal').modal({
            relatedTarget: this,
            onConfirm: function(options) {
                var value = this.$dialog.find("a.cur").text();
                $(this.relatedTarget).val(value);
            },
            onCancel: function() {}
        });
        ev.stopPropagation();
    });

    $('#marriedModal').on("click", ".select-attr a", function(ev) {
        $(this).siblings().removeClass("cur");
        $(this).addClass("cur");
        ev.stopPropagation();
    });

    function getAreaList(parentId, callback) {
        $.post('/common/getAreaList', { parentId: parentId }).success(callback);
    };

    function init() {
        $("#addressInput").on("click", function(ev) {
            getAreaList(0, initAreaSelect);
            ev.stopPropagation();
            return false;
        });
        $(".uploadImage").uploadImage({
            url: "/common/uploadImage",
            callback: function(file, data, resp) {
                var path = data.images[0].userFilePath;
                $(".userLogo").attr('src', window.imageAddress + path);
                $("#photoUrl").val(path);
            }
        });
    }

    function initAreaSelect(data) {
        var list = [];
        if (data.code == "0000" && data.success) {
            $.each(data.data, function(i, I) {
                if (I.areaType == "3") {
                    list.push('<option value="' + I.areaId + '" data-area-type="' + I.areaType + '">' + I.areaLongname + '</option>');
                } else {
                    list.push('<option value="' + I.areaId + '" data-area-type="' + I.areaType + '">' + I.areaName + '</option>');
                }
            })
        }
        $("#demo-test-select").html(list.join("")).mobiscroll().select({
            theme: 'default',
            mode: 'scroller',
            display: 'bottom',
            preset: 'select',
            setText: '确定',
            cancelText: '取消',
            clearText: '明确',
            selectedText: '选',
            onSelect: function(value, obj) {
                var areaType = $("#demo-test-select").find("option:selected").data("areaType");
                var areaId = obj.values[0];
                var areaName = value;
                if (areaType != 3) {
                    getAreaList(obj.values[0], initAreaSelect);
                } else {
                    $("#areaModal .title").text(value);
                    $("#areaModal").modal({
                        relatedTarget: this,
                        onConfirm: function(options) {
                            $("#addressInput").val(areaName + this.$dialog.find("input").val());
                            $("#addressId").val(areaId);
                        },
                        onCancel: function() {}
                    });
                }
            }
        });
        setTimeout(function() {
            $("#demo-test-select").mobiscroll("show");
        }, 200);
    };

    var $tooltip = $('<div id="vld-tooltip">提示信息！</div>');
    $tooltip.appendTo(document.body);
    var $form = $('#loginForm');

    $form.validator({
        validate: function(validity) {
            $tooltip.hide();
            if (validity.field.name == "wechat") {

                if (validity.field.value == "" || common.regSkip(validity.field.value)) {
                    validity.valid = false;
                } else if (common.regChinese(validity.field.value)) {
                    validity.valid = false;
                } else {
                    validity.valid = true;
                }
            } else if (validity.field.name == "idcard") {
                if (validity.field.value == "" || regCardId.test(validity.field.value)) {
                    validity.valid = true;
                } else {
                    validity.valid = false;
                }
            } else if (validity.field.name == "birthday") {
                if (validity.field.value == "" || !common.regRealAge(validity.field.value)) {
                    validity.valid = false;
                } else {
                    validity.valid = true;
                }
            }
        },
        submit: function(form) {
            if (this.isFormValid()) {
                var data = common.parseForm("form");
                if (!data.idcard) {
                    data.idcard = "NULL";
                }

                if (!data.maritalStatus) {
                    data.maritalStatus = "NULL";
                }

                if (!data.bloodtype) {
                    data.bloodtype = "NULL";
                }

                if (!data.profession) {
                    data.profession = "NULL";
                }

                $.post('/updateUserInfo', data).success(function(data) {
                    modal.alert(data.msg, undefined, function() {
                        window.history.go(-1);
                    });
                });
            }
            return false;
        }
    });

    var validator = $form.data('amui.validator');

    $form.on('focusin focusout', '.am-form-error input', function(e) {
        if (e.type === 'focusin') {
            var $this = $(this);
            var offset = $this.offset();
            var msg = $this.data('foolishMsg') || validator.getValidationMessage($this.data('validity'));

            $tooltip.text(msg).show().css({
                left: offset.left + 10,
                top: offset.top - $(this).outerHeight() - 10
            });
        } else {
            $tooltip.hide();
        }
    });

    // $('#loginForm').validator({
    //     submit: function(form) {
    //         if (this.isFormValid()) {
    //             var data = common.parseForm("form");
    //             $.post('/updateUserInfo', data).success(function(data) {
    //                 modal.alert(data.msg);
    //             });
    //         }
    //         return false;
    //     }
    // });


    // function getBloodType(){
    //     // bloodType
    // }
    // function getSysDictionary(parentCode){
    //     $.post('/common/getSysDictionary',{parentCode:parentCode}).success();
    // }
}).call(this);
