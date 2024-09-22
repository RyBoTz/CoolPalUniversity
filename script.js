$(document).ready(function() {
    // Function to load accounts from localStorage or initialize with defaults
    function loadAccounts() {
        const accountsJSON = localStorage.getItem('accounts');
        return accountsJSON ? JSON.parse(accountsJSON) : [
            { username: 'user1', password: 'password1' },
            { username: 'user2', password: 'password2' },
        ];
    }

    // Function to save accounts to localStorage
    function saveAccounts(accounts) {
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }

    // Login function
    $('.login-form').on('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const username = $(this).find('input[type="text"]').val();
        const password = $(this).find('input[type="password"]').val();

        const accounts = loadAccounts();
        const account = accounts.find(acc => acc.username === username && acc.password === password);

        if (account) {
            window.location.href = 'acs.html'; // Navigate to acs.html in the current tab
        } else {
            alert('Invalid credentials'); // Handle failed login
        }
    });

    // Registration function
    $('.register-form').on('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const username = $(this).find('input[type="text"]').val();
        const password = $(this).find('input[type="password"]').val();
        const email = $(this).find('input[type="email"]').val();

        const accounts = loadAccounts();
        const existingAccount = accounts.find(acc => acc.username === username);

        if (existingAccount) {
            alert('Username already exists. Please choose a different one.');
        } else {
            accounts.push({ username, password, email });
            saveAccounts(accounts);
            alert('Registration successful! You can now log in.');
            $('.register-form').toggle(); // Hide register form
            $('.login-form').toggle(); // Show login form
        }
    });

    // Toggle between forms
    $('.message a').click(function(event) {
        event.preventDefault(); // Prevent default anchor click behavior
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    });

    // Update active nav link on scroll
    $(window).on('scroll', function() {
        const scrollPosition = $(this).scrollTop();

        $('section').each(function() {
            const sectionOffset = $(this).offset().top;
            const sectionHeight = $(this).outerHeight();

            if (scrollPosition >= sectionOffset && scrollPosition < sectionOffset + sectionHeight) {
                const id = $(this).attr('id');
                $('nav a').removeClass('active');
                $('nav a[href="#' + id + '"]').addClass('active');
            }
        });
    });
});
