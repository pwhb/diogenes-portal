<script lang="ts">
	import { page } from '$app/stores';
	import { Collections } from '$lib/consts/db';

	import RowButtons from '$lib/components/common/RowButtons.svelte';
	import TableWrapper from '$lib/components/layout/TableWrapper.svelte';
	import type { PaginationSettings } from '@skeletonlabs/skeleton';

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: $page.data.total,
		amounts: [10, 20]
	} satisfies PaginationSettings;

	let search: any = {
		q: $page.url.searchParams.get('q')
	};

	$: {
		paginationSettings.size = $page.data.total;
		paginationSettings.page = parseInt($page.url.searchParams.get('page') || '0');
	}
</script>

<TableWrapper bind:paginationSettings bind:search>
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
			{#each $page.data.data as row, i}
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
								// await refreshSearched();
							}}
						/>
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="6" />
				<th>Total</th>
				<th>{paginationSettings.size}</th>
			</tr>
		</tfoot>
	</table>
</TableWrapper>
