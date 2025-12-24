<script lang="ts">
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/auth';
	import { getErrorMessage } from '$lib/utils/errors';
	import { ROUTES } from '$lib/config';
	import Loader from '$lib/components/Loader.svelte';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let password_confirmation = $state('');
	let loading = $state(false);
	let error = $state('');

	async function submit() {
		error = '';

		// Client-side validation
		if (password !== password_confirmation) {
			error = 'Passwords do not match';
			return;
		}

		loading = true;

		try {
			await authService.register({ name, email, password, password_confirmation });
			goto(ROUTES.DASHBOARD);
		} catch (err) {
			error = getErrorMessage(err);
		} finally {
			loading = false;
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
	<div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
		<h1 class="text-2xl font-semibold text-gray-900 text-center">Create an account</h1>
		<p class="text-gray-500 text-center mt-1">Start building your AI SaaS</p>

		{#if loading}
			<div class="mt-8">
				<Loader text="Creating account..." />
			</div>
		{:else}
			<form class="mt-8 space-y-5" onsubmit={submit}>
				<div>
					<label for="name" class="block text-sm text-gray-600 mb-1">Name</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						required
						placeholder="Your name"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
					/>
				</div>

				<div>
					<label for="email" class="block text-sm text-gray-600 mb-1">Email</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						placeholder="you@example.com"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
					/>
				</div>

				<div>
					<label for="password" class="block text-sm text-gray-600 mb-1">Password</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						required
						minlength="8"
						placeholder="••••••••"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
					/>
					<p class="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
				</div>

				<div>
					<label for="password_confirmation" class="block text-sm text-gray-600 mb-1"
						>Confirm Password</label
					>
					<input
						id="password_confirmation"
						type="password"
						bind:value={password_confirmation}
						required
						minlength="8"
						placeholder="••••••••"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
					/>
				</div>

				{#if error}
					<div class="rounded-md bg-red-50 p-3">
						<p class="text-sm text-red-600">{error}</p>
					</div>
				{/if}

				<button
					type="submit"
					disabled={loading}
					class="w-full rounded-lg bg-black text-white py-2.5 font-medium hover:bg-black/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Create account
				</button>
			</form>
		{/if}

		<p class="text-sm text-gray-500 text-center mt-6">
			Already have an account?
			<a href={ROUTES.LOGIN} class="text-black font-medium hover:underline"> Sign in </a>
		</p>
	</div>
</div>
