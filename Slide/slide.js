(function (win) {
    function Slide(cfg) {
        this.config = cfg;
        this.container = document.getElementById(this.config.container);
        this.currentIndex = 0;
        this.structure();
        this.bindEvent();
        this.autoPlay();
        this.activeBtn();
        this.timer;
    }
    Slide.prototype = {
        constructor: Slide,
        //渲染节点
        structure: function () {
            var tmp = document.createDocumentFragment(),
                _width = this.config.width,
                _height = this.config.height,
                slide_list,
                _img,
                button_list,
                _button;

            //创建容器 设置宽高；
            Slide.tools.attr(this.container, "width", _width);
            Slide.tools.attr(this.container, "height", _height);

            //循环生成节点
            //图片容器
            slide_list = document.createElement("div");
            slide_list.className = "slide_list";
            tmp.appendChild(slide_list);

            //左右箭头
            this.container.innerHTML = "<span class='prev arrow'>&lt;</span><span class='next arrow'>&gt;</span>";

            //按钮容器
            button_list = document.createElement("div");
            button_list.className = "buttons";
            tmp.appendChild(button_list);

            for (var i = 0; i < this.config.img_src.length; i++) {
                //图片
                _img = document.createElement("img");
                _img.className = "slide_img";
                _img.setAttribute("src", this.config.img_src[i]);
                _img.setAttribute("style", "width:"+this.config.width+";"+"height:"+this.config.height);
                slide_list.appendChild(_img);
            }

            for (var j= 0;j < this.config.img_src.length-1;j++){
                //按钮
                _button = document.createElement("span");
                _button.className = "btn";
                button_list.appendChild(_button);
            }
            //将文档碎片放到容器里
            this.container.appendChild(tmp);

            // 声明

        },
        // 绑定事件
        bindEvent:function () {
            var prev = document.getElementsByClassName("prev")[0],
                next = document.getElementsByClassName("next")[0],
                btns = document.getElementsByClassName("btn"),
                btnlen = document.getElementsByClassName("btn").length;

            for (var i= 0;i<btnlen;i++){
                (function(k){
                    btns[k].onclick=function(){
                        this.currentIndex = k ;
                        this.moveIndex(list,k);
                        this.activeBtn();
                    };
                })(i);
            }

            this.container.addEventListener("mouseover", this.clearTime.bind(this));
            this.container.addEventListener("mouseout", this.autoPlay.bind(this));
            prev.addEventListener("click",this.toLeft.bind(this));
            next.addEventListener("click",this.toRight.bind(this));
        },
        toLeft:function () {
            var list = document.getElementsByClassName("slide_list")[0];
            var imglen = document.getElementsByClassName("slide_img").length;
            this.currentIndex--;
            if(this.currentIndex<=0){
                this.currentIndex = imglen-1;
                list.style.transition = "";
                list.style.left = -2400+"px";
            }
            this.moveIndex(list,this.currentIndex);
            this.activeBtn()
        },
        toRight:function () {
            var list = document.getElementsByClassName("slide_list")[0];
            var imglen = document.getElementsByClassName("slide_img").length;
            this.currentIndex++;
            if(this.currentIndex>=imglen){
                list.style.transition = "";
                this.currentIndex = 1 ;
                list.style.left = 0;
            }
            this.moveIndex(list,this.currentIndex);
            this.activeBtn()
        },
        autoPlay:function () {
            var that = this;
            that.timer = setInterval(function () {
                var list = document.getElementsByClassName("slide_list")[0];
                var imglen = document.getElementsByTagName("img").length;
                that.currentIndex++;

                if (that.currentIndex>=imglen){
                    list.style.transition="";
                    that.currentIndex = 0;
                    list.style.left = 0;

                    that.activeBtn()
                }

                that.moveIndex(list,that.currentIndex);
                that.activeBtn();
            },1000)
        },
        moveIndex:function (dom,index) {
            console.log(this.currentIndex);
            setTimeout(function () {
                dom.style.transition = "all .4s ease-in-out";
                dom.style.left = -600*index+"px";
            },0)
        },
        clearTime:function () {
            var that = this;
            console.log("clear");
            clearInterval(that.timer)
        },
        activeBtn:function () {
            var index = 0;
            var that = this;
            var btns = document.getElementsByClassName("btn");
            var btnlen = document.getElementsByClassName("btn").length;
            if (that.currentIndex===btnlen){
                index = 0
            }else {
                index = that.currentIndex;
            }
            for (var i=0;i<btnlen;i++){
                btns[i].className = "btn ";
            }
            btns[index].className ="btn active_btn"
        }
    };
    Slide.tools = {
        attr: function (dom, attrName, attrVal) {
            var arg_len = arguments.length;
            if (dom instanceof Object) {
                if (arg_len === 3) {
                    dom.style[attrName] = attrVal;
                    return true;
                } else {
                    throw new Error("参数错误!");
                }
            }
        }
    };

    win["Slide"] = Slide;
})(window, undefined);
