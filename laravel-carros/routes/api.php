<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CarApiController;

Route::apiResource('cars', CarApiController::class);