<?php

namespace App\Providers;

use App\Services\AI\AIService;
use App\Services\AI\Contracts\AIProviderInterface;
use App\Services\Providers\ClaudeProvider;
use App\Services\Providers\OpenAIProvider;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Bind the AI provider based on configuration
        $this->app->singleton(AIProviderInterface::class, function ($app) {
            $provider = config('ai.default_provider', 'claude');

            return match ($provider) {
                'openai' => new OpenAIProvider(),
                'claude' => new ClaudeProvider(),
                default => throw new \InvalidArgumentException("Unsupported AI provider: {$provider}"),
            };
        });

        // Bind AIService
        $this->app->singleton(AIService::class, function ($app) {
            return new AIService($app->make(AIProviderInterface::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
