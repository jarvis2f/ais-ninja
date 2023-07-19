import {GenerationServiceClient, ResponseStream} from "./generation/generation_pb_service";
import {grpc as GRPCWeb, grpc} from "@improbable-eng/grpc-web";
import * as generation_pb from "./generation/generation_pb";
import {Answer, ChainRequest} from "./generation/generation_pb";
import {NodeHttpTransport} from "@improbable-eng/grpc-web-node-http-transport";

GRPCWeb.setDefaultTransport(NodeHttpTransport());

export class StabilityAPI extends GenerationServiceClient {

  readonly metadata?: grpc.Metadata;

  public readonly key: string;

  constructor(serviceHost: string, key: string) {
    super('https://grpc.stability.ai');
    const metadata = new GRPCWeb.Metadata();
    metadata.set("Authorization", "Bearer " + key);
    this.metadata = metadata;
    this.key = key;
  }

  generate(requestMessage: generation_pb.Request): ResponseStream<Answer> {
    return super.generate(requestMessage, this.metadata);
  }

  chainGenerate(requestMessage: ChainRequest): ResponseStream<Answer> {
    return super.chainGenerate(requestMessage, this.metadata);
  }

}
