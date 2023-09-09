import express from 'express';

const app = express();

const logger = (request, response, next) => {
	console.log(new Date(), request.method, request.originalUrl);
	next();
}
app.use(logger);

app.use(express.json());

let personId = 1;
let people = [{
	id: 1,
	name: 'Batman',
	age: 45,
	createdAt: new Date(),
}]

app.get('/', (request, response) => {
	return response.send(people);
});

app.post('/', (request, response) => {
	const person = {
		...request.body,
		id: ++personId,
		createdAt: new Date(),
	};
	people = [...people, person];
	return response.send(person);
});

app.put('/:id', (request, response) => {
	const person = request.body;
	const id = request.params.id;
	people = people.map(p => {
		if (p.id === person.id) {
			return person;
		}
		return p;
	});
	return response.send(person);
});

app.patch('/:id', (request, response) => {
	const person = request.body;
	const id = request.params.id;
	people = people.map(p => {
		if (p.id === person.id) {
			return {
				...p,
				...person,
			}
		}
		return p;
	});
	return response.send(person);
});

app.delete('/:id', (request, response) => {
	const id = request.params.id;
	people = people.filter(p => p.id === id);
	return response.send('deleted');
});

app.listen(1337, () => {
	console.log(new Date(), 'Server started on port 1337');
});