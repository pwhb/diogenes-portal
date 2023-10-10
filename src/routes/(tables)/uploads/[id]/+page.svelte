<script>
	import { page } from '$app/stores';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import CopyButton from '$lib/components/common/CopyButton.svelte';
	import Preview from '$lib/components/common/Preview.svelte';
	import EditorLayout from '$lib/components/editors/EditorLayout.svelte';
	const doc = $page.data.data;
	const url = `${PUBLIC_BACKEND_URL}/api/v1/uploads/${doc._id}`;
</script>

<EditorLayout>
	<div class="flex flex-col gap-5 items-center my-4">
		<Preview src={url} contentType={doc.ContentType} name={doc.Key} />
		<CopyButton {url} />
	</div>
	<div>
		<table>
			<tr>
				<td>URL</td>
				<td class="w-3">:</td>
				<td class="break-all">
					<a href={url}>{url}</a>
				</td>
			</tr>
			<tr>
				<td>Key</td>
				<td class="w-3">:</td>
				<td class="break-all">{doc.Key}</td>
			</tr>
			<tr>
				<td>Content Type</td>
				<td class="w-3">:</td>
				<td>{doc.ContentType}</td>
			</tr>
			<tr>
				<td>Created At</td>
				<td class="w-3">:</td>
				<td>{doc.createdAt}</td>
			</tr>
		</table>
	</div>

	<hr class="my-6" />

	<a href="/uploads" class={`w-full btn variant-filled-secondary`}>Back</a>
</EditorLayout>
