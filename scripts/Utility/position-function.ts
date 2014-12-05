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
         */
        constructor(public positionFunction:(x:number)=>number, public xOffset:number=0, public yOffset:number=0) {

        }

        /**
         * Get the corresponding y position
         * @param x , x axis
         * @returns {number} , y axis
         */
        getY(x:number):number {
            return this.positionFunction(x + this.xOffset) + this.yOffset;
        }
    }
}