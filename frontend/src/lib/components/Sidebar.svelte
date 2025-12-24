<script lang="ts">
	import { page } from '$app/stores';
	import { ROUTES } from '$lib/config';

	const navItems = [
		{
			name: 'Dashboard',
			href: ROUTES.DASHBOARD,
			icon: '📊'
		},
		{
			name: 'AI Demo',
			href: ROUTES.AI_DEMO,
			icon: '🤖'
		},
		{
			name: 'Profile',
			href: ROUTES.PROFILE,
			icon: '👤'
		}
	];

	function isActive(href: string): boolean {
		return $page.url.pathname === href;
	}
</script>

<aside class="w-64 bg-gray-50 border-r border-gray-200 min-h-screen">
	<nav class="px-3 py-4 space-y-1">
		{#each navItems as item}
			<a
				href={item.href}
				class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors {isActive(
					item.href
				)
					? 'bg-blue-100 text-blue-700'
					: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}"
			>
				<span class="text-xl">{item.icon}</span>
				<span>{item.name}</span>
			</a>
		{/each}
	</nav>
</aside>
