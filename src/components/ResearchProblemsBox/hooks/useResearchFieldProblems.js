import { useCallback, useEffect, useState } from 'react';
import { getResearchProblemsByResearchFieldIdCountingPapers } from 'services/backend/researchFields';

function useResearchFieldProblems({ researchFieldId, initialSort /*, initialIncludeSubFields,*/, pageSize = 10 }) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isLastPageReached, setIsLastPageReached] = useState(false);
    const [page, setPage] = useState(0);
    const [problems, setProblems] = useState([]);
    const [sort, setSort] = useState(initialSort);
    const [totalElements, setTotalElements] = useState(0);
    //const [includeSubFields, setIncludeSubFields] = useState(initialIncludeSubFields);

    const loadData = useCallback(
        page => {
            setIsLoading(true);
            // Get the problems of research field
            getResearchProblemsByResearchFieldIdCountingPapers({
                id: researchFieldId,
                page: page,
                items: pageSize
                /*subfields: includeSubFields*/
            })
                .then(result => {
                    console.log(result);
                    setProblems(prevResources => [...prevResources, ...result.content]);
                    setIsLoading(false);
                    setHasNextPage(!result.last);
                    setIsLastPageReached(result.last);
                    setTotalElements(result.totalElements);
                    setPage(page + 1);
                })
                .catch(error => {
                    setProblems([]);
                    setIsLoading(false);
                    setHasNextPage(false);
                    setIsLastPageReached(page > 1 ? true : false);
                });
        },
        [/*includeSubFields,*/ researchFieldId, pageSize]
    );

    // reset resources when the researchFieldId has changed
    useEffect(() => {
        setProblems([]);
        setHasNextPage(false);
        setIsLastPageReached(false);
        setPage(0);
        setTotalElements(0);
    }, [researchFieldId /*, includeSubFields*/]);

    useEffect(() => {
        loadData(0);
    }, [loadData]);

    const handleLoadMore = () => {
        if (!isLoading) {
            loadData(page);
        }
    };

    return {
        problems,
        isLoading,
        hasNextPage,
        isLastPageReached,
        sort,
        /*includeSubFields,*/
        totalElements,
        page,
        handleLoadMore,
        /*setIncludeSubFields,*/
        setSort
    };
}
export default useResearchFieldProblems;
