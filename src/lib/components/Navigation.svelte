<script lang="ts">
	const menus = [
		{
			name: 'Configs',
			href: '/configs'
		},
		{
			name: 'Users',
			href: '/users'
		},
		{
			name: 'Roles',
			href: '/roles'
		},
		{
			name: 'Routes',
			href: '/routes'
		},
		{
			name: 'Uploads',
			href: '/uploads'
		}
	];
</script>

<nav class="p-4 list-nav">
	<ul>
		{#each menus as menu}
			<li><a href={menu.href}>{menu.name}</a></li>
		{/each}
		<li>
			<form action="/logout" method="POST" class="w-full">
				<button type="submit">Log out</button>
			</form>
		</li>
	</ul>
</nav>
