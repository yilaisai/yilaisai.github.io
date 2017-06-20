~function(){
    var obj = {
        $topBar : $(".top_bar"),
        $nav : $(".nav"),
        $banner : $(".banner")
    };
    var index = {
            /*导航hover*/
            topBar: function(){
                var $lastList = obj.$topBar.find(".bar ul .lastList"),
                    $i = $lastList.find("i"),
                    $hideContact = obj.$topBar.find(".hide_contact"),
                    $hideList = obj.$topBar.find(".bar ul .hide"),
                    $barLeft = obj.$topBar.find(".bar_left"),
                    $logo = obj.$nav.find(".logo"),
                    $btn = obj.$nav.find(".nav_container .btn");
                $logo.delay(1500).animate({"left":50});
                $btn.delay(1000).animate({"left":856,"opacity":1});
                $lastList.hover(function(){
                    $(this).addClass("hover");
                    $hideContact.stop().slideDown();
                    $i.addClass("show");
                    obj.$topBar.addClass("show");
                },function(){
                    $(this).removeClass("hover");
                    $hideContact.stop().slideUp();
                    $i.removeClass("show");
                    obj.$topBar.removeClass("show");
                });
                $hideContact.hover(function(){
                    $(this).stop().slideDown();
                    $lastList.addClass("hover");
                    $i.addClass("show");
                    obj.$topBar.addClass("show");
                },function(){
                    $(this).stop().slideUp();
                    $lastList.removeClass("hover");
                    $i.removeClass("show");
                    obj.$topBar.removeClass("show");
                });

                /*滚动后导航置顶*/
                $(window).scroll(function(){
                    if ($(this).scrollTop() >52){
                        obj.$topBar.addClass("on").css("position","fixed");
                        $hideList.removeClass("hide");
                        $barLeft.show();
                        $logo.addClass("hide");
                    }else {
                        obj.$topBar.removeClass("on").css("position","absolute");
                        $hideList.addClass("hide");
                        $barLeft.hide();
                        $logo.removeClass("hide");
                    }
                })
            },
            /*角色切换*/
            role_pop :function(){
                var $role1 = obj.$nav.find(".nav_container .role1 img"),
                    $role2 = obj.$nav.find(".nav_container .role2 img"),
                    $btn = obj.$nav.find(".nav_container .btn"),
                    turn = true;/*true第一组显示,flase第二组显示*/
                $role1.removeClass("hide");
                $btn.click(function(){
                    turn?change($role1,$role2):change($role2,$role1);
                });
                function change($r1,$r2) {
                    $r1.stop();
                    $r2.stop();
                    $r1.addClass("hide").delay(1000).queue(function(){
                        $r2.removeClass("hide");
                    });
                    turn =!turn;
                }
            },
            /*服务器列表弹窗*/
            server_pop : function(){
                var $robait = obj.$nav.find(".nav_container .rabit"),
                    $popUp = obj.$nav.find(".popUp"),
                    $popMain = $popUp.find(".mainList"),
                    $close = $popMain.find(".close");
                
                $robait.click(function () {
                    $popUp.fadeIn();
                    $popMain.addClass("show");
                });
                $close.click(function(){
                    $popUp.fadeOut();
                    $popMain.removeClass("show");
                });
            },
            /*游戏日历*/
            side_bar : function(){
                var $sideBarLi = $(".side_bar").find(".sidebar_list ul li"),
                    $sideBarShow = $sideBarLi.find(".sidebar_list_show"),
                    $sideBarHide = $sideBarLi.find(".sidebar_list_hide");

                $sideBarLi.hover(function(){
                    $(this).stop().queue(function(){
                        $(this).addClass("hover")
                    });
                    $sideBarHide.eq($(this).index()).stop().slideDown(300);
                },function(){
                    $(this).stop().queue(function(){
                        $(this).removeClass("hover")
                    });
                    $sideBarHide.eq($(this).index()).stop().slideUp(300);
                })
            },
            /*轮播*/
            banner : function(){
                var banner = {
                    banner_pro : function(){
                        function Banner($ul,$li,$tab){
                            this.$ul = $ul;
                            this.$li = $li;
                            this.$tab = $tab;
                            this.index = 0;
                            this.length = $li.length;
                            this.width = $li.width();
                            this.timeOut = null;
                        }
                        Banner.prototype = {
                            exe : function(){
                                this.addEvent();
                            },
                            addEvent : function(){
                                var This = this;
                                This.$tab.mouseenter(function(){
                                    clearTimeout(This.timeOut);
                                    var $This = $(this);
                                    This.index = $This.index();
                                    This.timeOut = setTimeout(function(){
                                        $This.addClass("on").siblings().removeClass("on");
                                        This.$ul.animate({left:(-This.index*This.width)},300);
                                    },300)
                                })
                            }
                        };
                        /*banner左边图片自动轮播*/
                        function Banner2($ul,$li,$tab,$banner){
                            Banner.call(this,$ul,$li,$tab);
                            this.$banner = $banner;
                            this.timer = null;
                        }
                        function Fn(){}
                        Fn.prototype = Banner.prototype;
                        Banner2.prototype = Fn.prototype;
                        Banner2.prototype.stmp = Banner2.prototype.exe;
                        Banner2.prototype.exe = function(){
                            this.stmp();
                            this.clear();
                            this.auto();
                        };
                        Banner2.prototype.auto = function(){
                            var This = this;
                            this.timer = setInterval(function(){
                                This.index++;
                                This.index %=This.length;
                                This.$tab.eq(This.index).addClass("on").siblings().removeClass("on");
                                This.$ul.animate({left:(-This.index*This.width)},300);
                            },3000);
                        };
                        Banner2.prototype.clear = function(){
                            var This = this;
                            This.$banner.hover(function(){
                                clearInterval(This.timer);
                            },function(){
                                This.auto()

                            })
                        };
                        window.Banner2 = Banner2;
                        window.Banner = Banner;
                    },
                    banner2 : function(){
                        var $banner_left = obj.$banner.find(".banner_left"),
                            $ul = $banner_left.find("ul"),
                            $li = $ul.find("li"),
                            $tab = $banner_left.find(".banner_left_table a"),
                            autoBanner = new Banner2($ul,$li,$tab,$banner_left);
                            autoBanner.exe();
                    },
                    banner3 : function(){
                        var $banner_right = obj.$banner.find(".banner_right"),
                            $ul = $banner_right.find(".banner_right_pic .big_ul"),
                            $li = $ul.children(),
                            $tab = $banner_right.find(".banner_right_table a");
                        $li.each(function(i){
                            var $ul = $("<ul class='mini_ul'></ul>");
                            var num = 0;
                            for (var j=0,length=data.length;j<length;j++){
                                if (!i || data[j].typeX === (i-1) ){
                                    $ul.append("<li><a href=''>"+data[j].title+"</a><span>"+data[j].time+"</span></li>");
                                    index++;
                                    if(num === 5) break;
                                }
                            }
                            $(this).append($ul);
                        });
                        var banner = new Banner($ul,$li,$tab);
                            banner.exe();
                    }
                };
                banner.banner_pro();
                banner.banner2();
                banner.banner3();

                /*/!*Banner构造函数*!/
                function Banner($ul,$li,$tab){
                    this.$ul = $ul;
                    this.$li = $li;
                    this.$tab = $tab;
                    this.index = 0;
                    this.length = $li.length;
                    this.width = $li.width();
                    this.timeOut = null;
                }

                Banner.prototype = {
                    exe : function(){
                        this.addEvent();
                    },
                    addEvent : function(){
                        var This = this;
                        This.$tab.mouseenter(function(){
                            clearTimeout(This.timeOut);
                            var $This = $(this);
                            This.index = $This.index();
                            This.timeOut = setTimeout(function(){
                                $This.addClass("on").siblings().removeClass("on");
                                This.$ul.animate({left:(-This.index*This.width)},300);
                            },300)
                        })
                    }
                };

                /!*banner左边图片轮播*!/
                function Banner2($ul,$li,$tab,$banner){
                    Banner.call(this,$ul,$li,$tab);
                    this.$banner = $banner;
                    this.timer = null;
                }
                function Fn(){}
                Fn.prototype = Banner.prototype;
                Banner2.prototype = Fn.prototype;
                Banner2.prototype.stmp = Banner2.prototype.exe;
                Banner2.prototype.exe = function(){
                    this.stmp();
                    this.clear();
                    this.auto();
                };
                Banner2.prototype.auto = function(){
                    var This = this;
                    this.timer = setInterval(function(){
                        This.index++;
                        This.index %=This.length;
                        This.$tab.eq(This.index).addClass("on").siblings().removeClass("on");
                        This.$ul.animate({left:(-This.index*This.width)},300);
                    },3000);
                };
                Banner2.prototype.clear = function(){
                    var This = this;
                    This.$banner.hover(function(){
                        clearInterval(This.timer);
                    },function(){
                        This.auto()
                    })
                };
                var $banner = $(".banner"),
                    $banner_left = $banner.find(".banner_left"),
                    $ul = $banner_left.find("ul"),
                    $li = $ul.find("li"),
                    $tab = $banner_left.find(".banner_left_table a");
                    bannerLeft = new Banner2($ul,$li,$tab,$banner_left);
                bannerLeft.exe();

                /!*banner右边新闻轮播*!/
                function Banner3($ul,$li,$tab){
                    Banner.call(this,$ul,$li,$tab)
                }
                Banner3.prototype = Fn.prototype;
                var $banner_right = $banner.find(".banner_right"),
                    $banner_right_table =*/
            }
        };
    index.topBar();
    index.role_pop();
    index.server_pop();
    index.side_bar();
    index.banner();
}();