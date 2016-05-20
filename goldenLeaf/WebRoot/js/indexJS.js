(function($){
    $.fn.ckSlide = function(opts){
		//.extend() 扩展jQuery类，添加ckSlide方法，参数是对象类型{}
        opts = $.extend({}, $.fn.ckSlide.opts, opts);
        this.each(function(){
            var slidewrap = $(this).find('.allblurb_21');//轮播元素父对象
            var slide = slidewrap.find('li');//获取<li>对象集
            var count = slide.length;//计算对象集长度
            var that = this;//存放父对象
            var index = 0;//起始位置
            var time = null;
            $(this).data('opts', opts);//给轮播对象添加参数 数据
			//点击切换相应序号的图片
            $(this).find('.allblurb_22 li').each(function(cindex){
                $(this).on('click.slidebox', function(){
                    change.call(that, cindex, index);
                    index = cindex;
                });
            });
			//自己添加——鼠标移入小圆点切换轮播图片
			$(this).find('.allblurb_22 li').each(function(cindex){
                $(this).on('mouseover.slidebox', function(){
                    change.call(that, cindex, index);
                    index = cindex;
                });
            });
            
            // 鼠标悬停停止自动播放，显示左右切换按钮
            $(this).on('mouseover', function(){
                if(opts.autoPlay){
                    clearInterval(time);
                }
                $(this).find('.ctrl-blurb').css({opacity:0.6});
            });
            //  鼠标离开轮播界面，开始自动播放，同时隐藏按钮
            $(this).on('mouseleave', function(){
                if(opts.autoPlay){
                    startAtuoPlay(opts.interval);
                }
                $(this).find('.ctrl-blurb').css({opacity:0.1});
            });
            startAtuoPlay(opts.interval);
            // 自动滚动播放
            function startAtuoPlay(inum){
                if(opts.autoPlay){
                    time  = setInterval(function(){
                        var old = index;
                        if(index >= count - 1){
                            index = 0;
                        }else{
                            index++;
                        }
                        change.call(that, index, old);
                    }, inum);//2秒
                }
            }
            // 修正box  标记居中
            var box = $(this).find('.allblurb_22');
            box.css({
                'margin-left':-(box.width() / 2)
            })
            // dir  移动方向参数
            switch(opts.dir){
                case "x":
                    opts['width'] = $(this).width();
                    slidewrap.css({
                        'width':count * opts['width']
                    });
                    slide.css({
                        'float':'left',
                        'position':'relative',
						'margin-left':'0px'
                    });
					//.wrap()包裹页面已经定义的.ck-slide-wrapper以及子元素
                    slidewrap.wrap('<div class="ck-slide-dir"></div>');
                    slide.show();
                    break;
				case "y":  //添加垂直移动参数
                    opts['height'] = $(this).height();
                    slidewrap.css({
                        'height':count * opts['height']
                    });
                    slide.css({
                        'float':'left',
                        'position':'relative',
						'margin-top':'0px'
                    });
                    slidewrap.wrap('<div class="ck-slide-dir"></div>');
                    slide.show();
                break;
            }
        });
    };
    function change(show, hide){
		//获取之前设置在ckSlide对象上的参数 数据
        var opts = $(this).data('opts');
		//水平移动
        if(opts.dir == 'x'){
            var x = show * opts['width'];
			//animate() 与css()执行结果相同，但是过程不同，前者有渐变动画效果
            $(this).find('.allblurb_21').stop().animate({'margin-left':-x}, function(){opts['isAnimate'] = false;});
            opts['isAnimate'] = true;//图片在移动过程中设置按钮点击不可用，确保每一次轮播视觉上执行完成，
        }else if(opts.dir == 'y'){//垂直移动——自己添加
            var y = show * opts['height'];
            $(this).find('.allblurb_21').stop().animate({'margin-top':-y}, function(){opts['isAnimate'] = false;});
            opts['isAnimate'] = true;
        }
		else{
			//默认的淡隐淡出效果
            $(this).find('.allblurb_21 li').eq(hide).stop().animate({opacity:0});
            $(this).find('.allblurb_21 li').eq(show).show().css({opacity:0}).stop().animate({opacity:1});
        }
       //切换对应标记的颜色
        $(this).find('.allblurb_22 li').removeClass('current');
        $(this).find('.allblurb_22 li').eq(show).addClass('current');
    }
    $.fn.ckSlide.opts = {
		autoPlay: false,//默认不自动播放
        dir: null,//默认淡隐淡出效果
        isAnimate: false,//默认按钮可用
		interval:2000//默认自动2秒切换 
		 };
})(jQuery);
/*同页跳转*/
function Div(divid,divname,divcount){
for(i=0;i<divcount;i++){
document.getElementById(divname+i).style.display="none";
}
document.getElementById(divname+divid).style.display="block";
}




/*
 * 右下角回到顶部
 */
$(function() {
	var speed = 800;
	var h = document.body.clientHeight;
	$("#toTop").click(function() {
		$('html,body').animate({
				scrollTop: '0px'
			},
			speed);
	});
});
function getTop() {
	if ($(document).scrollTop() > 800) {
		$("#getTop").css({
			'display': 'block',
		});
	} else {
		$("#getTop").css('display', 'none');
	}
	setTimeout(getTop);
}