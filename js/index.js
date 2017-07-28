var $main = $(".main");
//初始界面
(function(){
    var $item1 = $main.find('.inte .item1');
    setTimeout(function(){
        $item1.addClass('show');
    },1000);
})();

//射线部分
(function(){
    var $oBiu = $main.find('.biu'),
        $img = $oBiu.find('img'),
        $ImgLength = $img.length - 1;

    setTimeout(function(){
        $oBiu.show();
        setTimeout(function(){
            $oBiu.addClass('show');
        },100);
        $main.find('.inte').hide();

        var time = [500,1000,1500,2000];
        for(var i = 0; i < $ImgLength; i++){
            (function(i){
                setTimeout(function(i){
                    $img.eq(i).addClass('show');
                    setTimeout(function(i){
                        $img.eq(i).hide();
                    },2000,i);
                },time[i], i);
            })(i);
        }

        for(var i = 0; i < $ImgLength; i++){
            (function(i){
                setTimeout(function(i){
                    $boom = $img.eq($ImgLength);
                    $boom.addClass('boom'+(i+1));
                    if(i === $ImgLength-1){
                        setTimeout(function(){
                            $boom.addClass('boom5');
                            setTimeout(function(){
                                $boom.addClass('null');
                                setTimeout(function(){
                                    $oBiu.hide();
                                },2000);
                            },500);
                        },1000);
                    }
                },time[i]+1200, i);
            })(i);
        }
    },2500);
})();

//字母组合,字母分解
(function(){
    var $print = $main.find('.print'),
        $i = $print.find('i'),
        $iLenght = $i.length;
    var $mask = $print.find('i.mask');

    //特效部分
    setTimeout(function(){
        $print.addClass('show');
        setTimeout(function(){
            $print.addClass('show2').removeClass('show');
            setTimeout(function(){
                for(var i = 0; i < $iLenght; i++){
                    (function(i){
                        setTimeout(function(i){
                            $i.eq(i).addClass('show');
                            setTimeout(function(){
                                $mask.removeClass('hide');
                                $i.eq(i).removeClass('show');
                            },10000);
                            if(i === $iLenght - 1){
                                $mask.addClass('hide');
                                setTimeout(function(){
                                    $print.addClass('replace');
                                },1500);
                            }
                        },i*100, i);
                    })(i);
                }
            },1000);
        },1000);
    },9200);

    //按钮部分
    (function(){
        var $btn_warp = $main.find('.btn_warp'),
            $pointer = $print.find('.pointer'),
            $length = $pointer.length,
            $btn = $btn_warp.find('.btn');

        var $Btn_music = $('.Btn_music');

        setTimeout(function(){
            $btn_warp.show();
            setTimeout(function(){
                $btn_warp.addClass('show');
            },1000);
        },26100);

        var timer = null;

        $btn.hover(function(){
            clearTimeout(timer);
            $Btn_music.html("");
            $aud = $('<audio src="music/btn_hover.mp3" autoplay="autoplay"></audio>');
            $Btn_music.append($aud);
            timer = setTimeout(function(){
                $Btn_music.html("");
            },900);
            if ($(this).index()===0) {
                fn('addClass', 'btn-index')
            }else if ($(this).index()===1){
                fn('addClass', 'btn-h5')
            }else {
                fn('addClass', 'btn-home')
            }
        },function(){
            if ($(this).index()===0) {
                fn('removeClass', 'btn-index')
            }else if ($(this).index()===1){
                fn('removeClass', 'btn-h5')
            }else {
                fn('removeClass', 'btn-home')
            }
        });

        function fn(mod, className){
            for(var i = 0; i < $length; i ++){
                mod==='addClass'?$pointer.eq(i).addClass(className):$pointer.eq(i).removeClass(className);
            }
        }


    })();
})();
