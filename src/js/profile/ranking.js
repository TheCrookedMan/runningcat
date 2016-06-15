(function() {
    var ranking = function() {
        this.status = "Fuel";
        this.pageNo = 1;
        this.pageSize = 10;
        this.isEnd = false;
    }
    ranking.prototype = {
        init: function() {
            var self = this;
            $(".single-class .pub-tab").on("click", "a", function(ev) {
                $(".single-class .pub-tab .cur").removeClass("cur");
                $(this).addClass("cur");
                self.status = $(this).data("id");
                self.pageNo = 1;
                $(".myrank").html("");
                $(".rank-list").html("");
                self.getRanking();
                self.getMyranking();
            });
            self.getRanking();
            self.getMyranking();
            scroll.on(function() {
                if (!self.isEnd) {
                    self.pageNo++;
                    self.getRanking();
                }
            }, function() {});
        },
        getRanking: function() {
           var self = this;
           if($(".rank-tab li a.cur").data("id")=="Fuel"){
                 $.get('/rankingFuel.template', {
                    usrId:userInfo.memberId,
                    pageNo: self.pageNo,
                    pageSize: self.pageSize
                }).success(function(data) {
                    data = data.replace(/(^\s+)|(\s+$)/g, "");
                    if ("" == data) {
                        isEnd = true;
                    } else {
                        isEnd = false;
                        $(".rank-list").append(data); 
                    }
                }).error(function(err) {});
            }
            else{
                $.get('/rankingTrain.template', {
                    pageNo: self.pageNo,
                    pageSize: self.pageSize
                }).success(function(data) {
                    data = data.replace(/(^\s+)|(\s+$)/g, "");
                    if ("" == data) {
                        isEnd = true;
                    } else {
                        isEnd = false;
                         $(".rank-list").append(data); 
                    }
                }).error(function(err) {});
            }
        },
        getMyranking: function() {
           var self = this;
           if($(".rank-tab li a.cur").data("id")=="Fuel"){
                $.get('/rankingFuel.template',{
                    memberId: userInfo.memberId
                }, function(data) {
                    $(".myrank").append(data); 
                });
            }
            else{
               $.get('/rankingTrain.template',{
                    memberId: userInfo.memberId
                }, function(data) {
                    $(".myrank").append(data); 
                });
            }
        }
    }
    this.ranking = new ranking();
    this.ranking.init();   

    /*
        点赞
    */
    $(".ranking-list").on("click", "a.praise", function(ev) {
        var bePraisedId = $(this).data("id");
        var status=$(this).data("status");
        var pnum=parseInt($(this).parent().siblings().text());
        var self=$(this);
        if(status>0){
            modal.alert("你已经点赞了");
            $(this).children().addClass("cur")
        }
        else if(bePraisedId==userInfo.memberId){
            modal.alert("不能给自己点赞哦");
        }
        else{
           $.post("/bePraise", {
                memberId: userInfo.memberId,
                bePraisedId: bePraisedId
            }).success(function(data) {
                if (data.code == "0000" && data.success) {
                    var res=data.data;
                    pnum=pnum+1;
                    self.parents(".like").children(".totalPraise").text(pnum);
                    self.children("i").removeClass('am-icon-heart-o');
                    self.children('i').addClass("am-icon-heart")
                } else {
                    // modal.alert(data.msg);
                }
            })
            ev.stopPropagation(); 
        }       
    }); 
}).call(this);
