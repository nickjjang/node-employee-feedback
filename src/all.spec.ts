import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AdminsController } from './modules/admins/admins.controller';
import { AuthAdminsController } from './modules/auth/auth-admins.controller';
import { ReviewsController } from './modules/reviews/reviews.controller';
import { EmployeesController } from './modules/employees/employees.controller';

describe('Controller', () => {
  let reviewsController: ReviewsController;
  let employeesController: EmployeesController;
  let adminsController: AdminsController;
  let authAdminsController: AuthAdminsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    employeesController = module.get<EmployeesController>(EmployeesController);
    reviewsController = module.get<ReviewsController>(ReviewsController);
    adminsController = module.get<AdminsController>(AdminsController);
    authAdminsController =
      module.get<AuthAdminsController>(AuthAdminsController);
  });

  it('should be defined', async () => {
    expect(employeesController).toBeDefined();
    expect(reviewsController).toBeDefined();
    expect(adminsController).toBeDefined();
    expect(authAdminsController).toBeDefined();
  });

  it('admins', async () => {
    await adminsController.create({
      firstName: 'Nick',
      lastName: 'Jackson',
      username: 'nickjackson',
      password: 'test1234',
    });
  });

  it('auth-admins', async () => {
    const user = await authAdminsController.signin({
      username: 'nickjackson',
      password: 'test1234',
    });
  });
});
