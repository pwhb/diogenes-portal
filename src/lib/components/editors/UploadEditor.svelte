<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { uploadBulk } from '$lib/api/common';
	import { Collections } from '$lib/consts/db';
	import Preview from '../common/Preview.svelte';
	import EditorLayout from './EditorLayout.svelte';
	import { FileDropzone } from '@skeletonlabs/skeleton';

	let files: FileList | undefined;
	let preview: File[] = [];

	let message = {
		error: false,
		text: ''
	};
	let isLoading = false;

	$: {
		preview = [];
		if (files) {
			for (let i = 0; i < files.length; i++) {
				preview.push(files.item(i)!);
			}
		}
	}

	const reset = () => {
		files = undefined;
	};
	const handleSubmit = async () => {
		try {
			message = {
				error: false,
				text: ''
			};
			isLoading = true;

			const data = await uploadBulk(files!, $page.data.token);

			if (data.data) {
				goto(`/${Collections.uploads}`);
			} else {
				message.text = data.message;
			}
		} catch (e: any) {
			console.error(e);
			message.error = true;
			message.text = e.message;
		} finally {
			isLoading = false;
		}
	};
</script>

<EditorLayout>
	<form class="my-3" on:submit={handleSubmit}>
		{#if preview.length}
			<div class="flex flex-wrap gap-2 items-center my-10">
				{#each preview as file}
					<Preview src={URL.createObjectURL(file)} name={file.name} contentType={file.type} />
				{/each}
			</div>
			<button class="my-3 w-full btn variant-outline-primary" type="reset" on:click={reset}
				>Remove</button
			>
		{/if}

		<FileDropzone name="files" bind:files multiple>
			<svelte:fragment slot="lead">
				<img src="/svg/upload-svgrepo-com.svg" alt="upload" class="mx-auto w-12" />
			</svelte:fragment>
			<svelte:fragment slot="message">
				<div class="mx-10">
					<span class="font-semibold">Upload files</span> <span>or drag and drop</span>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="meta" />
		</FileDropzone>

		{#if message.text}
			{#if message.error}
				<p class="my-3 text-error-500">{message.text}</p>
			{:else}
				<p class="my-3 text-success-500">{message.text}</p>
			{/if}
		{/if}
		<hr class="my-6" />

		<button type="submit" class={`w-full btn variant-filled-secondary`} disabled={isLoading}
			>Upload</button
		>
	</form>
</EditorLayout>
