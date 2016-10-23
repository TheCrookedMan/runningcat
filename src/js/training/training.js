(function() {
    var store = common.getStoreInfo();
    $(".storeShortName").text(store.storeShortName);
    //头部课程类型列表
    $.post('/common/queryCourseTypeList', { 'userId': userInfo.memberId, 'storeId': store.storeId }).success(function(data) {
        var res = data.data;
        var length = res.length;
        var width = parseFloat(100 / length);
        for (i in res) {
            var str;
            if (res[i].courseType == 1) {
                str = '<li style="width:' + width + '%!important;" ><a href="/course/course.html">' + res[i].courseTypeName + '</a></li>'
            } else if (res[i].courseType == 2) {
                str = '<li style="width:' + width + '%!important;" ><a href="/till/till.html">' + res[i].courseTypeName + '</a></li>'
            } else if (res[i].courseType == 3) {
                str = '<li style="width:' + width + '%!important;" ><a href="/coach/coach.html" >' + res[i].courseTypeName + '</a></li>'
            } else if (res[i].courseType == 4) {
                str = '<li style="width:' + width + '%!important;"><a href="/training/training.html" class="cur">' + res[i].courseTypeName + '</a></li>'
            }
            $("#clist").append(str)
        }
    });

    // (function() {
    //     var scrollPanel = $('.courses'),
    //         scrollWidth = scrollPanel[0].scrollWidth;
    //     scrollPanel.scrollLeft(scrollWidth * 0.5);
    // })();
    /*排课时间*/
    var store = common.getStoreInfo();
    $.get('/trainDate.template', {
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
            $(".coach ul").html("");
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
            $.get('/training.template', {
                // userId: 1,
                // storeId: 1,
                // queryDate: 1469939400000,
                // pageNo: self.pageNo,
                // pageSize: self.pageSize
                userId: userInfo.memberId,
                storeId: self.storeId,
                queryDate: self.date,
                pageNo: self.pageNo,
                pageSize: self.pageSize
            }).success(function(data) {
                data = data.replace(/(^\s+)|(\s+$)/g, "");
                if ("" == data) {
                    self.isEnd = true;
                    if (self.pageNo == 1) {
                        $(".coach ul").html("<li style='margin:5rem 0;'><p class='pub_nodata'>喵~，今天没有排课，休息一下！</p></li>");
                    }
                } else {
                    self.isEnd = false;
                    if (self.pageNo == 1) {
                        $(".coach ul").html(data);
                    } else {
                        $(".coach ul").append(data);
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
                var dateTime = selector.data("time");
                date = new Date(date).getTime();
                common.setCourseCurrentDate(dateTime);
                courseListObj.init(date);
            },
            onComplete: function(selector) {
                var courseCurrentDate = common.getCourseCurrentDate();
                if (!!courseCurrentDate) {
                    $(".swiper .wrapper .cur").removeClass('cur');
                    $(".swiper .wrapper ." + courseCurrentDate).addClass('cur');
                    courseListObj.init(courseCurrentDate);
                } else {
                    var date = selector.data("date");
                    date = new Date(date).getTime();
                    courseListObj.init(date);
                }
            }
        });
    }
}).call(this);
