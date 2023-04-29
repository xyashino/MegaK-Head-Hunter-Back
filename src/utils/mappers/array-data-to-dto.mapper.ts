import { instanceToPlain, plainToInstance } from 'class-transformer';
import { BaseEntity } from 'typeorm';

export const transformArrayDataToDtoInstance = <T extends BaseEntity>(
  data: T[],
  dto,
) => {
  return data.map((el) => {
    const dtoInstance = plainToInstance(dto, el);
    return instanceToPlain(dtoInstance, {
      excludeExtraneousValues: true,
    });
  });
};
