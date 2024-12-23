document.addEventListener("DOMContentLoaded", function () {
    const serviceLink = document.getElementById("serviceLink");
    const serviceContainer = document.getElementById("serviceContainer");

    if (serviceLink && serviceContainer) {
        serviceLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the link's default behavior

            // Use fetch API to load content from service.html
            fetch("./service.html")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text(); // Parse the response as text
                })
                .then((data) => {
                    serviceContainer.innerHTML = data; // Insert content into the container
                })
                .catch((error) => {
                    console.error("Failed to load service content:", error);
                    serviceContainer.innerHTML =
                        "<p>Failed to load service content. Please try again later.</p>";
                });
        });
    } else {
        console.error("Service link or container not found.");
    }
});
