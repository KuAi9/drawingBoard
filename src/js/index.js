/*
 * @Explain: xxx
 * @Author: SuperLy
 * @LastEditors: SuperLy
 * @Date: 2022-01-31 19:36:20
 * @LastEditTime: 2022-02-02 20:19:43
 * @FilePath: \简易画板\src\js\index.js
 */

import '../css/index.scss';
import Pen from './class/Pen';
import Size from './class/Size';
import Color from './class/Color';
import Rubber from './class/Rubber';
import Rect from './class/Rect';
import Arc from './class/Arc';
import Clear from './class/Clear';
import Download from './class/DownLoad';

window.onload = () => {
    // 工具类
    class Tool {
        cvs;

        ctx;

        isDraw = false;

        beginX;

        beginY;

        imageData = null;

        pen;

        size;

        color;

        rubber;

        rect;

        arc;

        clear;

        download;

        constructor() {
            this.cvs = document.getElementById('cvs');
            this.ctx = this.cvs.getContext('2d');
            this.ctx.type = 'pen';
            this.pen = new Pen(this.ctx, this.activeTool);
            this.size = new Size(this.ctx);
            this.color = new Color(this.ctx);
            this.rubber = new Rubber(this.ctx, this.activeTool);
            this.rect = new Rect(this.ctx, this.activeTool);
            this.arc = new Arc(this.ctx, this.activeTool);
            this.clear = new Clear(this.ctx, this.clearImageDate.bind(this));
            this.download = new Download(this.cvs);
            this.init();
        }

        init() {
            this.cvs.setAttribute('width', this.cvs.offsetWidth);
            this.cvs.setAttribute('height', this.cvs.offsetHeight);
            // 监听画板上鼠标的按下
            this.cvs.addEventListener('mousedown', (e) => {
                this.beginX = e.pageX - this.cvs.offsetLeft;
                this.beginY = e.pageY - this.cvs.offsetTop;
                this.isDraw = true;
            });
            // 监听画板上鼠标的松开
            this.cvs.addEventListener('mouseup', () => {
                this.isDraw = false;
                // eslint-disable-next-line max-len
                this.imageData = this.ctx.getImageData(0, 0, this.cvs.offsetWidth, this.cvs.offsetHeight);
                this.ctx.beginPath();
            });
            // 监听画板上鼠标移动
            this.cvs.addEventListener('mousemove', (e) => {
                if (!this.isDraw) return;
                const x = e.pageX - this.cvs.offsetLeft;
                const y = e.pageY - this.cvs.offsetTop;
                this.draw(x, y);
            });
        }

        // 激活样式
        // eslint-disable-next-line class-methods-use-this
        activeTool(tool) {
            const delClsDom = document.querySelectorAll('.tool-active');
            // eslint-disable-next-line no-restricted-syntax
            for (const dom of delClsDom) {
                dom.classList.remove('tool-active');
            }
            tool.classList.add('tool-active');
        }

        // 画
        draw(x, y) {
            switch (this.ctx.type) {
                case 'pen': this.pen.draw(x, y);
                    break;
                case 'rubber': this.rubber.draw(x, y);
                    break;
                case 'rect': this.rect.draw(x, y, this.beginX, this.beginY, this.imageData);
                    break;
                case 'arc': this.arc.draw(x, y, this.beginX, this.beginY, this.imageData);
                    break;
                default:
            }
        }

        // 清空imageDate
        clearImageDate() {
            this.imageData = null;
        }
    }

    // eslint-disable-next-line no-new
    new Tool();
};
