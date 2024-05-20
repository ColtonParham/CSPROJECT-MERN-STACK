document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("liftingForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const exercise = document.getElementById("exercise").value;
        const weight = document.getElementById("weight").value;
        const reps = document.getElementById("reps").value;
        const date = document.getElementById("date").value;

        // Validate form inputs
        if (!exercise || !weight || !reps || !date) {
            alert("Please fill in all fields.");
            return;
        }

        // Construct an object with the form data
        const entry = {
            exercise: exercise,
            weight: weight,
            reps: reps,
            date: date
        };

        // You can perform further actions here, like sending the data to a server or storing it locally.
        
        // For demonstration, let's log the entry object to the console
        console.log(entry);

        // Clear the form after submission
        form.reset();
    });
});