module Utility {

    /**
     * Converts X positions the corresponding Y positions using a provided function
     */
    export class PositionFunction {

        /**
         * Standard Quadratic function
         *
         * @param a , quadratic portion
         * @param b , linear portion
         * @param c , constant portion
         * @returns {function(number): number}
         */
        static createQuadraticFunction(a:number=1, b:number=0, c:number=0) {
            return function (x:number) {
                return a*x*x + b*x + c;
            }
        }

        /**
         * Constructor
         *
         * @param positionFunction , the function to use for the y position
         * @param xOffset , offset for the input
         * @param yOffset , offset for the output
         * @param xMin , min unwrapped value inclusive
         * @param xMax , max unwrapped value inclusive
         * @param yMin , min unwrapped value inclusive
         * @param yMax , max unwrapped value inclusive
         * @param wrappingEvent , fired in cas of wrapping e.x/e.y -> -1 lower, 0 not wrapped, 1 upper,
         */
        constructor(public positionFunction:(x:number)=>number,
                    public xOffset:number=0, public yOffset:number=0,
                    public xMin:number=undefined, public xMax:number=undefined,
                    public yMin:number=undefined, public yMax:number=undefined,
                    public wrappingEvent:(e)=>void=undefined) {
        }

        /**
         * Get the corresponding y position
         * @param x , x axis
         * @returns {number} , y axis
         */
        getY(x:number):number {
            if (this.xMin !== undefined || this.xMax !== undefined ||
                this.yMin !== undefined || this.yMax !== undefined) {

                if (this.xMin === undefined) this.xMin = Number.MIN_VALUE;
                if (this.xMax === undefined) this.xMax = Number.MAX_VALUE;
                if (this.yMin === undefined) this.yMin = Number.MIN_VALUE;
                if (this.yMax === undefined) this.yMax = Number.MAX_VALUE;

                var eventArgs = {x:0, y:0};
                var cappedX = x;

                if (cappedX < this.xMin) {
                    var distance = this.xMax - this.xMin;
                    eventArgs.x = -1;
                    cappedX = this.xMax + ((x + this.xMax) % distance);
                }
                else if (cappedX > this.xMax) {
                    var distance = this.xMax - this.xMin;
                    eventArgs.x = 1;
                    cappedX = this.xMin + ((x - this.xMin) % distance);
                }

                var y = this.positionFunction(cappedX);

                if (y < this.yMin) {
                    var distance = this.yMax - this.yMin;
                    eventArgs.y = -1;
                    y = this.yMax - (y % distance);
                }
                else if (y > this.yMax) {
                    var distance = this.yMax - this.yMin;
                    eventArgs.y = 1;
                    y = this.yMin + (y % distance);
                }

                if ((eventArgs.x !== 0 || eventArgs.y !== 0) && this.wrappingEvent !== undefined)
                    this.wrappingEvent(eventArgs);

                return y;
            }
            else return this.positionFunction(x + this.xOffset) + this.yOffset;
        }
    }
}