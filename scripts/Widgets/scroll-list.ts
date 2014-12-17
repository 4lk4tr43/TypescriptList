///<reference path="../Utility/standard-function.ts"/>

module Widgets {

    export class ScrollList {

        private _position:number;

        constructor(public element:HTMLElement,
                    public visibleCount:number,
                    position:number=0,
                    public xPositionFunction:(x:number)=>number=Utility.StandardFunction.linear(),
                    public yPositionFunction:(x:number)=>number=Utility.StandardFunction.quadratic(.001),
                    public scaleFunction:(x:number, y:number)=>{x:number;y:number}=undefined,
                    public movementEasing:(x:number)=>number=Utility.StandardFunction.inOut(2, 1),
                    public elementReachedBorder:(element:HTMLElement)=>void=undefined,
                    public elementExited:(element:HTMLElement)=>void=undefined,
                    public elementVisible:(element:HTMLElement)=>void=undefined) {
            this._position = position;
        }

        setPosition(position:number) {
            var listLength = this.element.children.length;
            var listWidth = this.element.offsetWidth;
            var listHeight = this.element.offsetHeight;
            var xStride = listWidth / (this.visibleCount+1);

            for (var i = 0; i < listLength; i++) {
                var element = <HTMLElement>this.element.children[i];
                var left = this.xPositionFunction((i+1+position) * xStride);
                var top = this.yPositionFunction(left);

                element.style.display = 'block';
                element.style.left = left + 'px';
                element.style.top =  top + 'px';
                if(this.scaleFunction !== undefined) {
                    var scale = this.scaleFunction(left, top);

                    element.style.transform = 'scale(' + scale.x + ',' + (scale.y === undefined ? scale.x :scale.y) + ')';
                }

                var elementBounding = element.getBoundingClientRect();
                element.style.display = 'none';

                if (0 >= elementBounding.left || listWidth <= elementBounding.right || 0 >= elementBounding.top || (listHeight <= elementBounding.bottom && listHeight != 0)){
                    if (this.elementReachedBorder !== undefined) this.elementReachedBorder(element);
                    if (this.elementExited !== undefined)
                        if (0 > elementBounding.right || listWidth < elementBounding.left || 0 > elementBounding.bottom || (listHeight < elementBounding.top && listHeight != 0))
                            this.elementExited(element);
                    else element.style.display = 'block';
                }
                else {
                    if (this.elementVisible !== undefined) this.elementVisible(element);
                    element.style.display = 'block';
                }
            }

            this._position = position;
        }

        private _isMoving:boolean = false;
        moveToPosition(position:number, time:number,
                       callback:()=>void=undefined) {
            if (this._isMoving) return;
            this._isMoving = true;

            var self = <ScrollList>this;
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