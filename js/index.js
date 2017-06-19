!function(){
    var obj = {
        $warp: $("#warp"),
        $newInf : $("#newInf")
    };

    var home = {
        fadeIn : function(){
            var $swp = obj.$warp.find(".swp"),
                $video = obj.$warp.find(".video"),
                $videoBtn = obj.$warp.find(".videoBtn"),
                $close = $video.find(".close");

            /*首屏滑入*/
            $swp.eq(0).animate({
                opacity:1,
                left:0
            },1500);
            $swp.eq(1).animate({
                opacity:1,
                right:0
            },1500);
            $swp.eq(2).animate({
                opacity:1,
                top:80
            },1000);
            $swp.eq(3).animate({
                opacity:1,
                top:610
            },1000);

            /*小视频弹窗*/
            $videoBtn.click(function(){
                $video.show();
                $(document.body).addClass("noScroll");
            });
            $close.click(function(){
                $video.hide();
                $(document.body).removeClass("noScroll");
            });
            home.banner();
            home.newInfo();
            home.delayLoin();
        },

        /*新版本情报*/
        newInfo : function(){
            var $pop = obj.$newInf.find(".popWindow"),
                $newsLi = obj.$newInf.find(".news li"),
                $popLi = $pop.find("li"),
                $maintxt = $pop.find(".maintxt"),
                $close = $pop.find(".close"),
                $btn = $pop.find(".btn span");

            $maintxt.each(function(){
                var $txt = $(this).find(".txt"),
                    $scroll = $(this).find(".scroll"),
                    $bar = $scroll.find(".bar"),
                    txtH = $txt.height(),
                    mainH = $(this).height(),
                    barHeight = mainH*mainH/txtH,
                    maxTop = mainH - barHeight,
                    minTop = 0,
                    index=0;
                $bar.height(barHeight);

                /*鼠标滚动*/
                $maintxt.mousewheel(function(e,d){
                    var top = $bar.position().top;
                    if (d<0){
                        top+=10;
                    }else {
                        top-=10;
                    }
                    top = Math.max(top,minTop);
                    top = Math.min(top,maxTop);
                    $bar.css("top",top);
                    $txt.css("top",-txtH*top/mainH);
                    return false;
                });

                /*滚动条拖动*/
                $bar.mousedown(function(e){
                    var y = e.clientY,
                        barTop = $(this).position().top;
                    $(document).mousemove(function(e){
                        var moveY = e.clientY - y,
                            top = barTop+moveY;
                        top = Math.max(top,minTop);
                        top = Math.min(top,maxTop);
                        $bar.css("top",top);
                        $txt.css("top",-txtH*top/mainH);
                    }).mouseup(function(){
                        $(this).off("mousemove").off("mouseup");
                    });
                    return false;
                });

                /*点击空白滚动栏*/
                $scroll.click(function(e){
                    if  (e.target === this){
                        var y = e.clientY - ($maintxt.position().top + $scroll.position().top+$bar.height()),
                            top = $bar.position().top;
                        top = y>top?top+100:top-100;
                        top = Math.max(top,minTop);
                        top = Math.min(top,maxTop);
                        $bar.stop().animate({top:top},500);
                        $txt.stop().animate({top:-txtH*top/mainH},500);
                    }
                });
            });
            $pop.hide().css("opacity",1);;
            $popLi.hide();

            /*最新情报点击弹窗*/
            $newsLi.click(function(){
                index = $(this).index();
                $pop.show();
                $(document.body).addClass("noScroll");
                $popLi.eq(index).show().siblings().hide();
            });
            $close.click(function(){
                $pop.hide();
                $(document.body).removeClass("noScroll");
            });

            /*弹窗后的左右切换*/
            $btn.click(function(){
                if ($(this).index()){
                    index++;
                    index = index%$popLi.length;
                    $popLi.eq(index).show().siblings().hide();
                }else {
                    index--;
                    if (index<0) index = $popLi.length-1;
                    $popLi.eq(index).show().siblings().hide();
                }
            });
        },

        /*3D轮播*/
        banner : function(){
            var $game = $("#gameSpecial"),
                $liList = $game.find(".banner .img ul li"),
                index = 0,
                $btn = $game.find(".banner .btn span"),
                length = $liList.length;

            $liList.click(function(){
                if ($(this).index()!==index){
                    index = $(this).index();
                    var leftIndex = index-1,
                        rightIndex = index+1;
                    if (leftIndex<0) leftIndex = length-1;
                    if (rightIndex>=length) rightIndex = 0;
                    $liList.removeClass("left middle right");
                    $liList.eq(leftIndex).addClass("left");
                    $liList.eq(index).addClass("middle");
                    $liList.eq(rightIndex).addClass("right");
                }
            });

            /*左右切换*/
            $btn.click(function(){
                if($(this).index()){
                    index++;
                    index%=length;
                }
                else {
                    index--;
                    if (index<0) index = length-1;
                }
                var leftIndex = index-1,
                    rightIndex = index+1;
                if (leftIndex<0) leftIndex = length-1;
                if (rightIndex>=length) rightIndex = 0;
                $liList.removeClass("left middle right");
                $liList.eq(leftIndex).addClass("left");
                $liList.eq(index).addClass("middle");
                $liList.eq(rightIndex).addClass("right");
            });
        },

        /*加载延迟效果*/
        delayLoin :function(){
            var $game = $("#gameSpecial"),
                $foot = $("#foot"),
                $gamep = $game.find(".mainBody p"),
                $banner = $game.find(".mainBody .banner"),
                $p = obj.$newInf.find(".news p"),
                $liList = obj.$newInf.find(".news ul li"),
                objArr = [];
            int($p,$liList,$gamep,$banner,$foot);
            $(window).scroll(function(){
                var top = $(document).scrollTop()+$(window).height();
                for (var i=objArr.length-1;i>=0;i--){
                    if (top > (objArr[i].offset().top-200)){
                        var obj = objArr[i];
                        (function(){
                            var $This= obj;
                            setTimeout(function(){
                                $This.removeClass("hide");
                            },$This.index()%10*200);
                            objArr.slice(i,1);
                        })();
                    }
                }
            });

            function int(){
                for (var i=0,j=arguments.length;i<j;i++){
                    arguments[i].each(function(){
                        objArr.push($(this));
                    });
                }
            }

        }
    };
    home.fadeIn();
}();