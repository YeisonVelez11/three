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
      var anio=2015;
       //$( "#slider-range-max" ).hide();
          $( "#slider-range-max" ).slider({

                              range: "min",
                              min: 2007,
                              max: 2015,
                              value: 2015,
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
                    camera.position.set( 0, 0, 20 );
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
                        // extrusión 
                        var wfh= new Array();
					    var datos_extrusion={
							bevelEnabled: false,
                            extrudeMaterial: 1,	amount:0.2, //cantidad de profundidad 
				        };
                        var textura = new THREE.ImageUtils.loadTexture('img/muro.jpg');
                	//repetir la textura figura
					   textura.repeat.set(0.06,0.06);
					//repetir la textura de la figura
					//textura.wrapS = textura.wrapT = THREE.repeatWrapping; conflicto
					
                	// agregamos un material para que el punto tenga color
                //Material de la figura
					   var material = new THREE.MeshBasicMaterial({color:0XFF0000,  vertexColors: THREE.VertexColors,shading: THREE.FlatShading, wireframe:false});
                       var materialFront = new Array();
                       var materialSide = new THREE.MeshBasicMaterial( { color: "#000000"} );
                                    //	var materialSide1 = new THREE.LineBasicMaterial({color: "#6699FF, linewidth: 1, fog:true});
                       var materialArray = [ materialFront, materialSide ];
                        //var materialMapa = new THREE.MeshFaceMaterial(materialArray);
                       var star=new Array();
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
                                


                                scene.add(municipios[i]);
                                line[i] = new THREE.Line( Geometria[i], materialSide);
                                lineTrasera[i] = new THREE.Line( Geometria[i], materialSide);

                                line[i].position.set( 0, 0, 0.21 );
                                lineTrasera[i].position.set( 0, 0,-0.01 );
                                 // line.scale.set( 49, 49, 49 );


                                scene.add( line[i] );
                                scene.add( lineTrasera[i] );


                        }
                
                
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
                            municipios_valor[i]={nombre: $scope.datosMunicipio[i].nombre, valorDengue:array_anio[0][i].mun_dengue }
                
                        }
                        
                        //método para cambiar de año
                        $( "#slider-range-max" ).on( "slide", function( event, ui ) {
                            anio= $( "#amount" ).val( ui.value );
                            anio=($( "#amount" ).val());
                            pintarMun();
                       });  

                    
                        var array_saberObjmeses=Object.keys(array_anio[0][0]);
               // console.log(array_saberObjmeses)  
                
                
                         function pintarMun(){

                             //console.log(anio);
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
                           municipios_valor[i].valorDengue=casosDengue;
                               municipios[i].visible = false;
                           
                            if($("#c"+i).is(':checked')){

                                                if(municipios_valor[i].valorDengue!=0 ){
                                                    array_dengue.push(municipios_valor[i].valorDengue);
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

                                       var tabla="<table id='myTable' class='tablesorter' style='border: 0px solid;' > <thead><tr><th>Riesgo</th><th>Municipio</th><th>Casos</th>                           </tr> </thead><tbody>";

                                       for (var i in  municipios){



                                            if((municipios[i].visible)==false){
                                                continue;
                                            }

                                               var denominador=parseInt(max)-parseInt(min);
                                               if(denominador==0 && municipios_valor[i].valorDengue!=0){
                                                municipios[i].material.color.set("#FF"+"00"+"00");
                                                     //municipios[i].setMap(map);

                                               }
                                               else{
                                                // var numerador=it[i].valorDengue-min; amarillo primero
                                                //var colorhex=parseInt((((numerador)/(denominador)))*255);



                                                    var numerador=max-municipios_valor[i].valorDengue;

                                                    var colorhex=parseInt((((numerador)/(denominador)))*255);
                                                    colorhex=(d2h(colorhex));
                                                    colorhex="#FF"+(colorhex.length==1?"0"+colorhex:colorhex)+"00";
                                                    colorhex=colorhex.toUpperCase();


                                                    municipios[i].material.color.set(colorhex);

                                                if(municipios_valor[i].valorDengue==(0)){
                                                    
                                                     municipios[i].material.color.set("#FFFFFF");


                                                 }
                                               }	

                                                municipios[i].visible=true;



                                                tabla+=	 "<tr><td align='center' bgcolor="+"'"+(municipios[i].material.color.getHex().toString(16))+"'"+" style='border:1px solid #000000'>"+"</td><td align='center' style='height:1px;'>"+municipios_valor[i].nombre+"</td><td align='center' >"+municipios_valor[i].valorDengue+"</td></tr>";  




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
                                            //	alert(colorhex);
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
                    
                    alterna_modo_de_pantalla();
                
                });
                $("#fullscreen").mouseover(function() {
                    
                   $('#fullscreen').css('opacity','0.8'); ;
                
                });
                 $("#fullscreen").mouseout(function() {
                    
                   $('#fullscreen').css('opacity','1'); 
                
                });
                
                
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
                      


                    // axes
                    //scene.add( new THREE.AxisHelper() );

                    // render
                    function render() {

                        renderer.render( scene, camera );

                    }

                    // animate/*
                    function animate() {

                        requestAnimationFrame( animate );

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
    
    
    
    


    
});