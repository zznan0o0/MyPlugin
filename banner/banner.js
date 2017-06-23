$(function () {
    var Banner = function () {
        this.timer = null;
        this.startNum = 0;
        this.btnNum = 0;
        this.isMouseOver = true;
    }

    Banner.prototype = {
        constructor: banner,
        init: function () {
            this.bannerImg = $('.banner_img li');
            this.bannerImg.css({ 'opacity': '0' });
            this.bannerImg.css('display', 'none');
            this.bannerImg.eq(0).css('opacity', '1');
            this.bannerImg.eq(0).css('display', 'block');;
            this.bannerBtnUl = $('.banner_btn');
            this.createBtn();
            this.bannerBtn = this.bannerBtnUl.find('li');
            this.center(this.bannerBtnUl);
            this.bannerImg.eq(0).data('show', true);
            this.bannerBtn.eq(0).addClass('on');
            this.btnAnimate(this.bannerBtn, this.bannerImg);
            this.btnAnimateOver(this.bannerBtn, this.bannerImg);
            this.setIntervalBtn();
            this.onsize(this);
        },

        createBtn: function () {
            var btnHtml = '';
            for (var i = 0; i < this.bannerImg.length; i++) {
                this.bannerBtnUl.append('<li></li>')
            }
        },

        center: function (element) {
            element.css('left', (document.documentElement.clientWidth - element.width()) / 2 + 'px');
        },

        onsize: function (_this) {
            window.onresize = function () {
                _this.center(_this.bannerBtnUl);
            };
        },

        btnAnimate: function ($_elementBtn, $_element) {
            var that = this;
            $_elementBtn.each(function (index) {
                $(this).click(function () {
                    that.btnNum = index;
                    clearInterval(that.timer);
                    $_elementBtn.removeClass('on');
                    $(this).addClass('on');

                    var $_preElement;
                    for (var i = 0; i < $_element.length; i++) {
                        if ($_element.eq(i).data('show')) {
                            $_preElement = $_element.eq(i);
                            break;
                        }
                    }

                    $_preElement.stop(false, true);
                    $_preElement.data('show', false);
                    $_preElement.animate({ opacity: 0 }, 600, function () {
                        $_preElement.css('display', 'none');
                    })

                    $_element.eq(index).stop(false, true);
                    $_element.eq(index).css('display', 'block');
                    $_element.eq(index).animate({ opacity: 1 }, 600);
                    $_element.eq(index).data('show', true);

                    that.setIntervalBtn();
                });
            })
        },

        btnAnimateOver: function ($_elementBtn, $_element) {
            var that = this;
            clearInterval(that.timer);

            $_elementBtn.each(function (index) {
                $(this).mouseover(function () {
                    that.isMouseOver = false;

                    that.btnNum = index;
                    clearInterval(that.timer);
                    $_elementBtn.removeClass('on');
                    $(this).addClass('on');

                    var $_preElement;
                    for (var i = 0; i < $_element.length; i++) {
                        if ($_element.eq(i).data('show')) {
                            $_preElement = $_element.eq(i);
                            break;
                        }
                    }

                    $_preElement.stop(false, true);
                    $_preElement.data('show', false);
                    $_preElement.animate({ opacity: 0 }, 1000, function () {
                        $_preElement.css('display', 'none');
                    })

                    $_element.eq(index).stop(false, true);
                    $_element.eq(index).css('display', 'block');
                    $_element.eq(index).animate({ opacity: 1 }, 1000);
                    $_element.eq(index).data('show', true);
                });
            });


            $_elementBtn.each(function () {
                $(this).mouseout(function () {
                    that.isMouseOver = true;
                    that.setIntervalBtn();
                });
            });
        },

        setIntervalBtn: function () {
            var that = this;
            this.timer = setInterval(function () {
                if (!that.isMouseOver) {
                    clearInterval(that.timer);
                    return;
                }

                if (that.btnNum >= that.bannerBtn.length - 1) {
                    that.btnNum = 0;
                }
                else {
                    that.btnNum++;
                }

                that.bannerBtn.eq(that.btnNum).click();
            }, 3000)
        }
    }

    var banner = new Banner();
    banner.init();
})