document.addEventListener('DOMContentLoaded', function () {
    let targetDate = new Date();
    targetDate.setMonth(10);
    targetDate.setDate(1);
    targetDate.setHours(0, 0, 0, 0);

    let currentDate = new Date();
    if (currentDate.getMonth() === 10) {
        targetDate.setMonth(11);
    }

    setInterval(function () {
        let now = new Date();
        let timeDifference = targetDate - now;

        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        let milliseconds = Math.floor(timeDifference % 1000);

        document.getElementById('countdown').innerHTML = `${days-1}d ${hours}h ${minutes}m ${seconds}s ${milliseconds}meleeseconds`;
    }, 1); // Update the interval to 1 millisecond
});
