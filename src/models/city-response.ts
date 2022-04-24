/**
 * Suggestions response data
 */
export interface CityResponse {
  /**
   * error code
   */
  errorCode?: string;

  /**
   * list of validation errors in request
   */
  validationErrors?: CustomValidationError[];

  /**
   * list of suggestion values
   */
  suggestionsList: SuggestionsList[];
}

/**
 * SuggestionsList values
 */
export interface SuggestionsList {
  name: string;
  latitude: string;
  longitude: string;
  distance: string;
}

/**
 * Validation error structure
 */
export interface CustomValidationError {
  /**
   * name of field with validation error
   */
  field: string;
  /**
   * error message
   */
  message: string;
}
