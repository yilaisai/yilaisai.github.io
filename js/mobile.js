/**
 * Created by Sai on 2017/7/22.
 */


$(function($){
    run();
    $(window).resize(run);
    function run(){
        var  n = window.innerWidth;
        var font= n/30;
        font = Math.min(font,20);
		font = Math.max(font,10);
        $("html")[0].style.fontSize = font+"px";
    }
});
var swiper_banner = new Swiper("section.banner");
var swiper_details = new Swiper("#app",{
    pagination: '.swiper-pagination',
    paginationClickable :true
});
var swiper_more = new Swiper("#more_content1",{
    slidesPerView : 4,
    autoplay:3000
});
var swiper_more2 = new Swiper("#more_content2",{
    slidesPerView : 4,
    autoplay:3000
});
var swiper_more3 = new Swiper("#more_content3",{
    slidesPerView : 4,
    autoplay:3000
});



