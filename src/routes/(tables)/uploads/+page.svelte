<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import Preview from '$lib/components/Preview.svelte';
	import RowButtons from '$lib/components/RowButtons.svelte';
	import { Collections } from '$lib/consts/db';
	import { formatBytes } from '$lib/helpers/parser';
</script>

<!-- Responsive Container (recommended) -->
<div class="overflow-auto table-container">
	<!-- Native Table Element -->
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
				<th
					><a href="/uploads/create" class="btn btn-sm variant-filled-secondary">
						<span>Create</span>
					</a>
				</th>
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
</div>
