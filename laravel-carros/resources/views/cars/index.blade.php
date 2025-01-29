@extends('layouts.app')

@section('content')
    <h1>Lista de Carros</h1>
    <a href="{{ route('cars.create') }}" class="btn btn-primary mb-3">Agregar Carro</a>
    <table class="table">
        <thead>
            <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Color</th>
                <th>Precio</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($cars as $car)
                <tr>
                    <td>{{ $car->marca }}</td>
                    <td>{{ $car->modelo }}</td>
                    <td>{{ $car->año }}</td>
                    <td>{{ $car->color }}</td>
                    <td>{{ $car->precio }}</td>
                    <td>
                        <a href="{{ route('cars.show', $car) }}" class="btn btn-info">Ver</a>
                        <a href="{{ route('cars.edit', $car) }}" class="btn btn-warning">Editar</a>
                        <form action="{{ route('cars.destroy', $car) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger">Eliminar</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    {{ $cars->links() }}
@endsection