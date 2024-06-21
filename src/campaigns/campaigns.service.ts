import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from './campaign.schema';
import { CampaignsDto } from './campaigns.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  async create(campaign: CampaignsDto): Promise<Campaign> {
    if (campaign.dateEnd <= campaign.dateStart) {
      throw new BadRequestException('End date must be later than start date');
    }

    if (new Date(campaign.dateStart) < new Date()) {
      throw new BadRequestException('Start date must be in the future');
    }

    return this.campaignModel.create(campaign);
  }

  async findAll(): Promise<Campaign[]> {
    return this.campaignModel.find({ isActive: true }).exec();
  }

  async findOne(id: string): Promise<Campaign> {
    const campaign = await this.campaignModel.findById(id).exec();
    if (!campaign || !campaign.isActive) {
      throw new NotFoundException(`Campaign with id ${id} not found`);
    }
    return campaign;
  }

  async update(id: string, updateData: CampaignsDto): Promise<Campaign> {
    if (updateData.dateEnd && updateData.dateStart && updateData.dateEnd <= updateData.dateStart) {
      throw new BadRequestException('End date must be later than start date');
    }

    if (updateData.dateStart && new Date(updateData.dateStart) < new Date()) {
      throw new BadRequestException('Start date must be in the future');
    }

    const existingCampaign = await this.findOne(id);
    existingCampaign.updatedAt = new Date();

    Object.assign(existingCampaign, updateData);

    if (new Date(existingCampaign.dateEnd) < new Date()) {
      existingCampaign.status = 'expired';
    }

    return this.campaignModel.findByIdAndUpdate(id, existingCampaign, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    const campaign = await this.findOne(id);
    campaign.isActive = false;
    await this.campaignModel.findByIdAndUpdate(id, campaign).exec();
  }
}
