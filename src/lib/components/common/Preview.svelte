<script lang="ts">
	export let src: string;
	export let name: string = '';
	export let contentType: string = '';

	const getFileType = (fileType: string) => fileType.split('/')[0];
</script>

{#if getFileType(contentType) === 'image'}
	<img {src} alt={name} class="w-24" />
{:else if getFileType(contentType) === 'audio'}
	<div>
		<audio controls class="mx-auto">
			<source {src} />
		</audio>
	</div>
{:else}
	<a href={src} target="_blank" class="underline">{name}</a>
{/if}
