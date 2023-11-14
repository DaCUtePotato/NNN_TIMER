document.addEventListener('DOMContentLoaded', function () {
    let targetDate = new Date();
    targetDate.setMonth(10);
    targetDate.setDate(1);
    targetDate.setHours(0, 0, 0, 0);

    let currentDate = new Date();
    if (currentDate.getMonth() === 10) {
        targetDate.setMonth(11);
    }

    function updateCountdown() {
        let now = new Date();
        let timeDifference = targetDate - now;

        if (timeDifference <= 0) {
            // Countdown has reached 0, open the "incognito.html" file in a new incognito window
            chrome.runtime.sendMessage({ openIncognito: true });
            clearInterval(intervalId); // Stop the interval
            return;
        }

        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        let milliseconds = Math.floor(timeDifference % 1000);

        // Format the milliseconds to have at least 3 digits
        milliseconds = milliseconds.toString().padStart(3, '0');

        document.getElementById('countdown').innerHTML = `${days-1}d ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
    }

    // Initial call to set the countdown
    updateCountdown();

    // Set up the interval to update the countdown every millisecond
    let intervalId = setInterval(updateCountdown, 1);

    // Add an event listener to the overlay container
    document.querySelector('.overlay-container').addEventListener('click', function () {
        // Change the background of the site to an image
        document.body.style.backgroundImage = url("https://github.com/DaCUtePotato/blob/main/background.jpeg");
        document.body.style.backgroundSize = 'cover'; // Adjust to your needs
        document.body.style.zIndex = '-1'; // Set a lower z-index for the background
    
        // Play a sound (replace 'sound.mp3' with the path to your sound file)
        let audio = new Audio('https://github.com/DaCUtePotato/blob/main/sound.mp3');
        audio.loop = true
        audio.play();
    });
    
    
    
    
    
    

    // Add an event listener to the container
    document.getElementById('container').addEventListener('click', function () {
        // Send a message to the background script to suggest opening in incognito mode
        chrome.runtime.sendMessage({ openIncognito: true });
    });
});
