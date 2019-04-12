$(function () {
    var $btn = $('#btn'),
        // new_task = {},
        $delete_task,
        $task_detail = $('.task-detail'),
        $task_detail_mask = $('.task-detail-mask'),
        $detail_task,
        current_index,
        $update_form,
        $task_detail_content,
        $task_item,
        $checkbox_complete,
        $msg = $('.message'),
        $msg_content = $('.msg-content'),
        $msg_confirm = $('.end'),
        $msg_later = $('.later'),
        $alert = $('.alert')[0],
        $body = $('body'),
        task_list = {},
        timer = null,
        alert_index,
        $alert_add = $('.add'),
        $alert_minus = $('.minus'),
        $ltime = $('.later-time')
        ;

    //store为本地存储，调用了store.js
    // store.clear();

    init();

    function init() {
        //初始化时要注意若task_list中一条数据都没有，则会返回undefined;
        // task_list = store.get('task_list');

        task_list = store.get('task_list') || [];
        if(task_list.length)
        {
            render_task_list();
        }
        task_remind_check();
    }

    //监控当前日期的变化，当然这里得首先判断该task是否已经提示过
    function task_remind_check(){
        var current_time;
        var itl = setInterval(function () {
            for(var i=0;i<task_list.length;i++)
            {
                var item = get(i),task_time;
                if(!item || !item.remind_date || item.complete)
                {
                    continue;
                }
                else{
                    current_time = (new Date()).getTime();//得到毫秒数
                    task_time = (new Date(item.remind_date)).getTime();
                    if(current_time-task_time>=1)
                    {
                        alert_index = i;
                        show_msg(item.content);
                    }
                }
            }
        },300);
    }

    //task到时提醒
    function show_msg(content){
        if(!content) return;
        $msg_content.html(content);
        $alert.play();//播放背景音乐
        $msg.show();
    }
    function hide_msg() {
        $msg.hide();
    }

    $msg_confirm.on('click',function () {
        //1.隐藏提示框 2.停止播放mp3 3.设置task-item为checked
        update_task(alert_index,{complete: true});
        hide_msg();
        $alert.pause();
    });
    $msg_later.on('click',function () {
    //    增加延时提醒功能

        var value = $ltime.text();
        var current_time = (new Date()).getTime();
        //延时一分钟后提醒
        var time = (current_time + parseInt(value)*60000);
        var later_time = (new Date( time )).toLocaleString() ;
        update_task(alert_index,{remind_date: later_time});
        hide_msg();
    });
    //更改时间样式
    Date.prototype.toLocaleString = function() {
        return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
    };

    $alert_add.on('click',function () {
        var value = $ltime.text();
        $ltime.text(parseInt(value)+1);

    });

    $alert_minus.on('click',function () {
        var value = $ltime.text();
        if(parseInt(value)-1 > 0)
        {
            $ltime.text(parseInt(value)-1);
        }
    });


    //自定义弹出框，显示弹出信息
    function my_alert(arg,data){
        if(!arg)
        {
            console.log('title is required');
        }
        var dfd,
            button_confirmed,
            $box,
            $mask,
            conf = {},
            $content,
            $button_confirm,
            $button_cancel;

        if(typeof arg == 'string')
        {
           conf.title = arg;
        }
        else{
            conf = $.extend(conf,arg);
        }

        $box = $('<div class="pop-alert">'+
            '<div class="alert-title">'+ conf.title+
            '</div>'+
            '<div class="alert-content">'+
            data.content + '<br>' +
            (data.desc.length > 20 ? data.desc.substring(0,20) : data.desc) + '...' +
            '<br>' + data.remind_date+
            '</div>'+
            '<div class="pop-button">'+
            '<button style ="width: 50px;margin-right: 5px;"  type="button" class="confirm">确定</button>'+
            '<button style ="width: 50px;" type="button" class="cancel">取消</button>'+
            '</div></div>')
            .css({
                width:400,
                height:'auto',
                background:'#ddd',
                position:'fixed',
                top:'50%',
                left:'50%',
                transform:'translate(-50%,-50%)',
                'border-radius': '4px',
                padding: '10px',

            });

        $mask =$('<div class="pop-mask"></div>')
            .css({
                position:'fixed',
                top:0,
                left:0,
                right:0,
                bottom:0,
                background: 'rgba(0,0,0,0.5)'
            });
        $box.find('.alert-title')
            .css({
                color: 'black',
                'font-weight': '500',
                'font-size': '20px',
                'text-align': 'center',
                'letter-spacing': '1px'
            });
        $content = $box.find('.pop-button')
            .css({
                textAlign:'center'
            });

        $button_confirm = $content.find('button.confirm');
        $button_cancel = $content.find('button.cancel');

        $body.append($mask);
        $body.append($box);


        dfd = $.Deferred(); //在函数中声明一个deferred对象，这样在外部就无法修改函数内部的执行状态

        $button_confirm.on('click',on_confirmed);
        $button_cancel.on('click',on_cancel);
        $mask.on('click',on_cancel);

        function on_confirmed() {
            button_confirmed = true;
        }
        function on_cancel(){
            button_confirmed = false;
        }

        timer = setInterval(function () {
            if(button_confirmed!==undefined)
            {
                //手动改变deferred对象的运行状态为"已完成"，从而立即触发done()方法
                //函数执行完毕，设置执行状态，如果成功执行，defer.resolve()，如果执行失败，则设置为defer.reject()
                dfd.resolve(button_confirmed);
                //当用户点击后，结果就确定了（确定或取消），轮询状态就可以结束了
                clearInterval(timer);
                hide_alert();
            }
        },50);


        function hide_alert(){
            // $('.pop-alert').hide();
            // $('.pop-mask').hide();
            $mask.remove();
            $box.remove();
        }

        return dfd.promise();//在函数的最后，必须将deferred对象返回出去，否则外部无法得到函数的执行结果
    }


    $btn.on('click',function (e) {
        var new_task = {}; //定义为局部变量
        e.preventDefault();//禁用默认行为

        $input = $('#txt');
        new_task.content = $input.val(); //获取task的值
        new_task.desc = '';
        new_task.remind_date = '';
        new_task.complete = false;


        if(!new_task.content) return;
        // task_list.push(new_task); //将新task存入到task_list中,往后插入
        task_list.unshift(new_task);//从头插入，或者将下面的append改为prepend
        refresh_task_list();
        $input.val('');
    });

    //刷新task_list
    function refresh_task_list() {
        store.set('task_list',task_list);
        render_task_list();  //重新显示task_list内容
    }

    function render_task_list() {
        var $tasks_list = $('#tasks-list');
        $tasks_list.html('');
        var complete_items = [];

        for(var i=0;i<task_list.length;i++)
        {
            var item = task_list[i];
            //仅判断item.complete不行，因为数组里存在一些null值，这些都是点击删除后的空置，不会消失，因为数组长度不变，因此这里要做判断
            if(item && item.complete)
            {
                complete_items.push(item);
            }
            else
            {
                var $task = render_task_item(task_list[i],i);
                $tasks_list.append($task);
            }
        }
        var length = $tasks_list.children().length;
        console.log("length",length);
        for(var j=0;j<complete_items.length;j++)
        {
            var $task = render_task_item(complete_items[j],length+j);
            $task.addClass('completed');
            $tasks_list.append($task);
        }
        $delete_task = $('.delete');
        $detail_task = $('.detail');
        $checkbox_complete = $('.complete');
        //刚开始的写法是没有调用函数的过程，直接在全局作用域中添加对delete按钮的click事件，然而发现添加task后并不能实现删除工作，并且删除了一次后不能点击删除第二次，
        //这是因为Jquery不会自动去绑定数据和渲染的变化，必须需要手动添加事件监控，
        listen_delete();
        listen_task_detail();
        listen_checkbox_complete();

    }
    function render_task_item(data,index) {

        if(!data) return;
        var list_item =
            '<div class="task-item" data-index="'+index+'">'+
            '<span><input type=\'checkbox\'  class="complete"'+ (data.complete?'checked':'')+'></span>'+
            '<span class="task-content">'+ data.content+'</span>'+
            ' <div class="right">'+
            '<span class="delete">删除</span>'+
            '<span class="detail">详细</span>'+
            '</div>';
        return $(list_item);
    }

    //事件监听
    function listen_delete(){
        $delete_task.on('click',function () {
            $this = $(this);
            var $item = $this.parent().parent();
            //这里改如何获取index？
            var index = $item.data('index');
            console.log("index",index);
            console.log(task_list);


            //自定义alert(),用到了deferred对象，then()设置回调函数，为方便，把done()和fail()合在一起
            // 如果then()有两个参数，则第一个参数是done()的回调函数，第二个参数是fail()的回调函数；
            // 若then只有一个参数，则等同于done()

            my_alert('确定删除？',task_list[index])
                .then(function (r) {
                    r ? delete_task(index) : null;
                })

            //原生alert()
            // var tmp = confirm('确定删除？');
            // tmp ? delete_task(index):null;
        })
    }

    function delete_task(index) {
        if(index === undefined || !task_list[index]) return;
        //问题：为什么删除前和删除后输出的task_list是一样的？？？不正常啊
        console.log(index);
        // console.log('1',task_list);
        delete task_list[index]; //注意当删除数组元素时，数组的长度并不会变小，只是为空
        // console.log('2',task_list);
        refresh_task_list();
    }

    $task_detail_mask.on('click',hide_task_detail);
    function hide_task_detail() {
        $task_detail_mask.hide();
        $task_detail.hide();
    }

    function listen_task_detail() {
        $task_item = $('.task-item');
        $task_item.on('dblclick',function () {
            show_task_detail($(this).data('index'));
        });
        $detail_task.on('click',function () {
            var $item =  $(this).parent().parent();
            var index = $item.data('index');
            show_task_detail(index);
            current_index = index;
        })
    }

    //显示Task详情
    function show_task_detail(index) {

        render_task_detail(index);
        $task_detail_mask.show();
        $task_detail.show();

    }
    //生成详情模板
    function render_task_detail(index) {
        if(index === undefined || !task_list[index]) return;

        var item = task_list[index];
        console.log(item);

        //表单的提交功能？？submit？？？
        var tpl =
            '<form action="">'+
            '<div class="contents">'+
            item.content +
            '</div>'+
            '<input style="display: none;" type="text" name="content"  autofocus autocomplete="off" value="'+
            item.content+
            '">'+
            '<textarea name="desc">'+ item.desc+
            '</textarea>'+
            '<div class="remind">'+
            '<input type="text" name="remind_date" class="datetime" autocomplete="off" value="'+
            item.remind_date+
            '">'+
            '<button type="submit">更新</button>'+
            '</div>'+
            '</form>';

        var tpl2 =
            '<form action="">'+
            '<div  class="txt"><span>TaskName</span>'+
            item.content +
            '</div>'+
            '<div  class="txt"><span>TaskContent</span>'+ item.desc+
            '</div>'+
            '<div  class="txt"><span>TaskDate</span>'+
            item.remind_date+
            '</div>'+
            '</form>';

        $task_detail.html(null);//清空
        // $task_detail.html(tpl);
        if(item.complete)
        {
            $task_detail.html(tpl2);
        }
        else{
            $task_detail.html(tpl);
        }
        $('.datetime').datetimepicker();


        //双击内容元素显示input
        $task_detail_content = $('.contents');
        $task_detail_content.on('dblclick',function () {
            $task_detail_content.hide();
            $('[name=content]').show();
        })
        //使用form表单，使用其监听submit事件
        $update_form = $task_detail.find('form');
        $update_form.on('submit',function (e) {
            e.preventDefault();//禁止默认的表单提交功能
            var data = {};
            //获取表单中各个input值
            // data.content = $(this).find('[name=content]').val();find()方法是获取匹配元素后代元素的好方法。
            //而 $('[name=content]').val();是全局匹配
            data.content = $('[name=content]').val();
            data.desc = $('[name=desc]').val();//属性过滤选择器
            data.remind_date = $('[name=remind_date]').val();
            update_task(index,data);
            hide_task_detail();
        })

    }

    //更新Task
    function update_task(index,data) {
        if(index === undefined || !task_list[index]) return;
        task_list[index] = $.extend({},task_list[index],data);
        refresh_task_list();
        console.log(task_list[index]);
    }


    //监听完成task事件
    function listen_checkbox_complete() {
        $checkbox_complete.on('click',function () {
            $this = $(this);
            var index = $this.parent().parent().data('index');
            var item = get(index);

            if(item.complete)
            {
                //若原先该task已完成，现在想设置complete为false，则需要把闹钟时间设为null，否则就会再次响起
                update_task(index,{complete: false,remind_date:''});
                //应该在渲染的时候来控制,这里控制没用
                // $this.attr('checked',true);
            }
            else{

                update_task(index,{complete: true});
                // $this.attr('checked',false);
            }
        })
    }
    function get(index) {
        return store.get('task_list')[index];
    }
});