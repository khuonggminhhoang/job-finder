import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import * as _ from 'lodash';

export function GreaterThanOrEqual(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'GreaterThanOrEqual',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(propertyValue: number, args: ValidationArguments): boolean {
          return propertyValue >= args.object[args.constraints[0] as string];
        },

        defaultMessage(args?: ValidationArguments): string {
          return `"${args.property}" must be greater than or equal to "${String(args.constraints[0])}"`;
        },
      },
    });
  };
}

export function GreaterThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'GreaterThanOrEqual',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(propertyValue: number, args: ValidationArguments): boolean {
          return propertyValue > args.object[args.constraints[0] as string];
        },

        defaultMessage(args?: ValidationArguments): string {
          return `"${args.property}" must be greater than to "${String(args.constraints[0])}"`;
        },
      },
    });
  };
}

export function IsMonth(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsMonth',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(propertyValue: number): boolean {
          if (typeof propertyValue !== 'number' || !_.isNumber(propertyValue))
            return false;
          return 1 <= propertyValue && propertyValue <= 12;
        },

        defaultMessage(args?: ValidationArguments): string {
          return `${args.property} must be between 1 and 12`;
        },
      },
    });
  };
}

export function IsYear(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsYear',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(propertyValue: number): boolean {
          if (typeof propertyValue !== 'number' || !_.isNumber(propertyValue))
            return false;
          return 1900 <= propertyValue && propertyValue <= 2100;
        },

        defaultMessage(args?: ValidationArguments): string {
          return `${args.property} must be between 1900 and 2100`;
        },
      },
    });
  };
}
