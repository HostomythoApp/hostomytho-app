import { getDefinition } from "services/api/utils";
var NlpjsTFr = require('nlp-js-tools-french');

export const lemmatizeFrenchText = (text: string) => {
    const config = {
        tagTypes: ["adj", "adv", "art", "con", "nom", "ono", "pre", "ver", "pro"], // Specify the tag types you are interested in
        strictness: true,               // Allow some flexibility in text matching
        minimumLength: 3,                // Minimum word length to process
        debug: true                      // Enable debugging to see logs
    };

    const nlpToolsFr = new NlpjsTFr(text, config);
    const lemmatizedWords = nlpToolsFr.lemmatizer();
    return lemmatizedWords;
};

export const fetchDirectTitle = async (searchWord: string) => {
    const summaryUrl = `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchWord)}`;
    try {
        const response = await fetch(summaryUrl);
        const json = await response.json();
        if (json.type === 'disambiguation') {
            return handleDisambiguationPage(searchWord);
        } else if (json.type === 'standard' && json.extract) {
            return {
                text: json.extract,
                title: json.title,
                url: `https://fr.wikipedia.org/wiki/${encodeURIComponent(json.title)}`
            };
        } else {
            throw new Error("Page not found");
        }
    } catch (error) {
        throw error;
    }
};

const fetchDefinitionOrContinueDisambiguation = async (pageTitle: any, depth = 0, maxDepth = 2) => {
    if (depth > maxDepth) {
        return null;
    }

    const definitionUrl = `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
    const definitionResponse = await fetch(definitionUrl);
    const definitionData = await definitionResponse.json();

    if (definitionData.extract) {
        return {
            title: pageTitle,
            definition: definitionData.extract,
            url: `https://fr.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`,
        };
    } else if (definitionData.type === 'disambiguation') {
        // Disambiguation
        return handleDisambiguationPage(pageTitle, depth + 1); 
    }
    return null;
};

export const handleDisambiguationPage = async (searchWord: string, depth = 0) => {
    const searchUrl = `https://fr.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(searchWord)}&srlimit=2&origin=*`;
    const response = await fetch(searchUrl);
    const data = await response.json();

    const pageTitles = data.query.search.map((page: any) => page.title);
    const definitions = [];

    for (const pageTitle of pageTitles) {
        const definition: any = await fetchDefinitionOrContinueDisambiguation(pageTitle, depth);
        if (definition) {
            definitions.push(definition);
        }
    }

    return {
        definitions,
        result_type: "multiple"
    };
};

// Recherche direct
export const fetchSummaryFromWikipedia = async (title: string) => {
    const url = `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const response = await fetch(url);
    const json = await response.json();
    if (json.type === 'standard') {
        return { text: json.extract, title: json.title, url: `https://fr.wikipedia.org/wiki/${encodeURIComponent(title)}` };
    }
    throw new Error('Summary not found');
};

export const fetchTextSearch = async (lemma: string) => {
    const url = `https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        lemma
    )}&format=json&origin=*`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.query.search.length > 0) {
        const title = data.query.search[0].title;
        const summary = await fetchSummaryFromWikipedia(title);
        return {
            definitions: [summary],
            result_type: "search",
        };
    } else {
        throw new Error("No results found in full text search");
    }
}

export const searchAndDisplayResult = async (word: string, setIsLoading: any, setDefinitions: any, setResultType: any) => {
    setIsLoading(true);
    setDefinitions([]);
    setResultType('');

    try {
        // Recherche direct
        const directResult: any = await fetchDirectTitle(word);
        if (directResult && directResult.text) {
            setDefinitions([{ title: directResult.title, definition: directResult.text, url: directResult.url }]);
            setResultType("direct");
        } else {
            throw new Error("No direct definitions found");
        }
    } catch (error) {
        try {
            // Lemmatisation du mot
            const lemmatizedWord = lemmatizeFrenchText(word);
            const lemma = lemmatizedWord[0]?.lemma || word;
            const lemmatizedResult: any = await fetchDirectTitle(lemma);
            if (lemmatizedResult && lemmatizedResult.text) {
                setDefinitions([{ title: lemmatizedResult.title, definition: lemmatizedResult.text, url: lemmatizedResult.url }]);
                setResultType("lemmatized");
            } else {
                throw new Error("No definitions found after lemmatization");
            }
        } catch (lemmatizedError) {
            try {
                const disambiguationResult = await handleDisambiguationPage(word);
                if (disambiguationResult && disambiguationResult.definitions.length > 0) {
                    setDefinitions(disambiguationResult.definitions);
                    setResultType(disambiguationResult.result_type);
                } else {
                    throw new Error("Disambiguation failed to find results");
                }
            } catch (disambiguationError) {
                try {
                    const searchTextResult = await fetchTextSearch(word);
                    if (searchTextResult.definitions.length > 0) {
                        setDefinitions(searchTextResult.definitions);
                        setResultType(searchTextResult.result_type);
                    } else {
                        throw new Error("Full text search found no results");
                    }
                } catch (fullTextSearchError) {
                    setResultType("failed");
                }
            }
        }
    } finally {
        setIsLoading(false);
    }
};


