<?php

namespace App\Http\Controllers;

use App\Http\Requests\AiDemoRequest;
use App\Services\AI\AIService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class AiController extends Controller
{
    public function __construct(
        private AIService $aiService
    ) {}

    /**
     * Demo AI endpoint - accepts prompt and returns AI response
     *
     * @param AiDemoRequest $request
     * @return JsonResponse
     */
    public function demo(AiDemoRequest $request): JsonResponse
    {
        try {
            $response = $this->aiService->chat($request->prompt);

            return ApiResponse::success([
                'prompt' => $request->prompt,
                'response' => $response,
                'provider' => config('ai.default_provider'),
            ], 'AI response generated successfully');
        } catch (\Exception $e) {
            return ApiResponse::error(
                'Failed to generate AI response: ' . $e->getMessage(),
                500
            );
        }
    }
}
