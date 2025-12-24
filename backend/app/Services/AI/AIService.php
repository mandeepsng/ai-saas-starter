<?php

namespace App\Services\AI;

use App\Services\AI\Contracts\AIProviderInterface;

class AIService
{
    public function __construct(
        private AIProviderInterface $provider
    ) {}

    /**
     * Send a chat request to the configured AI provider
     *
     * @param string $prompt
     * @return string
     * @throws \Exception
     */
    public function chat(string $prompt): string
    {
        return $this->provider->chat($prompt);
    }

    /**
     * Get the current provider name
     *
     * @return string
     */
    public function getProviderName(): string
    {
        return $this->provider->getProviderName();
    }
}
