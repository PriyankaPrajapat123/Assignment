
document.addEventListener("DOMContentLoaded", () => {
  const words = ["cars", "star", "love", "hero"];
  const container = document.getElementById("accordion-container");

  // Function to fetch TV shows for each word
  function fetchShows(word) {
    fetch(`http://api.tvmaze.com/search/shows?q=${word}`)
      .then((response) => response.json())
      .then((data) => {
        displayShows(word, data.slice(0, 3)); // Only take the first 3 shows
      })
      .catch((error) => console.error("Error fetching shows:", error));
  }

  // Function to display shows in accordion format as cards
  function displayShows(word, shows) {
    const wordSection = document.createElement("div");

    // Create the accordion button
    const accordionButton = document.createElement("button");
    accordionButton.className = "accordion";
    accordionButton.textContent = `Show TV Shows for ${word}`;
    wordSection.appendChild(accordionButton);

    // Create panel for card details
    const panel = document.createElement("div");
    panel.className = "panel";

    shows.forEach((show, index) => {
      // Create a container div for each card and its type
      const cardContainer = document.createElement("div");
      cardContainer.className = "card-container mb-3";

      // Add type information
      const type = document.createElement("p");
      type.innerHTML = ` ${show.show.type}`;
      cardContainer.appendChild(type);

      // Create card container
      const card = document.createElement("div");
      card.className = `card border-color-${index}`;

      const cardTitle = document.createElement("h5");
      cardTitle.textContent = show.show.name;
      card.appendChild(cardTitle);

      const summary = document.createElement("p");
      summary.innerHTML = `${show.show.summary || "No summary available"}`;
      card.appendChild(summary);

      // Button to link to the show's URL
      const button = document.createElement("button");
      button.textContent = "More Info";
      button.className = `btn button-color-${index}`;
      button.addEventListener("click", () => {
        window.open(show.show.url, "_blank");
      });
      card.appendChild(button);

      // Append the card to the card container
      cardContainer.appendChild(card);

      // Append each card container to the panel
      panel.appendChild(cardContainer);
    });

    wordSection.appendChild(panel);
    container.appendChild(wordSection);
  }

  // Fetch shows for each word
  words.forEach((word) => {
    fetchShows(word);
  });

  // Add event listener for accordion functionality
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("accordion")) {
      event.target.classList.toggle("active");
      const panel = event.target.nextElementSibling;
      panel.style.display = panel.style.display === "block" ? "none" : "block";
    }
  });
});
