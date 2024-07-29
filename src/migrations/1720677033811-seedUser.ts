import { MigrationInterface, QueryRunner } from 'typeorm';
import { userSeed } from '../seeds/user.seed';
import { roleSeed } from '../seeds/role.seed';
import { Permission } from '../entities/user/permission.entity';
import { generatePermissions } from '../utilities/generatePermission.utility';
import { categorySeed } from '../seeds/category.seed';
import { officeInfoSeed } from '../seeds/office-info.seed';
import { tagSeed } from '../seeds/tag.seed';

export class SeedPermissionsAndRoles1620677033811
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Use the queryRunner to get the repository
    const roleRepository = queryRunner.manager.getRepository('role');
    const userRepository = queryRunner.manager.getRepository('user');
    const categoryRepository = queryRunner.manager.getRepository('category');
    const officeInfoRepository = queryRunner.manager.getRepository('office_info');
    const tagRepository = queryRunner.manager.getRepository('tag');
    const permissionRepository =
    queryRunner.manager.getRepository(Permission);

    // roleSeed
    await roleRepository.save(roleSeed);

    // categorySeed
    await categoryRepository.save(categorySeed);

    // userSeed
    await userRepository.save(userSeed);

    // officeInfoSeed
    await officeInfoRepository.save(officeInfoSeed);

    // tagInfoSeed
    await tagRepository.save(tagSeed);

    // permissionsSeed
    const permissionSeed = await generatePermissions();

    for (const permission of permissionSeed) {
      const permissionExists = await permissionRepository.findOne({
        where: { codename: permission.codename },
      });

      if (!permissionExists) {
        const newPermission = permissionRepository.create(permission);
        await permissionRepository.save(newPermission);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Use the queryRunner to get the repository
    const permissionRepository =
      queryRunner.manager.getRepository(Permission);
    const permissionSeed = await generatePermissions();

    for (const permission of permissionSeed) {
      await permissionRepository.delete({
        codename: permission.codename,
      });
    }
  }
}
