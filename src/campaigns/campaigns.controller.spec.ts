import { Test, TestingModule } from '@nestjs/testing';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './campaign.schema';
import { CampaignsDto } from './campaigns.dto';

const mockCampaign = (
  id: string,
  name = 'Test Campaign',
  dateStart = new Date(),
  dateEnd = new Date(Date.now() + 86400000),
  status = 'active',
  category = 'marketing',
  isActive = true,
): Partial<Campaign> => ({
  _id: id,
  name,
  dateStart,
  dateEnd,
  status,
  category,
  isActive,
});

describe('CampaignsController', () => {
  let controller: CampaignsController;
  let service: CampaignsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignsController],
      providers: [
        {
          provide: CampaignsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CampaignsController>(CampaignsController);
    service = module.get<CampaignsService>(CampaignsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a campaign', async () => {
    const campaign = mockCampaign('1');
    jest.spyOn(service, 'create').mockResolvedValue(campaign as Campaign);
    const result = await controller.create(campaign as Campaign);
    expect(result).toEqual(campaign);
  });

  it('should find all campaigns', async () => {
    const campaignArray = [mockCampaign('1'), mockCampaign('2')];
    jest.spyOn(service, 'findAll').mockResolvedValue(campaignArray as Campaign[]);
    const result = await controller.findAll();
    expect(result).toEqual(campaignArray);
  });

  it('should find a campaign by id', async () => {
    const campaign = mockCampaign('1');
    jest.spyOn(service, 'findOne').mockResolvedValue(campaign as Campaign);
    const result = await controller.findOne('1');
    expect(result).toEqual(campaign);
  });

  it('should update a campaign', async () => {
    const campaign = mockCampaign('1');
    jest.spyOn(service, 'update').mockResolvedValue(campaign as Campaign);
    const result = await controller.update('1', { name: 'Updated Campaign' } as CampaignsDto);
    expect(result).toEqual(campaign);
  });

  it('should remove (soft delete) a campaign', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue();
    await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
