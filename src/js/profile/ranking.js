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
        // $(this).children().addClass("cur");
        // $(this).removeClass("praise");
        // var pnum=parseInt($(this).parent().siblings().text());
        $.post("/bePraise", {
            memberId: userInfo.memberId,
            bePraisedId: bePraisedId
        }).success(function(data) {
            if (data.code == "0000" && data.success) {
                var res=data.data;
                console.log(res.isDeleted);
                // pnum=pnum+1;
                // $(this).parent().siblings().text(pnum);
            } else {
                modal.alert(data.msg);
            }
        })
        ev.stopPropagation();
    }); 
}).call(this);
