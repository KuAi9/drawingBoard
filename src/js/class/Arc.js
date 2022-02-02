/*
 * @Explain: xxx
 * @Author: SuperLy
 * @LastEditors: SuperLy
 * @Date: 2022-02-02 19:44:10
 * @LastEditTime: 2022-02-02 20:55:30
 * @FilePath: \简易画板\src\js\class\Arc.js
 */
import image from '../../img/arc.png';
// 圆形
export default class Arc {
    // 原形DOM元素
    arc;

    // 画板 ctx
    cvsCtx;

    constructor(ctx, activeTool) {
        this.cvsCtx = ctx;
        this.arc = document.getElementById('cvs-arc');
        this.arc.addEventListener('click', () => {
            // 激活样式
            activeTool(this.arc);
            // 更改 ctx 特征
            this.active();
        });
        this.init();
    }

    init() {
        // 初始化样式
        // 获取cvs上下文
        const ctx = this.arc.getContext('2d');
        // 绘制 画笔图
        const img = new Image(50, 50);
        img.src = image;
        img.onload = () => {
            ctx.drawImage(img, 35, 0, 50, 50);
        };
    }

    active() {
        // 更改 ctx 特征
        this.cvsCtx.type = 'arc';
    }

    draw(x, y, beginX, beginY, imageData) {
        this.cvsCtx.strokeStyle = this.cvsCtx.fontColor;
        this.cvsCtx.fillStyle = this.cvsCtx.fontColor;
        this.cvsCtx.lineWidth = this.cvsCtx.fontSize;
        const cvs = document.getElementById('cvs');
        // 清空画板
        this.cvsCtx.clearRect(0, 0, cvs.offsetWidth, cvs.offsetHeight);
        // 将之前画的放入
        if (imageData !== null) {
            this.cvsCtx.putImageData(imageData, 0, 0, 0, 0, cvs.offsetWidth, cvs.offsetHeight);
        }
        this.cvsCtx.beginPath();
        this.cvsCtx.arc(beginX, beginY, Math.abs(x - beginX), 0, 2 * Math.PI);
        this.cvsCtx.stroke();
    }
}
