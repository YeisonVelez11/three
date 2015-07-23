var aplicacion = angular.module('aplicacion', []);
aplicacion.controller('Municipios', function($scope, $http) {
$("#navba").css('opacity','0.0');    
   
    
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

                        

      var anio=2015;
      var map, geocoder;
      var municipios=[];
    // Instancia del geocodificador

        geocoder = new google.maps.Geocoder();


    // Propiedades iniciales del mapa
        
        var options = {
           zoom: 10,
            //zoom: 5,
            //minZoom: 5,
            minZoom: 7,
        center: new google.maps.LatLng(5.289864,-75.2739215),

            mapTypeId: google.maps.MapTypeId.ROADMAP
         };



        // Instancia del mapa 8863020,8851955,885

        map = new google.maps.Map(document.getElementById('map'), options);
          $( "#slider-range-max" ).hide();
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
            method: 'GET', url: '/Dengue_listar',  params: {anio: anio}
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.datosMunicipio = data;
             
       


                function d2h(d) { return (+d).toString(16); }
	
                
                	
                    var coordenadas_Mun= new Array();
                    var coordenadas_Mun_aux= new Array();




                 
     
                   $('.ocultar').hide();  //oculta elementos del menu
                
                
                    var vector_lat= new Array(); //vector que almacena la latitud
                    var vector_long= new Array(); //vector que almacena la longitud

                
                        ////los vectores almacenaran el conjunto de las coordenadas, quedaran almacenando todo un vector, vector_lat y vector_long en cada posicion tienen un vector completo con las coordenadas de latitud y longitud respectivmanete

                    for (var i in  $scope.datosMunicipio){
                          vector_lat.push($scope.datosMunicipio[i].coordenadas.latitud);
                          vector_long.push($scope.datosMunicipio[i].coordenadas.longitud);

                    }
	
 
                                     //la i representa la posicion donde esta el vector de coordenadas y el a la posicion de alguna coordenada
                     for (var i  in   vector_lat){
                           for (var a  in  vector_lat[i]){
                                coordenadas_Mun.push(new google.maps.LatLng(vector_lat[i][a],vector_long[i][a]));
                            }
                         coordenadas_Mun_aux[i]= coordenadas_Mun;
                         coordenadas_Mun=new Array();

                    }          
                
                
                   var array_anio=new Array();
                
                
                
                //funcion que elimina elementos repetidos
                 function eliminar_repetidos(ar){
                    var elemento="",aux=[].concat(ar),nuevo_arreglo=Array();

                    for (var i in aux){ //
                        elemento=aux[i];
                        for (var a in aux){
                            if (elemento==aux[a] && a!=i){
                                //alert(elemento+"=="+aux[a]);
                                aux[a]="";
                            }
                        }
                    }

                    for (var a in aux){
                        if (aux[a]!=""){           
                            nuevo_arreglo.push(aux[a]);
                        }
                    }
                    //alert(nuevo_arreglo.length);
                    return nuevo_arreglo;
                }
                                                          
              
                for(var i in  $scope.datosMunicipio){
                   // console.log(a);
               /*  console.log($scope.datosMunicipio.historico.dengue);
                                     console.log($scope.datosMunicipio.historico.dengue.length);
*/
                   array_anio[i]=new Array();
                   for(var a in  $scope.datosMunicipio[i].historico.dengue){
                                       //console.log(a);

                     console.log($scope.datosMunicipio[i].historico.dengue[a]);
                      
                       
                       
                     //array_anio[i].push($scope.datosMunicipio[i].historico.dengue);
                        
                    }
                }
        //      console.log( array_anio)
                
              
              
              //eliminar_repetidos(array_anio); asi se sabe cuantas posiciones tiene el array segun años
                /* array_anio=eliminar_repetidos(array_anio);
               
                
                    for(var a in  array_anio){
                        array_anio[a]=new Array();
                   }
                */
                
                /*
                 for(var a in  $scope.datosMunicipio[0].historico.enfermedad){
                 
                    
                    for(var i in  $scope.datosMunicipio[0].historico.enfermedad[a].dengue){
                        console.log($scope.datosMunicipio[0].historico.enfermedad[a].dengue[i].anio);
                         //se añaden elementos al vector y luego se eliminaran repetidos
                        array_anio.push($scope.datosMunicipio[0].historico.enfermedad[a].dengue[i].anio);
                        
                    }
                }
               */
                
                
                
                
                  for(var i in  $scope.datosMunicipio ){
                    
                
                   /* for(var a in  $scope.datosMunicipio[i].historico){
                        
                        
                        
                        
                         if($scope.datosMunicipio[i].historico[a].mun_anio==2015){
                           array_anio[0].push($scope.datosMunicipio[i].historico[a]);
                         }

                         if($scope.datosMunicipio[i].historico[a].mun_anio==2014){
                           array_anio[1].push($scope.datosMunicipio[i].historico[a]);
                         }    

                         if($scope.datosMunicipio[i].historico[a].mun_anio==2013){
                           array_anio[2].push($scope.datosMunicipio[i].historico[a]);
                         }

                        if($scope.datosMunicipio[i].historico[a].mun_anio==2012){
                           array_anio[3].push($scope.datosMunicipio[i].historico[a]);
                         }

                        if($scope.datosMunicipio[i].historico[a].mun_anio==2011){
                            array_anio[4].push($scope.datosMunicipio[i].historico[a]);
                         }

                         if($scope.datosMunicipio[i].historico[a].mun_anio==2010){
                            array_anio[5].push($scope.datosMunicipio[i].historico[a]);
                         }

                         if($scope.datosMunicipio[i].historico[a].mun_anio==2009){
                            array_anio[6].push($scope.datosMunicipio[i].historico[a]);
                         } 

                         if($scope.datosMunicipio[i].historico[a].mun_anio==2008){
                            array_anio[7].push($scope.datosMunicipio[i].historico[a]);
                         } 

                         if($scope.datosMunicipio[i].historico[a].mun_anio==2007){
                            array_anio[8].push($scope.datosMunicipio[i].historico[a]);
                         }    

                        
                    }*/
                         

                        var municipios_opciones= ({
                        path: coordenadas_Mun_aux[i],
                        strokeColor: 'black',
                        strokeOpacity: 0.3,

                        strokeWeight: 1,
                        fillColor: "#FF00FF",
                        fillOpacity: 0.9,
                        zIndex: 1,
                        nombre: $scope.datosMunicipio[i].nombre,
                        valorDengue:array_anio[0][i].mun_dengue,
                        map:null
                    });
                        /* if (!!municipios[i] && !!municipios[i].setMap) {
          // if shape is defined and has a setMap method, hide it.
                            municipios[i].setMap(null);
           // continue;
                        }*/
                    municipios[i]=new google.maps.Polygon(municipios_opciones);
                    
                }
                
                //método para cambiar de año
                $( "#slider-range-max" ).on( "slide", function( event, ui ) {
                anio= $( "#amount" ).val( ui.value );
    
      
                    anio=($( "#amount" ).val());
        
       
                    pintarMun()
               });  
           
                
                 function pintarMun(){
                     
                var posicion_anio="";
                  if (anio==2015){
                    posicion_anio=0;
                  }
                  if (anio==2014){
                    posicion_anio=1;
                  }
                  if (anio==2013){
                    posicion_anio=2;
                  }
                  if (anio==2012){
                    posicion_anio=3;
                  }
                  if (anio==2011){
                    posicion_anio=4;
                  }
                  if (anio==2010){
                    posicion_anio=5;
                  }
                  if (anio==2009){
                    posicion_anio=6;
                  }
                  if (anio==2008){
                    posicion_anio=7;
                  }
                  if (anio==2007){
                    posicion_anio=8;
                  }
                 
                     
                    
                 array_dengue=new Array();
                
                     
                 var infobox = new InfoBox({
                             content: document.getElementById("infobox"),
                             disableAutoPan: false,
                             //maxWidth: 255,
                             pixelOffset: new google.maps.Size(-140, 0),
                             zIndex: null,
                             boxStyle: {
                                background: "url('../img/seleccionar.gif') no-repeat",
                                //opacity: 0.75,
                                width: "210px"
                            },
                            closeBoxMargin: "12px 4px 2px 2px",
                            closeBoxURL: "../img/closepopup.png",
                            infoBoxClearance: new google.maps.Size(1, 1)
                        });     
                     
                 for (var i in municipios) {
                     
                       municipios[i].setOptions({valorDengue:array_anio[posicion_anio][i].mun_dengue});
                        
                        /*var contenido = "<center><h2>Municipio: "+$scope.datosMunicipio[i].nombre+"</h2></center><center>Casos registrados: "+$scope.datosMunicipio[i].historico[0].mun_dengue+"</center>";*/
                       contenido = "<img style='position: absolute; margin-top: -8px;' src='http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif'></img><div class='titulo_infobox'><center>Municipio: "+$scope.datosMunicipio[i].nombre+"</center></div><center>Casos registrados: "+ municipios[i].valorDengue+"</center>";
                       
                        var  indice=i;
                  
                    (function(municipios, contenido, indice) {
                      google.maps.event.addListener((municipios[i]), 'mouseover', function(evt) {
                      /*infowindow.setContent(contenido);
                      infowindow.open(map, municipios[i]);
                      infowindow.setPosition(evt.latLng);
                    */
                        $("#infobox").html(contenido);                   
                        

                           infobox.open(map);
                        
                           infobox.setPosition(evt.latLng);
                          
                            //map.panTo(map.getCenter());

                        for(var a in municipios){
                            if(municipios[a].map==null){
                                continue;
                            }
                           municipios[a].setOptions({strokeWeight: 1, strokeOpacity:0.3});

                        }
                        municipios[indice].setOptions({strokeWeight: 2, strokeOpacity:1});


                    });
/*
                        google.maps.event.addListener((municipios[i]), 'click', function(evt) {
                    
                        
                        municipios[indice].setOptions({strokeWeight: 4, strokeOpacity:1});


                    });
*/
                  })( municipios, contenido, indice);
                     
                     
                     
                   google.maps.event.addListener(map, 'click', function() {
                      //infowindow.close();
                      infobox.close();
                      for(var i in municipios){
                            if(municipios[i].map==null){
                                continue;
                            }
                      
                        municipios[i].setOptions({strokeWeight: 1, strokeOpacity:0.3});
                        }

                   });
                    
                       
                     
                    municipios[i].setMap(null);
                    if($("#c"+i).is(':checked')){

                                        if(municipios[i].valorDengue!=0 ){
                                            array_dengue.push(municipios[i].valorDengue);
                                        }


                                         municipios[i].map=map;

                     }

                      if(!$("#c"+i).is(':checked')){
           
                            municipios[i].map=null;
                           
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
                                if ((municipios[i].map)==null){
                                    nulos++;
                                 }
                            }
                   
                           if(nulos!=municipios.length){  // si todos los elementos son nulos no habrá que pintar, por eso si hay alguno marcado sigue por este medio
                               if(nulos==0){
                                      // document.getElementById('marcarTodo').checked=true;
                                }

                               $('.ocultar').show('fade');

                               var tabla="<table id='myTable' class='tablesorter' border='1' style='position:absolute; width: 320px'> <thead><tr><th>Municipio&nbsp;&nbsp;&nbsp;&nbsp;  </th><th>Casos Registrados&nbsp;&nbsp;&nbsp;</th>                           <th width='70px' >Riesgo</th></tr> </thead><tbody>";

                               for (var i in  municipios){
                                   
                                   
                                   
                                    if((municipios[i].map)==null){
                                        continue;
                                    }
                                   
                                       var denominador=parseInt(max)-parseInt(min);
                                       if(denominador==0 && municipios[i].valorDengue!=0){
                                        municipios[i].fillColor="#FF"+"00"+"00";
                                             //municipios[i].setMap(map);

                                       }
                                       else{
                                        // var numerador=it[i].valorDengue-min; amarillo primero
                                        //var colorhex=parseInt((((numerador)/(denominador)))*255);

                                        
                                        
                                            var numerador=max-municipios[i].valorDengue;

                                            var colorhex=parseInt((((numerador)/(denominador)))*255);
                                            colorhex=(d2h(colorhex));
                                            colorhex="#FF"+(colorhex.length==1?"0"+colorhex:colorhex)+"00";
                                            colorhex=colorhex.toUpperCase();


                                            municipios[i].fillColor=colorhex;
                                           
                                        if(municipios[i].valorDengue==(0)){
                                             municipios[i].fillColor="#FFFFFF";
                                       

                                         }
                                       }	
                                   
                                        municipios[i].setMap(map);
                                  

                                   
                                   


                             
               /*                        var opa=0;
                  while(opa<=1){
                        //var tiempo=setTimeout(function() {
                       municipios[i].setMap(null);
                        municipios[i].setOptions({fillOpacity: opa});
                       municipios[i].setMap(map);
                             pause(1000);
                        console.log(opa);
                        opa=opa+0.1;
                     // alert(opa);
                           // alert("2");
                   // },5000);
                }*/
                                
                                        tabla+=	 "<tr><td align='center' style='height:1px;' bgcolor='#FAFAFA'>"+municipios[i].nombre+"</td><td align='center' bgcolor='#FAFAFA'>"+municipios[i].valorDengue+"</td><td align='center' bgcolor="+"'"+municipios[i].fillColor+"'"+">"+"</td></tr>";  


                                                

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

                    tabla2+="<tr><td class='degradado'> </td></tr>";  
                    tabla2+="</table>";

                    for (var i in municipios){
                         if((municipios[i].map)==null){
                              continue;
                        }
                    alturaBarra+=23;
                        if(min==Infinity){ min=0;}
                    document.getElementById('tablas').innerHTML = "<br>"+tabla+"<table style='position: absolute;  height: "+ (alturaBarra)+"px; top:54px; left: 336px;' align='center'>"+tabla2+"<img style='position: absolute; left: 352px; top: 49px;' src='img/indicador.png'></img>"+"<div style='position: absolute; left: 376px; top: 53px;'>"+(max.length==1?"  "+max:max)+"</div>"+"<img style='position: absolute; left: 352px; top:"+(alturaBarra+25)+"px;' src='img/indicador.png'></img>"+"<div style='position: absolute; left: 376px; top: "+(alturaBarra+30)+"px;'>"+(min.length==1?"  "+min:min)+"</div>";

                    }
                    $("#myTable").tablesorter( {sortList: [[1,1]],  
                                                headers: { 
            // assign the secound column (we start counting zero) 
                                                    2: { 
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
                 $( "#cargar_datos" ).dialog({ autoOpen: false} );
                 $('#mun').html("   <center><label  style='font-family:arial;' for='marcarTodo'>Marcar/Desmarcar todos  <input type='checkbox' id='marcarTodo' class='marcarTodo'></label></center>             <br> "+concatena_municipios+"</table></center>");
          
     
                $(document.body).on("click","#Historico",function() {
                  $( "#slider-range-max" ).show();

                  $( "#contenedorSlider" ).dialog({
                                            show: { effect: "blind", duration: 400 } ,
                                            //height: 'auto',
                                            height: 120,
                                            width:300,
                                            position: ["left","bottom"],	
                                            resizable: true,
                                            hide: { effect: "blind", duration: 400 } 
                    })
                    
                });
                
 
                
                $("#fullscreen").click(function() {
                    
                    alterna_modo_de_pantalla();
                
                });
                $("#fullscreen").mouseover(function() {
                    
                   $('#fullscreen').css('opacity','0.8'); ;
                
                });
                 $("#fullscreen").mouseout(function() {
                    
                   $('#fullscreen').css('opacity','1'); 
                
                });
                
                
                 //$("#cont").css('display','none');    
                $('#header').mouseenter(function(){
                    $("#navba").stop().fadeTo(300,1);
                     
                   
                });
 
                $('#header').mouseleave(function(){
                    $("#navba").stop().fadeTo(300,0);

                });
    
                
                $(document.body).on("click","#cargar",function() {
                    
                 //alterna_modo_de_pantalla();
                    
                    
                    
                    
                    
                    $( "#cargar_datos" ).dialog({
                                                show: { effect: "blind", duration: 400 } ,
                                                autoOpen: true,
                                                height: 500,
                                                width: 335,
                                                position: ["right","center"],
                                                
                                                hide: { effect: "blind", duration: 400 } /*,
                                                buttons: {
                            'Aceptar': function() {

                            }
                                   */
                            })

                                             //$( "#txtFileUpload" ).button()
                            $( "#cargar_datos").data('dialog').uiDialog.draggable('option', {
                                cancel: '.ui-dialog-titlebar-close',
                                handle: '.ui-dialog-titlebar, .ui-dialog-content'
                            }); 
                                $( "#accordion" ).accordion({
      collapsible: true,
                                     heightStyle: "content"
    });


                          /* $(document).on('click','.mun_checkbo',function(){
                                $('#example').dataTable();

                           })
                          */
                });//fina del  click cargar
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
                   
                
    
    
                
     
											
                $(function() {

                $("#mostrarTabla").click(function() {
                    $( "#tablas" ).dialog({
                        show: { effect: "blind", duration: 400 } ,
                        height: 500,
                        width: 420,
                        position: ["left",100],	
                        hide: { effect: "blind", duration: 400 } 


                });
                 //$( "#txtFileUpload" ).button()
                $( "#tablas" ).data('dialog').uiDialog.draggable('option', {
                    cancel: '.ui-dialog-titlebar-close',
                    handle: '.ui-dialog-titlebar, .ui-dialog-content'
                });
						
						
						
                            
                        
				});
                
                });
          
                    //Inicio metodo de rios
    $scope.datosRio = [];
    $http({
            method: 'GET', url: '/Dengue_listarRio'
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.datosRio = data;
                
                
                   var coordenadas_Rio= new Array();
                   var coordenadas_Rio_aux= new Array();
                
                
                    var vectorRio_lat= new Array(); //vector que almacena la latitud
                    var vectorRio_long= new Array(); //vector que almacena la longitud

                
                        ////los vectores almacenaran el conjunto de las coordenadas, quedaran almacenando todo un vector, vector_lat y vector_long en cada posicion tienen un vector completo con las coordenadas de latitud y longitud respectivmanete

                    for (var i in  $scope.datosRio){
                          vectorRio_lat.push($scope.datosRio[i].rio_coordenadas.rio_latitud);
                          vectorRio_long.push($scope.datosRio[i].rio_coordenadas.rio_longitud);

                    }
	
 
	
                
                
                                     //la i representa la posicion donde esta el vector de coordenadas y el a la posicion de alguna coordenada
                     for (var i  in   vectorRio_lat){
                           for (var a  in  vectorRio_lat[i]){
                                coordenadas_Rio.push(new google.maps.LatLng(vectorRio_lat[i][a],vectorRio_long[i][a]));
                            }
                         coordenadas_Rio_aux[i]= coordenadas_Rio;
  
                         coordenadas_Rio=new Array();
                    }              
                    
                    var rios=new Array();
                   
                    var infowindow = new google.maps.InfoWindow({  
                        content: ''
                    });           
                
                    for(var i in  $scope.datosRio){
                        var contenido = "<img style='position: absolute; margin-top: -8px;' src='http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif'></img><div class='titulo_infobox'><center>"+$scope.datosRio[i].rio_nombre+"</center></div>..";
                        var  indice=i;


                        var rio_opciones= ({
                        path: coordenadas_Rio_aux[i],
                        strokeColor: 'blue',
                        strokeOpacity: 0.3,

                        strokeWeight: 1,
                        fillColor: "#0000FF",
                        fillOpacity: 0.9,
                        zIndex: 2,
                        nombre: $scope.datosRio[i].rio_nombre,
                            map: null
                        
                      //  map:map

                    });

                    rios[i]=new google.maps.Polygon(rio_opciones);
                    //aux_rio[i]=rios[i];

                    (function(rios, contenido, indice) {
                      google.maps.event.addListener((rios[i]), 'click', function(evt) {
                      /*infowindow.setContent(contenido);
                      infowindow.open(map, rios[i]);
                      infowindow.setPosition(evt.latLng);
                      */
                          $("#infobox").html(contenido);                   
                        

                           infobox.open(map);
                        
                           infobox.setPosition(evt.latLng);
                          

                        for(var a in rios){
                            if(rios[a].map==null){
                                continue;
                            }
                            rios[a].setMap(null)
                                     rios[a].strokeOpacity= 0.3;

                            rios[a].strokeWeight= 1;
                            rios[a].setMap(map)
                        }
                       rios[indice].setMap(null)
                        rios[indice].strokeWeight= 2;
                       rios[indice].strokeOpacity= 1;
                        rios[indice].setMap(map)

                    });



                  })(rios, contenido, indice);
                   



                }   //fin ciclo generar coordenadas
                
                google.maps.event.addListener(map, 'click', function() {
                      infowindow.close();
                      for(var a in rios){
                            if(rios[a].map==null){
                                continue;
                            }
                       rios[a].setMap(null)
                        rios[a].strokeWeight= 1;
                        rios[a].strokeOpacity= 0.3;
                        rios[a].setMap(map)
                        }

                });
                
                $("#marcarRios").click(function() {
                    for (var i in rios){
                        if($("#marcarRios").is(':checked')) {  
                            rios[i].setMap(map);
                        } else {  
                            rios[i].setMap(null);
                        }  
                    }
                });  
                
              
            }//data
        });//fin del success de rios
                
                
            
            } else{
                alert('Error al intentar recuperar los municipios con dengue.');
            }
        }).
        error(function() {
            alert('Error al intentar recuperar los municipios con denge.');
        });
    };// Fin de metodo para manejo de municipios
    
    
    
    


    
});

//version final