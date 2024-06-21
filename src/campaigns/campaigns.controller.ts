import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CampaignsService } from './campaigns.service';
import { CampaignsDto } from './campaigns.dto';

@ApiTags('campaigns')
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new campaign' })
  @ApiResponse({ status: 201, description: 'The campaign has been successfully created.' })
  create(@Body() createCampaignDto: CampaignsDto) {
    return this.campaignsService.create(createCampaignDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  @ApiResponse({ status: 200, description: 'Return all campaigns.' })
  findAll() {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a campaign by ID' })
  @ApiResponse({ status: 200, description: 'Return a single campaign.' })
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a campaign by ID' })
  @ApiResponse({ status: 200, description: 'The campaign has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateCampaignDto: CampaignsDto) {
    return this.campaignsService.update(id, updateCampaignDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a campaign by ID' })
  @ApiResponse({ status: 200, description: 'The campaign has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(id);
  }
}
