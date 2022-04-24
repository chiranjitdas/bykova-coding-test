import got, { HTTPError } from 'got';

/**
 *
 * By this in every request Authorization token gets attached in header.
 *
 */
export const gotClient = got.extend({
  hooks: {
    beforeRequest: [
      async options => {
        options.headers.Authorization = options.context.token as string;
      }
    ],
    beforeError: [
      error => {
        const { response, request } = error as HTTPError;
        if (response && response.body) {
          error.name = 'API calling error';
          error.message = `
          URL --> ${request.requestUrl}
          Request Body--> ${JSON.stringify(response.request.options.json)}
          Response --> ${response.body}
          StatusCode --> (${response.statusCode})`;
        }

        return error;
      }
    ]
  }
});
