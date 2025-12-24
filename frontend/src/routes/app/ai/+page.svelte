<script lang="ts">
	import { aiService } from '$lib/services/ai';
	import { getErrorMessage } from '$lib/utils/errors';
	import Loader from '$lib/components/Loader.svelte';

	let prompt = $state('');
	let response = $state('');
	let provider = $state('');
	let loading = $state(false);
	let error = $state('');

	const examplePrompts = [
		'What is the meaning of life?',
		'Explain quantum computing in simple terms',
		'Write a haiku about coding',
		'What are the benefits of TypeScript?'
	];

	async function run() {
		if (!prompt.trim()) {
			error = 'Please enter a prompt';
			return;
		}

		error = '';
		response = '';
		provider = '';
		loading = true;

		try {
			const result = await aiService.sendPrompt(prompt);
			response = result.data.response;
			provider = result.data.provider;
		} catch (err) {
			error = getErrorMessage(err);
		} finally {
			loading = false;
		}
	}

	function setExamplePrompt(example: string) {
		prompt = example;
	}

	function clear() {
		prompt = '';
		response = '';
		provider = '';
		error = '';
	}
</script>

<div class="space-y-6 max-w-4xl mx-auto">
	<div>
		<h2 class="text-2xl font-semibold text-gray-900">AI Demo</h2>
		<p class="text-gray-500 mt-1">Test the AI integration with your prompts</p>
	</div>

	<!-- Example Prompts -->
	<div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
		<p class="text-sm font-medium text-blue-900 mb-2">Try these example prompts:</p>
		<div class="flex flex-wrap gap-2">
			{#each examplePrompts as example}
				<button
					onclick={() => setExamplePrompt(example)}
					class="text-xs bg-white border border-blue-200 rounded-full px-3 py-1 hover:bg-blue-100 transition-colors"
				>
					{example}
				</button>
			{/each}
		</div>
	</div>

	<!-- Prompt Input -->
	<div class="bg-white rounded-xl border border-gray-200 p-6">
		<label for="prompt" class="block text-sm font-medium text-gray-700 mb-2">
			Your Prompt
		</label>
		<textarea
			id="prompt"
			bind:value={prompt}
			rows="4"
			placeholder="Enter your prompt here... (e.g., 'Explain AI in simple terms')"
			class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
		></textarea>

		<div class="flex gap-3 mt-4">
			<button
				onclick={run}
				disabled={loading || !prompt.trim()}
				class="flex-1 bg-black text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{loading ? 'Generating...' : 'Generate Response'}
			</button>

			<button
				onclick={clear}
				disabled={loading}
				class="px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
			>
				Clear
			</button>
		</div>
	</div>

	<!-- Loading State -->
	{#if loading}
		<div class="bg-white rounded-xl border border-gray-200 p-6">
			<Loader text="Generating AI response..." />
		</div>
	{/if}

	<!-- Error Display -->
	{#if error}
		<div class="bg-red-50 border border-red-200 rounded-xl p-4">
			<p class="text-sm text-red-600">{error}</p>
		</div>
	{/if}

	<!-- Response Display -->
	{#if response && !loading}
		<div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
			<div class="flex items-center justify-between">
				<h3 class="font-semibold text-gray-900">AI Response</h3>
				{#if provider}
					<span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
						Provider: {provider}
					</span>
				{/if}
			</div>

			<div class="prose prose-sm max-w-none">
				<div class="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-gray-700">
					{response}
				</div>
			</div>
		</div>
	{/if}

	<!-- Info Card -->
	<div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100 p-6">
		<h3 class="font-semibold text-gray-900 mb-2">💡 How it works</h3>
		<ul class="space-y-2 text-sm text-gray-700">
			<li class="flex items-start gap-2">
				<span class="text-purple-600 mt-0.5">•</span>
				<span>Your prompt is sent to the AI provider (Claude or OpenAI)</span>
			</li>
			<li class="flex items-start gap-2">
				<span class="text-purple-600 mt-0.5">•</span>
				<span>The backend processes the request with your API key</span>
			</li>
			<li class="flex items-start gap-2">
				<span class="text-purple-600 mt-0.5">•</span>
				<span>The AI response is returned and displayed here</span>
			</li>
			<li class="flex items-start gap-2">
				<span class="text-purple-600 mt-0.5">•</span>
				<span>
					Configure the AI provider in your backend `.env` file (AI_DEFAULT_PROVIDER)
				</span>
			</li>
		</ul>
	</div>
</div>
