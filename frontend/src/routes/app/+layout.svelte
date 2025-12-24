<script lang="ts">
	let { children, data } = $props();
</script>

<div class="min-h-screen bg-gray-50 flex">
	<!-- Sidebar -->
	<aside class="w-64 bg-white border-r hidden md:flex flex-col">
		<div class="p-6 font-semibold text-lg">
			AI SaaS Starter
		</div>

		<nav class="flex-1 px-4 space-y-1">
			<a
				href="/app/dashboard"
				class="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
			>
				Dashboard
			</a>
			<a
				href="/app/ai"
				class="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
			>
				AI Demo
			</a>
			<a
				href="/app/profile"
				class="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
			>
				Profile
			</a>
		</nav>

		<div class="p-4 text-sm text-gray-500">
			Logged in as<br />
			<span class="font-medium text-gray-900">
				{data.user.email}
			</span>
		</div>
	</aside>

	<!-- Main content -->
	<div class="flex-1 flex flex-col">
		<header class="h-16 bg-white border-b flex items-center px-6">
			<h1 class="font-medium text-gray-900">
				{data.user.name}
			</h1>
		</header>

		<main class="flex-1 p-6">
			{@render children()}
		</main>
	</div>
</div>
