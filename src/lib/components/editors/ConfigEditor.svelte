<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createOne, replaceOne, updateOne } from '$lib/api/common';
	import { Collections } from '$lib/consts/db';
	import EditorLayout from './EditorLayout.svelte';
	import { JSONEditor, Mode } from 'svelte-jsoneditor';

	export let doc: any = {
		name: ''
	};

	let content = {
		text: undefined, // can be used to pass a stringified JSON document instead
		json: {
			...doc
		}
	};

	let errorMessage = '';

	const create = $page.url.pathname.includes('create');
	let isLoading = false;

	const { routes } = $page.data.permissions.filter((v: any) => v._id === Collections.configs)[0];
	const editAllowed = routes.some((v: any) => v.method === 'PATCH');

	const handleSubmit = async () => {
		try {
			isLoading = true;
			const payload = JSON.parse(content.text as any);
			delete payload._id;
			const data = create
				? await createOne(Collections.configs, $page.data.token, payload)
				: await replaceOne(Collections.configs, $page.data.token, doc._id, payload);

			if (data.data) {
				goto(`/${Collections.configs}`);
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
		<JSONEditor bind:content mode={Mode.text} readOnly={!editAllowed} />

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
			<a href="/configs" class={`w-full btn variant-filled-secondary`}>Back</a>
		{/if}
	</form>
</EditorLayout>
