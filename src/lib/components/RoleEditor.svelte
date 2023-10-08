<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createOne, updateOne } from '$lib/api/common';
	import { Collections } from '$lib/consts/db';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import EditorLayout from './EditorLayout.svelte';

	export let doc = {
		_id: '',
		name: '',
		level: '',
		active: false
	};

	let errorMessage = '';

	const create = $page.url.pathname.includes('create');
	let isLoading = false;

	const { routes } = $page.data.permissions.filter((v: any) => v._id === Collections.roles)[0];
	const editAllowed = routes.some((v: any) => v.method === 'PATCH');

	const handleSubmit = async () => {
		try {
			isLoading = true;
			const payload = {
				name: doc.name,
				level: parseInt(doc.level),
				active: doc.active
			};

			const data = create
				? await createOne(Collections.roles, $page.data.token, payload)
				: await updateOne(Collections.roles, $page.data.token, doc._id, payload);

			if (data.data) {
				goto(`/${Collections.routes}`);
			} else {
				errorMessage = data.message;
			}
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	};
</script>

<EditorLayout>
	<form class="my-3" on:submit={handleSubmit}>
		<label class="label">
			<span>Name</span>
			<input
				class="p-3 input variant-soft"
				type="text"
				name="name"
				placeholder="Name"
				bind:value={doc.name}
				disabled={!editAllowed}
			/>
		</label>
		<br />
		<label class="label">
			<span>Level</span>

			<input
				class="p-3 input variant-soft"
				type="text"
				name="level"
				placeholder="level"
				bind:value={doc.level}
				disabled={!editAllowed}
			/>
		</label>
		<br />

		<SlideToggle
			name="slider-label"
			size="sm"
			bind:checked={doc.active}
			disabled={create || !editAllowed}
			active="bg-surface-300">Active?</SlideToggle
		>
		{#if errorMessage}
			<p class="my-3 text-error-500">{errorMessage}</p>
		{/if}
		<hr class="my-6" />
		{#if create || editAllowed}
			<button type="submit" class={`w-full btn variant-filled-secondary`} disabled={isLoading}
				>{create ? 'Create' : 'Save'}</button
			>
		{:else}
			<a href="/routes" class={`w-full btn variant-filled-secondary`}>Back</a>
		{/if}
	</form>
</EditorLayout>
