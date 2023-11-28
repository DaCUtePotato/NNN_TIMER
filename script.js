document.addEventListener('DOMContentLoaded', function () {
    let targetDate = new Date();
    targetDate.setMonth(11); // Set the target month to December
    targetDate.setDate(1);   // Set the target day to the 1st
    targetDate.setHours(0, 0, 0, 0);

    let isBackgroundOn = false; // Initial state: background is off
    let backgroundChangeInterval; // Variable to store the interval ID
    let countdown = 2000; // Initial countdown value

    function addGoNutsButton() {
        const existingButton = document.getElementById('goNutsButton');
        if (!existingButton) {
            const button = document.createElement('a');
            button.id = 'goNutsButton';
            button.innerText = 'Go Nuts';
            button.href = 'incognito.html';
            button.style.textDecoration = 'none'; // Remove default link underline
            button.addEventListener('click', function (event) {
                // Open the link in a new tab using window.open
                window.open('incognito.html', '_blank');
                // Prevent the default behavior of the link
                event.preventDefault();
            });

            const container = document.createElement('div');
            container.className = 'button-container';
            container.appendChild(button);

            document.body.appendChild(container);
        }
    }

    addGoNutsButton(); // Call the function to add the Go Nuts button

    document.querySelector('.countdown-container').onclick = function () {
        // Toggle the background change variable
        isBackgroundOn = !isBackgroundOn;

        // Change the background immediately
        changeBackground();

        if (isBackgroundOn) {
            // Clear the previous interval, if any
            clearInterval(backgroundChangeInterval);

            // Log just before setting the interval
            console.log("Setting up the interval...");

            // Set a new interval with a callback to changeBackground with the current countdown value
            backgroundChangeInterval = setInterval(function () {
                console.log("Inside setInterval"); // Check if this log is printed
                changeBackground();
                console.log("The image should have changed by now…");
            }, countdown);
        } else {
            // If the background is off, clear the interval
            clearInterval(backgroundChangeInterval);
        }
    };

    function changeBackground() {
        // Generate a random number from 1 to 7 for the image path
        let randomImageNumber = Math.floor(Math.random() * 7) + 1;

        // Construct the image path
        let imagePath = `img/Hintergrund${randomImageNumber}.jpg`;

        // Set the body background image
        document.body.style.backgroundImage = `url('${imagePath}')`;

        // Log the image path for debugging
        console.log('Changed background to:', imagePath);
    }

    setInterval(function () {
        let now = new Date();
        let timeDifference = Math.abs(targetDate - now);
        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        let milliseconds = timeDifference % 1000;

        document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
    });
});
