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
                if (!regCardId.test(value)) {
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
                            $("#addressInput").val(areaName+this.$dialog.find("input").val());
                            $("#addressId").val(areaId);
                        },
                        onCancel: function() {}
                    });
                }
            }
        });
        setTimeout(function(){
            $("#demo-test-select").mobiscroll("show");
        },200);
    };

    $("form").submit(function(){
        var data = common.parseForm("form");
        $.post('/updateUserInfo',data).success(function(data){
            modal.alert(data.msg);
        });
        return false;
    });
    // function getBloodType(){
    //     // bloodType
    // }
    // function getSysDictionary(parentCode){
    //     $.post('/common/getSysDictionary',{parentCode:parentCode}).success();
    // }
}).call(this);
