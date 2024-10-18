// Array to hold quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Inspiration" },
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>"${quote.text}" - <em>${quote.category}</em></p>`;

    console.log(showRandomQuote)
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText && quoteCategory) {
        // Add the new quote to the array
        quotes.push({ text: quoteText, category: quoteCategory });
        saveQuotes();

        // Update the quote display and clear the form fields
        showRandomQuote();
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
        alert("Quote added successfully!");
    } else {
        alert("Please enter both quote text and category.");
    }

}

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url); // Free memory
}


function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                alert('Quotes imported successfully!');
                showRandomQuote(); // Optionally display a random quote after importing
            } else {
                alert('The file format is incorrect. Please upload a valid JSON array.');
            }
        } catch (error) {
            alert('Invalid JSON file');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}


function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    // Clear existing categories
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    uniqueCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Set the selected category based on saved filter
    const savedFilter = localStorage.getItem('selectedCategory');
    if (savedFilter) {
        categoryFilter.value = savedFilter;
        filterQuotes(); // Apply the filter on page load
    }
}

// Function to filter the displayed quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quote = filteredQuotes[randomIndex];
        const quoteDisplay = document.getElementById("quoteDisplay");
        quoteDisplay.innerHTML = `<p>"${quote.text}" - <em>${quote.category}</em></p>`;
    } else {
        document.getElementById("quoteDisplay").innerHTML = "<p>No quotes available for this category.</p>";
    }

    // Save the selected filter in local storage
    localStorage.setItem('selectedCategory', selectedCategory);
}




const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with an actual server URL if available

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(serverUrl);
        const serverQuotes = await response.json();

        // Assuming serverQuotes have the format [{ text: "...", category: "..." }]
        mergeQuotesWithLocal(serverQuotes);
        saveQuotes();
        populateCategories();
        showRandomQuote();
        alert('Quotes fetched from the server successfully!');
    } catch (error) {
        console.error('Error fetching quotes from the server:', error);
    }
}

// Function to merge server quotes with local quotes and resolve conflicts
function mergeQuotesWithLocal(serverQuotes) {
    const localQuoteTexts = new Set(quotes.map(q => q.text));

    serverQuotes.forEach(serverQuote => {
        // Avoid duplicating quotes that already exist locally
        if (!localQuoteTexts.has(serverQuote.text)) {
            quotes.push({ text: serverQuote.text, category: serverQuote.category });
        }
    });
}
// Function to create the form for adding a new quote
function createAddQuoteForm() {
    // Create input elements for the quote text and category
    const formContainer = document.createElement('div');
    formContainer.id = 'addQuoteForm';

    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';

    // Create the button to add the quote
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;

    // Append the inputs and button to the form container
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    // Add the form container to the body
    document.body.appendChild(formContainer);
}

// Event listener to show a random quote when the button is clicked
document.getElementById("newQuote").addEventListener("click", showRandomQuote);


// Show a random quote initially when the page loads
showRandomQuote();

// Create the form for adding new quotes
createAddQuoteForm();
