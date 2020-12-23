const apiBase = process.env.NODE_ENV ==='production' ? `/api/` : `${process.env.REACT_APP_BASE_URL}/api/`

export default {
    async get(path) {
        return new Promise<Response>((resolve, reject) => {
            return fetch(`${apiBase}${path}`).then(async response => {
                    if (response.status === 403) {
                        console.log(' response was 403')
                        reject()
                    }
                    else if (response.status === 401) {
                        console.log(' response was 401')
                        const { url } = await response.json()
                        window.location = url
                        reject()
                    } else {
                        resolve(response)
                    }                    
                }).catch(console.log)
        })
    },
    async post(path, body) {
        return new Promise<Response>((resolve, reject) => {
            return fetch(`${apiBase}${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(async response => {
                if (response.status === 403) {
                    reject()
                } else if (response.status === 401) {
                    const { url } = await response.json()
                    window.location = url
                    reject()
                } else {
                    resolve(response)
                }
            }).catch(console.log)
        })
    },
    async put(path, body) {
        return new Promise<Response>((resolve, reject) => {
            return fetch(`${apiBase}${path}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(async response => {
                if (response.status === 403) {
                    reject()
                } else if (response.status === 401) {
                    const { url } = await response.json()
                    window.location = url
                    reject()
                } else {
                    resolve(response)
                }
            }).catch(console.log)
        })
    },
    async delete(path) {
        return new Promise<Response>((resolve, reject) => {
            return fetch(`${apiBase}${path}`, { method: 'DELETE' }).then(async response => {
                if (response.status === 403) {
                    reject()
                }
                else if (response.status === 401) {
                    const { url } = await response.json()
                    window.location = url
                    reject()
                } else {
                    resolve(response)
                }
            }).catch(console.log)
        })
    }
}