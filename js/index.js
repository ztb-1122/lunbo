(function($){
	var config = {
        item: 'view-box',
        panel: 'dragView_panel',
        module: 'drag_module'
    };
    var move=false;
    //拖拽对象偏移量 top:对象距离可视化区域上边距离
      range = { top: 0, y1: 0, y2: 0, y: 0 };
     function loopModule(){
     	 $('.' + config.module).each(function(){
     	 	var then = $(this);
            then.find('.btn-delete').unbind('click');
            then.find('.btn-delete').bind('click', function () {
            	if(window.confirm("确定要删除此版块？")){
            		$(this).parents("."+config.module).remove();
            	}
               
            });
           // then.unbind('mouseover mouseout');
            then.bind('mouseover', function () {
                $(this).addClass('active');
            }).bind('mouseout',function(){
            	$(this).removeClass('active');

            });
          //  then.find('.'+headClass).unbind("mousedown");
           
          
            then.find('.'+headClass).bind("mousedown",function(e){
            	e=e||window.event;
            	e.preventDefault;
            	/*
            	if(move){
            		return;
            	}
            	*/        
            	 //拖拽对象
                //theDiv = $(this).parent();
               var theDiv=$(this).parent();
                //鼠标元素相对偏移量,父class:dragView_panel
               var mouseY = e.pageY - theDiv.offset().top;

                 //panel 内相对位置
               

                range.top=theDiv.offset().top-$(panel).offset().top;
                range.y1=e.pageY;
                theDivId=theDiv.index();
                theDivHeight=theDiv.height();
               // move=true;
                 theDiv.attr("class",dashClass);
                 theDiv.css({top:range.top+"px"});

                 $('<div class="' + tempClass + '"></div>').insertBefore(theDiv);
                 tempDiv = $('.' + tempClass); //获得临时 虚线框的对象

                  moduleSort();


            });

     	 });

     }
     function moduleSort(){

     	 $(panel).mousemove(function (e) {
           // if (!move) return;
            e.preventDefault();

            range.y2 = e.pageY;
            //range.y drag_module在dragView_panel内的心新坐标。
            range.y = range.top + (range.y2 - range.y1);
           
        });

     }
    this.dragView = {
        init: function (options) {
            if (options) {
                for (var key in options) {
                    config[key] = options[key];
                }
            }

         //   item = $('.' + config.item);
            panel = $('.' + config.panel);

            tempClass = config.module + '_temp';
            dashClass = config.module + '_dash';
            maskClass = config.module + '_mask';
            headClass = config.module + '_head';
            btnClass = config.module + '_btn';

            loopModule();
          //  moduleAdd();

          //  return this;
        },
       
    }

})(jQuery);