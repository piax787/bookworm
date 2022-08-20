/** @type {import('./$types').RequestHandler} */
export async function POST({ url }) {
	return new Response(String(JSON.stringify({ success: true })));
}
