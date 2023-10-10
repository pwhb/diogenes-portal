<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createOne, updateOne } from '$lib/api/common';
	import { Collections } from '$lib/consts/db';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import EditorLayout from './EditorLayout.svelte';

	export let doc: any = {
		_id: '',
		username: '',
		role: '',
		active: false
	};

	let errorMessage = '';

	const create = $page.url.pathname.includes('create');
	let isLoading = false;

	const { routes } = $page.data.permissions.filter((v: any) => v._id === Collections.users)[0];
	const editAllowed = routes.some((v: any) => v.method === 'PATCH');

	const handleSubmit = async () => {
		try {
			isLoading = true;
			const payload = {
				username: doc.username,
				role: doc.role,
				active: doc.active
			};

			const data = create
				? await createOne(Collections.users, $page.data.token, payload)
				: await updateOne(Collections.users, $page.data.token, doc._id, payload);

			if (data.data) {
				goto(`/${Collections.users}`);
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
			<span>Username</span>
			<input
				class="p-3 input variant-soft"
				type="text"
				name="username"
				placeholder="Username"
				bind:value={doc.username}
				disabled={!editAllowed}
			/>
		</label>
		<br />

		<label class="label">
			<span>Role</span>
			<select
				class="p-3 select variant-soft"
				name="level"
				bind:value={doc.role}
				disabled={!editAllowed}
			>
				{#each $page.data.roles as role}
					<option value={role}>{role}</option>
				{/each}
			</select>
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
			<a href="/users" class={`w-full btn variant-filled-secondary`}>Back</a>
		{/if}
	</form>
</EditorLayout>
