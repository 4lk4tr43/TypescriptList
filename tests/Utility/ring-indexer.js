TestCase('RingIndexer', {
    testRingIndexer: function () {
        var array = [1,2,3];
        var indexer = new Utility.RingIndexer(array);

        assertEquals('Overshot base 0', 1, indexer.getAtIndex(3));
        assertEquals('Undershoot base 0', 3, indexer.getAtIndex(-1));
        indexer.base = -1;
        assertEquals('Root base -1', 1, indexer.getAtIndex(-1));
        assertEquals('Overshot base -1', 1, indexer.getAtIndex(2));
        assertEquals('Undershot base -1', 3, indexer.getAtIndex(-2));
        indexer.base = -2;
        assertEquals('Overshot base -2', 1, indexer.getAtIndex(1));
        assertEquals('Double Overshot base -2', 1, indexer.getAtIndex(4));
        assertEquals('Middle Overshot base -2', 3, indexer.getAtIndex(3));
        assertEquals('Undershot base -2', 3, indexer.getAtIndex(-3));
        assertEquals('Double Undershot base -2', 3, indexer.getAtIndex(-6));
        assertEquals('Middle Undershot base -2', 2, indexer.getAtIndex(-4));
        indexer.base = 2;
        assertEquals('Overshot base 2', 1, indexer.getAtIndex(5));
        assertEquals('Double Overshot base 2', 1, indexer.getAtIndex(8));
        assertEquals('Middle Overshot base 2', 2, indexer.getAtIndex(6));
        assertEquals('Undershot base 2', 3, indexer.getAtIndex(1));
        assertEquals('Double Undershot base 2', 3, indexer.getAtIndex(-2));
        assertEquals('Middle Undershot base 2', 2, indexer.getAtIndex(0));
    }
});