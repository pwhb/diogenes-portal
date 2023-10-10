<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createOne, updateOne } from '$lib/api/common';
	import { Collections } from '$lib/consts/db';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import EditorLayout from './EditorLayout.svelte';

	export let slug: string;
	export let doc: any = {
		_id: '',
		name: '',
		active: false
	};

	let errorMessage = '';

	const create = $page.url.pathname.includes('create');
	let isLoading = false;

	const { routes } = $page.data.permissions.filter((v: any) => v._id === slug)[0];
	const editAllowed = routes.some((v: any) => v.method === 'PATCH');

	const handleSubmit = async () => {
		try {
			isLoading = true;
			const payload = {
				name: doc.name,
				active: doc.active
			};

			const data = create
				? await createOne(slug, $page.data.token, payload)
				: await updateOne(slug, $page.data.token, doc._id, payload);

			if (data.data) {
				goto(`/${slug}`);
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
		{#if !create}
			<div class="mt-4">
				<table>
					<tr>
						<td>Created At</td>
						<td>:</td>
						<td>{doc.createdAt}</td>
					</tr>
					<tr>
						<td>Updated At</td>
						<td>:</td>
						<td>{doc.updatedAt}</td>
					</tr>
				</table>
			</div>
		{/if}
		<hr class="my-6" />
		{#if create || editAllowed}
			<button type="submit" class={`w-full btn variant-filled-secondary`} disabled={isLoading}
				>{create ? 'Create' : 'Save'}</button
			>
		{:else}
			<a href="/roles" class={`w-full btn variant-filled-secondary`}>Back</a>
		{/if}
	</form>
</EditorLayout>
