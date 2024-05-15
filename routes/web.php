<?php

use App\Http\Controllers\WebController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WebController::class, 'index']);
Route::get('/login', [WebController::class, 'login']);
Route::get('/signup', [WebController::class, 'signup']);
Route::get('/dashboard', [WebController::class, 'dashboard']);
Route::get('/users/{id}', [WebController::class, 'users']);
