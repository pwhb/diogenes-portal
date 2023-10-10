<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';

	export let paginationSettings: PaginationSettings;

	export let search: any;

	export let handleSearch = (e: any) => {
		e.preventDefault();
		const url = $page.url;
		url.searchParams.set('page', '0');
		url.searchParams.set('limit', paginationSettings.limit.toString());
		url.searchParams.set('q', search.q);
		goto(url, {
			invalidateAll: true
		});
	};
</script>

<form class="flex gap-2" on:submit={handleSearch}>
	<div class="flex-1">
		<div class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
			<input
				class="p-2 max-w-xs input variant-soft"
				type="search"
				bind:value={search.q}
				placeholder="Search"
			/>
		</div>
	</div>
	<div class="self-end">
		<button class="w-24 btn variant-filled-secondary" type="submit">Submit</button>
	</div>
</form>

<hr class="my-3" />
<!-- Responsive Container (recommended) -->
<div class="overflow-auto table-container">
	<!-- Native Table Element -->
	<slot />
</div>
<hr class="my-3" />

<Paginator
	bind:settings={paginationSettings}
	showFirstLastButtons={false}
	showPreviousNextButtons={true}
	on:amount={async ({ detail }) => {
		const url = $page.url;
		url.searchParams.set('page', paginationSettings.page.toString());
		url.searchParams.set('limit', detail.toString());

		goto(url, {
			invalidateAll: true
		});
	}}
	on:page={async ({ detail }) => {
		const url = $page.url;
		url.searchParams.set('page', detail.toString());
		url.searchParams.set('limit', paginationSettings.limit.toString());
		goto(url, {
			invalidateAll: true
		});
	}}
/>
