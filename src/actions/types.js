// Add paper

export const UPDATE_GENERAL_DATA = 'UPDATE_GENERAL_DATA';
export const ADD_PAPER_NEXT_STEP = 'ADD_PAPER_NEXT_STEP';
export const ADD_PAPER_PREVIOUS_STEP = 'ADD_PAPER_PREVIOUS_STEP';
export const ADD_PAPER_BLOCK_NAVIGATION = 'ADD_PAPER_BLOCK_NAVIGATION';
export const ADD_PAPER_UNBLOCK_NAVIGATION = 'ADD_PAPER_UNBLOCK_NAVIGATION';
export const UPDATE_RESEARCH_FIELD = 'UPDATE_RESEARCH_FIELD';
export const CREATE_CONTRIBUTION = 'CREATE_CONTRIBUTION';
export const DELETE_CONTRIBUTION = 'DELETE_CONTRIBUTION';
export const SELECT_CONTRIBUTION = 'SELECT_CONTRIBUTION';
export const UPDATE_CONTRIBUTION_LABEL = 'UPDATE_CONTRIBUTION_LABEL';
export const UPDATE_RESEARCH_PROBLEMS = 'UPDATE_RESEARCH_PROBLEMS';
export const UPDATE_ABSTRACT = 'UPDATE_ABSTRACT';
export const CREATE_ANNOTATION = 'CREATE_ANNOTATION';
export const REMOVE_ANNOTATION = 'REMOVE_ANNOTATION';
export const VALIDATE_ANNOTATION = 'VALIDATE_ANNOTATION';
export const TOGGLE_EDIT_ANNOTATION = 'TOGGLE_EDIT_ANNOTATION';
export const UPDATE_ANNOTATION_CLASS = 'UPDATE_ANNOTATION_CLASS';
export const CLEAR_ANNOTATIONS = 'CLEAR_ANNOTATIONS';
export const TOGGLE_ABSTRACT_DIALOG = 'TOGGLE_ABSTRACT_DIALOG';
export const SET_ABSTRACT_DIALOG_VIEW = 'SET_ABSTRACT_DIALOG_VIEW';
export const ADD_PAPER_LOAD_DATA = 'ADD_PAPER_LOAD_DATA';

export const CLOSE_TOUR = 'CLOSE_TOUR';
export const OPEN_TOUR = 'OPEN_TOUR';

export const CREATE_RESOURCE = 'CREATE_RESOURCE';
export const DELETE_RESOURCE = 'DELETE_RESOURCE';
export const CREATE_PROPERTY = 'CREATE_PROPERTY';
export const DELETE_PROPERTY = 'DELETE_PROPERTY';
export const CREATE_VALUE = 'CREATE_VALUE';
export const DELETE_VALUE = 'DELETE_VALUE';
export const TOGGLE_EDIT_PROPERTY_LABEL = 'TOGGLE_EDIT_PROPERTY_LABEL';
export const UPDATE_PROPERTY_LABEL = 'UPDATE_PROPERTY_LABEL';
export const CHANGE_PROPERTY = 'CHANGE_PROPERTY';
export const DONE_ANIMATION = 'DONE_ANIMATION';
export const IS_SAVING_PROPERTY = 'IS_SAVING_PROPERTY';
export const DONE_SAVING_PROPERTY = 'DONE_SAVING_PROPERTY';
export const TOGGLE_EDIT_VALUE = 'TOGGLE_EDIT_VALUE';
export const UPDATE_VALUE_LABEL = 'UPDATE_VALUE_LABEL';
export const CHANGE_VALUE = 'CHANGE_VALUE';
export const UPDATE_RESOURCE_CLASSES = 'UPDATE_RESOURCE_CLASSES';
export const IS_SAVING_VALUE = 'IS_SAVING_VALUE';
export const DONE_SAVING_VALUE = 'DONE_SAVING_VALUE';
export const STATEMENT_BROWSER_LOAD_DATA = 'STATEMENT_BROWSER_LOAD_DATA';

export const SELECT_RESOURCE = 'SELECT_RESOURCE';
export const ADD_RESOURCE_HISTORY = 'ADD_RESOURCE_HISTORY';
export const GOTO_RESOURCE_HISTORY = 'GOTO_RESOURCE_HISTORY';
export const CLEAR_RESOURCE_HISTORY = 'CLEAR_RESOURCE_HISTORY';
export const ADD_FETCHED_STATEMENT = 'ADD_FETCHED_STATEMENT';
export const SET_STATEMENT_IS_FETCHED = 'SET_STATEMENT_IS_FETCHED';
export const SAVE_ADD_PAPER = 'SAVE_ADD_PAPER';
export const SET_RESEARCH_PROBLEMS = 'SET_RESEARCH_PROBLEMS';
export const SET_PAPER_AUTHORS = 'SET_PAPER_AUTHORS';
export const IS_FETCHING_STATEMENTS = 'IS_FETCHING_STATEMENTS';
export const DONE_FETCHING_STATEMENTS = 'DONE_FETCHING_STATEMENTS';
export const FAILED_FETCHING_STATEMENTS = 'FAILED_FETCHING_STATEMENTS';
export const RESET_LEVEL = 'RESET_LEVEL';
export const RESET_STATEMENT_BROWSER = 'RESET_STATEMENT_BROWSER';

export const ADD_TO_COMPARISON = 'ADD_TO_COMPARISON';
export const REMOVE_FROM_COMPARISON = 'REMOVE_FROM_COMPARISON';
export const LOAD_COMPARISON_FROM_LOCAL_STORAGE = 'LOAD_COMPARISON_FROM_LOCAL_STORAGE';

export const UPDATE_AUTH = 'UPDATE_AUTH';
export const RESET_AUTH = 'RESET_AUTH';
export const TOGGLE_AUTHENTICATION_DIALOG = 'TOGGLE_AUTHENTICATION_DIALOG';
export const OPEN_AUTHENTICATION_DIALOG = 'OPEN_AUTHENTICATION_DIALOG';
export const LOAD_PAPER = 'LOAD_PAPER';
export const SET_PAPER_CONTRIBUTIONS = 'SET_PAPER_CONTRIBUTIONS';
export const SET_PAPER_OBSERVATORY = 'SET_PAPER_OBSERVATORY';

// PDF annotation
export const PDF_ANNOTATION_SELECT_TOOL = 'PDF_ANNOTATION_SELECT_TOOL';
export const PDF_ANNOTATION_SET_TABLE_DATA = 'PDF_ANNOTATION_SET_TABLE_DATA';
export const PDF_ANNOTATION_UPDATE_TABLE_DATA = 'PDF_ANNOTATION_UPDATE_TABLE_DATA';
export const PDF_ANNOTATION_SET_LABEL_CACHE = 'PDF_ANNOTATION_SET_LABEL_CACHE';
export const PDF_ANNOTATION_SET_TABLE_REGION = 'PDF_ANNOTATION_SET_TABLE_REGION';
export const PDF_ANNOTATION_DELETE_TABLE_REGION = 'PDF_ANNOTATION_DELETE_TABLE_REGION';
export const PDF_ANNOTATION_FETCH_PDF_PARSE_REQUEST = 'PDF_ANNOTATION_FETCH_PDF_PARSE_REQUEST';
export const PDF_ANNOTATION_FETCH_PDF_PARSE_FAILURE = 'PDF_ANNOTATION_FETCH_PDF_PARSE_FAILURE';
export const PDF_ANNOTATION_FETCH_PDF_PARSE_SUCCESS = 'PDF_ANNOTATION_FETCH_PDF_PARSE_SUCCESS';
export const PDF_ANNOTATION_FETCH_PDF_CONVERT_REQUEST = 'PDF_ANNOTATION_FETCH_PDF_CONVERT_REQUEST';
export const PDF_ANNOTATION_FETCH_PDF_CONVERT_FAILURE = 'PDF_ANNOTATION_FETCH_PDF_CONVERT_FAILURE';
export const PDF_ANNOTATION_FETCH_PDF_CONVERT_SUCCESS = 'PDF_ANNOTATION_FETCH_PDF_CONVERT_SUCCESS';
export const PDF_ANNOTATION_RESET_DATA = 'PDF_ANNOTATION_RESET_DATA';

// Templates in the statementbrowser
export const STATEMENT_BROWSER_UPDATE_SETTINGS = 'STATEMENT_BROWSER_UPDATE_SETTINGS';

export const CREATE_TEMPLATE = 'CREATE_TEMPLATE';
export const IS_FETCHING_TEMPLATES_OF_CLASS = 'IS_FETCHING_TEMPLATES_OF_CLASS';
export const DONE_FETCHING_TEMPLATES_OF_CLASS = 'DONE_FETCHING_TEMPLATES_OF_CLASS';
export const IS_FETCHING_TEMPLATE_DATA = 'IS_FETCHING_TEMPLATE_DATA';
export const DONE_FETCHING_TEMPLATE_DATA = 'DONE_FETCHING_TEMPLATE_DATA';

// AddTemplate
export const TEMPLATE_SET_LABEL = 'TEMPLATE_SET_LABEL';
export const TEMPLATE_SET_PREDICATE = 'TEMPLATE_SET_PREDICATE';
export const TEMPLATE_SET_CLASS = 'TEMPLATE_SET_CLASS';
export const TEMPLATE_SET_RESEARCH_PROBLEMS = 'TEMPLATE_SET_RESEARCH_PROBLEMS';
export const TEMPLATE_SET_RESEARCH_FIELDS = 'TEMPLATE_SET_RESEARCH_FIELDS';
export const TEMPLATE_SET_EDIT_MODE = 'TEMPLATE_SET_EDIT_MODE';
export const TEMPLATE_SET_IS_STRICT = 'TEMPLATE_SET_IS_STRICT';
export const TEMPLATE_SET_HAS_LABEL_FORMAT = 'TEMPLATE_SET_HAS_LABEL_FORMAT';
export const TEMPLATE_SET_LABEL_FORMAT = 'TEMPLATE_SET_LABEL_FORMAT';
export const TEMPLATE_SET_COMPONENTS = 'TEMPLATE_SET_COMPONENTS';
export const TEMPLATE_INIT = 'TEMPLATE_INIT';
export const IS_FETCHING_TEMPLATE = 'IS_FETCHING_TEMPLATE';
export const DONE_FETCHING_TEMPLATE = 'DONE_FETCHING_TEMPLATE';
export const IS_SAVING_TEMPLATE = 'IS_SAVING_TEMPLATE';
export const FAILURE_SAVING_TEMPLATE = 'FAILURE_SAVING_TEMPLATE';
export const SAVE_TEMPLATE_DONE = 'SAVE_TEMPLATE_DONE';

// PDF Text Annotation
export const PDF_TEXT_ANNOTATION_CREATE_ANNOTATION = 'PDF_TEXT_ANNOTATION_CREATE_ANNOTATION';
export const PDF_TEXT_ANNOTATION_DELETE_ANNOTATION = 'PDF_TEXT_ANNOTATION_DELETE_ANNOTATION';
export const PDF_TEXT_ANNOTATION_UPDATE_ANNOTATION = 'PDF_TEXT_ANNOTATION_UPDATE_ANNOTATION';
export const PDF_TEXT_ANNOTATION_SET_PDF = 'PDF_TEXT_ANNOTATION_SET_PDF';
export const PDF_TEXT_ANNOTATION_CHANGE_ZOOM = 'PDF_TEXT_ANNOTATION_CHANGE_ZOOM';
export const PDF_TEXT_ANNOTATION_RESET = 'PDF_TEXT_ANNOTATION_RESET';
export const PDF_TEXT_ANNOTATION_SET_SUMMARY_FETCHED = 'PDF_TEXT_ANNOTATION_SET_SUMMARY_FETCHED';
export const PDF_TEXT_ANNOTATION_SET_SHOW_HIGHLIGHTS = 'PDF_TEXT_ANNOTATION_SET_SHOW_HIGHLIGHTS';
export const PDF_TEXT_ANNOTATION_SET_PDF_VIEWER = 'PDF_TEXT_ANNOTATION_SET_PDF_VIEWER';

export const STATEMENT_BROWSER_UPDATE_CONTRIBUTION_LABEL = 'STATEMENT_BROWSER_UPDATE_CONTRIBUTION_LABEL';
export const STATEMENT_BROWSER_CREATE_CONTRIBUTION_OBJECT = 'STATEMENT_BROWSER_CREATE_CONTRIBUTION_OBJECT';
export const STATEMENT_BROWSER_LOAD_CONTRIBUTION_HISTORY = 'STATEMENT_BROWSER_LOAD_CONTRIBUTION_HISTORY';

// Article writer
export const ARTICLE_WRITER_LOAD = 'ARTICLE_WRITER_LOAD';
export const ARTICLE_WRITER_SET_IS_LOADING = 'ARTICLE_WRITER_SET_IS_LOADING';
export const ARTICLE_WRITER_UPDATE_TITLE = 'ARTICLE_WRITER_UPDATE_TITLE';
export const ARTICLE_WRITER_UPDATE_AUTHORS = 'ARTICLE_WRITER_UPDATE_AUTHORS';
export const ARTICLE_WRITER_UPDATE_SECTION_TITLE = 'ARTICLE_WRITER_UPDATE_SECTION_TITLE';
export const ARTICLE_WRITER_UPDATE_SECTION_MARKDOWN = 'ARTICLE_WRITER_UPDATE_SECTION_MARKDOWN';
export const ARTICLE_WRITER_UPDATE_SECTION_TYPE = 'ARTICLE_WRITER_UPDATE_SECTION_TYPE';
export const ARTICLE_WRITER_CREATE_SECTION = 'ARTICLE_WRITER_CREATE_SECTION';
export const ARTICLE_WRITER_DELETE_SECTION = 'ARTICLE_WRITER_DELETE_SECTION';
export const ARTICLE_WRITER_SORT_SECTIONS = 'ARTICLE_WRITER_SORT_SECTIONS';
export const ARTICLE_WRITER_SET_IS_LOADING_SORT = 'ARTICLE_WRITER_SET_IS_LOADING_SORT';
export const ARTICLE_WRITER_UPDATE_SECTION_LINK = 'ARTICLE_WRITER_UPDATE_SECTION_LINK';
export const ARTICLE_WRITER_UPDATE_DATA_TABLE = 'ARTICLE_WRITER_UPDATE_DATA_TABLE';
export const ARTICLE_WRITER_TOGGLE_OPEN_HISTORY_MODAL = 'ARTICLE_WRITER_TOGGLE_OPEN_HISTORY_MODAL';
export const ARTICLE_WRITER_SET_RESEARCH_FIELD = 'ARTICLE_WRITER_SET_RESEARCH_FIELD';
export const ARTICLE_WRITER_SET_IS_EDITING = 'ARTICLE_WRITER_SET_IS_EDITING';
export const ARTICLE_WRITER_SET_VERSIONS = 'ARTICLE_WRITER_SET_VERSIONS';
export const ARTICLE_WRITER_SET_COMPARISON_DATA = 'ARTICLE_WRITER_SET_COMPARISON_DATA';
export const ARTICLE_WRITER_SET_DATA_TABLE_STATEMENTS = 'ARTICLE_WRITER_SET_DATA_TABLE_STATEMENTS';
export const ARTICLE_WRITER_REFERENCE_ADD = 'ARTICLE_WRITER_REFERENCE_ADD';
export const ARTICLE_WRITER_REFERENCE_REMOVE = 'ARTICLE_WRITER_REFERENCE_REMOVE';
export const ARTICLE_WRITER_REFERENCE_UPDATE = 'ARTICLE_WRITER_REFERENCE_UPDATE';
export const ARTICLE_WRITER_SET_USED_REFERENCES = 'ARTICLE_WRITER_SET_USED_REFERENCES';

// contribution editor
export const CONTRIBUTION_EDITOR_CONTRIBUTIONS_LOAD = 'CONTRIBUTION_EDITOR_CONTRIBUTIONS_LOAD';
export const CONTRIBUTION_EDITOR_CONTRIBUTIONS_REMOVE = 'CONTRIBUTION_EDITOR_CONTRIBUTIONS_REMOVE';
export const CONTRIBUTION_EDITOR_PAPER_UPDATE = 'CONTRIBUTION_EDITOR_PAPER_UPDATE';
export const CONTRIBUTION_EDITOR_LITERAL_UPDATE = 'CONTRIBUTION_EDITOR_LITERAL_UPDATE';
export const CONTRIBUTION_EDITOR_LITERAL_CREATE = 'CONTRIBUTION_EDITOR_LITERAL_CREATE';
export const CONTRIBUTION_EDITOR_RESOURCE_CREATE = 'CONTRIBUTION_EDITOR_RESOURCE_CREATE';
export const CONTRIBUTION_EDITOR_RESOURCE_UPDATE = 'CONTRIBUTION_EDITOR_RESOURCE_UPDATE';
export const CONTRIBUTION_EDITOR_PROPERTY_CREATE = 'CONTRIBUTION_EDITOR_PROPERTY_CREATE';
export const CONTRIBUTION_EDITOR_PROPERTY_DELETE = 'CONTRIBUTION_EDITOR_PROPERTY_DELETE';
export const CONTRIBUTION_EDITOR_PROPERTY_UPDATE = 'CONTRIBUTION_EDITOR_PROPERTY_UPDATE';
export const CONTRIBUTION_EDITOR_STATEMENT_DELETE = 'CONTRIBUTION_EDITOR_STATEMENT_DELETE';
export const CONTRIBUTION_EDITOR_LOADING_START = 'CONTRIBUTION_EDITOR_LOADING_START';
export const CONTRIBUTION_EDITOR_LOADING_FINISH = 'CONTRIBUTION_EDITOR_LOADING_FINISH';
export const CONTRIBUTION_EDITOR_SET_HAS_FAILED = 'CONTRIBUTION_EDITOR_SET_HAS_FAILED';
