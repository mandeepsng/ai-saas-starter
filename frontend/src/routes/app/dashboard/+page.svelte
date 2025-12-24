<script lang="ts">
	let { data } = $props();
</script>

<div class="space-y-6">
	<div>
		<h2 class="text-2xl font-semibold text-gray-900">
			Dashboard
		</h2>
		<p class="text-gray-500 mt-1">
			Welcome back, {data.user.name}
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<div class="bg-white rounded-xl border p-6">
			<p class="text-sm text-gray-500">AI Requests</p>
			<p class="text-2xl font-semibold mt-2">—</p>
			<p class="text-xs text-gray-400 mt-1">
				Connect usage logic
			</p>
		</div>

		<div class="bg-white rounded-xl border p-6">
			<p class="text-sm text-gray-500">Credits Used</p>
			<p class="text-2xl font-semibold mt-2">—</p>
			<p class="text-xs text-gray-400 mt-1">
				Paid version feature
			</p>
		</div>

		<div class="bg-white rounded-xl border p-6">
			<p class="text-sm text-gray-500">Account Type</p>
			<p class="text-2xl font-semibold mt-2">Free</p>
			<p class="text-xs text-gray-400 mt-1">
				Upgrade available
			</p>
		</div>
	</div>

	<div class="bg-white rounded-xl border p-6">
		<h3 class="font-medium text-gray-900">
			Next steps
		</h3>

		<ul class="mt-3 space-y-2 text-sm text-gray-600">
			<li>• Try the AI demo tool</li>
			<li>• Connect billing (paid version)</li>
			<li>• Customize this dashboard</li>
		</ul>
	</div>
</div>
