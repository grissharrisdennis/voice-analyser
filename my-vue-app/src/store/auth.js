import { defineStore } from 'pinia';

// Define the authentication store using Pinia
export const useAuthStore = defineStore('auth', {
    state: () => {
        // Retrieve the stored state from localStorage or set default values
        const storedState = localStorage.getItem('authState');
        return storedState ? JSON.parse(storedState) : {
            user: null,
            isAuthenticated: false,
            csrfToken: null // Store CSRF token in state
        };
    },
    actions: {
        // Set CSRF token from the backend
        async setCsrfToken() {
            try {
                const response = await fetch('https://grissharrisdennis.pythonanywhere.com/api/set-csrf-token/', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    this.csrfToken = data.csrfToken; // Assume the backend returns a JSON object with csrfToken
                    localStorage.setItem('csrfToken', this.csrfToken); // Store CSRF token in local storage
                } else {
                    throw new Error('Failed to set CSRF token');
                }
            } catch (error) {
                console.error('Error setting CSRF token:', error);
            }
        },

        // User login function
        async login(username, password, router = null) {
            await this.setCsrfToken(); // Ensure the CSRF token is set before login
            const response = await fetch('https://grissharrisdennis.pythonanywhere.com/api/login/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.csrfToken // Use the CSRF token stored in state
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                this.user = {
                    id: data.user.id,
                    username: data.user.username,
                    email: data.user.email
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

        // User logout function
        async logout(router = null) {
            try {
                const response = await fetch('https://grissharrisdennis.pythonanywhere.com/api/logout/', {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': this.csrfToken // Use the stored CSRF token
                    },
                    credentials: 'include'
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

        // Fetch audio files associated with a user
        async fetchAudioFile(userId) {
            try {
                const response = await fetch(`https://grissharrisdennis.pythonanywhere.com/api/audiofiles/user/${userId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.csrfToken // Use the stored CSRF token
                    },
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.playlist = data;  // Handle the response data
            } catch (error) {
                console.error('Error fetching audio file:', error);
            }
        },

        // Fetch transcript files associated with a user
        async fetchTranscriptFile(userId) {
            try {
                const response = await fetch(`https://grissharrisdennis.pythonanywhere.com/api/transcriptions/${userId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.csrfToken // Use the stored CSRF token
                    },
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.transcriptlist = data;  // Handle the response data
            } catch (error) {
                console.error('Error fetching transcript file:', error);
            }
        },

        // Fetch word frequencies for a given transcript
        async fetchTranscriptWords(transcriptId) {
            try {
                const response = await fetch(`https://grissharrisdennis.pythonanywhere.com/api/word_frequencies/${transcriptId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.csrfToken // Use the stored CSRF token
                    },
                    credentials: 'include'
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

        // Fetch top unique phrases associated with a user
        async fetchTopUniquePhrases(userId) {
            try {
                const response = await fetch(`https://grissharrisdennis.pythonanywhere.com/api/transcriptions/uphrases/${userId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.csrfToken // Use the stored CSRF token
                    },
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.uphrases = data;  // Handle the response data
            } catch (error) {
                console.error('Error fetching transcript file:', error);
            }
        },

        // Fetch the current authenticated user
        async fetchUser() {
            try {
                const response = await fetch('https://grissharrisdennis.pythonanywhere.com/api/user/', {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.csrfToken // Use the stored CSRF token
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

        // Save the state to local storage
        saveState() {
            localStorage.setItem('authState', JSON.stringify({
                user: this.user,
                isAuthenticated: this.isAuthenticated,
                csrfToken: this.csrfToken // Save CSRF token to state
            }));
        }
    }
});
