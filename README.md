# GuideUsers
A fully functional, static waitlist application that can be deployed to any static hosting platform (Netlify, Vercel, GitHub Pages, etc.). No backend required - all data is stored locally in the browser.

## Features

- ✅ Responsive, accessible UI with microanimations
- ✅ Client-side email validation
- ✅ Duplicate email detection
- ✅ LocalStorage persistence
- ✅ Admin panel with passphrase protection
- ✅ CSV export functionality
- ✅ Input sanitization for security
- ✅ Success states and loading indicators
- ✅ No external dependencies or CDNs

## Files Included

- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `app.js` - Application logic and functionality
- `README.md` - Documentation (this file)

## Installation & Deployment

### Local Testing

1. Download all four files to a folder
2. Open `index.html` in a web browser
3. That's it! No build process needed.

### Deploy to Netlify

1. Create a new folder with all four files
2. Drag and drop the folder onto [Netlify Drop](https://app.netlify.com/drop)
3. Your site is live!

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to your project folder
3. Run: `vercel --prod`
4. Follow the prompts

### Deploy to GitHub Pages

1. Create a new GitHub repository
2. Upload all four files to the repository
3. Go to Settings → Pages
4. Select your branch and root folder
5. Save and your site will be live in minutes

### Deploy to any Static Host

Simply upload all files to your hosting provider's public directory. No special configuration needed.

## Admin Access

The admin panel allows you to view all subscribers and export them as CSV.

### Access Admin Panel

1. Add `?admin=true` to your URL (e.g., `https://yoursite.com?admin=true`)
2. Enter the passphrase (default: `admin123`)
3. You'll be automatically logged in on future visits

### Change Admin Passphrase

Open `app.js` and modify line 2:
```javascript
const ADMIN_PASSPHRASE = 'your-secure-passphrase-here';
```

**Important:** Change this before deploying to production!

### Admin Features

- View total subscriber count
- See all subscribers with timestamps
- Export subscribers as CSV
- Clear all data (with confirmation)
- Logout to return to waitlist

## Manual Testing Checklist

### Basic Functionality Tests

- [ ] **Page loads correctly** - No console errors, all elements visible
- [ ] **Form validation works**
  - [ ] Submit empty form → "Email is required" error appears
  - [ ] Enter invalid email (e.g., "test") → "Please enter a valid email address" error
  - [ ] Enter valid email → Form submits successfully
- [ ] **Duplicate detection works**
  - [ ] Submit same email twice → "This email is already on the waitlist" error
- [ ] **Success state displays**
  - [ ] After submission, success card appears with checkmark
  - [ ] Share link is populated with current URL
  - [ ] "Join Another Email" button returns to form
- [ ] **Optional name field works**
  - [ ] Submit without name → Saved as "Anonymous"
  - [ ] Submit with name → Name is saved correctly

### Admin Panel Tests

- [ ] **Admin access works**
  - [ ] Visit `/?admin=true` → Login form appears
  - [ ] Enter wrong passphrase → Error message shown
  - [ ] Enter correct passphrase → Admin panel appears
- [ ] **Admin panel displays data**
  - [ ] Subscriber count is accurate
  - [ ] All subscribers are listed with correct details
  - [ ] Timestamps are formatted correctly
- [ ] **Export CSV works**
  - [ ] Click "Export CSV" → `waitlist.csv` file downloads
  - [ ] Open CSV → Data is correctly formatted with headers
  - [ ] Special characters and commas are properly escaped
- [ ] **Clear data works**
  - [ ] Click "Clear All Data" → Confirmation prompt appears
  - [ ] Confirm → All data is deleted, count shows 0
  - [ ] Cancel → Data remains unchanged
- [ ] **Logout works**
  - [ ] Click "Logout" → Returns to waitlist form
  - [ ] Revisit page → Admin panel is not shown (must login again)

### Responsive Design Tests

- [ ] **Mobile (< 640px)**
  - [ ] Layout is single column
  - [ ] Buttons stack vertically
  - [ ] Text is readable
- [ ] **Tablet (640px - 1024px)**
  - [ ] Card width is constrained
  - [ ] Form elements are properly sized
- [ ] **Desktop (> 1024px)**
  - [ ] Card is centered
  - [ ] All spacing looks correct

### Accessibility Tests

- [ ] **Keyboard navigation**
  - [ ] Tab through form fields in correct order
  - [ ] Enter key submits form
  - [ ] All interactive elements are focusable
- [ ] **Screen reader compatibility**
  - [ ] Error messages are announced
  - [ ] Required fields are indicated
  - [ ] Success state is announced

### Browser Testing

Test in at least two browsers:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if on Mac)

### Data Persistence Tests

- [ ] Submit an email → Refresh page → Visit `/?admin=true` → Data is still there
- [ ] Clear browser localStorage → Refresh → Count shows 0

## Security Notes

1. **Change the default passphrase** before deploying
2. Input sanitization is applied to prevent XSS attacks
3. No external scripts or CDNs are used
4. All data is stored locally in the user's browser
5. Admin authentication persists in localStorage until logout

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Storage Limitations

- Data is stored in localStorage (typically 5-10MB limit)
- Can store approximately 50,000+ email addresses before hitting limits
- No data is sent to any server

## Customization

### Change Colors

Edit the CSS variables in `styles.css` (lines 10-18):
```css
:root {
    --primary-
