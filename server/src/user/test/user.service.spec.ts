import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

const mockUserRepository = () => ({
  findUserByEmail: jest.fn((email) => {
    if (email === 'exists') {
      return '이미 존재하는 사용자입니다.';
    }
    return null;
  }),
  createUserLocal: jest.fn(),
});

describe('UserService', () => {
  let spyUserService: UserService;
  let spyUserRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    spyUserService = module.get<UserService>(UserService);
    spyUserRepository = module.get<UserRepository>(UserRepository);
  });

  describe('createUser', () => {
    const mockCreateUserDto: CreateUserDto = {
      email: 'test@example.com',
      nick: 'test_nick',
      password: 'test_password',
    };

    it('새 유저 생성', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('test_hash');
      const result = await spyUserService.createUser(mockCreateUserDto);

      expect(spyUserRepository.findUserByEmail).toBeCalledWith(
        mockCreateUserDto.email,
      );
      expect(bcrypt.hash).toBeCalledWith(mockCreateUserDto.password, 12);
      expect(spyUserRepository.createUserLocal).toBeCalledWith({
        email: mockCreateUserDto.email,
        nick: mockCreateUserDto.nick,
        password: 'test_hash',
      });
      expect(result).toEqual({ status: 201, success: true });
    });
  });
});
