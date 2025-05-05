// User Authentication
class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.user = null;
        this.checkAuth();
    }

    async login(email, password) {
        try {
            // In a real application, this would be an API call
            if (email && password) {
                this.user = {
                    email,
                    name: email.split('@')[0],
                    token: 'dummy-token-' + Math.random().toString(36).substr(2)
                };
                this.isAuthenticated = true;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.updateUI();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    }

    logout() {
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('user');
        this.updateUI();
    }

    checkAuth() {
        const user = localStorage.getItem('user');
        if (user) {
            this.user = JSON.parse(user);
            this.isAuthenticated = true;
            this.updateUI();
        }
    }

    updateUI() {
        const authButtons = document.querySelector('.auth-buttons');
        const userMenu = document.querySelector('.user-menu');
        
        if (this.isAuthenticated) {
            authButtons.style.display = 'none';
            userMenu.style.display = 'flex';
            document.querySelector('.user-name').textContent = this.user.name;
        } else {
            authButtons.style.display = 'flex';
            userMenu.style.display = 'none';
        }
    }
}

// Initialize auth
const auth = new Auth();

// Login form handling
const loginForm = document.querySelector('.login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        
        const success = await auth.login(email, password);
        if (success) {
            window.location.href = '/';
        } else {
            alert('Invalid credentials');
        }
    });
}

// Logout handling
const logoutButton = document.querySelector('.logout-btn');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        auth.logout();
        window.location.href = '/';
    });
} 