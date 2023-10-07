<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { deleteOne } from '$lib/api/common';
	import { Collections } from '$lib/consts/db';

	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	const getModal: (selected: string) => ModalSettings = (selected: string) => ({
		type: 'confirm',
		// Data
		title: 'Please Confirm',
		body: `Are you sure you wish to delete the role with ObjectId("${selected}")?`,
		// TRUE if confirm pressed, FALSE if cancel pressed
		response: async (r: boolean) => {
			if (r) {
				await deleteOne(Collections.roles, selected, $page.data.token);
				await invalidateAll();
			}
		}
	});
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
				<th>Level</th>
				<th>Active</th>
				<th>Created At</th>
				<th
					><a href="/roles/create" class="btn btn-sm variant-filled-secondary">
						<span>Create</span>
					</a>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each $page.data.data as row, i}
				<tr>
					<th>{i + 1}</th>
					<td>{row._id}</td>
					<td>{row.name}</td>
					<td>{row.level}</td>
					<td>
						<span
							class={`badge ${row.active ? 'variant-filled-secondary' : 'variant-filled-primary'}`}
							>{row.active}</span
						>
					</td>
					<td>{row.createdAt}</td>
					<td>
						<a href={`/roles/${row._id}`} class="btn btn-sm variant-filled">
							<span>Edit</span>
						</a>
						<button
							type="button"
							class="btn btn-sm variant-filled-primary"
							on:click={() => {
								modalStore.trigger(getModal(row._id));
							}}
						>
							<span>Delete</span>
						</button>
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
