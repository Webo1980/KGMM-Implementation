const routes = {
    HOME: '/',
    USER_SETTINGS: '/settings',
    USER_PROFILE: '/u/:userId',
    RESOURCES: '/resources',
    RESOURCE: '/resource/:id',
    ADD_RESOURCE: '/addResource',
    PROPERTIES: '/properties',
    PROPERTY: '/property/:id',
    ADD_PROPERTY: '/addProperty',
    CLASSES: '/classes',
    CLASS: '/class/:id',
    ADD_CLASS: '/addClass',
    TEMPLATES: '/templates',
    TEMPLATE: '/template/:id?',
    ORGANIZATIONS: '/organizations',
    OBSERVATORIES: '/observatories',
    ADD_ORGANIZATION: '/addOrganization',
    ORGANIZATION: '/organizations/:id',
    ADD_OBSERVATORY: '/organizations/:id/addObservatory',
    ORGANIZATION_OBSERVATORIES: '/organizations/:id/observatories',
    OBSERVATORY: '/observatory/:id',
    ADD_PAPER: {
        GENERAL_DATA: '/add-paper'
    },
    VIEW_PAPER: '/paper/:resourceId/:contributionId?',
    CONTRIBUTION: '/contribution/:id',
    COMPARISON_SHORTLINK: '/c/:shortCode',
    COMPARISON: '/comparison/:comparisonId?',
    PAPERS: '/papers',
    COMPARISONS: '/comparisons',
    VISUALIZATIONS: '/visualizations',
    VISUALIZATION: '/visualization/:id?',
    RESEARCH_PROBLEM: '/problem/:researchProblemId/:slug?',
    RESEARCH_FIELD: '/field/:researchFieldId/:slug?',
    RESEARCH_FIELDS: '/fields',
    VENUE_PAGE: '/venue/:venueId',
    AUTHOR_PAGE: '/author/:authorId',
    LICENSE: '/license',
    DATA_PROTECTION: '/data-protection',
    TERMS_OF_USE: '/terms-of-use',
    DATA: '/data',
    CHANGELOG: '/changelog',
    STATS: '/stats',
    SEARCH: '/search/:searchTerm?',
    FEATURED_COMPARISONS: '/featured-comparisons',
    PDF_TEXT_ANNOTATION: '/pdf-text-annotation',
    PDF_ANNOTATION: '/pdf-annotation',
    CSV_IMPORT: '/csv-import',
    TOOLS: '/tools',
    CONTRIBUTION_EDITOR: '/contribution-editor',
    ADD_COMPARISON: '/add-comparison',
    /* Legacy routes */
    PREDICATES: '/predicates',
    PREDICATE: '/predicate/:id',
    TPDL: '/tpdl',
    EXPORT_DATA: '/export-data',
    CURATION_CALL: '/open-call-curation-grant',
    PAGE: '/page/:id-:slug',
    ABOUT: '/about/:id-:slug',
    HELP_CENTER: '/help-center',
    HELP_CENTER_CATEGORY: '/help-center/category/:id',
    HELP_CENTER_ARTICLE: '/help-center/:categoryId/:id-:slug',
    HELP_CENTER_SEARCH: '/help-center/search/:searchQuery'
};
export default routes;
