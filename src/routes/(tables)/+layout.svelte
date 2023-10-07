<script lang="ts">
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { Modal } from '@skeletonlabs/skeleton';
	
	initializeStores();
	const drawerStore = getDrawerStore();
	function drawerOpen(): void {
		drawerStore.open({});
	}
</script>

<Modal />
<Drawer width="xl">
	<Navigation />
</Drawer>
<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="mr-4 lg:hidden btn btn-sm" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="w-4 h-4 fill-token">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<strong class="text-xl uppercase">Diogenes</strong>
				</div></svelte:fragment
			>
			<!-- (title)
			<svelte:fragment slot="trail">(actions)</svelte:fragment> -->
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- Router Slot -->
	<div class="p-2 md:p-6">
		<Breadcrumbs />
		<hr class="my-2" />
		<!-- Responsive Container (recommended) -->
		<slot />
	</div>

	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
