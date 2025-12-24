<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
</script>

<div class="min-h-screen bg-gray-50 flex flex-col">
	<!-- Top Navbar -->
	<Navbar user={data.user} />

	<!-- Main content area with sidebar -->
	<div class="flex flex-1">
		<!-- Sidebar -->
		<Sidebar />

		<!-- Main content -->
		<main class="flex-1 p-6 overflow-auto">
			{@render children()}
		</main>
	</div>
</div>
