<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Simulation;
use Log;

class AjaxController extends Controller
{
    public function simulation(Request $request)
    {
        try {
            
            $data = $request->input('data');
            if($data){

                $simulation = new Simulation();        
                $simulation->nombre = $data['nombre'];
                $simulation->num = $data['num'];
                $simulation->direccion = $data['direccion'];
                $simulation->recorrido = $data['recorrido'];
                $simulation->status_correcto = 1;
                $simulation->save();

                $failed_request = number_format(60 * 10/100 , 0);
                
                if($data['num'] == $failed_request){
                    $simulation->status_correcto = 0;
                    $simulation->save();

                    return response()->json([
                        'correct' => $simulation->status_correcto,
                        'id' => $simulation->id,
                        'data' => $data
                    ], 500);
                }

                if($simulation->direccion == "Este"){
                    \Log::channel('orval')->info(
                        'Se ha realizado una petición proviniente de '
                        .$simulation->name
                        .'. Su número de petición es '
                        .$simulation->num
                        .'. Tiene un recorrido de '
                        .$simulation->recorrido
                        .' con dirección '
                        .$simulation->direccion);
                }

                return response()->json([
                    'correct' => $simulation->status_correcto,
                    'id' => $simulation->id,
                    'data' => $data
                ]);
            }

        } catch (Exception $e) {

            return response()->json([
                'correct' => 0,
                'id' => null,
                'data' => $data
            ], 500);
        
        }
    }

    public function getNuptic(){

        $data = Simulation::orderBy('id','desc')
                            ->where('nombre', 'nuptic-43')
                            ->take(60)
                            ->get();
        
        foreach ($data as $key => $value) {
            if($value['status_correcto'] == 0){
                unset($data[$key]);
            }
        }

        return response()->json([
            'correct' => 1,
            'data' => $data
        ]);
    }
}
