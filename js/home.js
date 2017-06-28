~function(){
    var obj = {
        $topBar : $(".top_bar"),
        $nav : $(".nav"),
        $banner : $(".banner"),
        $ssTable :$(".shishen_table"),
        $gonglue : $(".gonglue")
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
                Banner2.prototype = new Fn();
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

                /*增加新的轮播*/
                var mainBanner = {
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
                                    num++;
                                    if(num === 5) break;
                                }
                            }
                            $(this).append($ul);
                        });
                        var banner = new Banner($ul,$li,$tab,$banner_right);
                        banner.exe();
                    },
                    banner4 : function(){
                        var $que = obj.$gonglue.find(".gonglue_left .searchBody .question"),
                            $ul = $que.find(".question_pic ul"),
                            $li = $ul.children(),
                            $tab = $que.find(".question_table a");
                        var gongluebanner = new Banner($ul,$li,$tab);
                        gongluebanner.exe();
                    }
                };
                mainBanner.banner2();
                mainBanner.banner3();
                mainBanner.banner4();
            },
            /*式神介绍*/
            ssIntroduce : function(){
                var $table = obj.$ssTable.find(".shishen_table_top a"),
                    $mainBtm = obj.$ssTable.find(".shishen_table_btm .sszjList"),
                    $ssBtm = obj.$ssTable.find(".shishen_table_btm .ssList"),
                    $ssBtmMain = $ssBtm.find("ul .list"),
                    $ssBtmList= $ssBtm.find(".ssList_btm ul li .ss_container"),
                    $lv_table = $ssBtm.find(".ssList_top .lv_table a");
                /*生成所有式神*/
                var count = [
                    [0,null],
                    [0,null],
                    [0,null],
                    [0,null],
                    [0,null]
                ];
                for (var i=0,length =shishenData.length ;i<length;i++){
                    var index=0;
                    switch (shishenData[i].level){
                        case "SSR":
                            index = 1;
                            break;
                        case "SR":
                            index = 2;
                            break;
                        case "R":
                            index = 3;
                            break;
                        case "N":
                            index = 4;
                            break;
                    }
                    count[0][0]++;
                    count[index][0]++;
                    if(count[0][0]%2){
                        count[0][1] = $("<li></li>");
                        $ssBtmList.eq(0).append(count[0][1]);
                    }
                    if(count[index][0]%2){
                        count[index][1] = $("<li></li>");
                        $ssBtmList.eq(index).append(count[index][1]);
                    }
                    var str = shishenData[i].isNew?"<em></em>":"";
                    $div = $("<div class='ss_details'><span><b>"+shishenData[i].name+"</b></span><img src='images/index/ss/"+shishenData[i].id+".png'>"+str+"</div>");
                    $clone = $div.clone();
                    count[0][1].append($div);
                    count[index][1].append($clone);
                }
                $table.click(function(){
                    var i = $(this).index(".shishen_table_top a");
                    $(this).addClass("on").siblings().removeClass("on");
                    $mainBtm.eq(i).addClass("on").siblings().removeClass("on");
                });
                $lv_table.click(function(){
                    $(this).addClass("on").siblings().removeClass("on");
                    $ssBtmMain.eq($(this).index()).addClass("on").siblings().removeClass("on");
                });

                /*式神左右按钮*/
                $ssBtmMain.each(function(){
                    var $btn = $(this).children(".btnItem"),
                        $li = $(this).find(".ss_container li"),
                        MaxNum = Math.ceil($li.length/6),
                        index = $(this).index();
                        this.num = 0;
                        this.num !==0?$btn.eq(0).show():$btn.eq(0).hide();
                        this.num !==(MaxNum-1)?$btn.eq(1).show():$btn.eq(1).hide();
                        $btn.click(function(){
                            var parent = this.parentNode;
                            if ($(this).index() ===2 ){
                                parent.num++;
                                parent.num = Math.min(parent.num,MaxNum);
                                $ssBtmList.eq(index).css("marginLeft",-840*parent.num)
                            }else {
                                parent.num--;
                                parent.num = Math.max(0,parent.num);
                                $ssBtmList.eq(index).css("marginLeft",-840*parent.num)
                            }
                            parent.num !==0?$btn.eq(0).show():$btn.eq(0).hide();
                            parent.num !==(MaxNum-1)?$btn.eq(1).show():$btn.eq(1).hide();
                        })
                })

                /*主角切换*/
                var $zjList= obj.$ssTable.find(".shishen_table_btm .zhujueList"),
                    $zjTable = $zjList.find(".zhujueTable a"),
                    $zjPic = $zjList.find(".zhujuePic .picList");
                $zjTable.click(function(){
                    $(this).addClass("hover").siblings().removeClass("hover");
                    $zjPic.eq($(this).index()).addClass("on").siblings().removeClass("on");
                })
            }

        };
    index.topBar();
    index.role_pop();
    index.server_pop();
    index.side_bar();
    index.banner();
    index.ssIntroduce();
}();