(function() {
    //userInfo.memberId
    var storeInfo = common.getStoreInfo();
    var tillList = function() {
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
    }
    tillList.prototype = {
        init: function() {
            var self = this;
            self.getFillList();
            scroll.on(function() {
                if (!self.isEnd) {
                    self.pageNo++;
                    self.getFillList();
                }
            }, function() {});


        },
        getFillList: function() {
            var self = this;
            $.get('/getUsrSpecialClass.template', {
                memberId: userInfo.memberId,
                storeId: storeInfo.storeId,
                pageNo: self.pageNo,
                pageSize: self.pageSize
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    if (self.pageNo == 1) {
                        $(".till ul").html(data);
                    } else {
                        $(".till ul").append(data);
                    }
                }
                // console.log(data)
                $(".zhuanrang").on("click",function(){
                    var className=$(this).data("id");
                    var totalNum=$(this).data("id1");
                    var specialId=$(this).data("id2");
                    var appointmentTotalNum=$(this).data("id4");
                    var totalPrice=$(this).data("id3");
                    //console.log(className)
                    $(".doc-modal-1").find(".title").html(className);
                    $(".doc-modal-1").find(".num").html(totalNum);
                    $(".doc-modal-1").find(".price").html(totalPrice);
                    $(".doc-modal-1").find(".cnum").html(appointmentTotalNum);
                    $(".doc-modal-1").find(".submit").attr("data-id",specialId)
                })
                

            }).error(function(err) {});
        }
    }
    this.tillList = new tillList();
    this.tillList.init();
    $(".submit").on("click",function(){
        var specialId=$(this).data("id");
        var $modal = $('.doc-modal-1');
        if(common.regMobileNo($(".tel").val())) {
            $.post('/transferSpecial', {
                memberId: userInfo.memberId,
                specialId: specialId,
                mobileNo: $(".tel").val()
            }).success(function(data) {
                if (data.code == "0000" && data.success) {
                    alert("转让成功！");
                    $modal.modal('close');
                    window.location.reload()
                }
                
                else{
                    alert(data.msg);
                }
            });
            
        } else {
           alert("请确认手机号是否输入正确！");
        }
                   
    })
}).call(this);
