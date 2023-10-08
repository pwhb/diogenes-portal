<script lang="ts">
	import { page } from '$app/stores';
	import RowButtons from '$lib/components/RowButtons.svelte';
	import { Collections } from '$lib/consts/db';
</script>

<!-- Responsive Container (recommended) -->
<div class="overflow-auto table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>No.</th>
				<th>ObjectId</th>
				<th>Username</th>
				<th>Role</th>
				<th>Active</th>
				<th>Created At</th>
				<th
					><button type="button" class="btn btn-sm variant-filled-secondary">
						<span>Create</span>
					</button>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each $page.data.data as row, i}
				<tr>
					<th>{i + 1}</th>
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
</div>
