/*
 * @Explain: xxx
 * @Author: SuperLy
 * @LastEditors: SuperLy
 * @Date: 2022-02-02 19:44:28
 * @LastEditTime: 2022-02-02 20:57:00
 * @FilePath: \简易画板\src\js\class\DownLoad.js
 */
import image from '../../img/download.png';

// 下载
export default class Download {
    // download DOM元素
    download;

    // 画板 DOM元素
    cvs;

    constructor(cvs) {
        this.cvs = cvs;
        this.download = document.getElementById('cvs-download');
        this.download.addEventListener('click', () => {
            this.save();
        });
        this.init();
    }

    init() {
        // 初始化样式
        // 获取cvs上下文
        const ctx = this.download.getContext('2d');
        // 绘制 画笔图
        const img = new Image(50, 50);
        img.src = image;
        img.onload = () => {
            ctx.drawImage(img, 35, 0, 50, 50);
        };
    }

    save() {
        const saveBtn = this.download.parentNode;
        saveBtn.href = this.cvs.toDataURL();
        saveBtn.download = 'canvas-download';
    }
}
