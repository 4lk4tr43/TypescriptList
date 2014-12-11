module Utility {

    /**
     * Converts X positions the corresponding Y positions using a provided function
     */
    export class StandardFunction {

        /**
         * Standard Quadratic function
         *
         * @param a , quadratic portion
         * @param b , linear portion
         * @param c , constant portion
         * @returns {function(number): number}
         */
        static quadratic(a:number = 1, b:number = 0, c:number = 0) {
            return function (x:number) {
                return a * x * x + b * x + c;
            }
        }
    }
}