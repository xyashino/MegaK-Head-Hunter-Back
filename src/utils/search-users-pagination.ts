import { PageMetaDto } from '../common/dtos/page/page-meta.dto';

export const searchUsersPagination = async (searchOptions, queryBuilder) => {
  const { name } = searchOptions;

  if (name) {
    queryBuilder.where(
      'student.firstname LIKE :name OR student.lastname LIKE :name',
      {
        name: `%${name}%`,
      },
    );
  }

  const itemCount = await queryBuilder.getCount();
  const { entities } = await queryBuilder.getRawAndEntities();
  const pageMetaDto = new PageMetaDto({ searchOptions, itemCount });
  return { data: entities, meta: { ...pageMetaDto } };
};
