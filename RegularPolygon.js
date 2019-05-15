/**********************************************************************************************************************
***
***         Regular Polygon Type WebGL functionality
***
***         Author:             Ian Blott : 11606379 - charles_sturt@blott.com.au
***         Project:            ITC363 Assignemnt 2
***         Dev Date:           5/4/2019
***         Completion Date:    19/4/2019
***
**********************************************************************************************************************/



/**********************************************************************************************************************
***        pseudo namespace functions
**********************************************************************************************************************/
    var regularPolygon = {
            prepCanvas: function (){
                            setPolygonType("regular");
                            setPolygonTypeSelector("regular");
                            toggleUserControllers("regular");
                            changeVertexCount("5"); 
                        },


            keydown:    function (event){   
                            setPolygonType("regular");
                            setPolygonTypeSelector("regular");
                            changeVertexCount(event.key);
                        }
        }

/*********************************************************************************************************************/

    
    
    
/**********************************************************************************************************************
***        Prep the page once everything is loaded ready for WebGL
**********************************************************************************************************************/

    function changeVertexCount(arg){    
        setVertexCount(arg);    // set the variable
        highlightVertexLink();  // adjust CSS class's to highlight the users pick
        buildPolygon();         // build the co-ordinated for the polygon
        keyboardRender();       
    }

    function buildPolygon(){
        var radius = 0.95,
            anglePerFan = (2*Math.PI) / vertexCount;

        vertexList = [];        // reset the list every time

        for(var i = 0; i <= vertexCount; i++)
        {
            var angle = anglePerFan * (i+1),
                x = Math.sin(angle) * radius,
                y = Math.cos(angle) * radius,
                z = 0;

            vertexList.push(x);
            vertexList.push(y);
            vertexList.push(z);
       } 
    }
/*********************************************************************************************************************/