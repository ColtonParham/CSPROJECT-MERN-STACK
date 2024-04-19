document.addEventListener("DOMContentLoaded", function() {
    const workouts = [
        "Upper body workout",
        "Leg day - focus on squats",
        "Cardio session: 30 minutes of running",
        "Core strengthening exercises",
        "Flexibility training with yoga"
    ];

    const messages = [
        "Don't limit your challenges, challenge your limits.",
        "Pain is temporary, pride is forever.",
        "The only bad workout is the one that didn’t happen.",
        "Sweat now, shine later.",
        "The body achieves what the mind believes."
    ];

    function getRandomItem(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    function displayNotification() {
        const notificationBar = document.createElement("div");
        notificationBar.className = "notification-bar";

        const closeButton = document.createElement("span");
        closeButton.textContent = "X";
        closeButton.className = "close-button";
        closeButton.onclick = function() {
            notificationBar.style.opacity = "0";
            setTimeout(() => {
                notificationBar.remove();
            }, 500); // Waits 500ms to completely remove from DOM
        };

        const heading = document.createElement("h4");
        heading.textContent = "Notifications from GymTracker:";
        heading.className = "notification-heading";

        const workoutMessage = document.createElement("p");
        workoutMessage.textContent = "Today's workout: " + getRandomItem(workouts);
        workoutMessage.className = "notification-message";

        const motivationalMessage = document.createElement("p");
        motivationalMessage.textContent = "Motivation: " + getRandomItem(messages);
        motivationalMessage.className = "notification-message";

        notificationBar.appendChild(closeButton);
        notificationBar.appendChild(heading);
        notificationBar.appendChild(workoutMessage);
        notificationBar.appendChild(motivationalMessage);

        document.body.appendChild(notificationBar);
    }

    displayNotification();
});
