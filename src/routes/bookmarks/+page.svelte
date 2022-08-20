<script lang="ts">
	import { onMount } from 'svelte';

	$: data = [];

	export let isModalOpen: boolean = false;

	export let formTitle: string = '';
	export let formUrl: string = '';
	export let formOperation: string = '';
	export let formId: string;

	onMount(async () => {
		const response = await fetch('/api/bookmarks').then((response) => response.json());
		data = response;
	});

	function openAddForm() {
		isModalOpen = !isModalOpen;
		formOperation = 'Add';
	}

	function openEditForm(title: string, url: string, id: string) {
		isModalOpen = !isModalOpen;
		formTitle = title;
		formUrl = url;
		formId = id;
		formOperation = 'Edit';
	}

	const saveBookmark = async (formEvent) => {
		const formData = new FormData(formEvent.currentTarget);
		const data = {
			title: formData.get('title'),
			url: formData.get('url'),
			id: formId
		};
		// console.log(data);
		fetch('/api/bookmarks', {
			method: formOperation === 'Add' ? 'POST' : 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((response) => response.json())
			.then(async (data) => {
				console.log('Success:', data);
				location.reload();
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		openAddForm();
	};
</script>

<h2 class="d-flex justify-content-center" style="padding: 0.5rem">
	<button class="btn btn-primary" on:click={openAddForm}>Add Bookmark</button>
</h2>

{#if isModalOpen}
	<div class="row">
		<div class="col-md-8 offset-md-2">
			<h3>{formOperation} Bookmark</h3>
			<form on:submit|preventDefault={saveBookmark}>
				<div class="form-group">
					<label for="exampleInputTitle">Title</label>
					<input
						type="text"
						name="title"
						bind:value={formTitle}
						class="form-control"
						id="exampleInputTitle"
						aria-describedby="titleHelp"
						placeholder="Website title"
					/>
					<small id="titleHelp" class="form-text text-muted">This is a required field</small>
				</div>
				<div class="form-group">
					<label for="exampleInputUrl">URL</label>
					<input
						type="text"
						name="url"
						bind:value={formUrl}
						class="form-control"
						id="exampleInputUrl"
						placeholder="www.example.com"
					/>
				</div>
				<button type="submit" class="btn btn-primary">Save</button>
			</form>
		</div>
	</div>
{:else}
	<ul class="list-group">
		{#each data as bookmark}
			<li class="list-group-item d-flex justify-content-between">
				<div class="d-flex flex-column">
					<div class="h3">{bookmark.title}</div>
					<div class="h6">{bookmark.url}</div>
				</div>
				<div>
					<button
						type="button"
						class="btn btn-warning"
						on:click={() => openEditForm(bookmark.title, bookmark.url, bookmark._id)}>EDIT</button
					>
					<button type="button" class="btn btn-danger">DELETE</button>
				</div>
			</li>
		{/each}
	</ul>
{/if}
<!-- Modal -->
