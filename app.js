// Configuration
const ADMIN_PASSPHRASE = 'admin123'; // Change this to your secure passphrase
const STORAGE_KEY = 'waitlist_subscribers';
const ADMIN_AUTH_KEY = 'waitlist_admin_auth';

// State management
let subscribers = [];
let isAdminMode = false;

// DOM elements
const waitlistCard = document.getElementById('waitlistCard');
const successCard = document.getElementById('successCard');
const adminPanel = document.getElementById('adminPanel');
const adminLogin = document.getElementById('adminLogin');
const waitlistForm = document.getElementById('waitlistForm');
const adminLoginForm = document.getElementById('adminLoginForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const submitBtn = document.getElementById('submitBtn');
const joinAnotherBtn = document.getElementById('joinAnotherBtn');
const shareLink = document.getElementById('shareLink');
const exportBtn = document.getElementById('exportBtn');
const clearBtn = document.getElementById('clearBtn');
const logoutBtn = document.getElementById('logoutBtn');
const backToWaitlistBtn = document.getElementById('backToWaitlistBtn');
const subscriberCount = document.getElementById('subscriberCount');
const subscriberList = document.getElementById('subscriberList');
const passphraseInput = document.getElementById('passphrase');
const passphraseError = document.getElementById('passphraseError');

/**
 * Initialize the application
 * Check for admin mode via query parameter or stored authentication
 */
function init() {
    loadSubscribers();
    setShareLink();
    
    // Check for admin query parameter (?admin=true)
    const urlParams = new URLSearchParams(window.location.search);
    const isAdminParam = urlParams.get('admin') === 'true';
    
    // Check if admin is already authenticated
    const isAuthenticated = localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    
    if (isAdminParam && !isAuthenticated) {
        showAdminLogin();
    } else if (isAuthenticated) {
        showAdminPanel();
    } else {
        showWaitlistForm();
    }
}

/**
 * Load subscribers from localStorage
 */
function loadSubscribers() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        subscribers = stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading subscribers:', error);
        subscribers = [];
    }
}

/**
 * Save subscribers to localStorage
 */
function saveSubscribers() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
    } catch (error) {
        console.error('Error saving subscribers:', error);
        alert('Failed to save data. Storage might be full.');
    }
}

/**
 * Sanitize user input to prevent XSS
 * Remove any HTML tags and trim whitespace
 */
function sanitizeInput(input) {
    if (!input) return '';
    return input.replace(/[<>]/g, '').trim();
}

/**
 * Validate email format using standard regex
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Check if email already exists in subscribers list
 */
function isDuplicateEmail(email) {
    return subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase());
}

/**
 * Display error message for email input
 */
function showEmailError(message) {
    emailError.textContent = message;
    emailInput.classList.add('error');
    emailInput.setAttribute('aria-invalid', 'true');
}

/**
 * Clear error message for email input
 */
function clearEmailError() {
    emailError.textContent = '';
    emailInput.classList.remove('error');
    emailInput.setAttribute('aria-invalid', 'false');
}

/**
 * Set loading state on submit button
 */
function setButtonLoading(loading) {
    if (loading) {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
    } else {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
}

/**
 * Handle waitlist form submission
 */
waitlistForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearEmailError();
    
    // Get and sanitize input values
    const name = sanitizeInput(nameInput.value);
    const email = sanitizeInput(emailInput.value);
    
    // Validate email is provided
    if (!email) {
        showEmailError('Email is required');
        return;
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
        showEmailError('Please enter a valid email address');
        return;
    }
    
    // Check for duplicate email
    if (isDuplicateEmail(email)) {
        showEmailError('This email is already on the waitlist');
        return;
    }
    
    // Show loading state
    setButtonLoading(true);
    
    // Simulate network delay for better UX
    setTimeout(() => {
        // Create subscriber object
        const subscriber = {
            name: name || 'Anonymous',
            email: email,
            timestamp: new Date().toISOString()
        };
        
        // Add to subscribers array
        subscribers.push(subscriber);
        
        // Save to localStorage
        saveSubscribers();
        
        // Reset form and show success
        waitlistForm.reset();
        setButtonLoading(false);
        showSuccessCard();
    }, 800);
});

/**
 * Show the success card after successful submission
 */
function showSuccessCard() {
    waitlistCard.classList.add('hidden');
    successCard.classList.remove('hidden');
}

/**
 * Show the waitlist form
 */
function showWaitlistForm() {
    successCard.classList.add('hidden');
    adminPanel.classList.add('hidden');
    adminLogin.classList.add('hidden');
    waitlistCard.classList.remove('hidden');
}

/**
 * Show the admin login form
 */
function showAdminLogin() {
    waitlistCard.classList.add('hidden');
    successCard.classList.add('hidden');
    adminPanel.classList.add('hidden');
    adminLogin.classList.remove('hidden');
}

/**
 * Show the admin panel
 */
function showAdminPanel() {
    waitlistCard.classList.add('hidden');
    successCard.classList.add('hidden');
    adminLogin.classList.add('hidden');
    adminPanel.classList.remove('hidden');
    isAdminMode = true;
    
    // Update admin panel with current data
    updateAdminPanel();
}

/**
 * Handle "Join Another Email" button click
 */
joinAnotherBtn.addEventListener('click', showWaitlistForm);

/**
 * Handle "Back to Waitlist" button click
 */
backToWaitlistBtn.addEventListener('click', showWaitlistForm);

/**
 * Set the shareable link in the success card
 */
function setShareLink() {
    const currentUrl = window.location.origin + window.location.pathname;
    shareLink.value = currentUrl;
}

/**
 * Handle admin login form submission
 */
adminLoginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const passphrase = passphraseInput.value;
    
    // Validate passphrase
    if (passphrase === ADMIN_PASSPHRASE) {
        // Set authentication in localStorage
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
        passphraseInput.value = '';
        passphraseError.textContent = '';
        showAdminPanel();
    } else {
        passphraseError.textContent = 'Incorrect passphrase';
    }
});

/**
 * Update admin panel with subscriber data
 */
function updateAdminPanel() {
    // Update subscriber count
    subscriberCount.textContent = subscribers.length;
    
    // Clear and populate subscriber list
    subscriberList.innerHTML = '';
    
    if (subscribers.length === 0) {
        subscriberList.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No subscribers yet</p>';
        return;
    }
    
    // Display subscribers in reverse chronological order (newest first)
    [...subscribers].reverse().forEach(subscriber => {
        const item = document.createElement('div');
        item.className = 'subscriber-item';
        
        const date = new Date(subscriber.timestamp);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        
        item.innerHTML = `
            <div class="subscriber-email">${sanitizeInput(subscriber.email)}</div>
            ${subscriber.name !== 'Anonymous' ? `<div class="subscriber-name">${sanitizeInput(subscriber.name)}</div>` : ''}
            <div class="subscriber-date">${formattedDate}</div>
        `;
        
        subscriberList.appendChild(item);
    });
}

/**
 * Export subscribers as CSV file
 */
exportBtn.addEventListener('click', function() {
    if (subscribers.length === 0) {
        alert('No subscribers to export');
        return;
    }
    
    // Create CSV header
    let csv = 'Name,Email,Timestamp\n';
    
    // Add subscriber data
    subscribers.forEach(subscriber => {
        // Escape commas and quotes in data
        const name = `"${subscriber.name.replace(/"/g, '""')}"`;
        const email = `"${subscriber.email.replace(/"/g, '""')}"`;
        const timestamp = `"${subscriber.timestamp}"`;
        
        csv += `${name},${email},${timestamp}\n`;
    });
    
    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'waitlist.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

/**
 * Clear all subscriber data (with confirmation)
 */
clearBtn.addEventListener('click', function() {
    if (subscribers.length === 0) {
        alert('No data to clear');
        return;
    }
    
    const confirmed = confirm(`Are you sure you want to delete all ${subscribers.length} subscribers? This action cannot be undone.`);
    
    if (confirmed) {
        subscribers = [];
        saveSubscribers();
        updateAdminPanel();
        alert('All subscriber data has been cleared');
    }
});

/**
 * Handle admin logout
 */
logoutBtn.addEventListener('click', function() {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    isAdminMode = false;
    
    // Remove admin query parameter if present
    const url = new URL(window.location);
    url.searchParams.delete('admin');
    window.history.replaceState({}, '', url);
    
    showWaitlistForm();
});

// Initialize the app when DOM is ready
init();
