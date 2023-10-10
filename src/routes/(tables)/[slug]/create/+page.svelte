<script>
	import { page } from '$app/stores';
	import DefaultEditor from '$lib/components/editors/DefaultEditor.svelte';
</script>

<DefaultEditor slug={$page.data.slug} />
