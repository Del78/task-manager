<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\SubTaskController;
use App\Http\Controllers\Api\AuthController;

Route::prefix('v1')->group(function () {
    // Auth routes (public)
    Route::post('auth/register', [AuthController::class, 'register']);
    Route::post('auth/login', [AuthController::class, 'login']);

    // Protected routes (require Sanctum token)
    Route::middleware('auth:sanctum')->group(function () {
        // Task routes
        Route::apiResource('tasks', TaskController::class);

        // SubTask routes
        Route::apiResource('subtasks', SubTaskController::class);
    });
});
