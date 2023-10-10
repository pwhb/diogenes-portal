<script lang="ts">
	import { page } from '$app/stores';
	import { getBreadcrumbs } from '$lib/helpers/parser';
</script>

<ol class="breadcrumb">
	{#each getBreadcrumbs($page.url.pathname) as crumb, idx}
		<li class="text-xl font-semibold capitalize crumb">
			<a class="anchor" href={crumb.href}>{crumb.label}</a>
		</li>
		{#if idx < getBreadcrumbs($page.url.pathname).length - 1}
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
		{/if}
	{/each}
</ol>
