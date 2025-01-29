import { applyDecorators } from "@nestjs/common";
import { ApiQuery, ApiQueryOptions } from "@nestjs/swagger";

export function ApiQueryParams(params: ApiQueryOptions[]) {
  return applyDecorators(
    ...params.map(param => ApiQuery(param))
  );
}