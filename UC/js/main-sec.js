

var HH = innerHeight;
var f = 0;
var timer = null;

$(function () {
    $(document).resize(function () {
        HH = innerHeight;
    })
})


$(function () {
    //两种方式
    $('.btn-twocode').mouseover(function () {
        $('.twocode').css('display','block');
    }).mouseout(function () {
        $('.twocode').css('display','none');
    })
    // $('.btn-twocode').hover(function(){
    //         $('.twocode').show();
    //     },function(){
    //         $('.twocode').hide();
    // })
})
function addMouseWheel(obj,fn){
    function fnWheel(ev) {
        var oEvent = ev || event;
        var down = false;
        if(oEvent.wheelDelta)
        {
            down = oEvent.wheelDelta < 0 ? true:false;
        }
        else if(oEvent.detail){
            down = oEvent.detail < 0 ? false:true;
        }
        fn(down);
        oEvent.preventDefault && oEvent.preventDefault();
        return false;
    }
    if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1)
    {
        obj.addEventListener('DOMMouseScroll',fnWheel,false);
    }
    else{
        obj.onmousewheel = fnWheel;
    }
}

$(function () {
     mouseEvent();
     tomove(f);
     $('#div,#div>div').css('height',HH+'px');
    //注意，position:relative;也可以和top/left/right/bottom属性联合使用，用来表示盒子原本的位置发生了偏移
    $('#div>div').css('top',0);

    function mouseEvent() {
        //注意要将参数down传递进去
        addMouseWheel(document,function (down) {

            if(down && f <= $('#div>div').length-1)
            {
                $('.keyboard').css('background-position','-190px 0');
            }
            else if(f>0)
            {
                $('.keyboard').css('background-position','-120px 0');
            }
            clearTimeout(timer);
            timer = setTimeout(function () {
                if(down && f<=$('#div>div').length-1)
                {
                    f++;
                    if(f==$('#div>div').length)
                    {
                        f=0;
                        tomove(f);
                    }
                    tomove(f);
                }
                else if(f>0)
                {
                    f--;
                    tomove(f);
                }
                $('.keyboard').css('background-position','0 0');
            },200);

        });
    }
    function tomove(f) {
        //注意：这里移动的对象是#div底下的几个div，
        // 如果直接针对#div,移动的是整个外框，里面就什么都看不见了；
        //所以这里是保持外框#div不动，使里面的子元素div进行滚动；
        $('#div>div').css('top',-HH*f);
        $('#nav li.active').removeClass('active');
        $('#nav li').eq(f).addClass('active');

        if(f==0){
            timer=setTimeout(function(){
                $('#div1 .wrap').animate({'opacity':'1'});
                $('#div1 .enter').animate({'top':'40px'});
                $('#div1 .people').css({'top':'50%','opacity':'1'});
                $('#div1 .line-t-l').css({'marginTop':'0','margin-left':'-332px'});
                $('#div1 .line-t-r').css({'marginTop':'0','margin-left':'182px'});
                $('#div1 .line-t-r2').css({'marginTop':'0','margin-left':'237px'});
                $('#div1 .line-b-l').css({'top':'530px','marginLeft':'-356px'});
                $('#div1 .line-b-r').css({'top':'560px','marginLeft':'-55px'});
                $('#div1 .txt-l').css({'margin-left':'-534px'});
                $('#div1 .txt-r').css({'margin-left':'129px'});
                $('#div1 .down-android').css({'bottom':'10%'});
                $('#div1 .down-ios').css({'bottom':'10%'});
                $('#div1 .btn-twocode').css({'left':'50%'});

            },300)
        }
        else{
            $('#div1 .wrap').animate({'opacity':'0'});
            $('#div1 .enter').animate({'top':'-50px'});
            $('#div1 .people').css({'top':'40%','opacity':'0'});
            $('#div1 .line-t-l').css({'marginTop':'-300px','margin-left':'-500px'});
            $('#div1 .line-t-r').css({'marginTop':'-300px','margin-left':'0px'});
            $('#div1 .line-t-r2').css({'marginTop':'0','margin-left':'182px'});
            $('#div1 .line-b-l').css({'top':'720px','marginLeft':'-500px'});
            $('#div1 .line-b-r').css({'top':'720px','marginLeft':'-300px'});
            $('#div1 .txt-l').css({'margin-left':'-684px'});
            $('#div1 .txt-r').css({'margin-left':'279px'});
            $('#div1 .down-android').css({'bottom':'0%'});
            $('#div1 .down-ios').css({'bottom':'0%'});
            $('#div1 .btn-twocode').css({'left':'60%'});
        }
        if(f==1)
        {
            timer=setTimeout(function () {
                $('#div2 .wrap').animate({'opacity':'1'});
                $('#div2 .txt1').css({'left':'50%'});
                $('#div2 .txt2').css({'left':'50%'});
                $('#div2 .video').css({'left':'50%'});
                $('#div2 .down-android').css({'bottom':'10%'});
                $('#div2 .down-ios').css({'bottom':'10%'});
                $('#div2 .btn-twocode').css({'left':'50%'});
                $('#div2 .mobile-scroll').css({'background-position':'0px -840px'});
                $('#div2 .logo').css({'top':'40px'});
                $('#div2 .enter').animate({'top':'40px'});

            },300)
        }
        else{
            $('#div2 .wrap').animate({'opacity':'0'});
            $('#div2 .txt1').css({'left':'60%'});
            $('#div2 .txt2').css({'left':'60%'});
            $('#div2 .video').css({'left':'60%'});
            $('#div2 .down-android').css({'bottom':'0%'});
            $('#div2 .down-ios').css({'bottom':'0%'});
            $('#div2 .btn-twocode').css({'left':'60%'});
            $('#div2 .mobile-scroll').css({'background-position':'0px 0px'});
            $('#div2 .logo').css({'top':'-40px'});
            $('#div2 .enter').animate({'top':'-50px'});

        }
        if (f==2) {
            timer=setTimeout(function(){
                $('.video-player').attr('src','img/video.mp4');
                $('#div3 .wrap').animate({'opacity':'1'});
                $('#div3 .txt1').css({'left':'50%'});
                $('#div3 .txt2').css({'left':'50%'});
                $('#div3 .txt3').css({'left':'50%'});
                $('#div3 .txt4').css({'left':'50%'});
                $('#div3 .video2').css({'left':'50%'});
                $('#div3 .logo').css({'top':'40px'});
                $('#div3 .enter').animate({'top':'40px'});
            },300)
        }
        else{
            $('#div3 .wrap').animate({'opacity':'0'});
            $('#div3 .txt1').css({'left':'56%'});
            $('#div3 .txt2').css({'left':'56%'});
            $('#div3 .txt3').css({'left':'56%'});
            $('#div3 .txt4').css({'left':'56%'});
            $('#div3 .video2').css({'left':'40%'});
            $('#div3 .logo').css({'top':'-40px'});
            $('#div3 .enter').animate({'top':'-50px'});
        }
        if(f==3)
        {
            timer = setTimeout(function () {
                $('#div4 .txt1').css({'marginTop':'-300px'});
                $('#div4 .txt2').css({'marginTop':'-270px'});
                $('#div4 .txt3').css({'marginTop':'-140px'});
                $('#div4 .manlist').css({'marginTop':'-50px'});
                $('#div4 .logo').css({'top':'40px'});
                $('#div4 .enter').css({'top':'40px'});
            },300)
        }
        else
        {
            $('#div4 .txt1').css({'marginTop':'600px'});
            $('#div4 .txt2').css({'marginTop':'600px'});
            $('#div4 .txt3').css({'marginTop':'600px'});
            $('#div4 .manlist').css({'marginTop':'-600px'});
            $('#div4 .logo').css({'top':'-40px'});
            $('#div4 .enter').css({'top':'-50px'});
        }
        if(f==4)
        {
            timer = setTimeout(function () {
                $('#div5 .houxuan').css({'marginLeft':'-630px'});
                $('#div5 .txt1').css({'marginLeft':'120px'});
                $('#div5 .txt2').css({'marginLeft':'126px'});
                $('#div5 .txt3').css({'marginLeft':'128px'});
                $('#div5 .mv').css({'marginLeft':'128px'});
                $('#div5 .logo').css({'top':'40px'});
                $('#div5 .enter').css({'top':'40px'});
            },300)
        }
        else{
            $('#div5 .houxuan').css({'marginLeft':'-1500px'});
            $('#div5 .txt1').css({'marginLeft':'500px'});
            $('#div5 .txt2').css({'marginLeft':'500px'});
            $('#div5 .txt3').css({'marginLeft':'500px'});
            $('#div5 .mv').css({'marginLeft':'500px'});
            $('#div5 .logo').css({'top':'-40px'});
            $('#div5 .enter').css({'top':'-50px'});
        }
    }

    //导航栏功能
    $('#nav li').click(function () {
        var o = $('#nav li').index(this);
        tomove(o);
    });

    $(document).keydown(function (e) {
        var keycode = e.which;
        if(keycode == 38 && f>0)
        {
            $('.keyboard').css('background-position','-120px 0');
        }
        else if(keycode==40 && f<$('#div>div').length-1)
        {
            $('.keyboard').css('background-position','-190px 0');
        }
        clearTimeout(timer);
        timer=setTimeout(function () {
            if(keycode==38 && f>0)
            {
                f--;
                tomove(f);
            }
            else if(keycode==40 && f<=$('#div>div').length-1)
            {
                f++;
                if(f==$('#div>div').length)
                {
                    f=0;
                }
                tomove(f);
            }
            $('.keyboard').css('background-position','0 0');
        },200)
    })

})



//添加首页中的21张背景图片
$(function () {
    $('.bg').css('height',HH+'px');
    for(var i=0;i<21;i++)
    {
        var oLi = '<li></li>';
        $('.bg').append(oLi);
    }
    $(".bg li").each(bg);
    function bg(i,e) {
        if (i<9) {
            $('.bg li').eq(i).css('background-image','url(img/man0'+(i+1)+'.jpg)');
        }
        else if(i<=20){
            $('.bg li').eq(i).css('background-image','url(img/man'+(i+1)+'.jpg)');
        }
        else if(i<=29)
        {
            $('.bg li').eq(i).css('background-image','url(img/man0'+(i-20)+'.jpg)');
        }
        else{
            $('.bg li').eq(i).css('background-image','url(img/man'+(i-20)+'.jpg)');
        }
    }
})
//第二页 手机滑动部分
$(function () {
    $('#mobile').mousemove(function (e) {
        var E = e || event;
        //计算偏移量
        var x = E.clientX - $(this).offset().left;
        var y = E.clientY - $(this).offset().top;
        x = x/100;
        y = y/100;
        $('.triangle').css('left',(50-x)+'%');
        $('.triangle').css('top',(50-y)+'%');
    });
})

//第二、三页视频
$(function () {
    $('#vtab li').eq(0).click(function () {
        $('#vtab').addClass('tab-0');
        $('#vtab').removeClass('tab-1');
        $('#vlist').animate({'left':'0px'},"normal");
    });
    $('#vtab li').eq(1).click(function () {
        $('#vtab').addClass('tab-1');
        $('#vtab').removeClass('tab-0');
        $('#vlist').animate({'left':-$('#vlist li').width()+'px'},"normal");
    });
    $('#vlist li').eq(0).click(function () {
        $('#video').show();
        $('#video_playing').attr('src','http://image.uc.cn/s/uae/g/01/brand/ucproduct1.mp4')
    });
    $('#vlist li').eq(1).click(function () {
        $('#video').show();
        $('#video_playing').attr('src','http://image.uc.cn/s/uae/g/01/brand/uclicheng.mp4');
    });

    
    //如果用nth-child(n)，n从1开始而非0
    $('#vtab2 li').eq(0).click(function () {
        $('#vtab2').addClass('tab-0');
        $('#vtab2').removeClass('tab-1');
        $('#vtab2').removeClass('tab-2');
        //animate默认动画速度为normal
        $('#vlist2').animate({'left':'0px'},"normal");
    });
    $('#vtab2 li').eq(1).click(function () {
        $('#vtab2').addClass('tab-1');
        $('#vtab2').removeClass('tab-0');
        $('#vtab2').removeClass('tab-2');
        $('#vlist2').animate({'left':-$('#vlist2 li').width()+'px'});
    });
    $('#vtab2 li').eq(2).click(function () {
        $('#vtab2').addClass('tab-2');
        $('#vtab2').removeClass('tab-0');
        $('#vtab2').removeClass('tab-1');
        $('#vlist2').animate({'left':-2*$('#vlist2 li').width()+'px'});
    });

    $('#vlist2 li').eq(0).click(function () {
        $('#video').show();
        $('#video_playing').attr('src','http://image.uc.cn/s/uae/g/01/brand/family.mp4')
    });
    $('#vlist2 li').eq(1).click(function () {
        $('#video').show();
        $('#video_playing').attr('src','http://image.uc.cn/s/uae/g/01/brand/love.mp4');
    });
    $('#vlist2 li').eq(2).click(function () {
        $('#video').show();
        $('#video_playing').attr('src','http://image.uc.cn/s/uae/g/01/brand/dream.mp4')
    });

    $('.radius_close').click(function () {
        //仅仅作隐藏操作，会发现虽然关闭了界面但是声音仍然在播放
        $('#video').hide();
        //”$('#video').pause();“无法暂停：jQuery选择器返回的是jQuery对象，无pause()方法，可由trigger()触发pause事件，如“$('#video').trigger('pause');”；另外也可通过dom对象直接使用pause()，如“document.getElementById('video').pause();”。
        //trigger() 方法触发被选元素的指定事件类型。
        // $('#video_playing').trigger('pause');
        document.getElementById('video_playing').pause();
    });
    $('.btn-play').click(function () {
        $('.video-player').attr('src','http://image.uc.cn/s/uae/g/01/brand/video.mp4');
    })
})

//第四页
$(function () {
    $('.manlist li').mousemove(function () {
        $(this).children().css('opacity','1');
        $(this).children().css('filter','alpha(opacity=100)');
    });
    $('.manlist li').mouseout(function () {
        $(this).children().css('opacity','0');
        $(this).children().css('filter','alpha(opacity=0)');
    });
    var index = 0;
    $('.manlist li').click(function () {
        var order = $('.manlist li').index(this);
        $('.popwin').show();
        manlist(order);
        index = order;
    });
    $('.btn-left').click(function () {
        if(index>0)
        {
            index--;
            manlist(index);
        }
        else
        {
            index = 0;
            manlist(index);
        }
    });
    $('.btn-right').click(function () {
        if(index < $('#imglist li').length-1)
        {
            index++;
            manlist(index);
        }
        else
        {
            index = $('#imglist li').length-1;
            manlist(index);
        }
    });
    function manlist(index){
        var w = $('#imglist li').width();
        $('#imglist').animate({'left':-w*index+'px'},600);
    }
    //左右键控制翻转
    $(document).keydown(function (e) {
        var keycode = e.which;
        if(keycode == 37 && index > 0)
        {
            index--;
            manlist(index);
        }
        else if(keycode == 39 && index < $('#imglist li').length-1)
        {
            index++;
            manlist(index);
        }
    });


    $('.btn-close').click(function () {
        $('.popwin').hide();
    });

    $('#div4').mousemove(function (e) {
        var E = e || event;
        //event.clientX、event.clientY 是鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标），不包括工具栏和滚动条。
        var x = E.clientX;
        var y = E.clientY;
        x = x / innerWidth;
        y = y /innerHeight;
        $('.tatter').css('left',(50-x)+'%');
        $('.tatter').css('top',(50-y)+'%');
    });
})

//第五页
$(function () {
    $('#div5 .mv').click(function () {
        $('#video').show();
        $('#video_playing').attr('src','http://image.uc.cn/s/uae/g/01/song/dong_mv.mp4');
    })
})