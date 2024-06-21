import { Module } from '@nestjs/common';
import { CampaignsModule } from './campaigns/campaigns.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    CampaignsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
