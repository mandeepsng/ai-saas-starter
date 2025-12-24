<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="space-y-6 max-w-3xl mx-auto">
	<div>
		<h2 class="text-2xl font-semibold text-gray-900">Profile</h2>
		<p class="text-gray-500 mt-1">Manage your account information</p>
	</div>

	<!-- Profile Card -->
	<div class="bg-white rounded-xl border border-gray-200 p-8">
		<!-- Avatar and Name -->
		<div class="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200">
			<div
				class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold"
			>
				{data.user.name
					.split(' ')
					.map((n) => n[0])
					.join('')
					.toUpperCase()
					.substring(0, 2)}
			</div>
			<div>
				<h3 class="text-xl font-semibold text-gray-900">{data.user.name}</h3>
				<p class="text-gray-600">{data.user.email}</p>
				<p class="text-sm text-gray-500 mt-1">
					Member since {formatDate(data.user.created_at)}
				</p>
			</div>
		</div>

		<!-- Account Details -->
		<div class="space-y-6">
			<div>
				<h4 class="text-lg font-semibold text-gray-900 mb-4">Account Details</h4>

				<div class="space-y-4">
					<div class="flex justify-between py-3 border-b border-gray-100">
						<div>
							<p class="text-sm font-medium text-gray-700">Full Name</p>
							<p class="text-sm text-gray-500 mt-0.5">Your display name</p>
						</div>
						<p class="text-sm font-medium text-gray-900">{data.user.name}</p>
					</div>

					<div class="flex justify-between py-3 border-b border-gray-100">
						<div>
							<p class="text-sm font-medium text-gray-700">Email Address</p>
							<p class="text-sm text-gray-500 mt-0.5">Your contact email</p>
						</div>
						<p class="text-sm font-medium text-gray-900">{data.user.email}</p>
					</div>

					<div class="flex justify-between py-3 border-b border-gray-100">
						<div>
							<p class="text-sm font-medium text-gray-700">Email Verification</p>
							<p class="text-sm text-gray-500 mt-0.5">Verification status</p>
						</div>
						<span
							class="text-sm font-medium {data.user.email_verified_at
								? 'text-green-600'
								: 'text-yellow-600'}"
						>
							{data.user.email_verified_at ? '✓ Verified' : '○ Not Verified'}
						</span>
					</div>

					<div class="flex justify-between py-3 border-b border-gray-100">
						<div>
							<p class="text-sm font-medium text-gray-700">Account Created</p>
							<p class="text-sm text-gray-500 mt-0.5">Registration date</p>
						</div>
						<p class="text-sm font-medium text-gray-900">
							{formatDate(data.user.created_at)}
						</p>
					</div>

					<div class="flex justify-between py-3">
						<div>
							<p class="text-sm font-medium text-gray-700">Last Updated</p>
							<p class="text-sm text-gray-500 mt-0.5">Profile modification date</p>
						</div>
						<p class="text-sm font-medium text-gray-900">
							{formatDate(data.user.updated_at)}
						</p>
					</div>
				</div>
			</div>

			<!-- Action Buttons (Placeholder) -->
			<div class="pt-6 border-t border-gray-200">
				<h4 class="text-lg font-semibold text-gray-900 mb-4">Actions</h4>

				<div class="space-y-3">
					<button
						disabled
						class="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<p class="font-medium text-gray-900">Edit Profile</p>
						<p class="text-sm text-gray-500">Update your name and email (Coming soon)</p>
					</button>

					<button
						disabled
						class="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<p class="font-medium text-gray-900">Change Password</p>
						<p class="text-sm text-gray-500">Update your account password (Coming soon)</p>
					</button>

					<button
						disabled
						class="w-full text-left px-4 py-3 border border-red-300 rounded-lg hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<p class="font-medium text-red-600">Delete Account</p>
						<p class="text-sm text-red-500">Permanently remove your account (Coming soon)</p>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Info Card -->
	<div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
		<h3 class="font-semibold text-gray-900 mb-2">ℹ️ Profile Management</h3>
		<ul class="space-y-2 text-sm text-gray-700">
			<li class="flex items-start gap-2">
				<span class="text-blue-600 mt-0.5">•</span>
				<span>Your profile information is securely stored and encrypted</span>
			</li>
			<li class="flex items-start gap-2">
				<span class="text-blue-600 mt-0.5">•</span>
				<span>Profile editing and password change features are coming soon</span>
			</li>
			<li class="flex items-start gap-2">
				<span class="text-blue-600 mt-0.5">•</span>
				<span>Contact support if you need to make account changes</span>
			</li>
		</ul>
	</div>
</div>
