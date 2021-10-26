$( document ).ready(function() {
    $('#nuptic-button').on('click', function (event) {
        event.preventDefault();

        $('.card-nuptic').addClass('disabled');
        $('#spinner-main').addClass('visible');

        let _token   = $('meta[name="csrf-token"]').attr('content');
        let direcciones = ["Norte", "Sur", "Este", "Oeste"];
        let datos = {
            nombre: "nuptic-43",
            num: 1,
            direccion: "",
            recorrido: 0,
        }


        let sendSimulation = function ajaxRequest() {
            setTimeout(() => {
                datos.direccion = direcciones[getRandomNum(0, 3)];
                datos.recorrido = getRandomNum(10, 20);       
                $.ajax({
                    url: "/simulation",
                    type:"POST",
                    data:{
                        data: datos,
                        _token: _token
                    },
                    success:function(response){
                        if(response) {
                            datos = response.data;
                            datos.num = parseInt(datos.num);
                            if(datos.num < 60){
                                if(response.correct == "1"){
                                    datos.num += 1;
                                    ajaxRequest();
                                }else{
                                    ajaxRequest();
                                }
                                
                            }else{

                                datos = {
                                    nombre: "nuptic-43",
                                    num: 1,
                                    direccion: "",
                                    recorrido: 0
                                } 

                                recovery_all_data().then( () => {
                                    $('.card-nuptic').removeClass('disabled');
                                    $('#spinner-main').removeClass('visible');
                                } );

                                
                            }
                        }
                    },
                    error: function(error) {
                        datos = error.responseJSON.data;
                        datos.num = parseInt(datos.num);
                        if(datos.num < 60){
                            datos.num += 1;
                            ajaxRequest();
                        }else{

                            datos = {
                                nombre: "nuptic-43",
                                num: 1,
                                direccion: "",
                                recorrido: 0
                            } 

                            recovery_all_data().then( () => {
                                $('.card-nuptic').removeClass('disabled');
                                $('#spinner-main').removeClass('visible');
                            } );

                           

                        }
                    }
                });
            }, 1000);    
        }();    
    });

    const recovery_all_data = async function() {

        $.ajax({
            url: "/get-nuptic",
            type:"GET",
            success:function(response){
                callback(response);
            },
            error: function(error) {
                alert("Algo no ha ido bien. Inténtelo de nuevo.");
            }
        });

    }

    function callback(array){
        let {correct, data} = array;
        let key = "direccion";
        var data_arr = Object.keys(data).map(key => {
            return data[key];
        });
        let occurrences = findOcc(data_arr, key);
        let sortedOccurs = occurrences.sort(sortObject('occurrence'));
        let maxOccur = sortedOccurs[sortedOccurs.length-1];

        let sumatorio = sumarRecorrido(data);
        
        $("#result-text").html(`El punto cardinal más frecuente es el ${maxOccur['direccion']} y en total se ha realizado un recorrido de ${sumatorio}`);
        caminosRecorridos(data);
    }

    function caminosRecorridos(params) {
        var data_arr = Object.keys(params).map(key => {
            return params[key];
        });

        let text = "";

        data_arr.forEach(element => {
            text += `Dirección: ${element.direccion} --- Recorrido: ${element.recorrido}<br>`;
        });

        $('#caminos-recorridos').html(text);
    }
    function findOcc(arr, key){
        let arr2 = [];
        arr.forEach((x)=>{
           if(arr2.some((val)=>{ return val[key] == x[key] })){
             arr2.forEach((k)=>{
               if(k[key] === x[key]){ 
                 k["occurrence"]++;
               }
            })
               
           }else{
             let a = {};
             a[key] = x[key];
             a["occurrence"] = 1;
             arr2.push(a);
           }
        })
          
        return arr2;
      }

    function sumarRecorrido(data) {
        let data_arr = Object.keys(data).map(key => {
            return data[key];
        });

        let result = 0;

        data_arr.forEach(element => {
            result += parseInt(element['recorrido']);
        });

        return result;
    }

    function sortObject(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    

    function getRandomNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    
});
