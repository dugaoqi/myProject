"use strict";

function addEle(sty){
    var div = document.createElement("div");
    div.className = sty;
    return div;
};

class Engine{
    constructor(){
        this.main = document.getElementById("body_main");
        this.oUl = this.main.firstElementChild;
        this.init();
    };

    init(){
        var that = this;
        this.oUl.onclick = function(eve){
            var e = eve || window.event;
            var tar = e.target || e.srcElement;
            // console.log(tar.value);
            if(tar.nodeName == "LI"){
                switch (tar.value){
                    case 1: that.level = 1; break;
                    case 2: that.level = 2; break;
                    case 3: that.level = 3; break;
                    case 4: that.level = 4; break;
                };
                that.load();
            };
        };
    };

    load(){
        this.oUl.style.display = "none";
        this.logo = addEle("logo");
        this.main.appendChild(this.logo);
        this.loading = addEle("loading");
        this.main.appendChild(this.loading);
        var that = this;
        var n = 1;
        this.timer = setInterval(function(){
            that.loading.style.backgroundImage = `url(images/loading${n %= 3}.png)`;
            n ++;
        },500)
        setTimeout(function(){
            clearInterval(that.timer);
            that.logo.remove();
            that.loading.remove();
            that.background();
            that.scores = addEle("scores");
            that.scores.innerHTML = 0;
            that.main.appendChild(that.scores);
            var arr = [that.main, that.oUl, that.level, that.bgTimer, that.scores];
            new plane(arr);
        },1500)
    };

    background(){
        var that = this;
        this.y = 0;
        this.bgTimer = setInterval(function(){
            if(that.y > 853){
                that.y = 0;
            };
            that.main.style.backgroundPositionY = `${that.y}px`;
            that.y += 10;
        },60);
    };
};

class plane{
    constructor(arr){
        this.main = arr[0];
        this.oUl = arr[1];
        this.level = arr[2];
        this.bgTimer = arr[3];
        this.scores = arr[4];
        this.aBullet = [];
        this.init();
    };

    init(){
        var that = this;
        this.plane = addEle("my-plane");
        this.plane.style.bottom = 0;
        this.main.appendChild(this.plane);
        this.plane.style.left = (this.main.offsetWidth - this.plane.offsetWidth) / 2 + "px";
        switch (this.level){
            case 1: this.space = 300; break;
            case 2: this.space = 400; break;
            case 3: this.space = 500; break;
            case 4: this.space = 600; break;
        };
        this.move();
        this.bulletTimer = setInterval(function(){
            that.aBullet.push(new bullet(that.main,that.plane));
        },90000 / this.space);
        this.enemyTimer = setInterval(function(){
            // console.log(that.timer);
            var just = Math.random();
            // var just = 0.4;
            that.addEnemy(just);
        },this.space);
    };

    move(){
        var that = this;
        document.onmousemove = function(eve){
            var e = eve || window.event;
            var l = e.clientX - that.main.offsetLeft - that.plane.offsetWidth / 2;
            // console.log(that.main.offsetLeft);
            var t = e.clientY - that.plane.offsetHeight / 2;
            if(l < 0){ l = 0; };
            if(l > that.main.offsetWidth - that.plane.offsetWidth){ l = that.main.offsetWidth - that.plane.offsetWidth; };
            if(t < 0){ t = 0; };
            that.plane.style.left = l + "px";
            that.plane.style.top = t + "px";
        };
    };

    addEnemy(just){
        var arr = [this.main, this, this.aBullet, this.scores];
        if(just > 0.95){
            arr.push("enemy-large");
            new enemy(arr);
        }else if(just > 0.8){
            arr.push("enemy-middle");
            new enemy(arr);
        }else if(just > 0.3){
            arr.push("enemy-small");
            new enemy(arr);
        };
    };

    die(){
        this.move = null;
        clearInterval(this.bulletTimer);
        clearInterval(this.enemyTimer);
        clearInterval(this.bgTimer);
        var that = this;
        var n = 0;
        var dieTimer = setInterval(function(){
            if(n < 5){
                that.plane.style.backgroundImage = `url(images/me_die${n}.png)`;
                n ++;
            }else{
                clearInterval(dieTimer);
                that.plane.remove();
                alert("得分为：" + that.scores.innerHTML);
                location.reload();
            };
        },100);
    };
};

class bullet{
    constructor(main,plane){
        this.main = main;
        this.plane = plane;
        this.speed = 6;
        this.init();
    };

    init(){
        this.flyBullet = addEle("bullet");
        this.main.appendChild(this.flyBullet);
        this.flyBullet.style.left = this.plane.offsetLeft + this.plane.offsetWidth / 2 - this.flyBullet.offsetWidth / 2 + "px";
        this.flyBullet.style.top = this.plane.offsetTop - this.flyBullet.offsetHeight + "px";
        this.fly();
    };

    fly(){
        var that = this;
        this.timer = setInterval(function(){
            that.flyBullet.style.top = that.flyBullet.offsetTop - that.speed + "px";
            that.just();
        },30);
    };

    just(){
        if(this.flyBullet.offsetTop <= 0){
            this.die();
        };
    };

    die(){
        clearInterval(this.timer);
        var that = this;
        this.flyBullet.className = "bullet_die";
        setTimeout(function(){
            that.flyBullet.style.backgroundImage = "url(images/die2.png)";
            setTimeout(function(){
                that.flyBullet.remove();
            },30);
        },30);
    };
};

class enemy{
    constructor(arr){
        this.main = arr[0];
        this.plane = arr[1];
        this.aBullet = arr[2];
        this.scores = arr[3];
        this.sty = arr[4];
        this.init();
    };

    init(){
        this.enemyPlane = addEle(this.sty);
        this.main.appendChild(this.enemyPlane);
        var l = this.main.offsetWidth - this.enemyPlane.offsetWidth;
        l = Math.round(Math.random() * l);
        var t = -this.enemyPlane.offsetHeight;
        this.enemyPlane.style.left = l + "px";
        this.enemyPlane.style.top = t + "px";
        this.fly();
    };

    fly(){
        var that = this;
        switch (this.sty){
            case "enemy-small": this.speed = 6; this.hp = 1; break;
            case "enemy-middle": this.speed = 4; this.hp = 3; break;
            case "enemy-large": this.speed = 2; this.hp = 5; break;
        };
        this.timer = setInterval(function(){
            that.enemyPlane.style.top = that.enemyPlane.offsetTop + that.speed + "px";
            that.just();
        },100);
    };

    just(){
        if(this.enemyPlane.offsetTop >= this.main.offsetHeight){
            this.die();
        };

        for(var i = 0; i < this.aBullet.length; i ++){
            if(this.hp > 0){
                var bl = this.aBullet[i].flyBullet.offsetLeft;
                var bt = this.aBullet[i].flyBullet.offsetTop;
                var bw = this.aBullet[i].flyBullet.offsetWidth;
                var bh = this.aBullet[i].flyBullet.offsetHeight;
                var el = this.enemyPlane.offsetLeft;
                var et = this.enemyPlane.offsetTop;
                var ew = this.enemyPlane.offsetWidth;
                var eh = this.enemyPlane.offsetHeight;
                var justify1 = bl >= el - bw && bl <= el + ew && bt >= et - bh && bt <= et + eh;
                if(justify1){
                    this.hp --;
                    this.aBullet[i].die();
                    this.aBullet.splice(i,1);
                    i --;
                };

                var pl = this.plane.plane.offsetLeft;
                var pt = this.plane.plane.offsetTop;
                var pw = this.plane.plane.offsetWidth;
                var ph = this.plane.plane.offsetHeight;
                var justify2 = pl >= el - pw && pl <= el + pw && pt >= et - ph && pt <= et + eh;
                if(justify2){
                    this.die();
                    this.plane.die();
                    break;
                };
            }else{
                this.die();
                break;
            };
        };
    };

    addScores(){
        switch (this.sty){
            case "enemy-small": this.score = 1; break;
            case "enemy-middle": this.score = 2; break;
            case "enemy-large": this.score = 3; break;
        };
        // console.log(that.scores.innerHTML);
        this.scores.innerHTML = parseInt(this.scores.innerHTML) + this.score;
    };
    
    die(){
        // console.log(this.timer);
        clearInterval(this.timer);
        this.addScores();
        var that = this;
        switch (this.sty){
            case "enemy-small": var n = 3; var str = "url(images/plane1_die"; break;
            case "enemy-middle": var n = 4; var str = "url(images/plane2_die"; break;
            case "enemy-large": var n = 6; var str = "url(images/plane3_die"; break;
        };
        var l = 0;
        var dieTimer = setInterval(function(){
            if(l <= n){
                that.enemyPlane.style.backgroundImage = str + l + ".png)";
                l ++;
            }else{
                // console.log(dieTimer);
                clearInterval(dieTimer);
                that.enemyPlane.remove();
            };
        },100);
    };

};

new Engine();