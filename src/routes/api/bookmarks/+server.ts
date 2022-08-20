// // import clientPromise from 'src/lib/mongo-db-client';
// import { MongoClient, ServerApiVersion } from 'mongodb';

import db from '$lib/db';
import { ObjectId } from 'mongodb';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const data = await db.collection('bookmarks').find().toArray();
	return new Response(String(JSON.stringify(data)));
}

export async function POST({ request, setHeaders, url }) {
	const data = await request.json();
	console.log('formdata js log of request : ', data);

	const rsp = await db.collection('bookmarks').insertOne(data);

	return new Response(String(JSON.stringify('bookmark is saved' + JSON.stringify(rsp))));
}

export async function PUT({ request, setHeaders, url }) {
	const data = await request.json();

	// const doc = await db.collection('bookmarks').findOne({_id: data._id});
	const newid = new ObjectId();
	try {
		await db.collection('bookmarks').deleteOne({ _id: data.id });
		const fields = { title: data.title, url: data.url };
		const rsp = await db.collection('bookmarks').insertOne(fields);
		return new Response(String(JSON.stringify('bookmark is saved' + JSON.stringify(rsp))));
	} catch (e) {
		console.error(e);
	}
}
