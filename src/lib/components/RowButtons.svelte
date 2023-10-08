<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { deleteOne } from '$lib/api/common';

	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	export let rowId: string;
	export let entity: string;
	export let onDelete: any = () => {};

	const modalStore = getModalStore();

	const getModal: (selected: string) => ModalSettings = (selected: string) => ({
		type: 'confirm',
		// Data
		title: 'Please Confirm',
		body: `Are you sure you wish to delete the row with ObjectId("${selected}")?`,
		// TRUE if confirm pressed, FALSE if cancel pressed
		response: async (r: boolean) => {
			if (r) {
				await deleteOne(entity, selected, $page.data.token);
				await invalidateAll();
				await onDelete();
			}
		}
	});

	const { routes } = $page.data.permissions.filter((v: any) => v._id === entity)[0];
	const editAllowed = routes.some((v: any) => v.method === 'PATCH');
	const viewAllowed = routes.some((v: any) => v.method === 'GET' && v.path === `${entity}/:id`);
	const deleteAllowed = routes.some((v: any) => v.method === 'DELETE');
</script>

<div class="flex flex-nowrap gap-1">
	{#if editAllowed}
		<a href={`/${entity}/${rowId}`} class="btn btn-sm variant-filled">
			<span>Edit</span>
		</a>
	{:else if viewAllowed}
		<a href={`/${entity}/${rowId}`} class="text-white bg-teal-600 btn btn-sm">
			<span>View</span>
		</a>
	{/if}
	{#if deleteAllowed}
		<button
			type="button"
			class="btn btn-sm variant-filled-primary"
			on:click={() => {
				modalStore.trigger(getModal(rowId));
			}}
		>
			<span>Delete</span>
		</button>
	{/if}
</div>
