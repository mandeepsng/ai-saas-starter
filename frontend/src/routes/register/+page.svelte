<script lang="ts">
	let name = '';
	let email = '';
	let password = '';
	let loading = false;
	let error = '';

	async function submit() {
		error = '';
		loading = true;

		const res = await fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({ name, email, password })
		});

		loading = false;

		if (!res.ok) {
			error = 'Registration failed';
			return;
		}

		window.location.href = '/app/dashboard';
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
	<div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

		<h1 class="text-2xl font-semibold text-gray-900 text-center">
			Create an account
		</h1>
		<p class="text-gray-500 text-center mt-1">
			Start building your AI SaaS
		</p>

		<form class="mt-8 space-y-5" on:submit|preventDefault={submit}>

			<div>
				<label class="block text-sm text-gray-600 mb-1">Name</label>
				<input
					type="text"
					bind:value={name}
					required
					placeholder="Your name"
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
				/>
			</div>

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
				{loading ? 'Creating account...' : 'Create account'}
			</button>
		</form>

		<p class="text-sm text-gray-500 text-center mt-6">
			Already have an account?
			<a href="/login" class="text-black font-medium hover:underline">
				Sign in
			</a>
		</p>
	</div>
</div>
