<script lang="ts">
	import { authService } from '$lib/services/auth';
	import { APP_NAME, ROUTES } from '$lib/config';
	import type { User } from '$lib/types/api.types';

	interface Props {
		user: User | null;
	}

	let { user }: Props = $props();

	let isDropdownOpen = $state(false);

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function closeDropdown() {
		isDropdownOpen = false;
	}

	async function handleLogout() {
		await authService.logout();
	}

	// Get user initials for avatar
	function getUserInitials(name: string): string {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.substring(0, 2);
	}
</script>

<nav class="bg-white border-b border-gray-200">
	<div class="mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16">
			<!-- Left side - App name/logo -->
			<div class="flex items-center">
				<h1 class="text-xl font-semibold text-gray-900">{APP_NAME}</h1>
			</div>

			<!-- Right side - User menu -->
			{#if user}
				<div class="flex items-center">
					<div class="relative">
						<button
							onclick={toggleDropdown}
							type="button"
							class="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium"
							>
								{getUserInitials(user.name)}
							</div>
							<span class="hidden sm:block">{user.name}</span>
							<svg
								class="h-5 w-5 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>

						{#if isDropdownOpen}
							<!-- Backdrop to close dropdown when clicking outside -->
							<button
								class="fixed inset-0 z-10"
								onclick={closeDropdown}
								tabindex="-1"
								aria-label="Close menu"
							></button>

							<!-- Dropdown menu -->
							<div
								class="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							>
								<div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
									<p class="font-medium">{user.name}</p>
									<p class="text-xs text-gray-500 truncate">{user.email}</p>
								</div>

								<a
									href={ROUTES.PROFILE}
									onclick={closeDropdown}
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									Profile
								</a>

								<button
									onclick={handleLogout}
									class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
								>
									Logout
								</button>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</div>
</nav>
