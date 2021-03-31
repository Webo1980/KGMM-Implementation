import { url } from 'constants/misc';
import { submitGetRequest } from 'network';
import queryString from 'query-string';

export const fieldsUrl = `${url}research-fields/`;

export const getResearchProblemsByResearchFieldIdCountingPapers = ({ id, page = 0, items = 1 }) => {
    const params = queryString.stringify({ page: page, size: items });
    return submitGetRequest(`${fieldsUrl}${encodeURIComponent(id)}/problems?${params}`);
};

//the following service was discussed in the following issue
//https://gitlab.com/TIBHannover/orkg/orkg-backend/-/issues/263

//# Obtain the list of research fields with benchmarks:
//$ curl --silent http://localhost:8080/api/research-fields/benchmarks | jq .

export const getResearchFieldsWithBenchmarks = submitGetRequest(`${fieldsUrl}/benchmarks$`);

export const getComparisonsByResearchFieldId = ({ id, page = 0, items = 9999, sortBy = 'created_at', desc = true, subfields = true }) => {
    const sort = `${sortBy},${desc ? 'desc' : 'asc'}`;
    const params = queryString.stringify({ page: page, size: items, sort });
    return submitGetRequest(`${fieldsUrl}${encodeURIComponent(id)}/${subfields ? 'subfields/' : ''}comparisons?${params}`);
};

export const getPapersByResearchFieldId = ({ id, page = 0, items = 9999, sortBy = 'created_at', desc = true, subfields = true }) => {
    const sort = `${sortBy},${desc ? 'desc' : 'asc'}`;
    const params = queryString.stringify({ page: page, size: items, sort });
    return submitGetRequest(`${fieldsUrl}${encodeURIComponent(id)}/${subfields ? 'subfields/' : ''}papers?${params}`);
};

export const getResearchProblemsByResearchFieldId = ({ id, page = 0, items = 9999, sortBy = 'created_at', desc = true, subfields = true }) => {
    const sort = `${sortBy},${desc ? 'desc' : 'asc'}`;
    const params = queryString.stringify({ page: page, size: items, sort });
    return submitGetRequest(`${fieldsUrl}${encodeURIComponent(id)}/${subfields ? 'subfields/' : ''}research-problems?${params}`);
};

export const getContributorsByResearchFieldId = ({ id, page = 0, items = 9999, subfields = true }) => {
    const params = queryString.stringify({ page: page, size: items });
    return submitGetRequest(`${fieldsUrl}${encodeURIComponent(id)}/${subfields ? 'subfields/' : ''}contributors?${params}`);
};
