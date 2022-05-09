export function auth(wallet) {
   return fetch('https://nodeapi.projectx.financial/api/v1/auth/client', {
   //return fetch('http://localhost:3001/api/v1/auth/client', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({wallet_address: wallet })
   })
      .then(data => data.json())
}