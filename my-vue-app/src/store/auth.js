import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => {
        const storedState = localStorage.getItem('authState')
        return storedState ? JSON.parse(storedState) : {
            user: null,
            isAuthenticated: false,
            token: null,  // Store JWT token here
        }
    },
    actions: {
        async login(username, password, router = null) {
            const response = await fetch('https://grissharrisdennis.pythonanywhere.com/api/token-auth/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            const data = await response.json()
            if (response.ok && data.token) {
                this.user = {
                    id: data.user.id,  // Store the user ID
                    username: data.user.username,
                    email: data.user.email
                }
                this.token = data.token
                this.isAuthenticated = true
                this.saveState()
                if (router) {
                    await router.push({ name: 'UserPage', params: { id: data.user.id } })
                }
            } else {
                this.user = null
                this.isAuthenticated = false
                this.token = null
                this.saveState()
            }
        },

        async logout(router = null) {
            this.user = null
            this.isAuthenticated = false
            this.token = null
            this.saveState()
            if (router) {
                await router.push({ name: "UserLogin" })
            }
        },

        async fetchAudioFile(userId) {
            try {
                const response = await fetch(`https://grissharrisdennis.pythonanywhere.com/api/audiofiles/user/${userId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                this.playlist = data  // Handle the response data
            } catch (error) {
                console.error('Error fetching audio file:', error)
            }
        },

        async fetchTranscriptFile(userId) {
            try {
                const response = await fetch(`https://grissharrisdennis.pythonanywhere.com/api/transcriptions/${userId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                this.transcriptlist = data  // Handle the response data
            } catch (error) {
                console.error('Error fetching transcript file:', error)
            }
        },

        async fetchTranscriptWords(transcriptId) {
            try {
                const response = await fetch(`https://grissharrisdennis.pythonanywhere.com/api/word_frequencies/${transcriptId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                this.wordsList = data  // Handle the response data
            } catch (error) {
                console.error('Error fetching transcript words:', error)
            }
        },

        async fetchTopUniquePhrases(userId) {
            try {
                const response = await fetch(`https://grissharrisdennis.pythonanywhere.com/api/transcriptions/uphrases/${userId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                this.uphrases = data  // Handle the response data
            } catch (error) {
                console.error('Error fetching top unique phrases:', error)
            }
        },

        async fetchUser() {
            try {
                const response = await fetch('https://grissharrisdennis.pythonanywhere.com/api/user/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    this.user = data
                    this.isAuthenticated = true
                } else {
                    this.user = null
                    this.isAuthenticated = false
                    this.token = null
                }
            } catch (error) {
                console.error('Failed to fetch user', error)
                this.user = null
                this.isAuthenticated = false
                this.token = null
            }
            this.saveState()
        },

        saveState() {
            // Save state to local storage to persist it when the user reloads the page.
            localStorage.setItem('authState', JSON.stringify({
                user: this.user,
                isAuthenticated: this.isAuthenticated,
                token: this.token  // Persist the token in local storage
            }))
        }
    }
})


