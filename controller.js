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


    var canvas,
        gl,
        vertexList = [],
        polygonColour = "red",
        polygonType = "user",
        green   = 'vec4(0, 1, 0, 1)',
        red     = 'vec4(1, 0, 0, 1)',
        blue    = 'vec4(0, 0, 1, 1)';

/**********************************************************************************************************************
***        Prep the page once everything is loaded ready for WebGL
**********************************************************************************************************************/

    window.onload = function(){

        __initWebGL();                                      // load the initialisation function
        regularPolygon.prepCanvas();                        // set and display the default polygon type selector
        setColourSelector(polygonColour);                   // set and display the default colour selector

        /**
          * Dom Element Listners
          */
        document.addEventListener('keydown', (event) => {   // Add event listener for keyboard presses
            if( validKeyPressed(event) ) {                  // test to if the keyboard keystroke matches a function
                if(polygonType == "user") {                 // test to see what polygon settings we are in
                    userInput.keydown(event);               // call the appropriate function
                } else if( polygonType == "regular") {      // test to see what polygon settings we are in
                    regularPolygon.keydown(event);          // call the appropriate function
                }
            }
        });

        canvas.addEventListener('click', function(event) {  // Add event listener for `click` events.
            if (polygonType == 'user') {                    // make sure we are in the right 'polygon type' mode
                userInput.click(event);                     // if so, call the onclick function
            }
        }, false);
    }
    
/*********************************************************************************************************************/





/**********************************************************************************************************************
***         Common functions
**********************************************************************************************************************/
	/**
	  * use an initiation function to control what happens on the page load. This is done just to ensure all functionality 
	  * lines up the way it should as javascript has a tendency to bugger code due its asynchronousnessness....
	  */

    function  __initWebGL(){     
        canvas = document.getElementById('mainCanvas');     // declare a global variable linking the canvas
        gl = WebGLUtils.setupWebGL(canvas);                 // set the gl object instance
        if (!gl) alert("WebGL isn't available");            // alert the user if their browser cant use the gl object
        gl.viewport(0, 0, canvas.width, canvas.height);     // set viewport
        gl.clearColor(0, 0, 0, 1);                          // create a clear canvas
    }

    function validKeyPressed(event){
        var KeyPressed = event.key;                     // get the value of keypressed
        var validInuts = new RegExp('^[3-9]+$');        //create a regex to test the key was a number between 3 and 9
        if( validInuts.test(KeyPressed) || KeyPressed == "d" || KeyPressed == "r") {
            return true;                                // return true if passes regex or is a r|d character
        } else {
            return false;                               // else if the character didnt pass the test, return false
        }
    }

    function clearVertexList(){
        vertexList = [];                                // clear the array
        keyboardRender();                               // re render the scene
    }

    function setVertexCount(arg){
        vertexCount = arg;                              // assign the arguemnt to the variable
    }

    function setPolygonType(arg){
        polygonType = arg;                              // assign the arguemnt to the variable
    }

    function setColour(arg){
        polygonColour = arg;                            // assign the arguemnt to the variable
        
    }

    function log(e){
        console.log(e);                                 // a quicker way to call a console.log action
    }

/*********************************************************************************************************************/






/**********************************************************************************************************************
***         Rendering functions
**********************************************************************************************************************/

    function preRender() {
        
        /*
         *  the concept of the code here was influenced by the guide found at: https://www.tutorialspoint.com/webgl/webgl_sample_application.
         */
         var vertex_buffer = gl.createBuffer();                                         // Create an empty buffer object
         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);                                 // Bind appropriate array buffer to it
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexList), gl.STATIC_DRAW);  // Pass the vertex data to the buffer
         gl.bindBuffer(gl.ARRAY_BUFFER, null);                                          // Unbind the buffer
         var vertCode =                                                                 // Vertex shader source code
            'attribute vec3 coordinates;' +
            'void main(void) {' +
               ' gl_Position = vec4(coordinates, 1.0);' + 
                'gl_PointSize = 5.0;'+
             
            '}';
         var vertShader = gl.createShader(gl.VERTEX_SHADER);                            // Create a vertex shader object
         gl.shaderSource(vertShader, vertCode);                                         // Attach vertex shader source code
         gl.compileShader(vertShader);                                                  // Compile the vertex shader
         var fragCode =                                                                 // Fragment shader source code
            'void main(void) {' +
            'gl_FragColor = '+eval(polygonColour)+';' + 
        '}';
         var fragShader = gl.createShader(gl.FRAGMENT_SHADER);                          // Create fragment shader object
         gl.shaderSource(fragShader, fragCode);                                         // Attach fragment shader source code
         gl.compileShader(fragShader);                                                  // Compile the fragmentt shader
         var shaderProgram = gl.createProgram();                                        // the combined shader program
         gl.attachShader(shaderProgram, vertShader);                                    // Attach a vertex shader
         gl.attachShader(shaderProgram, fragShader);                                    // Attach a fragment shader
         gl.linkProgram(shaderProgram);                                                 // Link both the programs
         gl.useProgram(shaderProgram);                                                  // Use the combined shader program object
         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);                                 // Bind vertex buffer object
         var coord = gl.getAttribLocation(shaderProgram, "coordinates");                // Get the attribute location
         gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);                       // Point an attribute to the currently bound VBO
         gl.enableVertexAttribArray(coord);                                             // Enable the attribute

    }


    function clickRender() {
        preRender();                                                                    // setup the buffers and the program
        gl.clearColor(0, 0, 0, 0);                                                      // Clear the canvas
        if( vertexList.length < 1 )  gl.clear(gl.COLOR_BUFFER_BIT);                     // if there is nothing to show, clear the canvas
        gl.enable(gl.DEPTH_TEST);                                                       // Enable the depth test
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);                            // Clear the color and depth buffer
        gl.viewport(0,0,canvas.width,canvas.height);                                    // Set the view port
        gl.drawArrays(gl.LINE_STRIP, 0,vertexList.length / 3 );                         // draw the line strip
        gl.drawArrays(gl.POINTS, 0,vertexList.length / 3 );                             // draw the points

    }

    function keyboardRender() {
        preRender();                                                                    // setup the buffers and the program
        gl.clearColor(0, 0, 0, 0);                                                      // Clear the canvas
        if( vertexList.length < 1 )  gl.clear(gl.COLOR_BUFFER_BIT);                     // if there is nothing to show, clear the canvas
        gl.enable(gl.DEPTH_TEST);                                                       // Enable the depth test
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);                            // Clear the color and depth buffer
        gl.viewport(0,0,canvas.width,canvas.height);                                    // Set the view port
        if( testDirection() ){                                                          // if the directinal test passes render the polygon filled
            gl.drawArrays(gl.LINE_LOOP, 0,vertexList.length / 3 );                      // Draw the line loop
            gl.drawArrays(gl.TRIANGLE_FAN, 0,vertexList.length / 3 );                   // Draw the triangle fan
            gl.drawArrays(gl.POINTS, 0,vertexList.length / 3 );                         // Draw the points
        } else {                                                                        // if the directinal test passes render the lines as a loop but dont fill the ploygon
            gl.drawArrays(gl.LINE_LOOP, 0,vertexList.length / 3 );                      // Draw the line loop
            gl.drawArrays(gl.POINTS, 0,vertexList.length / 3 );                         // Draw the points
        }
    }   


    // POINTS, LINE_STRIP, LINE_LOOP, LINES, TRIANGLE_STRIP,TRIANGLE_FAN, TRIANGLES


/*********************************************************************************************************************/