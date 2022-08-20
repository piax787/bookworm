<script>
	import '../app.css';
	import Footer from '../components/footer.svelte';
	import Nav from '../components/nav.svelte';
</script>

<div class="container">
	<Nav />
	<slot />
	<Footer />
</div>
