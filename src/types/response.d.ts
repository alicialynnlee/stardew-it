export type ResponseData<TData = null> =
  | { success: true; data: TData }
  | { success: false; error: string };

export type ResponseNoData =
  | { success: true }
  | { success: false; error: string };
