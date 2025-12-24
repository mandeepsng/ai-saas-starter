<?php

namespace App\Services\Providers;

use App\Services\AI\Contracts\AIProviderInterface;
use Illuminate\Support\Facades\Http;

class ClaudeProvider implements AIProviderInterface
{
    private string $apiKey;
    private string $apiUrl;
    private string $model;

    public function __construct()
    {
        $this->apiKey = config('ai.providers.claude.api_key');
        $this->apiUrl = config('ai.providers.claude.api_url', 'https://api.anthropic.com/v1/messages');
        $this->model = config('ai.providers.claude.model', 'claude-3-5-sonnet-20241022');
    }

    /**
     * Send a chat completion request to Claude API
     *
     * @param string $prompt
     * @return string
     * @throws \Exception
     */
    public function chat(string $prompt): string
    {
        if (empty($this->apiKey)) {
            throw new \Exception('Claude API key is not configured');
        }

        try {
            $response = Http::withHeaders([
                'x-api-key' => $this->apiKey,
                'anthropic-version' => '2023-06-01',
                'content-type' => 'application/json',
            ])->post($this->apiUrl, [
                'model' => $this->model,
                'max_tokens' => config('ai.providers.claude.max_tokens', 1024),
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $prompt,
                    ],
                ],
            ]);

            if ($response->failed()) {
                throw new \Exception(
                    'Claude API request failed: ' . $response->body()
                );
            }

            $data = $response->json();

            return $data['content'][0]['text'] ?? '';
        } catch (\Exception $e) {
            throw new \Exception('Claude API error: ' . $e->getMessage());
        }
    }

    /**
     * Get the provider name
     *
     * @return string
     */
    public function getProviderName(): string
    {
        return 'claude';
    }
}
