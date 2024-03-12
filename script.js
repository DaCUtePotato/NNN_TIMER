document.addEventListener('DOMContentLoaded', function () {
    let targetDate = new Date();
    targetDate.setMonth(11); // Set the target month to December
    targetDate.setDate(1);   // Set the target day to the 1st
    targetDate.setHours(0, 0, 0, 0);

    let isBackgroundOn = false; // Initial state: background is off
    let backgroundChangeInterval; // Variable to store the interval ID
    let countdown = 2000; // Initial countdown value
    let isCountdownClicked = false;

    function startBackgroundChangeInterval() {
        // Clear the previous interval, if any
        clearInterval(backgroundChangeInterval);

        // Set a new interval with a callback to changeBackground with the current countdown value
        backgroundChangeInterval = setInterval(function () {
            // play transition sound
            playTransitionSound();
            changeBackground(0.2);

            // Fetch a new picture from the Waifu API
            fetchNewWaifu();
        }, countdown);
    }

    document.querySelector('.countdown-container').onclick = function () {
        // Toggle the background change variable
        isBackgroundOn = !isBackgroundOn;

        // Toggle the isCountdownClicked variable
        isCountdownClicked = !isCountdownClicked;

        // play transition sound
        playTransitionSound();

        // Change the background immediately
        changeBackground();

        if (isBackgroundOn && isCountdownClicked) {
            // Clear the previous interval, if any
            clearInterval(backgroundChangeInterval);

            // Set a new interval with a callback to changeBackground with the current countdown value
            backgroundChangeInterval = setInterval(function () {
                // play transition sound
                playTransitionSound();
                changeBackground(0.2);

                // Fetch a new picture from the Waifu API
                fetchNewWaifu();
            }, countdown);

            // Start the countdown immediately after the click
            updateCountdown();
        } else {
            // If the background is off, clear the interval
            clearInterval(backgroundChangeInterval);
        }
    };

    function changeBackground() {
        const apiUrl = 'https://api.waifu.pics/sfw/waifu'; // Fetch images with a minimum width of 1920 pixels
        
        const params = {
            height: '=1920',
            width: '=1080'
          };

        fetch(apiUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch image from Waifu API');
                }
            })
            .then(data => {
                // Extract the image URL from the API response
                const imageUrl = data.url;
    
                // Set the body background image
                document.body.style.backgroundImage = `url('${imageUrl}')`;
                document.body.style.backgroundSize = 'cover'; // Adjusted to cover the screen
    
                // Log the image URL for debugging
                console.log('Changed background to:', imageUrl);
            })
            .catch(error => {
                console.error('An error occurred while fetching image:', error);
            });
    }

    function fetchNewWaifu() {
        const apiUrl = 'https://api.waifu.im/search'; // API endpoint URL for searching waifus
        const params = {
            height: '=2000', // Minimum height of 2000 pixels for widescreen format
            width: '=4000'
        };
    
        const queryParams = new URLSearchParams();
    
        for (const key in params) {
            if (Array.isArray(params[key])) {
                params[key].forEach(value => {
                    queryParams.append(key, value);
                });
            } else {
                queryParams.set(key, params[key]);
            }
        }
    
        const requestUrl = `${apiUrl}?${queryParams.toString()}`;
    
        fetch(requestUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Request failed with status code: ' + response.status);
                }
            })
            .then(data => {
                // Process the response data as needed
                console.log(data);
                // For this example, we're just logging the data
            })
            .catch(error => {
                console.error('An error occurred:', error.message);
            });
    }
    

    function playTransitionSound(volume=0.2) {
        // Create an Audio element
        const audio = new Audio('sounds/transition.mp3');

        audio.volume = volume;

        // Play the audio
        audio.play();
    }

    function updateCountdown() {
        let now = new Date();
        let timeDifference = Math.abs(targetDate - now);
        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        let milliseconds = timeDifference % 1000;

        // Format milliseconds to always have three digits
        milliseconds = milliseconds.toString().padStart(3, '0');

        document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;

        // Request the next animation frame
        requestAnimationFrame(updateCountdown);
    }

    // Initial call to start the animation
    requestAnimationFrame(updateCountdown);

    // Define currentDate before using it in the if condition
    let currentDate = new Date();
    if (currentDate.getMonth() === 11 && currentDate.getDate() === 1) {
        addGoNutsButton(); // Call the function to add the Go Nuts button
    }

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
});
