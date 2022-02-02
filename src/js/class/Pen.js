/*
 * @Explain: xxx
 * @Author: SuperLy
 * @LastEditors: SuperLy
 * @Date: 2022-02-02 19:41:54
 * @LastEditTime: 2022-02-02 20:57:10
 * @FilePath: \简易画板\src\js\class\Pen.js
 */
import image from '../../img/pen.png';

// 画笔
export default class Pen {
    // 画笔DOM元素
    pen;

    // 画板 ctx
    cvsCtx;

    constructor(ctx, activeTool) {
        this.cvsCtx = ctx;
        this.pen = document.getElementById('cvs-pen');
        this.pen.addEventListener('click', () => {
            // 激活样式
            activeTool(this.pen);
            // 更改 ctx 特征
            this.active();
        });
        this.init();
    }

    init() {
        // 初始化样式
        // 获取cvs上下文
        const ctx = this.pen.getContext('2d');
        // 绘制 画笔图
        const img = new Image(50, 50);
        img.src = image;
        img.onload = () => {
            ctx.drawImage(img, 30, 0, 50, 50);
        };
    }

    active() {
        // 更改 ctx 特征
        this.cvsCtx.type = 'pen';
    }

    draw(x, y) {
        this.cvsCtx.strokeStyle = this.cvsCtx.fontColor;
        this.cvsCtx.fillStyle = this.cvsCtx.fontColor;
        this.cvsCtx.lineWidth = this.cvsCtx.fontSize;
        this.cvsCtx.lineTo(x, y);
        this.cvsCtx.stroke();
    }
}
