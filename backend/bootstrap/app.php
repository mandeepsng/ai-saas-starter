<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Handle validation exceptions for API
        $exceptions->renderable(function (ValidationException $e, $request) {
            if ($request->is('api/*')) {
                return \App\Support\ApiResponse::validationError(
                    $e->errors(),
                    $e->getMessage()
                );
            }
        });

        // Handle 404 for API routes
        $exceptions->renderable(function (NotFoundHttpException $e, $request) {
            if ($request->is('api/*')) {
                return \App\Support\ApiResponse::error(
                    'Resource not found',
                    404
                );
            }
        });

        // Handle 405 Method Not Allowed for API routes
        $exceptions->renderable(function (MethodNotAllowedHttpException $e, $request) {
            if ($request->is('api/*')) {
                return \App\Support\ApiResponse::error(
                    'Method not allowed',
                    405
                );
            }
        });

        // Handle general exceptions for API
        $exceptions->renderable(function (\Throwable $e, $request) {
            if ($request->is('api/*') && !config('app.debug')) {
                return \App\Support\ApiResponse::error(
                    'An error occurred',
                    500
                );
            }
        });
    })->create();
