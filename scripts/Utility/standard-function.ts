module Utility {

    /**
     * Generates standard functions
     */
    export class StandardFunction {

        /**
         * Linear function
         *
         * @param a , scale
         * @param c , constant
         * @returns {function(number): number}
         */
        static linear(a:number=1, c:number=0) {
            return function (x:number) {
                return a * x + c;
            }
        }

        /**
         * Quadratic function
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

        /**
         * Creates an easing function
         *
         * @param exponent , dimension
         * @param range , start at 0, ends at range
         * @returns {function(number): number}
         */
        static inOut(exponent:number, range:number) {
            return function (x:number) {
                var a = x;
                var r = range - x;
                var b = r;

                for (var i = 1; i < exponent; i++){
                    a *= x;
                    b *= r;
                }

                return a / (a + b);
            }
        }
    }
}