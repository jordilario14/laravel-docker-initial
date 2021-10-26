<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="{{ asset('css/styles.css') }}" rel="stylesheet">

    <title>Simulador NUPTIC-43</title>
    <meta name="csrf-token" content="{{ csrf_token() }}" />
  </head>
  <body>
    <div class="column">
        <div class="card-nuptic" id="nuptic-main-card">
            <div class="centered">
                <h1>Simulador NUPTIC-43</h1>
            </div>
            <hr class="divisor">
            <div class="centered">
                <input type="button" class="add-btn" value="Simular" id="nuptic-button">
            </div>
            <div class="centered spinner-container hidden" id="spinner-main">
                <div class="spinner-border blue-main" role="status">
                    <span class="sr-only ">Loading...</span>
                </div>
            </div>
           
        </div>
    </div>

    <div class="column">
        <div class="card-nuptic" id="nuptic-second-card">
            <div class="centered">
                <h1>Resultado</h1>
            </div>
            <hr class="divisor">
            <div class="centered">
                <p id="result-text" class="result-text">
                    
                </p>
            </div>
            <div class="centered">
                <p id="caminos-recorridos" class="result-text">
                    
                </p>
            </div>
        </div>
    </div> 
       
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <!--<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" ></script>-->
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" ></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" ></script>
    <script src="{{ asset('js/scripts.js') }}"></script>

</body>
</html>