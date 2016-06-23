(function() {
    /*排课时间*/
    var store = common.getStoreInfo();
    $.get('/courseDate.template', {
        userId: userInfo.memberId,
        storeId: store.storeId,
    }).success(function(data) {
        $(".wrapper").append(data);
        var default_data = $(".wrapper a:first").data("time");
        // $(".wrapper a:first").addClass("cur");
        initSwiperList();
    }).error(function(err) {});

    var courseList = function() {
        $(".pub-location .storeName").text(store.storeName);
        $(".foot_ps .storeAddress").text(store.address);
        $(".foot_ps .contactPhone").text(store.contactPhone);
        this.storeId = store.storeId;
    }
    courseList.prototype = {
        init: function(date) {
            var self = this;
            self.pageNo = 1;
            self.pageSize = 10;
            self.isEnd = false;
            self.date = date;
            $(".pub-list ul").html("");
            self.getCourse();
            scroll.off();
            scroll.on(function() {
                if (!self.isEnd) {
                    self.pageNo++;
                    self.getCourse();
                }
            }, function() {});
        },
        getCourse: function() {
            var self = this;
            $.get('/course.template', {
                userId: userInfo.memberId,
                storeId: self.storeId,
                queryDate: self.date,
                pageNo: self.pageNo,
                pageSize: self.pageSize
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                } else {
                    self.isEnd = false;
                    if(self.pageNo == 1){
                        $(".pub-list ul").html(data);
                    }
                    else{
                        $(".pub-list ul").append(data);
                    }
                }
            }).error(function(err) {});
        }
    }
    this.courseListObj = new courseList();

    function swiper(selector, options) {
        this.slider = selector.find(".slider")[0];
        this.$slider = $(this.slider);
        this.$wrapper = selector.find(".wrapper");
        this.wrapper = this.$wrapper[0];
        this.$selector = selector;
        this.options = options;
        this.offset = 10;
        this.init();
    }
    swiper.prototype = {
        pre: function($pre) {
            var scrollLeft = this.$wrapper.scrollLeft();
            var sliderWidth = this.$slider.width();
            var length = scrollLeft - sliderWidth;

            if (length + this.offset > 0) {
                this.$wrapper.scrollLeft(length);
            }
            this.sliderButtonType();
        },
        next: function($next) {
            var scrollLeft = this.$wrapper.scrollLeft();
            var sliderWidth = this.$slider.width();
            var wrapperWidth = this.$wrapper.width();
            var length = scrollLeft + sliderWidth;
            var scrollWidth = this.wrapper.scrollWidth;

            if (length < scrollWidth - wrapperWidth + this.offset) {
                this.$wrapper.scrollLeft(length);
            }

            this.sliderButtonType();
        },
        init: function() {
            var self = this;
            this.$selector.on("click", ".slider-pre.active", function(ev) {
                self.pre($(this));
                ev.stopPropagation();
            });
            this.$selector.on("click", ".slider-next.active", function(ev) {
                self.next($(this));
                ev.stopPropagation();
            })
            this.$selector.on("click", ".slider", function(ev) {
                $(this).siblings(".cur").removeClass("cur");
                $(this).addClass("cur");
                self.options.onClick && self.options.onClick($(this));
                ev.stopPropagation();
            });

            if (self.$selector.find(".slider").length > 0) {
                // self.$slider.addClass("cur");
                self.options.onComplete && self.options.onComplete(this.$wrapper.find('.cur'));
            }
            self.sliderButtonType();
        },
        sliderButtonType: function() {
            var scrollLeft = this.$wrapper.scrollLeft();
            var sliderWidth = this.$slider.width();
            var wrapperWidth = this.$wrapper.width();
            var scrollWidth = this.wrapper.scrollWidth;
            if (scrollWidth > wrapperWidth) {
                if (scrollLeft + wrapperWidth < scrollWidth) {
                    this.$selector.find(".slider-next").addClass("active");
                } else {
                    this.$selector.find(".slider-next").removeClass("active");
                }
                if (scrollLeft > 0) {
                    this.$selector.find(".slider-pre").addClass("active");
                } else {
                    this.$selector.find(".slider-pre").removeClass("active");
                }
            }
        }
    }
    $.fn.swiper = function(options) {
        var opts = $.extend(options);
        new swiper(this, opts);
    }

    function initSwiperList() {
        $(".data-list").swiper({
            onClick: function(selector) {
                var date = selector.data("date");
                date = new Date(date).getTime();
                courseListObj.init(date);
            },
            onComplete: function(selector) {
                var date = selector.data("date");
                date = new Date(date).getTime();
                courseListObj.init(date);
            }
        });
    }
$(".tit").each(function(i){
    alert("afssdafs")
})
}).call(this);
