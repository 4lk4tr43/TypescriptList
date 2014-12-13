///<reference path="../Utility/standard-function.ts"/>

module Widgets {

    export class ScrollList {

        private _position:number;

        constructor(public element:HTMLElement,
                    public visibleCount:number,
                    position:number=0,
                    public yPositionFunction:(x:number)=>number=Utility.StandardFunction.quadratic(.001),
                    public movementEasing:(x:number)=>number=Utility.StandardFunction.inOut(2, 1),
                    public elementReachedBorder:(element:Element)=>void=undefined,
                    public elementExited:(element:Element)=>void=undefined) {
            this._position = position;
        }

        setPosition(position:number) {
            var listLength = this.element.children.length;
            var listWidth = this.element.offsetWidth;
            var listHeight = this.element.offsetHeight;
            var xStride = listWidth / (this.visibleCount+1);

            for (var i = 0; i < listLength; i++) {
                var element = this.element.children[i];
                var left = (i+1+position) * xStride;
                var top = this.yPositionFunction(left);
                var right = left + element['offsetWidth'];
                var bottom = top + element['offsetHeight'];

                element['style'].left = left + 'px';
                element['style'].top =  top + 'px';

                if (0 >= left || listWidth <= right || 0 >= top || (listHeight <= bottom && listHeight != 0)){
                    if (this.elementReachedBorder !== undefined) this.elementReachedBorder(element);
                    if (0 > right || listWidth < left || 0 > bottom || (listHeight < top && listHeight != 0))
                        if (this.elementExited !== undefined) this.elementExited(element);
                }
                else element['style'].display = 'block';
            }

            this._position = position;
        }

        private _isMoving:boolean = false;
        moveToPosition(position:number, time:number,
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
                        self.setPosition(startPosition + deltaPosition * self.movementEasing(elapsed / time));
                        animate();
                    });
                }
                else {
                    self.setPosition(position);
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