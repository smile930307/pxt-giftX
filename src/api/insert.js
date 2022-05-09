export function insertOrder(token, order) {
	return fetch('https://nodeapi.projectx.financial/api/v1/gift/create', {
	//return fetch('http://localhost:3001/api/v1/gift/create', {
		method: 'post',
		headers: new Headers({
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify(order)
	}).then(data => data.json())
}