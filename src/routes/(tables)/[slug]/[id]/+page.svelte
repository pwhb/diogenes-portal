<script>
	import { page } from '$app/stores';
	import DefaultEditor from '$lib/components/editors/DefaultEditor.svelte';
</script>

<DefaultEditor doc={$page.data.data} slug={$page.data.slug} />
