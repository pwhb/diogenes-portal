<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createOne, updateOne } from '$lib/api/common';
	import { Collections } from '$lib/consts/db';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import EditorLayout from './EditorLayout.svelte';

	export let doc = {
		_id: '',
		path: '',
		entity: '',
		method: '',
		access: ['root'],
		active: false
	};

	let errorMessage = '';

	const selectedAccess = $page.data.roles.map((v: any) => ({
		label: v,
		checked: doc.access.includes(v)
	}));

	const create = $page.url.pathname.includes('create');
	let isLoading = false;

	const { routes } = $page.data.permissions.filter((v: any) => v._id === Collections.routes)[0];
	const editAllowed = routes.some((v: any) => v.method === 'PATCH');

	const handleSubmit = async () => {
		try {
			isLoading = true;
			const payload = {
				path: doc.path,
				entity: doc.entity,
				method: doc.method,
				access: selectedAccess.filter((v: any) => v.checked).map((v: any) => v.label),
				active: doc.active
			};

			const data = create
				? await createOne(Collections.routes, $page.data.token, payload)
				: await updateOne(Collections.routes, $page.data.token, doc._id, payload);

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
			<span>Path</span>
			<input
				class="p-3 input variant-soft"
				type="text"
				name="path"
				placeholder="Path"
				bind:value={doc.path}
				disabled={!editAllowed}
			/>
		</label>
		<br />
		<label class="label">
			<span>Entity</span>
			<input
				class="p-3 input variant-soft"
				type="text"
				name="entity"
				placeholder="Entity"
				bind:value={doc.entity}
				disabled={!editAllowed}
			/>
		</label>
		<br />
		<label class="label">
			<span>Method</span>
			<input
				class="p-3 input variant-soft"
				type="text"
				name="method"
				placeholder="Method"
				bind:value={doc.method}
				disabled={!editAllowed}
			/>
		</label>
		<br />
		<label class="label">
			<span>Access</span>

			<div class="space-y-2">
				{#each selectedAccess as checkbox}
					<label class="flex items-center space-x-2">
						<input
							class="checkbox variant-soft"
							type="checkbox"
							bind:checked={checkbox.checked}
							disabled={!editAllowed}
						/>
						<p>{checkbox.label}</p>
					</label>
				{/each}
			</div>
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
