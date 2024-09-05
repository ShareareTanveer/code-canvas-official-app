import { GenericPageSection } from '../../entities/core/generic-page-section.entity';
import dataSource from '../../configs/orm.config';
import { OfficeInfo } from '../../entities/core/office-info.entity';
import { toIGenericPageSectionResponse } from './mapper/generic-page-section.mapper';
import { IGenericPageSectionResponse } from 'core/generic-page-section.interface';
import { Blog } from '../../entities/blog/blog.entity';

const repository = dataSource.getRepository(GenericPageSection);
const officeRepository = dataSource.getRepository(OfficeInfo);
const blogRepository = dataSource.getRepository(Blog);

const getSectionByName = async (
  sectionName: string,
): Promise<IGenericPageSectionResponse> => {
  const entity = await repository.findOne({ where: { sectionName } });
  if (!entity) {
    throw new Error('sectionName not found');
  }
  return toIGenericPageSectionResponse(entity);
};

const landingPageData = async () => {
  const heroSection = await repository.findOne({
    where: { sectionName: 'hero' },
    relations: ["items"]
  });
  const pricingSection = await repository.findOne({
    where: { sectionName: 'pricing' },
    relations: ["items"]
  });
  const taskManagerFeature = await repository.findOne({
    where: { sectionName: 'Task Manager Feature' },
    relations: ["items"]
  });
  const globalProduct = await repository.findOne({
    where: { sectionName: 'Global Product' },
    relations: ["items"]

  });
  const projectManagement = await repository.findOne({
    where: { sectionName: 'Project Management' },
    relations: ["items"]
  });
  const voicesOfConfidence = await repository.findOne({
    where: { sectionName: 'Voices of Confidence' },
    relations: ["items"]
  });
  const whyChooseThis = await repository.findOne({
    where: { sectionName: 'Why Choose This' },
    relations: ["items"]
  });
  const faq = await repository.findOne({
    where: { sectionName: 'Frequently Asked Questions' },
    relations: ["items"]
  });
  const connectFast = await repository.findOne({
    where: { sectionName: 'Connect Fast' },
    relations: ["items"]
  });
  const officeInfo = await officeRepository
    .createQueryBuilder()
    .orderBy('id', 'ASC')
    .getOne();
    
  const blogs = await blogRepository.find({
    take: 4,
    order: {
      updatedAt: 'DESC',
    },
    relations: ['images', 'category'],
  });

  const data = {
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
  };
  return data;
};

export default {
  getSectionByName,
  landingPageData,
};
