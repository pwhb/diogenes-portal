<script lang="ts">
	import { page } from '$app/stores';
	import CreateButton from '$lib/components/common/CreateButton.svelte';
	import RowButtons from '$lib/components/common/RowButtons.svelte';
	import TableWrapper from '$lib/components/layout/TableWrapper.svelte';
	import { Collections } from '$lib/consts/db';
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
				<th>Name</th>
				<th>Updated At</th>
				<th><CreateButton slug={'configs'} /> </th>
			</tr>
		</thead>
		<tbody>
			{#each $page.data.data as row, i}
				<tr>
					<th>{i + 1 + paginationSettings.limit * paginationSettings.page}</th>
					<td>{row._id}</td>
					<td>{row.name}</td>
					<td>{row.updatedAt}</td>
					<td>
						<RowButtons entity={Collections.configs} rowId={row._id} />
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="3" />
				<th>Total</th>
				<th>{$page.data.total}</th>
			</tr>
		</tfoot>
	</table>
</TableWrapper>
