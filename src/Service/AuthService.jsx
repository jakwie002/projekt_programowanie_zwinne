import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

class AuthService {
    static async register(user) {
        try {
            const response = await instance.post('/register', user)
            return response.data
        } catch (error) {
            console.error(error)
            return null
        }
    }

    static async login(email, password) {
        const student = {email, password}

        try {
            const response = await instance.post('/login', student)
            if (response.data.token) {
                console.log("@@@@@"+response.data.role_id)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('role_id', response.data.role_id) // konwersja na string JSON
            }
            return response.data
        } catch (error) {
            console.error(error)
            return null
        }
    }

    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role_id')
    }


}

export default AuthService
