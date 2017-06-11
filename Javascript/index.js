/*载入页面最顶部的广告*/
(function(){
    var top_event = document.getElementById("top_event"),
        eventColse = document.getElementById("top_event_close");
        eventColse.onclick = function(){
            top_event.className = "close";
        }
})();

/*配送城市选择*/
(function(){
    var shortcut = document.getElementById("shortcut"),
        left = shortcut.children[0].children[0],
        leftShow = left.children[0],
        leftHide = left.children[1],
        oLi = leftHide.getElementsByTagName("a"),
        oSpan = leftShow.getElementsByTagName("span")[0],
        index=0;
        left.onmouseenter = function(){
            addClass(leftShow,"hover");
            addClass(leftHide,"hover");
        }
        left.onmouseleave =function(){
            removeClass(leftShow,"hover");
            removeClass(leftHide,"hover");
        }
        for (var i=0;i<oLi.length;i++){
            oLi[i].index = i;
            oLi[i].onclick = function(){
                removeClass(oLi[index],"on");
                index = this.index;
                addClass(oLi[index],"on");
                if (this.innerText !== oSpan.innerText) oSpan.innerText = this.innerText;
            }
        }
})();

/*container广告自动轮播*/
(function(){
    var oContainer = document.getElementById("container"),
        oPlay = oContainer.querySelector(".container_body_top"),
        oSpan  = oPlay.querySelector(".container_body_btn"),
        oLi = oContainer.querySelectorAll(".container_body .container_body_top .container_body_top_img ul li"),
        oTable = oContainer.querySelectorAll(".container_body .container_body_top .container_body_table ul li"),
        oBtn = oContainer.querySelectorAll(".container_body .container_body_top span"),
        length = oLi.length,
        index = 0,
        timer = null;
    auto();
    for (var i=0;i<length;i++){
        oTable[i].index = i;
        oTable[i].onmouseenter = function(){
            var This = this;
            change(function(){
                index = This.index;
            });
        }
    }
    for (i=0;i<2;i++){
        oBtn[i].index = i;
        oBtn[i].onclick = function(){
            var This = this;
            change(function(){
                if (This.index){
                    index++;
                    index%=length;
                }else {
                    index--;
                    if(index<0)index=length-1;
                }
            })
        }
    }
    oPlay.onmouseenter = function(){
        clearInterval(timer);
        addClass(oSpan,"show");
    };
    oPlay.onmouseleave = function(){
        auto();
        removeClass(oSpan,"show");
    }
    function auto(){
        timer = setInterval(function(){
            change(function(){
                index++;
                index%=length;
            })
        },2000)
    }
    function change(fn){
        removeClass(oTable[index],"on");
        removeClass(oLi[index],"show");
        fn();
        addClass(oTable[index],"on");
        addClass(oLi[index],"show");
    }
})();

/*contianer右边的效果*/
(function(){
    var oContainer = document.getElementById("container"),
        oMoreList = oContainer.querySelectorAll(".container_right .more .more_top .more_top_left"),
        oSpace = oContainer.querySelector(".container_right .more .more_top .more_top_space"),
        oUl = oContainer.querySelectorAll(".container_right .more .more_bottom ul");

    /*促销&公告的滑动*/
    for (var i= 0;i<oMoreList.length;i++){
        oMoreList[i].index = i;
        oMoreList[i].onmouseenter = function(){
            if (this.index) {
                addClass(oSpace,"right");
                addClass(oUl[1],"on");
                removeClass(oUl[0],"on");
            }else {
                removeClass(oSpace,"right");
                addClass(oUl[0],"on");
                removeClass(oUl[1],"on");
            }
        }
    }
    /*充值动画效果*/
    var jService = document.getElementById("j_service"),
        topService = jService.querySelector(".more_service_top"),
        bottomService = jService.querySelector(".more_service_bottom"),
        popLi = jService.querySelectorAll(".more_service_top ul li.pop_li"),
        ashow = jService.querySelectorAll(".more_service_top ul .ashow"),
        popSpan = jService.querySelectorAll(".more_service_top ul .hidespan"),
        popDiv = jService.querySelectorAll("#four_choose ul li"),
        length = popLi.length;
        for (i = 0;i<length;i++){
            popLi[i].onmouseenter = function(){
                addClass(topService,"hide");
                addClass(bottomService,"show");
                for (var j=0;j<length;j++){
                    ashow[j].style.display = "none";
                    popSpan[j].style.display = "block";
                }
            }
        }
})();



function addClass(obj,name){
    var oldName = obj.className.split(" ");
    var addName = name.split(" ");
    var newName = oldName.concat(addName);
    for(var i=0;i<newName.length;i++)for (var j=newName.length-1;j>i;j--) if(newName[i] == newName[j]) newName.splice(j,1);
    obj.className = newName.join(" ");
}
function removeClass(obj,name){
    var oldName = obj.className.split(" ");
    var removeName = name.split(" ");
    for (var i=0;i<oldName.length;i++) for(var j = 0;j<removeName.length;j++) if(oldName[i] == removeName[j]) oldName.splice(i,1);
    obj.className = oldName.join(" ");
}