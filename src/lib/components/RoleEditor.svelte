<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createOne, updateOne } from '$lib/api/common';
	import { Collections } from '$lib/consts/db';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let doc = {
		_id: '',
		name: '',
		level: '',
		active: false
	};

	const create = $page.url.pathname.includes('create');
	let isLoading = false;

	console.log($page.data);

	const handleSubmit = async () => {
		try {
			isLoading = true;
			const payload = {
				name: doc.name,
				level: parseInt(doc.level),
				active: doc.active
			};

			const data = create
				? await createOne(Collections.roles, $page.data.token, payload)
				: await updateOne(Collections.roles, $page.data.token, doc._id, payload);

			if (data.data) {
				goto(`/${Collections.roles}`);
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
					<span>Name</span>
					<input
						class="p-3 input variant-soft"
						type="text"
						name="name"
						placeholder="Name"
						bind:value={doc.name}
					/>
				</label>
				<br />
				<label class="label">
					<span>Level</span>

					<input
						class="p-3 input variant-soft"
						type="text"
						name="level"
						placeholder="level"
						bind:value={doc.level}
					/>
				</label>
				<br />

				<SlideToggle
					name="slider-label"
					size="sm"
					bind:checked={doc.active}
					disabled={create}
					active="bg-surface-300">Active?</SlideToggle
				>
				<hr class="my-6" />
				<button type="submit" class={`w-full btn variant-filled-secondary`} disabled={isLoading}
					>{create ? 'Create' : 'Save'}</button
				>
			</form>
		</div>
	</div>
</div>
