<script>
	const handleSubmit = async (formEvent) => {
		const formData = new FormData(formEvent.currentTarget);
		const data = {
			email: formData.get('email'),
			password: formData.get('password')
		};

		// Default options are marked with *
		const response = await fetch('/api/login', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		});
		const result = await response.json(); // parses JSON response into native JavaScript objects
		if (result['success']) {
			window.location.replace('/bookmarks');
		}
	};
</script>

<div class="d-flex justify-content-center flex-nowrap">
	<div class="mx-2 p-2" />
	<div class="mx-2 p-2">
		<h1>Welcome to BookWorm</h1>
	</div>
	<div class="mx-2 p-2" />
</div>

<div class="row">
	<div class="col-md-8 offset-md-2">
		<h3>Login or Sign Up</h3>
		<form on:submit|preventDefault={handleSubmit}>
			<div class="form-group">
				<label for="exampleInputEmail1">Email address</label>
				<input
					type="email"
					name="email"
					class="form-control"
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
					placeholder="Enter email"
				/>
				<small id="emailHelp" class="form-text text-muted"
					>We'll never share your email with anyone else.</small
				>
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">Password</label>
				<input
					type="password"
					name="password"
					class="form-control"
					id="exampleInputPassword1"
					placeholder="Password"
				/>
			</div>
			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" id="exampleCheck1" />
				<label class="form-check-label" for="exampleCheck1">Sign me up</label>
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</div>
