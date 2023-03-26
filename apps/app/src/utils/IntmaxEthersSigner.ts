import { TypedDataDomain, TypedDataField, Wallet } from "ethers";
import { IntmaxWalletSigner } from "webmax";

export class IntmaxEthersSigner extends Wallet {
  constructor(private signer: IntmaxWalletSigner, private address: string) {
    super(Wallet.createRandom().privateKey);
  }

  async getAddress() {
    return this.address;
  }

  async signMessage(message: string | Uint8Array): Promise<string> {
    if (typeof message !== "string") throw new Error("message must be string");
    return (await this.signer.signMessage(message)) as string;
  }

  async signTypedData(
    domain: TypedDataDomain,
    types: Record<string, TypedDataField[]>,
    value: Record<string, any>
  ): Promise<string> {}
}
