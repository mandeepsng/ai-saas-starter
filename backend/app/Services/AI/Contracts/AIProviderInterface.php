<?php

namespace App\Services\AI\Contracts;

interface AIProviderInterface
{
    /**
     * Send a chat completion request to the AI provider
     *
     * @param string $prompt User's prompt/message
     * @return string AI's response
     * @throws \Exception If the API call fails
     */
    public function chat(string $prompt): string;

    /**
     * Get the provider name
     *
     * @return string
     */
    public function getProviderName(): string;
}
