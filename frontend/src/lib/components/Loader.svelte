<script lang="ts">
	interface Props {
		size?: 'sm' | 'md' | 'lg';
		text?: string;
		center?: boolean;
	}

	let { size = 'md', text, center = true }: Props = $props();

	const sizeClasses = {
		sm: 'h-6 w-6',
		md: 'h-12 w-12',
		lg: 'h-16 w-16'
	};

	const spinnerSize = sizeClasses[size];
</script>

<div class="flex {center ? 'justify-center items-center min-h-48' : ''} flex-col gap-3">
	<div
		class="{spinnerSize} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
	></div>
	{#if text}
		<p class="text-sm text-gray-600">{text}</p>
	{/if}
</div>
