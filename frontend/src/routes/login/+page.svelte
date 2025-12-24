<script lang="ts">
	let email = '';
	let password = '';
	let loading = false;
	let error = '';

	async function submit() {
		error = '';
		loading = true;

		const res = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({ email, password })
		});

		loading = false;

		if (!res.ok) {
			error = 'Invalid email or password';
			return;
		}

		window.location.href = '/app/dashboard';
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
	<div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
		
		<h1 class="text-2xl font-semibold text-gray-900 text-center">
			Welcome back
		</h1>
		<p class="text-gray-500 text-center mt-1">
			Sign in to your account
		</p>

		<form class="mt-8 space-y-5" on:submit|preventDefault={submit}>
			
			<div>
				<label class="block text-sm text-gray-600 mb-1">Email</label>
				<input
					type="email"
					bind:value={email}
					required
					placeholder="you@example.com"
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
				/>
			</div>

			<div>
				<label class="block text-sm text-gray-600 mb-1">Password</label>
				<input
					type="password"
					bind:value={password}
					required
					placeholder="••••••••"
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
				/>
			</div>

			{#if error}
				<p class="text-sm text-red-600">{error}</p>
			{/if}

			<button
				disabled={loading}
				class="w-full rounded-lg bg-black text-white py-2.5 font-medium hover:bg-black/90 transition disabled:opacity-50"
			>
				{loading ? 'Signing in...' : 'Sign in'}
			</button>
		</form>

		<p class="text-sm text-gray-500 text-center mt-6">
			Don’t have an account?
			<a href="/register" class="text-black font-medium hover:underline">
				Create one
			</a>
		</p>
	</div>
</div>
