<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createOne, updateOne } from '$lib/api/common';
	import { Collections } from '$lib/consts/db';
	import { InputChip } from '@skeletonlabs/skeleton';

	export let doc = {
		_id: '',
		path: '',
		entity: '',
		method: '',
		access: ['root']
	};

	const selectedAccess = $page.data.roles.map((v: any) => ({
		label: v,
		checked: doc.access.includes(v)
	}));

	const create = $page.url.pathname.includes('create');
	let isLoading = false;

	console.log($page.data);

	const handleSubmit = async () => {
		try {
			isLoading = true;
			const payload = {
				path: doc.path,
				entity: doc.entity,
				method: doc.method,
				access: selectedAccess.filter((v: any) => v.checked).map((v: any) => v.label)
			};

			const data = create
				? await createOne(Collections.routes, $page.data.token, payload)
				: await updateOne(Collections.routes, $page.data.token, doc._id, payload);

			if (data.data) {
				goto(`/${Collections.routes}`);
			}
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="flex">
	<div class="m-auto max-w-sm">
		<div class="p-8 shadow-lg card bg-neutral-200">
			<form class="my-6" on:submit={handleSubmit}>
				<label class="label">
					<span>Path</span>
					<input
						class="p-3 input variant-soft"
						type="text"
						name="path"
						placeholder="Path"
						bind:value={doc.path}
					/>
				</label>
				<br />
				<label class="label">
					<span>Entity</span>
					<input
						class="p-3 input variant-soft"
						type="text"
						name="entity"
						placeholder="Entity"
						bind:value={doc.entity}
					/>
				</label>
				<br />
				<label class="label">
					<span>Method</span>
					<input
						class="p-3 input variant-soft"
						type="text"
						name="method"
						placeholder="Method"
						bind:value={doc.method}
					/>
				</label>
				<br />
				<label class="label">
					<span>Access</span>

					<div class="space-y-2">
						{#each selectedAccess as checkbox}
							<label class="flex items-center space-x-2">
								<input
									class="checkbox variant-soft"
									type="checkbox"
									bind:checked={checkbox.checked}
								/>
								<p>{checkbox.label}</p>
							</label>
						{/each}
					</div>
				</label>
				<!-- <input
						class="p-3 input variant-soft"
						type="text"
						name="access"
						placeholder="Access"
						bind:value={doc.access}
					/> -->
				<!-- <InputChip name="access" bind:value={doc.access} whitelist={['root', 'admin']} /> -->

				<hr class="my-6" />
				<button type="submit" class={`w-full btn variant-filled-secondary`} disabled={isLoading}
					>{create ? 'Create' : 'Save'}</button
				>
			</form>
		</div>
	</div>
</div>
