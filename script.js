document.addEventListener('DOMContentLoaded', function () {
    let now = new Date();
    let targetDate;

    if (now.getUTCMonth() === 10) { // Check UTC month for November
        targetDate = new Date(Date.UTC(now.getUTCFullYear(), 10, 30)); // Set target to November 30 UTC
    } else {
        targetDate = new Date(Date.UTC(now.getUTCFullYear(), 10, 1)); // Set target to November 1 UTC
    }

    targetDate.setUTCHours(0, 0, 0, 0); // Reset time to midnight in UTC


    let isBackgroundOn = false;
    let backgroundChangeInterval;
    let countdown = 2000;
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
        const apiUrl = 'https://api.waifu.im/search'; // Correct Waifu API URL
        
        const params = {
            height: '<=2000',
            width: '>=3000'
        };

        // Fetch images from the Waifu API
        fetch(apiUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch image from Waifu API');
                }
            })
            .then(data => {
                if (data.images && data.images.length > 0) {
                    // Extract the first image URL from the API response
                    const imageUrl = data.images[0].url;
    
                    // Set the body background image
                    document.body.style.backgroundImage = `url('${imageUrl}')`;
                    document.body.style.backgroundSize = 'cover'; // Adjusted to cover the screen
    
                    // Log the image URL for debugging
                    console.log('Changed background to:', imageUrl);
                }
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
            queryParams.set(key, params[key]);
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
                console.log(data);
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
        let timeDifference = targetDate - now;
        if (timeDifference < 0) {
            // If we've passed the target date, stop updating
            document.getElementById('countdown').innerHTML = "Time's up!";
            return;
        }

        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        let milliseconds = timeDifference % 1000;

        milliseconds = milliseconds.toString().padStart(3, '0');

        document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;

        requestAnimationFrame(updateCountdown);
    }

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
