<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Http\Requests\CarRequest;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::paginate(10);
        return view('cars.index', compact('cars'));
    }

    public function create()
    {
        return view('cars.create');
    }

    public function store(CarRequest $request)
    {
        Car::create($request->validated());
        return redirect()->route('cars.index')->with('success', 'Carro creado exitosamente.');
    }

    public function show(Car $car)
    {
        return view('cars.show', compact('car'));
    }

    public function edit(Car $car)
    {
        return view('cars.edit', compact('car'));
    }

    public function update(CarRequest $request, Car $car)
    {
        $car->update($request->validated());
        return redirect()->route('cars.index')->with('success', 'Carro actualizado exitosamente.');
    }

    public function destroy(Car $car)
    {
        $car->delete();
        return redirect()->route('cars.index')->with('success', 'Carro eliminado exitosamente.');
    }
}