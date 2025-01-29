<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;

class CarApiController extends Controller
{
    public function index()
    {
        return Car::paginate(10);
    }

    public function store(Request $request)
    {
        return Car::create($request->all());
    }

    public function show(Car $car)
    {
        return $car;
    }

    public function update(Request $request, Car $car)
    {
        $car->update($request->all());
        return $car;
    }

    public function destroy(Car $car)
    {
        $car->delete();
        return response()->noContent();
    }
}