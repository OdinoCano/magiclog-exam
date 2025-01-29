import { ApiOperation } from "@nestjs/swagger";

export function ApiDocumentation(operation: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: operation })(target, propertyKey, descriptor);
  };
}