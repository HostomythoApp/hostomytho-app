import { getDefinition } from "services/api/utils";


// Fetches direct title or handles disambiguation
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
    console.error("Error fetching from Wikipedia: ", error.message);
    throw error;
  }
};

// Handles pages identified as disambiguation
export const handleDisambiguationPage = async (searchWord: string) => {
  const searchUrl = `https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchWord)}&format=json&srlimit=2&origin=*`;
  const response = await fetch(searchUrl);
  const data = await response.json();

  const definitions = await Promise.all(data.query.search.map(async (item) => {
    return fetchSummaryFromWikipedia(item.title);
  }));

  return {
    definitions,
    result_type: "multiple"
  };
};

// Fetches a summary for a given Wikipedia page title
export const fetchSummaryFromWikipedia = async (title: string) => {
  const url = `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const response = await fetch(url);
  const json = await response.json();
  if (json.type === 'standard') {
    return { text: json.extract, title: json.title, url: `https://fr.wikipedia.org/wiki/${encodeURIComponent(title)}` };
  }
  throw new Error('Summary not found');
};

export const searchAndDisplayResult = async (word, setIsLoading, setDefinitions, setResultType) => {
    setIsLoading(true);
    try {
      const directResult = await fetchDirectTitle(word);
      setDefinitions([{ title: directResult.title, definition: directResult.text, url: directResult.url }]);
      setResultType("direct");
    } catch (error) {
      console.error("Error fetching from Wikipedia or handling disambiguation: ", error);
      try {
        const serverResult = await getDefinition(word);
        if (!serverResult.error) {
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
  
