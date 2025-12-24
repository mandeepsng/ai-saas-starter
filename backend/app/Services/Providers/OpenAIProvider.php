<?php

namespace App\Services\Providers;

use App\Services\AI\Contracts\AIProviderInterface;
use Illuminate\Support\Facades\Http;

class OpenAIProvider implements AIProviderInterface
{
    private string $apiKey;
    private string $apiUrl;
    private string $model;

    public function __construct()
    {
        $this->apiKey = config('ai.providers.openai.api_key');
        $this->apiUrl = config('ai.providers.openai.api_url', 'https://api.openai.com/v1/chat/completions');
        $this->model = config('ai.providers.openai.model', 'gpt-4o-mini');
    }

    /**
     * Send a chat completion request to OpenAI API
     *
     * @param string $prompt
     * @return string
     * @throws \Exception
     */
    public function chat(string $prompt): string
    {
        if (empty($this->apiKey)) {
            throw new \Exception('OpenAI API key is not configured');
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($this->apiUrl, [
                'model' => $this->model,
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $prompt,
                    ],
                ],
                'max_tokens' => config('ai.providers.openai.max_tokens', 1024),
            ]);

            if ($response->failed()) {
                throw new \Exception(
                    'OpenAI API request failed: ' . $response->body()
                );
            }

            $data = $response->json();

            return $data['choices'][0]['message']['content'] ?? '';
        } catch (\Exception $e) {
            throw new \Exception('OpenAI API error: ' . $e->getMessage());
        }
    }

    /**
     * Get the provider name
     *
     * @return string
     */
    public function getProviderName(): string
    {
        return 'openai';
    }
}
