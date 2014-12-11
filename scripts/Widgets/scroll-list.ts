///<reference path="../Utility/position-function.ts"/>
///<reference path="../Utility/easing-function.ts"/>

module Widgets {

    export class ScrollList {

        private _position:number;

        constructor(public element:HTMLElement,
                    public visibleCount:number,
                    position:number=0,
                    public positionFunction:(x:number)=>number=Utility.PositionFunction.createQuadraticFunction(.001)) {
            this._position = position;
        }

        setPosition(position:number, elementReachedBorder:(element:Element)=>void=undefined) {
            var listLength = this.element.children.length;
            var listWidth = this.element.offsetWidth;
            var listHeight = this.element.offsetHeight;
            var xStride = listWidth / (this.visibleCount+1);

            for (var i = 0; i < listLength; i++) {
                var element = this.element.children[i];
                var left = (i+1+position) * xStride;
                var top = this.positionFunction(left);
                var right = left + element['offsetWidth'];
                var bottom = top + element['offsetHeight'];

                element['style'].left = left + 'px';
                element['style'].top =  top + 'px';

                if (0 >= left || listWidth <= right || 0 > top || (listHeight <= bottom && listHeight != 0)){
                    if (elementReachedBorder !== undefined) elementReachedBorder(element);
                }
                else element['style'].display = 'block';
            }

            this._position = position;
        }

        private _isMoving:boolean = false;
        moveToPosition(position:number, time:number,
                       elementReachedBorder:(element:Element)=>void=undefined,
                       easing:(t:number)=>number=Utility.EasingFunction.easeInOutQuad,
                       callback:()=>void=undefined) {
            if (this._isMoving) return;
            this._isMoving = true;

            var self = this;
            var startPosition = self._position;
            var deltaPosition = position - self._position;
            var startTime = new Date().getTime();

            var elapsed;
            var animate = function () {
                elapsed = new Date().getTime() - startTime;
                if (elapsed < time) {
                    window.setTimeout(function () {
                        self.setPosition(startPosition + deltaPosition * easing(elapsed / time), elementReachedBorder);
                        animate();
                    });
                }
                else {
                    self.setPosition(position, elementReachedBorder);
                    self._isMoving = false;
                    if (callback !== undefined) callback();
                }
            };

            animate();
        }

        addElement(element:HTMLElement) {
            element.style.display = 'none';
            this.element.appendChild(element);
            this.setPosition(this._position);
        }
    }
}