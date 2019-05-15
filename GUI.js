/**********************************************************************************************************************
***
***         Common GUI functions that toggle user elements   
***
***         Author:             Ian Blott : 11606379 - charles_sturt@blott.com.au
***         Project:            ITC363 Assignemnt 2
***         Dev Date:           5/4/2019
***         Completion Date:    19/4/2019
***
**********************************************************************************************************************/



/**********************************************************************************************************************
***         'Polygon Type' select element
**********************************************************************************************************************/

    function changePolygonTypeSelector(){

        // reference the selector DOM element
        var selector =  document.getElementById("polygonType"),
            option =  selector.options[selector.selectedIndex];
        setPolygonType(option.value);                   // set the variable to the value of the selector
        toggleUserControllers(polygonType);             // hide / show the appropriate user controls
        clearVertexList();
        
        if( polygonType == "regular" ) changeVertexCount("5");
        keyboardRender();
    }

    function toggleUserControllers(controls){
        if( controls == "user")
        {
            toggleVertexClearLink('show');
            togglePolygonSideCount('hide');

        } else if( controls == "regular") {
            toggleVertexClearLink('hide');
            togglePolygonSideCount('show');

        }
    }

    function setPolygonTypeSelector(arg){
        var Elem = document.getElementById("polygonType");
        if( Elem == null || Elem == undefined ) return;
        Elem.value = arg;
    }

/*********************************************************************************************************************/





/**********************************************************************************************************************
***         Hide / show functions for different Polygon Type options
**********************************************************************************************************************/

    function togglePolygonSideCount(arg){
        var domElem = document.getElementById("polygonSideCount");
        toggleInlineBlock(domElem, arg);
    }

    function toggleVertexClearLink(arg){
        var domElem = document.getElementById("vertexClearLink");
        toggleInlineBlock(domElem, arg);
    }

/*********************************************************************************************************************/




/**********************************************************************************************************************
***         Adjust CSS on links for the opolygon side count numbers
**********************************************************************************************************************/

    function highlightVertexLink(){
        // remove all existing classes from all vertex count DOM elements
        for(var x=3; x<10; x++){
            document.getElementById('sideSelect' + x).classList.remove("active");
        }
        // add the class the the relevant DOM element
        document.getElementById('sideSelect' + vertexCount).classList.add("active");
    }

/*********************************************************************************************************************/




/**********************************************************************************************************************
***         'Colour' select element
**********************************************************************************************************************/

    function changeColourSelector(){
        var selector =  document.getElementById("polygonColour"),   // reference the selector DOM element
            option =  selector.options[selector.selectedIndex];     // get the svalue of the current selection option
        setColour(option.value);                                    // set the variable to the value of the selector
        keyboardRender();
    }

    function setColourSelector(arg){
        document.getElementById("polygonColour").value = arg;
       
    }

/*********************************************************************************************************************/




/**********************************************************************************************************************
***         Generic / shared functions
**********************************************************************************************************************/

// perform hide / show actions using CSS's inline-blick
function toggleInlineBlock(Elem, setDisplay){
    if( Elem == null || Elem == undefined ) return;
    if( setDisplay == 'hide'){
        Elem.style.display = 'none';
    }else if (setDisplay == 'show'){
        Elem.style.display = 'inline-block';
    }
}

/*********************************************************************************************************************/