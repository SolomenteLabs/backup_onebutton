// src/MsgMint.ts
import { Writer, Reader } from "protobufjs/minimal";

export interface MsgMint {
  sender: string;
  recipient: string;
  coin: {
    denom: string;
    amount: string;
  };
}

export const MsgMint = {
  encode(message: MsgMint, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.sender);
    writer.uint32(18).string(message.recipient);
    writer.uint32(26).fork();
    writer.uint32(10).string(message.coin.denom);
    writer.uint32(18).string(message.coin.amount);
    writer.ldelim();
    return writer;
  },
};
