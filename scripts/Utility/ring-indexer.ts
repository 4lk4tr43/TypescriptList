module Utility {

    export class RingIndexer {

        /**
         * Creates a ring representation of an array.
         *
         * @param array :Array, the array to make circular
         * @param base :number, the shift for the indexes e.g. -1 -> -1 will be the first index
         */
        constructor(public array:any[], public base:number = 0) {
        }

        /**
         * Get an object at an index
         *
         * @param index :number, the this.base based index
         * @param wrappedEvent :(sender, {index:number}) => {}, the event sent when the index gets wrapped
         * @returns any , the object at the ring index
         */
        getAtIndex(index:number,
                   wrappedEvent:(sender:RingIndexer, event:{index:number}) => {} = undefined):any {
            var length = this.array.length;

            var i = index - this.base;
            i = i < 0 ? length - (-i % length) : i % length;
            if (wrappedEvent !== undefined &&
                (index < this.base || index >= length + this.base))
                wrappedEvent(this, {index: index});
            return this.array[i];
        }

        getRingIndexForUncappedIndex(index:number,
                                     wrappedEvent:(sender:RingIndexer, event:{index:number}) => void = undefined):number {

            var length = this.array.length;
            var i = index - this.base;
            i = i < 0 ? length - (-i % length) : i % length;
            if (wrappedEvent !== undefined &&
                (index < this.base || index >= length + this.base))
                wrappedEvent(this, {index: index});
            return i+this.base;
        }
    }
}