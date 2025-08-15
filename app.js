const from = document.querySelector('form');
const resultDiv = document.querySelector('.result');

from.addEventListener('submit',(e) =>{
    e.preventDefault();
    getWordInfo(from.elements[0].value);
});

const getWordInfo = async (word)=>{
    try{
        resultDiv.innerHTML = "Fetching Data...";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        let definitions = data[0].meanings[0].definitions[0];

        resultDiv.innerHTML = `
            <h2><strong>Word:</strong>${data[0].word}</h2>
            
            <p class="partOfSpeech">
                ${data[0].meanings[0]?.partOfSpeech || "Not Found"}
            </p>
            <p><strong>Meaning:</strong>${definitions.definition === undefined ? "Not Found" :
            definitions.definition}</p>
            <p><strong>Example:</strong>${definitions.example === undefined ? "Not Found" :
            definitions.example}</p>
            
        `;

        // for antonyms
        
        if (!definitions.antonyms || definitions.antonyms.length === 0) {
            resultDiv.innerHTML += `<p><strong>Antonyms:</strong> Not Found</p>`;
        } else {
            definitions.antonyms.forEach(ant => {
                resultDiv.innerHTML += `<li>${ant}</li>`;
            });
        }
       
        // for Synonyms

        if (!definitions.synonyms || definitions.synonyms.length === 0) {
            resultDiv.innerHTML += `<p><strong>Synonyms:</strong> Not Found</p>`;
        } else {
            resultDiv.innerHTML += `<p><strong>Synonyms:</strong></p>`;
            definitions.synonyms.forEach(syn => {
                 resultDiv.innerHTML += `<li>${syn}</li>`;
            });
        }
        // adding read more button

        resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
    }
    catch (error){
        resultDiv.innerHTML = `<p>Sorry, the word could not be found</p>`;
    }
    console.log(data);
}