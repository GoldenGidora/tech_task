export default class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    getUsers(index = 1, previousResponse = []) {
        return fetch(`${this._baseUrl}?page=${index}`)
            .then(res => res.json())
            .then(newRes => {
                const response = [...previousResponse, ...newRes.data];

                if (newRes.data.length !== 0) {
                    index++;

                    return this.getUsers(index, response)
                }

                return response;
            })
    }
}
