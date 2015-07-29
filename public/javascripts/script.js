var aplicacion = angular.module('aplicacion', []);
aplicacion.controller('Municipios', function($scope, $http) {
//$("#navba").css('opacity','0.0');    
   
    
     function alterna_modo_de_pantalla() {
              var imagenScreen=document.getElementById("fullscreen");

      if ((document.fullScreenElement && document.fullScreenElement !== null) ||    // metodo alternativo
          (!document.mozFullScreen && !document.webkitIsFullScreen)) {
          imagenScreen.src='../img/salirexpandir.png';
          imagenScreen.title='Salir de pantalla Completa';

          // metodos actuales
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
          imagenScreen.src='../img/expandir.png';
          imagenScreen.title='Pantalla Completa';


        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    }   

                        
      var municipios=[];
      var anio=2014;
       //$( "#slider-range-max" ).hide();
          $( "#slider-range-max" ).slider({

                              range: "min",
                              min: 2007,
                              max: 2015,
                              value: 2014,
                              animate: true,
                              slide: function( event, ui ) {

                                $( "#amount" ).val( ui.value );
                              },

          });

     
        
     $( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );    
    /*$scope._id = null;
    $scope.municipio = '';
    $scope.dengue = ''
    $scope.dengue = '';
    $scope.coordenadas.latitud = '';
    $scope.coordenadas.longitud = '';*/
    $scope.datosMunicipio = [];
    $scope.cargarMunicipio = function(){
        $http({
            method: 'GET', url: '/Dengue_listar'
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.datosMunicipio = data;
             
       


                function d2h(d) { return (+d).toString(16); }
    
                      $('.ocultar').hide();  //oculta elementos del menu
                    
                    var coordenadas_Mun= new Array();
                    var coordenadas_Mun_aux= new Array();



                
                    var vector_lat= new Array(); //vector que almacena la latitud
                    var vector_long= new Array(); //vector que almacena la longitud

                
                        ////los vectores almacenaran el conjunto de las coordenadas, quedaran almacenando todo un vector, vector_lat y vector_long en cada posicion tienen un vector completo con las coordenadas de latitud y longitud respectivmanete

                    for (var i in  $scope.datosMunicipio){
                          vector_lat.push($scope.datosMunicipio[i].coordenadas.latitud);
                          vector_long.push($scope.datosMunicipio[i].coordenadas.longitud);

                    }
    
 

                    // Closed Line from 3D Points
                    // Three.js r.51 (Updated for r.52)

                    // WestLangley
                    //console.log(vector_long[0][0])
                    var camera, scene, renderer, controls;
                    var projector, mouse = { x: 0, y: 0 }, INTERSECTED;
                    var context1, texture1;
                    // dom


                    // renderer
                    renderer = new THREE.WebGLRenderer();
                    renderer.setSize( window.innerWidth, window.innerHeight );
                //renderer.setSize( screen.width , screen.height );
                 
                document.getElementById('render').appendChild(renderer.domElement);
                    //container.appendChild( renderer.domElement );

                    // scene
                    scene = new THREE.Scene();

                    // camera

                
                
                    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000);
                    //camera.position.set( 0, 0, 20 );
                    camera.position.set(2.4457938219139463,  0,  17.37913738929295)
                    camera.lookAt(scene.position);
                    scene.add(camera);
                    var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
                
                    Textura_plano=new THREE.ImageUtils.loadTexture("img/gris.jpg");
                    Textura_plano.wrapS=Textura_plano.wrapT=THREE.RepeatWrapping;
                    //Textura_plano.repeat.set(1000,1000);
                    // Material y agregado la textura
                    Material_plano=new THREE.MeshBasicMaterial({map:Textura_plano,side:THREE.DoubleSide});
                
                    //var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: "#AFAFAF", side: THREE.BackSide } );
                    var skyBox = new THREE.Mesh( skyBoxGeometry, Material_plano );
                    scene.add(skyBox);
                    // controls
                    controls = new THREE.OrbitControls( camera );

                    // geometry
                        var Geometria=new Array();
                        var array_extrude=new Array();
                        var forma_figura=new Array();
                        var extrude_geometria=new Array();
                        var municipios=new Array();
                        var line= new Array();
                        var lineTrasera= new Array();
                        var Vector=new Array();
                        var municipios_valor=new Array();
                        var flag;
                        // extrusión
                        var wfh= new Array();
                 var xCentro = [];    
                        var datos_extrusion={
                            bevelEnabled: false,
                            extrudeMaterial: 1,    amount:0.2, //cantidad de profundidad
                        };
                        canvas1 = document.createElement('canvas');
                        context1 = canvas1.getContext('2d');
                        context1.font = "Bold 20px Arial";
                        context1.fillStyle = "rgba(0,0,0,0.95)";
                        context1.fillText('Hello, world!', 0, 20);

                        // canvas contents will be used for a texture
                        texture1 = new THREE.Texture(canvas1)
                        texture1.needsUpdate = true;
                
                        var spriteMaterial = new THREE.SpriteMaterial( { map: texture1, useScreenCoordinates: true, alignment: THREE.SpriteAlignment.topLeft } );
    
                        sprite1 = new THREE.Sprite( spriteMaterial );
                        sprite1.scale.set(200,100,1.0);
                        sprite1.position.set( 1000, 1000, 1000 );
                        scene.add( sprite1 );    
                
                        var textura = new THREE.ImageUtils.loadTexture('img/muro.jpg');
                    //repetir la textura figura
                       textura.repeat.set(0.06,0.06);
                    //repetir la textura de la figura
                    //textura.wrapS = textura.wrapT = THREE.repeatWrapping; conflicto
                      function onDocumentMouseMove( event ) {

                                //event.preventDefault();
                                sprite1.position.set( event.clientX, event.clientY - 20, 0 );
                                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                                mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

                            }
                    // agregamos un material para que el punto tenga color
                //Material de la figura
                       var material = new THREE.MeshBasicMaterial({color:0XFF0000,  vertexColors: THREE.VertexColors,shading: THREE.FlatShading, wireframe:false});
                       var materialFront = new Array();
                       var materialSide = new THREE.LineBasicMaterial( { color: "#000000"} );
                                    //    var materialSide1 = new THREE.LineBasicMaterial({color: "#6699FF, linewidth: 1, fog:true});
                       var materialArray = [ materialFront, materialSide ];
                        //var materialMapa = new THREE.MeshFaceMaterial(materialArray);
                       var star=new Array();
                
                
                
                    var offsetArray = [];
                
                
                
                        for(i in $scope.datosMunicipio){
                                console.log(i+"nombre: "+$scope.datosMunicipio[i].nombre)

                                Geometria[i]=new THREE.Geometry();
                                array_extrude[i]=new Array();
                                  for (var a  in  vector_lat[i]){

                                     if(a!=0){
                                        if(vector_lat[i][a]==vector_lat[i][a-1]) {
                                            continue;
                                        }
                                     }
                                        Vector[i]=new THREE.Vector3((vector_long[i][a]+75.5)*10,((vector_lat[i][a])-5.5)*10,0);
                                        Geometria[i].vertices.push(Vector[i]);  
                                        array_extrude[i].push(Vector[i]);

                                    }

                                forma_figura[i]=new THREE.Shape(array_extrude[i]);

                                extrude_geometria[i]=new THREE.ExtrudeGeometry(forma_figura[i],datos_extrusion); // lento
                                materialFront[i] = new THREE.MeshBasicMaterial( { color: "#FF0000",name:$scope.datosMunicipio[i].nombre} );
                               
                                municipios[i] = new THREE.Mesh( extrude_geometria[i], materialFront[i] );
                                
                            municipios[i].geometry.computeBoundingBox();
                            var offset = municipios[i].geometry.boundingBox.center().negate();
                           // municipios[i].position.copy(offset);
                            offsetArray[i]=offset; 
                                //municipios[i].position.set(i,0,0);
                            
                            
                                municipios[i].name=$scope.datosMunicipio[i].nombre;     
                         //      municipios[i].geometry.computeBoundingBox();
                       //var bBoxOffset = municipios[i].geometry.boundingBox.center();

                                

                                scene.add(municipios[i]);
                            
                               line[i] = new THREE.Line( Geometria[i], materialSide);
                                lineTrasera[i] = new THREE.Line( Geometria[i], materialSide);
                                //municipios[i].position.set(0,0,0);
                                line[i].position.set( 0, 0, 0.21 );
                                lineTrasera[i].position.set( 0, 0,-0.01 );
                                 // line.scale.set( 49, 49, 49 );


                                scene.add( line[i] );
                                scene.add( lineTrasera[i] );
                                
                         
                        }
                
                //console.log(offsetArray)
               /*municipios[0].position.set( -0.4257387912074506, -0.7923656283769498,-0.1 );
                municipios[1].position.set( 2.5103504397383603, 3.005485998822235,-0.1 );
                 */
                 //    municipios[0].position.set( 1, 1,1 );

                            projector = new THREE.Projector();
    
    // when the mouse moves, call the given function
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
   
                
                
                    
                          

                       var array_anio=new Array();
                
                       //contiene los key de los a;os desde 2007 a 2015                                            
                       array_saberObjanio=Object.keys($scope.datosMunicipio[0].historico.dengue);

                       //contendrá el array poor anios, en cada posicion del vector
                       var array_anio=new Array();
                        //permite conocer que posicion ocupa un anio en    array_saberObjanio
                        var posicion_arrayObj;

                         for(var a in  array_saberObjanio){
                                array_anio[a]=new Array();
                           }

                        for(var i in  $scope.datosMunicipio){

                           // console.log(a);
                       /*  console.log($scope.datosMunicipio.historico.dengue);
                                             console.log($scope.datosMunicipio.historico.dengue.length);
        */

                           for(var a in  $scope.datosMunicipio[i].historico.dengue){
                                               //console.log(a);
                               //console.log(Object.keys($scope.datosMunicipio[i].historico.dengue))
                              // console.log($scope.datosMunicipio[i].historico.dengue[a])
                              //console.log( Object.keys($scope.datosMunicipio[i].historico.dengue))


                            posicion_arrayObj= array_saberObjanio.indexOf(a);
                              // console.log(posicion_arrayObj)
                               if(a==array_saberObjanio[posicion_arrayObj]){
                            array_anio[posicion_arrayObj].push($scope.datosMunicipio[i].historico.dengue[a]);
                               }
                             //console.log($scope.datosMunicipio[i].historico.dengue[a]);
                              //console.log(Object.keys($scope.datosMunicipio[i].historico.dengue))


                             //array_anio[i].push($scope.datosMunicipio[i].historico.dengue);

                            }
                        }
                         
                        for(var i in  $scope.datosMunicipio ){
                            municipios[i].userData={nombre: $scope.datosMunicipio[i].nombre, valorDengue:0, orden:i};
                            line[i].userData={nombre: $scope.datosMunicipio[i].nombre, valorDengue:0, orden:i};
                            lineTrasera[i].userData={nombre: $scope.datosMunicipio[i].nombre, valorDengue:0, orden:i};
                        }
                        
                        //método para cambiar de año

                      
function deMenorAMayor(elem1, elem2) {return elem1-elem2;}

function deMayorAMenor(elem1, elem2) {return elem2-elem1;}
                
                      
                
                
                  function ordenarMunicipios(){  
                      
                      
                                pintarMun();
                                var dengueDatos=new Array();  
                                for (var i in  $scope.datosMunicipio){  
                                          dengueDatos.push(municipios[i].userData.valorDengue);

                                }       
                                //console.log(dengueDatos);
                                var Orden=dengueDatos.sort(deMayorAMenor);
                                     var indexOrden;
                                   for (var i in  $scope.datosMunicipio){
                                        /* if(Orden[i]=="nada"){
                                            continue;
                                         }*/
                                       indexOrden=Orden.indexOf(municipios[i].userData.valorDengue)
                                            municipios[i].userData.orden=indexOrden;
                                            line[i].userData.orden=indexOrden;
                                            lineTrasera[i].userData.orden=indexOrden;
                                            Orden[indexOrden]="";

                                   }
                                  for (var i in $scope.datosMunicipio){
                                      xCentro.push((i+1)*0.4);
                                  }

                                 for (var i in  $scope.datosMunicipio){
                                 //municipios[i].material.color.set("#CC7722");

                                 camera.lookAt(scene.position);    
                                camera.position.set(   -5.1239860576815826,  -2.981872176737795,  36.70493502492447)
                                camera.lookAt(scene.position);

                                     if(municipios[i].userData.orden<=4){


                                        var tween = new TWEEN.Tween(municipios[i].position).to({ x: (offsetArray[i].x-8) + municipios[i].userData.orden*2.8, y: (offsetArray[i].y+10), z: offsetArray[i].z  }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
//line[i].position.set( 0, 0, 0.21 );
                                     }

                                
                                      if(municipios[i].userData.orden>4 && municipios[i].userData.orden<=9){
                                       var tween = new TWEEN.Tween(municipios[i].position).to({ x: (offsetArray[i].x-22) + municipios[i].userData.orden*2.8, y: (offsetArray[i].y+5), z: offsetArray[i].z  }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }

                                       if(municipios[i].userData.orden>9 && municipios[i].userData.orden<=14){
                                        var tween = new TWEEN.Tween(municipios[i].position).to({ x: (offsetArray[i].x-36) + municipios[i].userData.orden*2.8, y:offsetArray[i].y, z: offsetArray[i].z }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }

                                       if(municipios[i].userData.orden>14 && municipios[i].userData.orden<=19){
                                        var tween = new TWEEN.Tween(municipios[i].position).to({ x: (offsetArray[i].x-50) + municipios[i].userData.orden*2.8, y:offsetArray[i].y-5, z: offsetArray[i].z }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }

                                      if(municipios[i].userData.orden>19 && municipios[i].userData.orden<=24){
                                       var tween = new TWEEN.Tween(municipios[i].position).to({ x: (offsetArray[i].x-64) + municipios[i].userData.orden*2.8, y:offsetArray[i].y-10, z: offsetArray[i].z }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }

                                      if(municipios[i].userData.orden>24){
                                        var tween = new TWEEN.Tween(municipios[i].position).to({ x: (offsetArray[i].x-78) + municipios[i].userData.orden*2.8, y:offsetArray[i].y-13, z: offsetArray[i].z }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }

                                if(line[i].userData.orden<=4){


                                        var tween = new TWEEN.Tween(line[i].position).to({ x: (offsetArray[i].x-8) + line[i].userData.orden*2.8, y: (offsetArray[i].y+10), z: offsetArray[i].z +0.21  }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
//line[i].position.set( 0, 0, 0.21 );
                                     }

                           
                                      if(line[i].userData.orden>4 && line[i].userData.orden<=9){
                                       var tween = new TWEEN.Tween(line[i].position).to({ x: (offsetArray[i].x-22) + line[i].userData.orden*2.8, y: (offsetArray[i].y+5), z: offsetArray[i].z +0.21  }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }

                                       if(line[i].userData.orden>9 && line[i].userData.orden<=14){
                                        var tween = new TWEEN.Tween(line[i].position).to({ x: (offsetArray[i].x-36) + line[i].userData.orden*2.8, y:offsetArray[i].y, z: offsetArray[i].z+0.21  }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }

                                       if(line[i].userData.orden>14 && line[i].userData.orden<=19){
                                        var tween = new TWEEN.Tween(line[i].position).to({ x: (offsetArray[i].x-50) + line[i].userData.orden*2.8, y:offsetArray[i].y-5, z: offsetArray[i].z +0.21 }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }

                                      if(line[i].userData.orden>19 && line[i].userData.orden<=24){
                                       var tween = new TWEEN.Tween(line[i].position).to({ x: (offsetArray[i].x-64) + line[i].userData.orden*2.8, y:offsetArray[i].y-10, z: offsetArray[i].z +0.21 }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }

                                      if(line[i].userData.orden>24){
                                        var tween = new TWEEN.Tween(line[i].position).to({ x: (offsetArray[i].x-78) + line[i].userData.orden*2.8, y:offsetArray[i].y-13, z: offsetArray[i].z +0.21 }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }

                                     if(lineTrasera[i].userData.orden<=4){


                                        var tween = new TWEEN.Tween(lineTrasera[i].position).to({ x: (offsetArray[i].x-8) + lineTrasera[i].userData.orden*2.8, y: (offsetArray[i].y+10), z: offsetArray[i].z -0.01 }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
//lineTrasera[i].position.set( 0, 0, -0.01 );
                                     }

                           
                                      if(lineTrasera[i].userData.orden>4 && lineTrasera[i].userData.orden<=9){
                                       var tween = new TWEEN.Tween(lineTrasera[i].position).to({ x: (offsetArray[i].x-22) + lineTrasera[i].userData.orden*2.8, y: (offsetArray[i].y+5), z: offsetArray[i].z -0.01  }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }

                                       if(lineTrasera[i].userData.orden>9 && lineTrasera[i].userData.orden<=14){
                                        var tween = new TWEEN.Tween(lineTrasera[i].position).to({ x: (offsetArray[i].x-36) + lineTrasera[i].userData.orden*2.8, y:offsetArray[i].y, z: offsetArray[i].z -0.01 }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }

                                       if(lineTrasera[i].userData.orden>14 && lineTrasera[i].userData.orden<=19){
                                        var tween = new TWEEN.Tween(lineTrasera[i].position).to({ x: (offsetArray[i].x-50) + lineTrasera[i].userData.orden*2.8, y:offsetArray[i].y-5, z: offsetArray[i].z -0.01  }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }

                                      if(lineTrasera[i].userData.orden>19 && lineTrasera[i].userData.orden<=24){
                                       var tween = new TWEEN.Tween(lineTrasera[i].position).to({ x: (offsetArray[i].x-64) + lineTrasera[i].userData.orden*2.8, y:offsetArray[i].y-10, z: offsetArray[i].z -0.01  }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }

                                      if(lineTrasera[i].userData.orden>24){
                                        var tween = new TWEEN.Tween(lineTrasera[i].position).to({ x: (offsetArray[i].x-78) + lineTrasera[i].userData.orden*2.8, y:offsetArray[i].y-13, z: offsetArray[i].z -0.01  }, 3000).start();
                                        //tween.easing(TWEEN.Easing.Elastic.InOut);
                                       //tween.repeat(Infinity);
                                        tween.yoyo(true);
                                     }


                                     
                                 } 
                              }
                
                      $( "#slider-range-max" ).on( "slide", function( event, ui ) {
                            anio= $( "#amount" ).val( ui.value );
                            anio=($( "#amount" ).val());
                    
                    
                          
                          
                    if((($("#mundoOmun").val())=="mundo")){ 
                        
                        
                        
                             pintarMun();
                                               

                      }
                          
                    if((($("#mundoOmun").val())=="municipios")){
                            ordenarMunicipios();
                                
                          }
             

                        //console.log(municipios);  


                       });
                

                
                
                     
                     
                        
                    
                        var array_saberObjmeses=Object.keys(array_anio[0][0]);
               // console.log(array_saberObjmeses)  
                
                  $("#mundo").click(function() {
                            $("#mundo").addClass("active");
                            $("#municipios").removeClass("active");
                            $("#mundoOmun").val("mundo");
                            // camera.position.set(2.4457938219139463,  0,  17.37913738929295);
                            //pintarMun();
                            camera.position.set(2.4457938219139463,  0,  17.37913738929295);
                            camera.lookAt(scene.position);
                            for (var i in $scope.datosMunicipio){
                            var tween = new TWEEN.Tween(municipios[i].position).to({ x: 0, y:0, z:0 }, 3000).start();
                                            //tween.easing(TWEEN.Easing.Elastic.InOut);
                                           //tween.repeat(Infinity);
                                            tween.yoyo(true);
                                
                             var tween = new TWEEN.Tween(line[i].position).to({ x: 0, y:0, z:0.21 }, 3000).start();
                                            //tween.easing(TWEEN.Easing.Elastic.InOut);
                                           //tween.repeat(Infinity);
                                            tween.yoyo(true);
                                
                              var tween = new TWEEN.Tween(lineTrasera[i].position).to({ x: 0, y:0, z:-0.01 }, 3000).start();
                                            //tween.easing(TWEEN.Easing.Elastic.InOut);
                                           //tween.repeat(Infinity);
                                            tween.yoyo(true);
                            }
                        })  
                          
                          
                        $("#municipios").click(function() {
                            $("#mundo").removeClass("active");
                            $("#municipios").addClass("active");
                           $("#mundoOmun").val("municipios");
                            ordenarMunicipios();
                            
                        
                        })  
                         function pintarMun(){
                           
                          
                        var posicion_anio="";
                         posicion_anio=array_saberObjanio.indexOf(String(anio));
                         var hayCeroCaso=false;



                         array_dengue=new Array();


                         for (var i in municipios) {
                         //console.log(array_anio[posicion_anio][i])
                             var casosDengue=0;
                       for (var a in array_saberObjmeses){

                               casosDengue+=array_anio[posicion_anio][i][array_saberObjmeses[a]].casos;
                       }
                           municipios[i].userData.valorDengue=casosDengue;
                           
                            
                        
                               municipios[i].visible = false;
                           
                            if($("#c"+i).is(':checked')){

                                                if(municipios[i].userData.valorDengue!=0 ){
                                                    array_dengue.push(municipios[i].userData.valorDengue);
                                                }
                                                else{
                                                    hayCeroCaso=true;  //indica si hay almenos algun municipio con valor de cero
                                                }


                                                 municipios[i].visible = true;

                             }

                              if(!$("#c"+i).is(':checked')){

                                    municipios[i].visible = false;

                                }

                         }





                                   //se calcula el menor de  esta manera,  ya que si es null será cero, este comportamiento no sucede con el max
                                   var  min=(array_dengue[0]==null || array_dengue[0]==0 )?Infinity:array_dengue[0];

                                   for(var n in array_dengue){
                                            if(array_dengue[n]==null ){
                                               continue;
                                            }
                                        if (array_dengue[n]<min){
                                            min = array_dengue[n];
                                        }
                                    }

                                  // var max = Math.max.apply(null, array_dengue);
                                    var max =(array_dengue[0]==null || array_dengue[0]==0 )?(0):array_dengue[0];
                                     for(var n in array_dengue){
                                            if(array_dengue[n]==null ){
                                               continue;
                                            }
                                        if (array_dengue[n]>max){
                                            max = array_dengue[n];
                                        }
                                    }

                                   var nulos=0;
                                   for(var i in municipios){
                                        if ((municipios[i].visible)==false){
                                            nulos++;
                                         }
                                    }

                                   if(nulos!=municipios.length){  // si todos los elementos son nulos no habrá que pintar, por eso si hay alguno marcado sigue por este medio
                                       if(nulos==0){
                                              // document.getElementById('marcarTodo').checked=true;
                                        }

                                       $('.ocultar').show('fade');

                                       var tabla="<table id='myTable' class='tablesorter' style='border: 0px solid; border-collapse: separate;border-spacing: 0px 5.5px;' > <thead><tr><th>Riesgo</th><th>Municipio</th><th>Casos</th>                           </tr> </thead><tbody>";
                                       var color="";
                                       for (var i in  municipios){



                                            if((municipios[i].visible)==false){
                                                continue;
                                            }

                                               var denominador=parseInt(max)-parseInt(min);
                                               if(denominador==0 && municipios[i].userData.valorDengue!=0){
                                                color="#FF"+"00"+"00";
                                                     //municipios[i].setMap(map);

                                               }
                                               else{
                                                // var numerador=it[i].valorDengue-min; amarillo primero
                                                //var colorhex=parseInt((((numerador)/(denominador)))*255);



                                                    var numerador=max-municipios[i].userData.valorDengue;

                                                    var colorhex=parseInt((((numerador)/(denominador)))*255);
                                                    colorhex=(d2h(colorhex));
                                                    colorhex="#FF"+(colorhex.length==1?"0"+colorhex:colorhex)+"00";
                                                    colorhex=colorhex.toUpperCase();


                                                   color=colorhex;

                                                if(municipios[i].userData.valorDengue==(0)){
                                                    
                                                     color="#FFFFFF";


                                                 }
                                               }    
                                                municipios[i].material.color.set(color);
                                                municipios[i].visible=true;
/*
tween = new TWEEN.Tween( color ).to( { r: 0, g: 0.1, b: 0.45 }, 5000 ).start();
*/

                                                tabla+=     "<tr><td align='center' bgcolor="+"'"+(municipios[i].material.color.getHex().toString(16))+"'"+" style='border:0px solid #000000; '>"+"</td><td align='center' style='height:1px;'>"+municipios[i].userData.nombre+"</td><td align='center' >"+municipios[i].userData.valorDengue+"</td></tr>";  




                                             } //for de pintado de municipios
                                            tabla+="</tbody></table>";


                                   }//cierre del nulos
                               else{
                                         $('.ocultar').hide({ effect: "fade"});
                                         document.getElementById('tablas').innerHTML ='';
                                         //document.getElementById('marcarTodo').checked=false;

                                    }



                               var alturaBarra=0;
                               var tabla2="";


                                            /*for (var i=0; i<=255; i++){
                                                var colorhex=i;
                                                colorhex=(d2h(colorhex));
                                                colorhex="#FF"+(colorhex.length==1?"0"+colorhex:colorhex)+"00";
                                            //    alert(colorhex);
                                                tabla2+="<tr><td width='25'  align='center' bgcolor="+"'"+colorhex+"'"+"> </td></tr>";  

                                            }*/
                             if(hayCeroCaso==true){ var degradado='degradadoConBlanco';} else { var degradado='degradado'; }
                            tabla2+="<tr><td class="+"'"+degradado+"'"+"> </td></tr>";  
                            tabla2+="</table>";

                            for (var i in municipios){
                                 if((municipios[i].visible)==false){
                                      continue;
                                }
                            alturaBarra+=23;
                            //alturaBarra+=22.2;
                                if(min==Infinity || hayCeroCaso==true){ min=0;}


                            document.getElementById('tablas').innerHTML = "<br>"+tabla;

                    document.getElementById('tablas2').innerHTML ="<table style='position: absolute;  height: "+ (alturaBarra)+"px; top:45px; left: 20px;' align='center'>"+tabla2+"<img style='position: absolute; left: 35px; top: 49px;' src='img/indicador.png'></img>"+"<div style='position: absolute; left: 58px; top: 53px;'>"+(max.length==1?"  "+max:max)+"</div>"+"<img style='position: absolute; left: 35px; top:"+(alturaBarra+22)+"px;' src='img/indicador.png'></img>"+"<div style='position: absolute; left: 58px; top: "+(alturaBarra+30)+"px;'>"+(min.length==1?"  "+min:min)+"</div>";

                                        
                                
                            }
                            $("#myTable").tablesorter( {sortList: [[2,1]],  
                                                        headers: {
                    // assign the secound column (we start counting zero)
                                                            0: {
                                                                // disable it by setting the property sorter to false
                                                                sorter: false
                                                                },
                                                        }
                                                      } );

                       }//fin funcion
                                 //*****************************
                var marcarCheck=undefined;
 
var concatena_municipios="<center><table>";
                for (var i  in $scope.datosMunicipio) {
                    concatena_municipios+="<tr><td>"+"<label for="+"'"+"c"+i+"'"+" style='font-family:arial;'>"+"<input type='checkbox'  id="+"'"+"c"+i+"'"+ ((marcarCheck)==undefined?"":marcarCheck[i])+ " value="+i+ "  class='mun_checkbox'  />  "+$scope.datosMunicipio[i].nombre+ "</label></td></tr>";
                                   
                }
                 //$( "#cargar_datos" ).dialog({ autoOpen: false} );
                 $('#mun').html("   <center><label  style='font-family:arial;' for='marcarTodo'>Marcar/Desmarcar todos  <input type='checkbox' id='marcarTodo' class='marcarTodo'></label></center>             <br> "+concatena_municipios+"</table></center>");
          
     
                  $("input[class='mun_checkbox']").prop('checked', true);   
               /* $(document.body).on("click","#Historico",function() {
                  $( "#slider-range-max" ).show();

                 /* $( "#contenedorSlider" ).dialog({
                                            show: { effect: "blind", duration: 400 } ,
                                            //height: 'auto',
                                            height: 120,
                                            width:300,
                                            position: ["left","bottom"],    
                                            resizable: true,
                                            dialogClass: 'dialogWithDropShadow',
                                            hide: { effect: "blind", duration: 400 }
                    })
                    
                });
                */
 
                
               
                
                
                $("#fullscreen").click(function() {
                    
			             THREEx.FullScreen.request();                
                });
                /*
                $("#fullscreen").mouseover(function() {
                    
                   $('#fullscreen').css('opacity','0.8'); ;
                
                });
                 $("#fullscreen").mouseout(function() {
                    
                   $('#fullscreen').css('opacity','1');
                
                });
                */
                
               /*  //$("#cont").css('display','none');    
                $('#header').mouseenter(function(){
                    $("#navba").stop().fadeTo(300,1);
                     
                   
                });
 
                $('#header').mouseleave(function(){
                    $("#navba").stop().fadeTo(300,0);

                });
    
                */
              /*  $(document.body).on("click","#cargar",function() {
                    
                 //alterna_modo_de_pantalla();
                    
                    
                    
                    
                    
                  /*  $( "#cargar_datos" ).dialog({
                                                show: { effect: "blind", duration: 400 } ,
                                                autoOpen: true,
                                                height: 500,
                                                width: 335,
                                                position: ["right","center"],
                                                dialogClass: 'dialogWithDropShadow',
                                                hide: { effect: "blind", duration: 400 } /*,
                                                buttons: {
                            'Aceptar': function() {

                            }
                                   
                            })

                        */                  //$( "#txtFileUpload" ).button()
                    /*      $( "#cargar_datos").data('dialog').uiDialog.draggable('option', {
                                cancel: '.ui-dialog-titlebar-close',
                                handle: '.ui-dialog-titlebar, .ui-dialog-content'
                            });
                                $( "#accordion" ).accordion({
      collapsible: true,
                                     heightStyle: "content"
    });


                         
                         
                });//fina del  click cargar */
                     $("#marcarTodo").change(function() {
                         
                                if($(".marcarTodo").is(':checked')){               
                                        $("input[class='mun_checkbox']").prop('checked', true);        
                                        //$("input[type=checkbox]").prop('checked', true);
                                

                                }
                                else{               
                                        $("input[class='mun_checkbox']").prop('checked', false);        
                                        //$("input[type=checkbox]").prop('checked', true);
                                                            //     $("#mostrarTabla").hide();


                                     
                                }
                                pintarMun();
                                

                             });



                            $(".mun_checkbox").change(function() {
                                
                               
                             pintarMun();


                        }); //cierre de change
                   
                
    
    
                
     
                                            
               /* $(function() {

                    $("#mostrarTabla").click(function() {
                        $( "#tablas" ).dialog({
                            show: { effect: "blind", duration: 400 } ,
                            height: 500,
                            width: 420,
                            position: ["left",100],
                            dialogClass: 'dialogWithDropShadow',
                            hide: { effect: "blind", duration: 400 }


                    });
                     //$( "#txtFileUpload" ).button()
                    $( "#tablas" ).data('dialog').uiDialog.draggable('option', {
                        cancel: '.ui-dialog-titlebar-close',
                        handle: '.ui-dialog-titlebar, .ui-dialog-content'
                    });





                    });
                
                });
                
                
                */
                

                

              
                pintarMun();
                
                        // figura
                                        /*  municipios[0].material.color.set( "#00FF00" );
                       municipios[2].visible = false;
                                         line[2].visible = false;
                                         lineTrasera[2].visible = false;
                    */
                      

/*
   var xValues = [];
var yValues = [];

function circle_coo(radius, steps, centerX, centerY){
xValues = [centerX];
yValues = [centerY];
for (var i = 0; i < steps; i++) {
    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
}
}

circle_coo(20,500,0,0);

a = 0;
function render() {
        //municipios[0].rotation.y=municipios[0].rotation.y+0.01;
      //camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000);

    if(a<xValues.length){
        camera.position.set( xValues[a], 0, yValues[a] );
        camera.lookAt(scene.position);
        a=a+1;
    }
    else
    {
        //camera.position.set( 0, 0, 20 );
       // camera.lookAt(scene.position);
        a = 0;
    }
    
    renderer.render( scene, camera );
}
*/
                    // axes
                    //scene.add( new THREE.AxisHelper() );

                    // render
                                  
                         var inc=0;
                  var vector = new THREE.Vector3();
                    function render() {
   // $("#animacion").val('false');
                      

TWEEN.update();
                        renderer.render( scene, camera );
                        //console.log(camera.position);
                       

                      /*  console.log(camera.fov)
                        console.log(camera.near)
                        console.log(camera.far)
                        */
                        //camera.updateProjectionMatrix();
                        //console.log(camera.PerspectiveCamera);

                    }
          
function update()
{
                                 

   // if( municipios[24].position.x<5){
                           
    //}

    // find intersections

    // create a Ray with origin at the mouse position
    //   and direction into the scene (camera direction)
    var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
    projector.unprojectVector( vector, camera );
    
    

            
    
    
    
    var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects( municipios );
    
    // INTERSECTED = the object in the scene currently closest to the camera
    //        and intersected by the Ray projected from the mouse position     
    
    // if there is one (or more) intersections
    if ( intersects.length > 0 )
    {
        // if the closest object intersected is not the currently stored intersection object
        if ( intersects[ 0 ].object != INTERSECTED )
        {
            // restore previous intersection object (if it exists) to its original color
            if ( INTERSECTED )
                INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
            // store reference to closest object as current intersection object
            INTERSECTED = intersects[ 0 ].object;
            // store color of closest object (for later restoration)
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            // set a new color for closest object
            INTERSECTED.material.color.set("#4682B4");
            material.color.set("#4682B4");
            // update text, if it has a "name" field.
            if ( intersects[ 0 ].object.name )
            {
                context1.clearRect(0,0,640,480);
                var message = intersects[ 0 ].object.name+": "+intersects[ 0 ].object.userData.valorDengue;
                var metrics = context1.measureText(message);
                var width = metrics.width;
                context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
                context1.fillRect( 0,0, width+8,20+8);
                context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
                context1.fillRect( 2,2, width+4,20+4 );
                context1.fillStyle = "rgba(0,0,0,1)"; // text color
                context1.fillText( message, 4,20 );
                texture1.needsUpdate = true;
            }
            else
            {
                context1.clearRect(0,0,300,300);
                texture1.needsUpdate = true;
            }
        }
    }
    else // there are no intersections
    {
        // restore previous intersection object (if it exists) to its original color
        if ( INTERSECTED )
            INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
        // remove previous intersection object reference
        //     by setting current intersection object to "nothing"
        INTERSECTED = null;
        context1.clearRect(0,0,300,300);
        texture1.needsUpdate = true;
    }

/*
    if ( keyboard.pressed("z") )
    {
        // do something
    }
*/    
    controls.update();
    //stats.update();
}

                    // animate/*
                    function animate() {

                        requestAnimationFrame( animate );
                        update();
                        controls.update();

                        render();

                    }
                    animate();

                 } else{
                alert('Error al intentar recuperar los municipios con dengue.');
            }
        }).
        error(function() {
            alert('Error al intentar recuperar los municipios con denge.');
        });
    };// Fin de metodo para manejo de municipios
    
    
    
    


    
}); //SCRIPT bueno

    

 

     