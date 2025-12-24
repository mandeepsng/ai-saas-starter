<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default AI Provider
    |--------------------------------------------------------------------------
    |
    | This option controls the default AI provider that will be used.
    | You can switch between 'claude' and 'openai' based on your needs.
    |
    */

    'default_provider' => env('AI_DEFAULT_PROVIDER', 'claude'),

    /*
    |--------------------------------------------------------------------------
    | AI Provider Configurations
    |--------------------------------------------------------------------------
    |
    | Here you may configure each AI provider separately.
    | Make sure to set the API keys in your .env file.
    |
    */

    'providers' => [
        'claude' => [
            'api_key' => env('CLAUDE_API_KEY'),
            'api_url' => env('CLAUDE_API_URL', 'https://api.anthropic.com/v1/messages'),
            'model' => env('CLAUDE_MODEL', 'claude-3-5-sonnet-20241022'),
            'max_tokens' => env('CLAUDE_MAX_TOKENS', 1024),
        ],

        'openai' => [
            'api_key' => env('OPENAI_API_KEY'),
            'api_url' => env('OPENAI_API_URL', 'https://api.openai.com/v1/chat/completions'),
            'model' => env('OPENAI_MODEL', 'gpt-4o-mini'),
            'max_tokens' => env('OPENAI_MAX_TOKENS', 1024),
        ],
    ],
];
