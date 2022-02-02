/*
 * @Explain: xxx
 * @Author: SuperLy
 * @LastEditors: SuperLy
 * @Date: 2022-02-02 19:43:01
 * @LastEditTime: 2022-02-02 20:58:09
 * @FilePath: \简易画板\src\js\class\Size.js
 */
import image from '../../img/fontSize.png';

// 画笔粗细
export default class Size {
    // 粗细按钮 DOM
    size;

    // 字号
    fontSize = 3;

    // 画板 ctx
    cvsCtx;

    constructor(ctx) {
        this.cvsCtx = ctx;
        this.size = document.getElementById('cvs-size');
        this.cvsCtx.fontSize = this.fontSize;
        this.size.addEventListener('click', () => {
            // 激活样式
            this.size.classList.add('tool-active');
        });
        this.init();
    }

    init() {
        // 初始化样式
        // 获取cvs上下文
        const ctx = this.size.getContext('2d');
        // 绘制 画笔图
        const img = new Image(50, 50);
        img.src = image;
        img.onload = () => {
            ctx.drawImage(img, 35, 0, 50, 50);
        };
        // 监听选择字号
        const fontSizeBtns = document.querySelectorAll('#size-box section');
        for (let i = 0; i < fontSizeBtns.length; i += 1) {
            fontSizeBtns[i].onclick = () => {
                this.choice(i);
            };
        }
    }

    choice(index) {
        this.fontSize = 3 + index * 5;
        this.cvsCtx.fontSize = this.fontSize;
        // 隐藏
        this.size.classList.remove('tool-active');
    }
}
