/**********************************************************************************************************************
***
***         User Input Polygon Type WebGL functionality  
***
***         Author:             Ian Blott :
***         Project:            ITC363 Assignemnt 2
***         Dev Date:           5/4/2019
***         Completion Date:    19/4/2019
***
**********************************************************************************************************************/

    
/**********************************************************************************************************************
***        pseudo namespace functions
**********************************************************************************************************************/

    var userInput = {

            prepCanvas: function (){        
                            setPolygonType("user");
                            setPolygonTypeSelector("user");
                            toggleUserControllers("user");
                            setVertexCount(0);
                            clearVertexList();
                        },

            keydown:    function (event){
                            var keyPressed = event.key;
                            if( keyPressed == "r"){
                                clearVertexList();
                            } else if( keyPressed == "d"){
                                keyboardRender();
                            } else {
                                log("no valid input detected");
                            }
                        },

            click:      function (event) {  
                            var rect = canvas.getBoundingClientRect(),
                                x = 2 * ( event.clientX - rect.left ) / canvas.width - 1,
                                y = 2 * ( canvas.height - ( event.clientY - rect.top ) ) / canvas.height - 1,
                                z = 0;
                            vertexList.push(x);
                            vertexList.push(y);
                            vertexList.push(z);

                            clickRender();
                        }
    };

/*********************************************************************************************************************/

    
    
    


/**********************************************************************************************************************
***        Prep the page once everything is loaded ready for WebGL
**********************************************************************************************************************/

    function testDirection(){
        if (vertexList.length <= 3 ) return true;   // allow it to render just the line and points
        var initialSign = 0,                        // define a default variable to store the sign from the first edge
            x = vertexList[0],                      // get the x co-ord for the first vertex
            y = vertexList[1],                      // get the y co-ord for the first vertex
            z = vertexList[2],                      // get the z co-ord for the first vertex
            v0 = [x,y,z],                           // store the x,y,z co-ords in an array for later calculations
            v1 = [],                                // define variables to be used later
            v2 = [],                                // define variables to be used later
            i = 3;                                  // start the loop counter at element '3' as we are using the forst 3 as the V0

        do{
            var sign;                               // define the sign variable

            v1 = [vertexList[i], vertexList[i+1], vertexList[i+2]]; // create an array with the next vertex's X,Y,X values

            var e1x = v1[0] - v0[0];                // subrtact the x value of v0 from v1
            var e1y = v1[1] - v0[1];                // subrtact the y value of v0 from v1
            var e1z = v1[2] - v0[2];                // subrtact the z value of v0 from v1

            var edge1 = [e1x,e1y,e1z];              // store the subtracted values in an array to utilise the MV.js functions

            if( v2.length != 0 ){                   // make sure we have atleast 2 edges to work with    
                var e2x = v2[0] - v0[0];            // subrtact the x value of v0 from v2
                var e2y = v2[1] - v0[1];            // subrtact the y value of v0 from v2
                var e2z = v2[2] - v0[2];            // subrtact the z value of v0 from v2

                var edge2 = [e2x,e2y,e2z];          // store the subtracted values in an array to utilise the MV.js functions

                var area = mult(cross(edge1, edge2),[0.5, 0.5, 0.5]); // mult and cross are MV.js functions to figure out the area

                if( area[2] != 0 ){                 // make sure the mult(cross()) process returned a value response
                    sign = Math.sign(area[2]);      // check the sign of the 3rd element
                    if( !isNaN(sign) ){             // make sure the sign is a number we can deal with
                        if( initialSign == 0 ) {    // if the initialSign is '0' then we expect it to be working in the first edge, we can set this as our marker
                            initialSign = sign;     // set the marker
                        } else if (initialSign != sign){ // if sign is different to initialSign then we know the direction is wrong 
                            return false;           // return false
                        }
                    }
                }
            }
            v2 = v1;                                // set v2 values to v1 so we can use it in the next loop
            i = i+3;                                // skip i ahead 3 spots, this is due to x,y,z having been used in this loop
        } while (i < vertexList.length );           // loop till we are out of verticies
        return true;                                // If we have reached this point then the polygon must be valid
    }
/*********************************************************************************************************************/
