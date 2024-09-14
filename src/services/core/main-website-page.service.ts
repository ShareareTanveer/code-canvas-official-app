import { GenericPageSection } from '../../entities/core/generic-page-section.entity';
import dataSource from '../../configs/orm.config';
import { OfficeInfo } from '../../entities/core/office-info.entity';
import { toIGenericPageSectionResponse } from './mapper/generic-page-section.mapper';
import { IGenericPageSectionResponse } from 'core/generic-page-section.interface';
import { Blog } from '../../entities/blog/blog.entity';
import { ProductCategory } from '../../entities/product/productCategory.entity';

const repository = dataSource.getRepository(GenericPageSection);
const officeRepository = dataSource.getRepository(OfficeInfo);
const blogRepository = dataSource.getRepository(Blog);
const productCategoryRepository = dataSource.getRepository(ProductCategory);

const getSectionByNameWithRelations = async (sectionName: string) => {
  return repository.findOne({
    where: { sectionName },
    relations: ['items'],
  });
};

const getSectionByName = async (sectionName: string): Promise<IGenericPageSectionResponse> => {
  const entity = await repository.findOne({ where: { sectionName } });
  if (!entity) {
    throw new Error('sectionName not found');
  }
  return toIGenericPageSectionResponse(entity);
};

const landingPageData = async () => {
  // Fetch all sections concurrently
  const sections = await Promise.all([
    getSectionByNameWithRelations('hero'),
    getSectionByNameWithRelations('pricing'),
    getSectionByNameWithRelations('Task Manager Feature'),
    getSectionByNameWithRelations('Global Product'),
    getSectionByNameWithRelations('Project Management'),
    getSectionByNameWithRelations('Voices of Confidence'),
    getSectionByNameWithRelations('Why Choose This'),
    getSectionByNameWithRelations('Frequently Asked Questions'),
    getSectionByNameWithRelations('Connect Fast'),
  ]);

  const [
    heroSection,
    pricingSection,
    taskManagerFeature,
    globalProduct,
    projectManagement,
    voicesOfConfidence,
    whyChooseThis,
    faq,
    connectFast,
  ] = sections;

  const [officeInfo, blogs, productCategory] = await Promise.all([
    officeRepository.createQueryBuilder().orderBy('id', 'ASC').getOne(),
    blogRepository.find({
      take: 4,
      order: { updatedAt: 'DESC' },
      relations: ['images', 'category'],
    }),
    productCategoryRepository.find(),
  ]);

  return {
    heroSection,
    taskManagerFeature,
    pricingSection,
    globalProduct,
    projectManagement,
    voicesOfConfidence,
    whyChooseThis,
    faq,
    connectFast,
    officeInfo,
    blogs,
    productCategory,
  };
};

export default {
  getSectionByName,
  landingPageData,
};
