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
				<th>Username</th>
				<th>Role</th>
				<th>Active</th>
				<th>Created At</th>
				<th><CreateButton slug={'users'} /> </th>
			</tr>
		</thead>
		<tbody>
			{#each $page.data.data as row, i}
				<tr>
					<th>{i + 1 + paginationSettings.limit * paginationSettings.page}</th>
					<td>{row._id}</td>
					<td>{row.username}</td>
					<td>{row.role}</td>
					<td>
						<span
							class={`badge ${row.active ? 'variant-filled-secondary' : 'variant-filled-primary'}`}
							>{row.active}</span
						>
					</td>
					<td>{row.createdAt}</td>
					<td>
						<RowButtons entity={Collections.users} rowId={row._id} />
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="5" />
				<th>Total</th>
				<th>{$page.data.total}</th>
			</tr>
		</tfoot>
	</table>
</TableWrapper>
