<script lang="ts">
	import { ROUTES } from '$lib/config';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Format date
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="space-y-6">
	<div>
		<h2 class="text-2xl font-semibold text-gray-900">Dashboard</h2>
		<p class="text-gray-500 mt-1">Welcome back, {data.user.name}!</p>
	</div>

	<!-- Stats Cards -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<div class="bg-white rounded-xl border border-gray-200 p-6">
			<p class="text-sm text-gray-500">AI Requests</p>
			<p class="text-3xl font-semibold mt-2 text-gray-900">—</p>
			<p class="text-xs text-gray-400 mt-1">Connect usage tracking</p>
		</div>

		<div class="bg-white rounded-xl border border-gray-200 p-6">
			<p class="text-sm text-gray-500">Credits Used</p>
			<p class="text-3xl font-semibold mt-2 text-gray-900">—</p>
			<p class="text-xs text-gray-400 mt-1">Paid version feature</p>
		</div>

		<div class="bg-white rounded-xl border border-gray-200 p-6">
			<p class="text-sm text-gray-500">Account Type</p>
			<p class="text-3xl font-semibold mt-2 text-green-600">Free</p>
			<p class="text-xs text-gray-400 mt-1">Upgrade available soon</p>
		</div>
	</div>

	<!-- Account Info -->
	<div class="bg-white rounded-xl border border-gray-200 p-6">
		<h3 class="font-semibold text-gray-900 mb-4">Account Information</h3>

		<div class="space-y-3">
			<div class="flex justify-between py-2 border-b border-gray-100">
				<span class="text-sm text-gray-600">Name</span>
				<span class="text-sm font-medium text-gray-900">{data.user.name}</span>
			</div>

			<div class="flex justify-between py-2 border-b border-gray-100">
				<span class="text-sm text-gray-600">Email</span>
				<span class="text-sm font-medium text-gray-900">{data.user.email}</span>
			</div>

			<div class="flex justify-between py-2 border-b border-gray-100">
				<span class="text-sm text-gray-600">Member Since</span>
				<span class="text-sm font-medium text-gray-900">
					{formatDate(data.user.created_at)}
				</span>
			</div>

			<div class="flex justify-between py-2">
				<span class="text-sm text-gray-600">Email Verified</span>
				<span class="text-sm font-medium text-gray-900">
					{data.user.email_verified_at ? 'Yes' : 'No'}
				</span>
			</div>
		</div>
	</div>

	<!-- Quick Actions -->
	<div class="bg-white rounded-xl border border-gray-200 p-6">
		<h3 class="font-semibold text-gray-900 mb-4">Quick Actions</h3>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<a
				href={ROUTES.AI_DEMO}
				class="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors group"
			>
				<span class="text-2xl">🤖</span>
				<div>
					<p class="font-medium text-gray-900 group-hover:text-blue-700">Try AI Demo</p>
					<p class="text-sm text-gray-500">Test the AI chat functionality</p>
				</div>
			</a>

			<a
				href={ROUTES.PROFILE}
				class="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors group"
			>
				<span class="text-2xl">👤</span>
				<div>
					<p class="font-medium text-gray-900 group-hover:text-blue-700">View Profile</p>
					<p class="text-sm text-gray-500">Manage your account settings</p>
				</div>
			</a>
		</div>
	</div>

	<!-- Getting Started -->
	<div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 p-6">
		<h3 class="font-semibold text-gray-900 mb-2">🚀 Getting Started</h3>

		<ul class="space-y-2 text-sm text-gray-700">
			<li class="flex items-start gap-2">
				<span class="text-green-600 mt-0.5">✓</span>
				<span>Account created successfully</span>
			</li>
			<li class="flex items-start gap-2">
				<span class="text-blue-600 mt-0.5">→</span>
				<span>Try the AI demo to test the integration</span>
			</li>
			<li class="flex items-start gap-2">
				<span class="text-gray-400 mt-0.5">○</span>
				<span class="text-gray-500">Customize your dashboard (coming soon)</span>
			</li>
			<li class="flex items-start gap-2">
				<span class="text-gray-400 mt-0.5">○</span>
				<span class="text-gray-500">Upgrade to premium features (coming soon)</span>
			</li>
		</ul>
	</div>
</div>
