document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.color = '#ffeb3b'; // צבע צהוב בעת מעבר עכבר
        });
        link.addEventListener('mouseout', () => {
            link.style.color = '#fff'; // צבע לבן בעת יציאת עכבר
        });
    });

    // פונקציה ליצירת משתמש
    const signupForm = document.querySelector('form[action="signup.html"]');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));

            alert('משתמש נוצר בהצלחה!');
            window.location.href = 'login.html';
        });
    }

    // פונקציה להתחברות
    const loginForm = document.querySelector('form[action="login.html"]');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'index.html';
            } else {
                alert('שם משתמש או סיסמה שגויים');
            }
        });
    }

    // פונקציה להתנתקות
    document.addEventListener('click', (event) => {
        if (event.target.id === 'logout') {
            localStorage.removeItem('loggedIn');
            window.location.href = 'index.html';
        }
    });

    // בדיקה אם המשתמש מחובר
    const loggedIn = localStorage.getItem('loggedIn');
    const navList = document.querySelector('nav ul');
    if (loggedIn === 'true') {
        const level4 = document.createElement('li');
        level4.innerHTML = '<a href="level4.html">רמה 4</a>';
        const level5 = document.createElement('li');
        level5.innerHTML = '<a href="level5.html">רמה 5</a>';
        navList.appendChild(level4);
        navList.appendChild(level5);

        // הסרת כפתורי התחברות ויצירת משתמש
        const signupLink = document.querySelector('nav ul li a[href="signup.html"]');
        const loginLink = document.querySelector('nav ul li a[href="login.html"]');
        if (signupLink) signupLink.parentElement.remove();
        if (loginLink) loginLink.parentElement.remove();

        // הוספת כפתור התנתקות
        const logout = document.createElement('li');
        logout.innerHTML = '<a href="#" id="logout">התנתקות</a>';
        navList.appendChild(logout);
    }
});