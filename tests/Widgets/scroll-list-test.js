TestCase('ScrollList', {

    testShift: function () {

        /*:DOC += <ul id="list" style="width: 100%; height: 100%"></ul>*/

        var listElement = document.querySelector('#list');
        var list = new Widgets.ScrollList(listElement, 3);

        function createElement(id) {
            var element = document.createElement('li');
            element.id = id;
            element.style.width = '50px';
            element.style.height = '50px';
            element.style.position = 'absolute';
            element.style.display = 'block';
            element.style.backgroundColor = 'red';
            element.innerHTML = id;
            return element;
        }

        for (var i = 0; i < 5; i++) {
            list.addElement(createElement(i));
        }

        var e0 = list.element.children[0];
        var e1 = list.element.children[1];
        var e4 = list.element.children[4];

        list.setPositions(0);
        var firstXPosition = parseInt(e0.style.left);
        var firstYPosition = parseInt(e0.style.top);
        var secondXPosition = parseInt(e1.style.left);
        var secondYPosition = parseInt(e1.style.top);



        assertTrue(parseInt(e0.style.left) < parseInt(e1.style.left));

        list.setPositions(1);

        assertEqualsDelta(secondXPosition, parseInt(e0.style.left), 1);
   }
});