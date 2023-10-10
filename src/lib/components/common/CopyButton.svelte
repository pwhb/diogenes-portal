<script>
	export let url = '';
</script>

<button
	class="btn btn-sm variant-ringed-secondary"
	on:click={() => {
		navigator.clipboard.writeText(url);
	}}
>
	Copy
</button>
