import {
  Controller,
  Get,
  NotFoundException,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import { stat } from 'fs/promises';
import { createReadStream } from 'fs';
import { Response } from 'express';

@ApiTags('Alpha Upload Server')
@Controller('/upload_server/storage/default')
export class PimpsController {
  @Get('/alpha_motd.txt')
  async getManifest(@Res({ passthrough: true }) res: Response) {
    return await this.sendLocalFile(`alpha_motd.txt`, res);
  }

  @Get('/network_configuration_062.bin')
  async getConfig(@Res({ passthrough: true }) res: Response) {
    return await this.sendLocalFile(`network_configuration_062.bin`, res);
  }

  private async sendLocalFile(path: string, res: Response) {
    path = join(process.cwd(), `public/storage/title/tracked/06481`, path);

    const stats = await stat(path);

    if (!stats.isFile()) throw new NotFoundException();

    res.set('Content-Length', stats.size.toString());
    res.set('Cache-Control', 'no-cache');
    return new StreamableFile(createReadStream(path));
  }
}
