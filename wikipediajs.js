let searchResultsEl = document.getElementById("searchResults");
let searchEl = document.getElementById("searchInput");

function createAndAppendResultItem(result) {
    //create result item
    let resultElement = document.createElement("div");
    resultElement.classList.add("result-item");
    searchResultsEl.appendChild(resultElement);

    //create Title Element
    let {
        link,
        title,
        description
    } = result;
    let resultTitle = document.createElement("a");
    resultTitle.href = link;
    resultTitle.target = "_blank";
    resultTitle.textContent = title;
    resultTitle.classList.add("result-title");
    resultElement.appendChild(resultTitle);
    // create break Element
    let breakElement = document.createElement("br");
    resultElement.appendChild(breakElement);

    //create link Element
    let resultLink = document.createElement("a");
    resultLink.href = link;
    resultLink.textContent = link;
    resultLink.classList.add("result-url");
    resultElement.appendChild(resultLink);

    //create descriptuion elemnt
    let resultDesc = document.createElement("p");
    resultDesc.classList.add("link-description");
    resultDesc.textContent = description;
    resultElement.appendChild(resultDesc);
}

function displaySearchResults(search_results) {
    document.getElementById("spinner").classList.toggle("d-none");
    for (let item of search_results) {
        createAndAppendResultItem(item);
    }
}

function searchResults(searchValue) {
    let options = {
        method: "GET",
    };
    url = "https://apis.ccbp.in/wiki-search?search=" + searchValue;
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let {
                search_results
            } = jsonData;
            displaySearchResults(search_results);
        });
}
searchEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        document.getElementById("spinner").classList.toggle("d-none");
        searchValue = searchEl.value;
        searchResults(searchValue);
        console.log(searchValue);
    }
});