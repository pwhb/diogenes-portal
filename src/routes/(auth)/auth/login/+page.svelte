<script lang="ts">
	import type { ActionData } from './$types';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	export let form: ActionData;
	let showPassword = false;
</script>

<div class="p-12 shadow-lg card bg-neutral-200">
	<div class="text-4xl font-bold text-center card-header text-secondary-500">Login</div>
	<form class="my-6" method="POST">
		<label class="label">
			<span>Username</span>
			<input class="p-3 input variant-soft" type="text" name="username" placeholder="Username" />
		</label>
		<br />
		<label class="label">
			<span>Password</span>

			<input
				class="p-3 input variant-soft"
				type={showPassword ? 'text' : 'password'}
				name="password"
				placeholder="Password"
			/>
		</label>
		<br />
		<SlideToggle
			name="slider-label"
			size="sm"
			checked={showPassword}
			on:change={() => {
				showPassword = !showPassword;
			}}
			active="bg-surface-300">Show password?</SlideToggle
		>
		{#if form?.message}
			<p class="my-3 text-error-500">{form.message}</p>
		{/if}
		<hr class="my-6" />
		<button type="submit" class="w-full btn variant-filled-secondary">Sign In</button>
	</form>
</div>
