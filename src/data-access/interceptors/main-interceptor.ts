import { l } from "@/shared/utils/logger/l";

type InterceptorCallback = (response: Response) => unknown;

interface InterceptorsAPI {
  addInterceptor: (cb: InterceptorCallback) => unknown;
}

export const initializeInterceptors = (
  initialInterceptors: InterceptorCallback[] = []
): InterceptorsAPI => {
  const origFetch = Object.freeze(window.fetch);

  const interceptors: Function[] = initialInterceptors;

  const addInterceptor = (cb: (response: Response) => unknown): void => {
    interceptors.push(cb);
  };

  window.fetch = async (...args): Promise<Response> => {
    // console.log("- Making request - ");

    try {
      const response = await origFetch(...args);
      const clonedResponse = response.clone();

      // clonedResponse.text().then((body) => {
      //   console.log("Response: ", {
      //     url: clonedResponse.url,
      //     status: clonedResponse.status,
      //     body,
      //   });
      // });

      interceptors.forEach((cb) => cb(response));

      return response;
    } catch (e) {
      l("- Fetch error: ", e);
      throw e;
    }
  };
  return {
    addInterceptor,
  };
};
