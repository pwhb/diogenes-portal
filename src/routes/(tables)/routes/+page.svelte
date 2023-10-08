<script lang="ts">
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { getMany } from '$lib/api/common';
	import { Collections } from '$lib/consts/db';

	import RowButtons from '$lib/components/RowButtons.svelte';
	import { queryString } from '$lib/helpers/parser';

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: $page.data.total,
		amounts: [10, 20]
	} satisfies PaginationSettings;

	let display: any[] = $page.data.data.slice(
		paginationSettings.limit * paginationSettings.page,
		paginationSettings.limit * (paginationSettings.page + 1)
	);
	let searched: any[] = [];
	let search = {
		q: ''
	};

	const refresh = async (
		page: number = paginationSettings.page,
		limit: number = paginationSettings.limit
	) => {
		if (search) {
			const data = await getMany(
				Collections.routes,
				`sort_by=entity,method&${queryString(search)}`
			);
			display = data.data.slice(limit * page, limit * (page + 1));
			paginationSettings.size = data.total;
		} else if (limit * (page + 1) > $page.data.data.length) {
			const data = await getMany(
				Collections.routes,
				`sort_by=entity,method&limit=${limit}&page=${page}`
			);
			display = data.data;
		} else {
			display = $page.data.data.slice(limit * page, limit * (page + 1));
		}
	};

	const handleSearch = async () => {
		await refresh();
	};
</script>

<form class="flex gap-2" on:submit={handleSearch}>
	<div class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
		<label class="label">
			<span>Search</span>
			<input
				class="p-2 max-w-xs input variant-soft"
				type="text"
				bind:value={search.q}
				placeholder="Search"
			/>
		</label>
	</div>
	<div class="self-end">
		<button class="w-24 btn variant-filled-secondary" type="submit">Submit</button>
	</div>
</form>
<hr class="my-3" />
<!-- Responsive Container (recommended) -->
<div class="overflow-auto table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>No.</th>
				<th>ObjectId</th>
				<th>Path</th>
				<th>Entity</th>
				<th>Method</th>
				<th>Access</th>
				<th>Active?</th>
				<th>
					<!-- <button type="button" class="btn btn-sm variant-filled-secondary">
						<span>Create</span>
					</button> -->
				</th>
			</tr>
		</thead>
		<tbody>
			{#each display as row, i}
				<tr>
					<th>{i + 1 + paginationSettings.limit * paginationSettings.page}</th>
					<td>{row._id}</td>
					<td>{row.path}</td>
					<td><span class="font-semibold">{row.entity}</span></td>
					<td>
						{#if row.method === 'GET'}
							<span class="bg-teal-600 text-neutral-100 badge">{row.method}</span>
						{:else if row.method === 'POST'}
							<span class="bg-yellow-600 text-neutral-100 badge">{row.method}</span>
						{:else if row.method === 'PATCH'}
							<span class="bg-fuchsia-600 text-neutral-100 badge">{row.method}</span>
						{:else if row.method === 'PUT'}
							<span class="bg-violet-600 text-neutral-100 badge">{row.method}</span>
						{:else if row.method === 'DELETE'}
							<span class="bg-red-600 text-neutral-100 badge">{row.method}</span>
						{/if}
					</td>
					<td>
						{#if row.access.includes('all')}
							<span class="bg-red-600 text-neutral-100 badge">{row.access}</span>
						{:else if row.access.length === 1 && row.access[0] === 'root'}
							<span class="bg-green-600 text-neutral-100 badge">{row.access}</span>
						{:else}
							<span class="bg-slate-600 text-neutral-100 badge">{row.access}</span>
						{/if}
					</td>
					<td>
						<span
							class={`badge ${row.active ? 'variant-filled-secondary' : 'variant-filled-primary'}`}
							>{row.active}</span
						>
					</td>
					<td>
						<RowButtons
							entity={Collections.routes}
							rowId={row._id}
							onDelete={async () => {
								await refresh();
								paginationSettings.size = $page.data.total;
							}}
						/>
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="5" />
				<th>Total</th>
				<th>{paginationSettings.size}</th>
			</tr>
		</tfoot>
	</table>
</div>

<hr class="my-3" />

<Paginator
	bind:settings={paginationSettings}
	showFirstLastButtons={false}
	showPreviousNextButtons={true}
	on:amount={async ({ detail }) => {
		await refresh(paginationSettings.page, detail);
	}}
	on:page={async ({ detail }) => {
		await refresh(detail, paginationSettings.limit);
	}}
/>
