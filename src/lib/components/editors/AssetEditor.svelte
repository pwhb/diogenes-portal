<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createOne, updateOne } from '$lib/api/common';
	import { Autocomplete, SlideToggle, type AutocompleteOption } from '@skeletonlabs/skeleton';
	import EditorLayout from './EditorLayout.svelte';
	import { Collections } from '$lib/consts/db';
	import Preview from '../common/Preview.svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	export let doc: any = {
		_id: '',
		name: '',
		path: '',
		category: '',
		type: '',
		active: false
	};

	const { assets } = $page.data.portal.data;

	let errorMessage = '';

	const create = $page.url.pathname.includes('create');
	let isLoading = false;

	const { routes } = $page.data.permissions.filter((v: any) => v._id === Collections.assets)[0];
	const editAllowed = routes.some((v: any) => v.method === 'PATCH');

	const handleSubmit = async () => {
		try {
			isLoading = true;
			const payload = {
				name: doc.name,
				path: doc.path,
				category: doc.category,
				type: doc.type,
				active: doc.active
			};

			const data = create
				? await createOne(Collections.assets, $page.data.token, payload)
				: await updateOne(Collections.assets, $page.data.token, doc._id, payload);

			if (data.data) {
				goto(`/${Collections.assets}`);
			} else {
				errorMessage = data.message;
			}
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	};

	let uploadKey = '';

	const options: AutocompleteOption<string>[] = $page.data.uploads.map((upload: any) => ({
		label: upload.Key,
		value: upload._id
	}));

	function onPathSelection(event: CustomEvent<AutocompleteOption<string>>): void {
		doc.path = `/api/v1/uploads/${event.detail.value}`;
		uploadKey = event.detail.label;
	}
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
			<span>Path</span>

			<Preview src={`${PUBLIC_BACKEND_URL}${doc.path}`} name="preview" contentType="image" />

			<input
				class="p-3 input variant-soft"
				type="search"
				name="path"
				bind:value={uploadKey}
				placeholder="Path"
			/>

			<div class="overflow-y-auto p-2 w-full max-w-sm max-h-48 card" tabindex="-1">
				<Autocomplete bind:input={uploadKey} {options} on:selection={onPathSelection} />
			</div>
		</label>

		<br />
		<label class="label">
			<!-- <span>Category</span>
			<input
				class="p-3 input variant-soft"
				type="text"
				name="category"
				placeholder="Category"
				bind:value={doc.category}
				disabled={!editAllowed}
			/> -->

			<span>Category</span>
			<select class="p-3 select variant-soft" bind:value={doc.category} disabled={!editAllowed}>
				{#each assets.categories as category}
					<option value={category}>{category}</option>
				{/each}
				<!-- // <option value="1">Option 1</option>
				// <option value="2">Option 2</option>
				// <option value="3">Option 3</option>
				// <option value="4">Option 4</option>
				// <option value="5">Option 5</option> -->
			</select>
		</label>
		<br />
		<label class="label">
			<span>Type</span>
			<input
				class="p-3 input variant-soft"
				type="text"
				name="type"
				placeholder="Type"
				bind:value={doc.type}
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
