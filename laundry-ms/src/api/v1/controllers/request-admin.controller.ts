import { Controller, Inject, Logger } from "@nestjs/common";
import { ClientProxy, Ctx, EventPattern, RmqContext } from "@nestjs/microservices";
import { RequestAdminService, RequestService } from "../services";

@Controller()
export class RequestAdminController {
  private readonly logger: Logger = new Logger("REQUEST ADMIN CONTROLLER", true);
  constructor(
    private readonly requestService: RequestService,
    private readonly requestAdminService: RequestAdminService,
    @Inject('ADDRESS_SERVICE') private readonly addressClient: ClientProxy,
  ) {}

  @EventPattern("UD.Admin.Request.FindAll")
  public async findAll(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const requests = await this.requestAdminService.findAll();
      return requests;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }
}