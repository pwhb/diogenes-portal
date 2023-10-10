<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import CreateButton from '$lib/components/common/CreateButton.svelte';
	import Preview from '$lib/components/common/Preview.svelte';
	import RowButtons from '$lib/components/common/RowButtons.svelte';
	import TableWrapper from '$lib/components/layout/TableWrapper.svelte';
	import { Collections } from '$lib/consts/db';
	import { formatBytes } from '$lib/helpers/parser';
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
	<table class="table overflow-auto table-hover">
		<thead>
			<tr>
				<th>No.</th>
				<th>ObjectId</th>
				<th class="w-12">Key</th>
				<th>Content-Type</th>
				<th>Size</th>
				<th>Preview</th>
				<th>Created At</th>
				<th><CreateButton slug={'uploads'} /> </th>
			</tr>
		</thead>
		<tbody>
			{#each $page.data.data as row, i}
				<tr>
					<th>{i + 1}</th>
					<td><a href={`${PUBLIC_BACKEND_URL}/api/v1/uploads/${row._id}`}>{row._id}</a></td>
					<td>{row.Key}</td>
					<td>{row.ContentType}</td>
					<td>{formatBytes(row.Size)}</td>
					<td
						><Preview
							src={`${PUBLIC_BACKEND_URL}/api/v1/uploads/${row._id}`}
							contentType={row.ContentType}
							name={row.Key}
						/></td
					>
					<td>{row.createdAt}</td>
					<td>
						<RowButtons entity={Collections.uploads} rowId={row._id} />
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="6" />
				<th>Total</th>
				<th>{$page.data.total}</th>
			</tr>
		</tfoot>
	</table>
</TableWrapper>
