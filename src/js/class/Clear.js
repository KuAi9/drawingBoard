/*
 * @Explain: xxx
 * @Author: SuperLy
 * @LastEditors: SuperLy
 * @Date: 2022-02-02 19:44:47
 * @LastEditTime: 2022-02-02 20:44:14
 * @FilePath: \简易画板\src\js\class\Clear.js
 */
import image from '../../img/clear.png';

export default class Clear {
    // download DOM元素
    clear;

    // 画板 ctx
    cvsCtx;

    clearImageDate;

    constructor(ctx, clearImageDate) {
        this.clearImageDate = clearImageDate;
        this.cvsCtx = ctx;
        this.clear = document.getElementById('cvs-clear');
        this.clear.addEventListener('click', () => {
            // 清空画板
            this.del();
        });
        this.init();
    }

    init() {
        // 初始化样式
        // 获取cvs上下文
        const ctx = this.clear.getContext('2d');
        // 绘制 画笔图
        const img = new Image(50, 50);
        img.src = image;
        img.onload = () => {
            ctx.drawImage(img, 35, 5, 40, 40);
        };
    }

    del() {
        // eslint-disable-next-line no-alert
        const isClear = window.confirm('是否要清空画板？');
        if (isClear) {
            const cvs = document.getElementById('cvs');
            // 清空画板
            this.cvsCtx.clearRect(0, 0, cvs.offsetWidth, cvs.offsetHeight);
            // 清空 imageDate
            this.clearImageDate();
        }
    }
}
