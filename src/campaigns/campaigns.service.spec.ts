import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CampaignsService } from './campaigns.service';
import { Campaign, CampaignDocument } from './campaign.schema';
import { CampaignsDto } from './campaigns.dto';

const mockCampaign = (
  id: string,
  name = 'Test Campaign',
  dateStart = new Date(Date.now() + 86400000),
  dateEnd = new Date(Date.now() + 172800000),
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

describe('CampaignsService', () => {
  let service: CampaignsService;
  let model: Model<CampaignDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignsService,
        {
          provide: getModelToken(Campaign.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockCampaign('1')),
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            exec: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CampaignsService>(CampaignsService);
    model = module.get<Model<CampaignDocument>>(getModelToken(Campaign.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a campaign', async () => {
    const campaignData = mockCampaign('1');
    const createdCampaignMock = {
      ...campaignData,
      save: jest.fn().mockResolvedValue(campaignData),
    };
    jest.spyOn(model, 'create').mockImplementationOnce(() => createdCampaignMock as any);
    const createdCampaign = await service.create(campaignData as Campaign);
    expect(createdCampaign._id).toEqual(campaignData._id);
  });

  it('should find all campaigns', async () => {
    const campaignArray = [mockCampaign('1'), mockCampaign('2')];
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(campaignArray),
    } as any);
    const campaigns = await service.findAll();
    expect(campaigns).toEqual(campaignArray);
  });

  it('should find a campaign by id', async () => {
    const campaign = mockCampaign('1');
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(campaign),
    } as any);
    const foundCampaign = await service.findOne('1');
    expect(foundCampaign).toEqual(campaign);
  });

  it('should update a campaign', async () => {
    const campaign = mockCampaign('1');
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(campaign as Campaign);
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(campaign),
    } as any);
    const updatedCampaign = await service.update('1', { name: 'Updated Campaign'} as CampaignsDto);
    expect(updatedCampaign).toEqual(campaign);
  });

  it('should remove (soft delete) a campaign', async () => {
    const campaign = mockCampaign('1');
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(campaign as Campaign);
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce({ ...campaign, isActive: false }),
    } as any);
    await service.remove('1');
    expect(campaign.isActive).toEqual(false);
  });
});
