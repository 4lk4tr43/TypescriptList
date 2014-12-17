///<reference path="../Utility/standard-function.ts"/>

module Widgets {

    export class ScrollList {

        private _position:number;
        private _animate:()=>void;

        constructor(public element:HTMLElement,
        position:number=0,
        public xPositionFunction:(index:number)=>number=function(){return 100;},
        public yPositionFunction:(index:number, left:number)=>number=function(i){return 50*i;},
        public elementUpdate:(element:HTMLElement, index:number, x:number, y:number)=>{x:number;y:number}=undefined,
        public easing:(t:number)=>number=Utility.StandardFunction.inOut(2, 1)) {
            this._position = position;
        }

        setPositions(position:number) {
            var listLength = this.element.children.length;

            for (var i = 0; i < listLength; i++) {
                var element = <HTMLElement>this.element.children[i];
                var relIndex = i+position;
                var left = this.xPositionFunction(relIndex);
                var top = this.yPositionFunction(relIndex, left);

                element.style.display = 'block';
                element.style.left = left + 'px';
                element.style.top =  top + 'px';
                if(this.elementUpdate !== undefined) this.elementUpdate(element, relIndex, left, top);
            }

            this._position = position;
        }

        moveToPosition(position:number, time:number, callback:()=>void=undefined) {
            if (this._animate !== undefined) return;

            var self = <ScrollList>this;
            var startPosition = self._position;
            var deltaPosition = position - self._position;
            var startTime = new Date().getTime();

            var elapsed;
            if (self._animate === undefined)
                self._animate = function () {
                    elapsed = new Date().getTime() - startTime;
                    if (elapsed < time) {
                        window.setTimeout(function () {
                            self.setPositions(startPosition + deltaPosition * self.easing(elapsed / time));
                            self._animate();
                        });
                    }
                    else {
                        self.setPositions(position);
                        self._animate = undefined;
                        if (callback !== undefined) callback();
                    }
                };

            self._animate();
        }

        addElement(element:HTMLElement) {
            this.element.appendChild(element);
            this.setPositions(this._position);
        }
    }
}