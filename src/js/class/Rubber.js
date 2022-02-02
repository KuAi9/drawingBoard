/*
 * @Explain: xxx
 * @Author: SuperLy
 * @LastEditors: SuperLy
 * @Date: 2022-02-02 19:43:37
 * @LastEditTime: 2022-02-02 20:57:44
 * @FilePath: \简易画板\src\js\class\Rubber.js
 */
import image from '../../img/rubber.png';

// 橡皮
export default class Rubber {
    // 橡皮DOM元素
    rubber;

    // 画板 ctx
    cvsCtx;

    constructor(ctx, activeTool) {
        this.cvsCtx = ctx;
        this.rubber = document.getElementById('cvs-rubber');
        this.rubber.addEventListener('click', () => {
            // 激活样式
            activeTool(this.rubber);
            // 更改 ctx 特征
            this.active();
        });
        this.init();
    }

    init() {
        // 初始化样式
        // 获取cvs上下文
        const ctx = this.rubber.getContext('2d');
        // 绘制 画笔图
        const img = new Image(50, 50);
        img.src = image;
        img.onload = () => {
            ctx.drawImage(img, 35, 0, 50, 50);
        };
    }

    active() {
        // 更改 ctx 特征
        this.cvsCtx.type = 'rubber';
    }

    draw(x, y) {
        this.cvsCtx.strokeStyle = '#ffffff';
        this.cvsCtx.fillStyle = '#ffffff';
        this.cvsCtx.beginPath();
        this.cvsCtx.arc(x, y, this.cvsCtx.fontSize + 10, 0, 2 * Math.PI);
        this.cvsCtx.fill();
    }
}
