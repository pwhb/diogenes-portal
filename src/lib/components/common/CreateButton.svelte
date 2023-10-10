<script lang="ts">
	import { page } from '$app/stores';

	export let slug: string;
	const { routes } = $page.data.permissions.filter((v: any) => v._id === slug)[0];
	const createAllowed = routes.some((v: any) => v.method === 'POST');
</script>

{#if createAllowed}
	<a href={`/${slug}/create`} class="btn btn-sm variant-filled-secondary">
		<span>Create</span>
	</a>
{/if}
