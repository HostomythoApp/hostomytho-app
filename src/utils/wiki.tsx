import { getDefinition } from "services/api/utils";

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
        console.error("Error fetching from Wikipedia: ", error);
        throw error;
    }
};

// Recherche dans page homonyme
export const handleDisambiguationPage = async (searchWord: string) => {
    const searchUrl = `https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchWord)}&format=json&srlimit=2&origin=*`;
    const response = await fetch(searchUrl);
    const data = await response.json();

    const definitions = await Promise.all(data.query.search.map(async (item: any) => {
        return fetchSummaryFromWikipedia(item.title);
    }));

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

export const searchAndDisplayResult = async (word: string, setIsLoading: any, setDefinitions: any, setResultType: any) => {
    setIsLoading(true);
    try {
        const directResult = await fetchDirectTitle(word);
        //   @ts-ignore
        setDefinitions([{ title: directResult.title, definition: directResult.text, url: directResult.url }]);
        setResultType("direct");
    } catch (error) {
        console.error("Error fetching from Wikipedia or handling disambiguation: ", error);
        try {
            const serverResult = await getDefinition(word);
            if (!serverResult.error) {
                // @ts-ignore
                setDefinitions(serverResult.definitions.map(def => ({
                    title: def.title,
                    definition: def.definition,
                    url: def.url
                })));
                setResultType(serverResult.result_type || "server");
            } else {
                setDefinitions([]);
                setResultType("failed");
            }
        } catch (serverError) {
            console.error("Failed to fetch definitions from server: ", serverError);
            setDefinitions([]);
            setResultType("failed");
        }
    } finally {
        setIsLoading(false);
    }
};

