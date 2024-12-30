import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsYear(
  { min, max }: { min: number; max: number },
  validationOptions?: ValidationOptions,
) {
  return function decorated(object: object, propertyName: string) {
    registerDecorator({
      name: 'IsYear',
      target: object.constructor,
      propertyName,
      constraints: [min, max],
      options: {
        message: `Property ${propertyName} must be between ${min} and ${max}`,
        ...validationOptions,
      },
      validator: {
        validate(value: unknown, validationArgs?: ValidationArguments) {
          const { 0: min, 1: max } = validationArgs.constraints;
          return Number.isInteger(value) && value >= min && value <= max;
        },
      },
    });
  };
}
