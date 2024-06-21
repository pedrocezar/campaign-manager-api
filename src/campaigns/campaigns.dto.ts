import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsEnum } from 'class-validator';

export class CampaignsDto {
  @ApiProperty({ example: 'Campaigns DTO' })
  @IsString()
  name: string;

  @ApiProperty({ example: formatDate(new Date(new Date().getTime() + 1800000)) })
  @IsDate()
  dateStart: Date;

  @ApiProperty({ example: formatDate(new Date(new Date().getTime() + 86400000)) })
  @IsDate()
  dateEnd: Date;

  @ApiProperty({ example: 'active' })
  @IsEnum(['active', 'paused', 'expired'])
  status: string;

  @ApiProperty({ example: 'marketing' })
  @IsString()
  category: string;
}

function formatDate(date: Date): string {
  return date.toISOString().split('.')[0] + 'Z';
}
