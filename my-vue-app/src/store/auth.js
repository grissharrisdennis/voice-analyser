import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => {
        const storedState = localStorage.getItem('authState')
        return storedState ? JSON.parse(storedState) : {
            user: null,
            isAuthenticated: false
        }
    },
    actions: {
        async setCsrfToken() {
            await fetch('https://GrissHarrisDennis.pythonanywhere.com/api/set-csrf-token', {
                method: 'GET',
                credentials: 'include'
            })
        },

        async login(username, password, router=null) {
            const response = await fetch('https://GrissHarrisDennis.pythonanywhere.com/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken()
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            })
            const data = await response.json()
            if (data.success) {
                this.user = {
                    id: data.user.id,  // Store the user ID
                    username: data.user.username,
                    email: data.user.email
                };
                this.isAuthenticated = true
                this.saveState()
                if (router){
                    await router.push({ name: 'UserPage', params: { id: data.user.id } });
                }
            } else {
                this.user = null
                this.isAuthenticated = false
                this.saveState()
            }
        },

        async logout(router=null) {
            try {
                const response = await fetch('https://GrissHarrisDennis.pythonanywhere.com/api/logout/', {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': getCSRFToken()
                    },
                    credentials: 'include'
                })
                if (response.ok) {
                    this.user = null
                    this.isAuthenticated = false
                    this.saveState()
                    if (router){
                        await router.push({name: "UserLogin"})
                    }
                }
            } catch (error) {
                console.error('Logout failed', error)
                throw error
            }
        },
        async fetchAudioFile(userId) {
            const csrfToken = getCSRFToken();
            console.log('CSRF Token:', csrfToken);
            try {
                const response = await fetch(`https://GrissHarrisDennis.pythonanywhere.com/api/audiofiles/user/${userId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
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
        async fetchTranscriptFile(userId) {
            const csrfToken = getCSRFToken();
            console.log('CSRF Token:', csrfToken);
            try {
                const response = await fetch(`https://GrissHarrisDennis.pythonanywhere.com/api/transcriptions/${userId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
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
        async fetchTranscriptWords(transcriptId) {
            const csrfToken = getCSRFToken();
            console.log('CSRF Token:', csrfToken);
            try {
              const response = await fetch(`https://GrissHarrisDennis.pythonanywhere.com/api/word_frequencies/${transcriptId}/`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': csrfToken
                },
                credentials: 'include'
              });
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              this.wordsList = data; 
              console.log('Words list:', JSON.stringify(this.wordsList));
// Handle the response data
            } catch (error) {
              console.error('Error fetching transcript words:', error);
            }
          },
          async fetchTopUniquePhrases(userId) {
            const csrfToken = getCSRFToken();
            console.log('CSRF Token:', csrfToken);
            try {
                const response = await fetch(`https://GrissHarrisDennis.pythonanywhere.com/api/transcriptions/uphrases/${userId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
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
        async fetchUser() {
            try {
                const response = await fetch('https://GrissHarrisDennis.pythonanywhere.com/api/user/', {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken()
                    },
                })
                if (response.ok) {
                    const data = await response.json()
                    this.user = data
                    this.isAuthenticated = true
                }
                else{
                    this.user = null
                    this.isAuthenticated = false
                }
            } catch (error) {
                console.error('Failed to fetch user', error)
                this.user = null
                this.isAuthenticated = false
            }
            this.saveState()
        },

        saveState() {
            /*
            We save state to local storage to keep the
            state when the user reloads the page.

            This is a simple way to persist state. For a more robust solution,
            use pinia-persistent-state.
             */
            localStorage.setItem('authState', JSON.stringify({
                user: this.user,
                history:this.history,
                isAuthenticated: this.isAuthenticated
            }))
        }
    }
})

export function getCSRFToken() {
    /*
    We get the CSRF token from the cookie to include in our requests.
    This is necessary for CSRF protection in Django.
     */
    const name = 'csrftoken';
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    if (cookieValue === null) {
        throw 'Missing CSRF cookie.'
    }
    return cookieValue;
}

