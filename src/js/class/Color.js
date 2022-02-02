/*
 * @Explain: xxx
 * @Author: SuperLy
 * @LastEditors: SuperLy
 * @Date: 2022-02-02 19:43:20
 * @LastEditTime: 2022-02-02 20:56:43
 * @FilePath: \简易画板\src\js\class\Color.js
 */
import image from '../../img/color.png';

// 调色板
export default class Color {
    color;

    // 画板 ctx
    cvsCtx;

    // 字体颜色
    fontColor = '#000000';

    constructor(ctx) {
        this.cvsCtx = ctx;
        this.cvsCtx.fontColor = this.fontColor;
        this.color = document.getElementById('cvs-color');
        this.color.addEventListener('click', () => {
            // 激活样式
            this.color.classList.add('tool-active');
        });
        this.init();
    }

    init() {
        // 初始化样式
        // 获取cvs上下文
        const ctx = this.color.getContext('2d');
        // 绘制 画笔图
        const img = new Image(50, 50);
        img.src = image;
        img.onload = () => {
            ctx.drawImage(img, 35, 2, 45, 45);
        };
        // 监听选择颜色
        const fontSizeBtns = document.querySelectorAll('#color-box section');
        // eslint-disable-next-line no-restricted-syntax
        for (const btn of fontSizeBtns) {
            btn.onclick = () => {
                const color = window.getComputedStyle(btn, null).getPropertyValue('background-color');
                this.choice(color);
            };
        }
    }

    choice(color) {
        this.fontColor = color;
        this.cvsCtx.strokeStyle = color;
        this.cvsCtx.fillStyle = color;
        this.cvsCtx.fontColor = color;
        // 隐藏
        this.color.classList.remove('tool-active');
    }
}
