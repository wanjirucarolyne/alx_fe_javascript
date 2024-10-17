// Array to hold quote objects
let quotes = [
    { text: "Never give up because great things take time.", category: "Motivation" },
    { text: "Risking is better than regretting.", category: "Inspiration" },
    { text: "Do what your future self will be proud of.", category: "Self growth" },
];
console.log(quotes)

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>"${quote.text}" - <em>${quote.category}</em></p>`;
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText && quoteCategory) {
        // Add the new quote to the array
        quotes.push({ text: quoteText, category: quoteCategory });

        // Update the quote display and clear the form fields
        showRandomQuote();
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
        alert("Quote added successfully!");
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Event listener to show a random quote when the button is clicked
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Show a random quote initially when the page loads
showRandomQuote();
