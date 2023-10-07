<script lang="ts">
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { deleteOne, getMany } from '$lib/api/common';
	import { Collections } from '$lib/consts/db';

	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: $page.data.total,
		amounts: [10, 20]
	} satisfies PaginationSettings;
	const initialCount = $page.data.data.length;
	let display = $page.data.data.slice(paginationSettings.limit);

	$: {
		if (paginationSettings.limit * (paginationSettings.page + 1) > initialCount) {
			(async () => {
				const data = await getMany(
					Collections.routes,
					`sort_by=entity,method&limit=${paginationSettings.limit}&page=${paginationSettings.page}`
				);
				display = data.data;
			})();
		} else {
			display =
				paginationSettings.limit === initialCount
					? $page.data.data
					: $page.data.data.slice(
							paginationSettings.limit * paginationSettings.page,
							paginationSettings.limit
					  );
		}
	}

	const getModal: (selected: string) => ModalSettings = (selected: string) => ({
		type: 'confirm',
		// Data
		title: 'Please Confirm',
		body: `Are you sure you wish to delete the route with ObjectId("${selected}")?`,
		// TRUE if confirm pressed, FALSE if cancel pressed
		response: async (r: boolean) => {
			if (r) {
				await deleteOne(Collections.routes, selected, $page.data.token);
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
				<th>Path</th>
				<th>Entity</th>
				<th>Method</th>
				<th>Access</th>
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
					<td>{row.entity}</td>
					<td>{row.method}</td>
					<td>{row.access}</td>
					<td>
						<a href={`/routes/${row._id}`} class="btn btn-sm variant-filled">
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

<hr class="my-3" />

<Paginator
	bind:settings={paginationSettings}
	showFirstLastButtons={false}
	showPreviousNextButtons={true}
/>
