<script lang="ts">
	import { page } from '$app/stores';
	
</script>

<!-- Responsive Container (recommended) -->
<div class="overflow-auto table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>No.</th>
				<th>ObjectId</th>
				<th>Name</th>
				<th>Updated At</th>
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
					<td>{row.name}</td>
					<td>{row.updatedAt}</td>
					<td>
						<a href={`/configs/${row._id}`} class="btn btn-sm variant-filled">
							<span>Edit</span>
						</a>
						<button type="button" class="btn btn-sm variant-filled-primary">
							<span>Delete</span>
						</button>
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
</div>
