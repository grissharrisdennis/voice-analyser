import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => {
        const storedState = localStorage.getItem('authState');
        return storedState ? JSON.parse(storedState) : {
            user: null,
            isAuthenticated: false,
            csrfToken: null,  // Add csrfToken to the state
        }
    },
    actions: {
        async fetchCSRFToken() {
            try {
                const response = await fetch('https://grissharrisdennis.pythonanywhere.com/api/get-csrf-token/', {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                this.csrfToken = data.csrfToken;  // Store CSRF token in state
                this.saveState();
            } catch (error) {
                console.error('Failed to fetch CSRF token', error);
            }
        },

        async login(username, password, router = null) {
            await this.fetchCSRFToken(); // Ensure CSRF token is fetched before making requests
            const response = await fetch('https://grissharrisdennis.pythonanywhere.com/api/login/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.csrfToken,  // Use csrfToken from state
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                this.user = {
                    id: data.user.id,
                    username: data.user.username,
                    email: data.user.email,
                };
                this.isAuthenticated = true;
                this.saveState();
                if (router) {
                    await router.push({ name: 'UserPage', params: { id: data.user.id } });
                }
            } else {
                this.user = null;
                this.isAuthenticated = false;
                this.saveState();
            }
        },

        async logout(router = null) {
            await this.fetchCSRFToken(); // Ensure CSRF token is fetched before making requests
            try {
                const response = await fetch('https://grissharrisdennis.pythonanywhere.com/api/logout/', {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': this.csrfToken,  // Use csrfToken from state
                    },
                    credentials: 'include',
                });
                if (response.ok) {
                    this.user = null;
                    this.isAuthenticated = false;
                    this.saveState();
                    if (router) {
                        await router.push({ name: "UserLogin" });
                    }
                }
            } catch (error) {
                console.error('Logout failed', error);
                throw error;
            }
        },

        async fetchAudioFile(userId) {
            await this.fetchCSRFToken(); // Ensure CSRF token is fetched before making requests
            try {
                const response = await fetch(`https://grissharrisdennis.pythonanywhere.com/api/audiofiles/user/${userId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.csrfToken,  // Use csrfToken from state
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.playlist = data;
            } catch (error) {
                console.error('Error fetching audio file:', error);
            }
        },

        async fetchTranscriptFile(userId) {
            await this.fetchCSRFToken();
            try {
                const response = await fetch(`https://grissharrisdennis.pythonanywhere.com/api/transcriptions/${userId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.csrfToken,
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.transcriptlist = data;
            } catch (error) {
                console.error('Error fetching transcript file:', error);
            }
        },

        async fetchTranscriptWords(transcriptId) {
            await this.fetchCSRFToken();
            try {
                const response = await fetch(`https://grissharrisdennis.pythonanywhere.com/api/word_frequencies/${transcriptId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.csrfToken,
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.wordsList = data;
                console.log('Words list:', JSON.stringify(this.wordsList));
            } catch (error) {
                console.error('Error fetching transcript words:', error);
            }
        },

        async fetchTopUniquePhrases(userId) {
            await this.fetchCSRFToken();
            try {
                const response = await fetch(`https://grissharrisdennis.pythonanywhere.com/api/transcriptions/uphrases/${userId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.csrfToken,
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.uphrases = data;
            } catch (error) {
                console.error('Error fetching unique phrases:', error);
            }
        },

        async fetchUser() {
            await this.fetchCSRFToken();
            try {
                const response = await fetch('https://grissharrisdennis.pythonanywhere.com/api/user/', {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.csrfToken,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    this.user = data;
                    this.isAuthenticated = true;
                } else {
                    this.user = null;
                    this.isAuthenticated = false;
                }
            } catch (error) {
                console.error('Failed to fetch user', error);
                this.user = null;
                this.isAuthenticated = false;
            }
            this.saveState();
        },

        saveState() {
            localStorage.setItem('authState', JSON.stringify({
                user: this.user,
                isAuthenticated: this.isAuthenticated,
                csrfToken: this.csrfToken,  // Save CSRF token to local storage
            }));
        }
    }
});

