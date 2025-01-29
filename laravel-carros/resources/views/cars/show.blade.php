@extends('layouts.app')

@section('content')
    <h1>Detalles del Carro</h1>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ $car->marca }} {{ $car->modelo }}</h5>
            <p class="card-text">Año: {{ $car->año }}</p>
            <p class="card-text">Color: {{ $car->color }}</p>
            <p class="card-text">Precio: ${{ $car->precio }}</p>
            <a href="{{ route('cars.index') }}" class="btn btn-primary">Volver</a>
        </div>
    </div>
@endsection