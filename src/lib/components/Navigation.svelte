<script lang="ts">
	import { page } from '$app/stores';

	const menus = $page.data.permissions
		.filter((v: any) => v.routes.length > 1)
		.map((v: any) => ({
			name: v._id,
			href: `/${v._id}`
		}));
</script>

<nav class="p-4 list-nav">
	<ul>
		<li>
			<a href={`/users/${$page.data.user._id}`} class="flex-wrap">
				<span class="font-bold text text-secondary-500">{$page.data.user.username}</span>
				<span class="badge variant-outline-primary">{$page.data.user.role}</span>
			</a>
		</li>
		<hr class="my-3" />
		{#each menus as menu}
			<li><a href={menu.href} class="capitalize">{menu.name}</a></li>
		{/each}
		<hr class="my-3" />
		<li>
			<form action="/logout" method="POST" class="w-full">
				<button type="submit" class="w-full">
					<img src="/svg/logout-svgrepo-com.svg" class="mr-2 w-6" alt="logout" />Log out</button
				>
			</form>
		</li>
	</ul>
</nav>
