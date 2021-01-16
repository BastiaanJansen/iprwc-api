import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

export function HasExtension(
    extensions: string[],
    validationOptions?: ValidationOptions
) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: extensions,
            validator: CommaSeperatedEnumConstraint,
        });
    };
}

@ValidatorConstraint({ name: "HasExtension" })
export class CommaSeperatedEnumConstraint
    implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): boolean {
        const extension = value.split(/[#?]/)[0].split(".").pop()?.trim();
        return args.constraints
            .map((extension) => extension.toLowerCase())
            .includes(extension?.toLowerCase());
    }

    defaultMessage(args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        return `$property does not have the correct extension`;
    }
}
