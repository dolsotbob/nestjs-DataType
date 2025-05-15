import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ethers,
  zeroPadValue,
  encodeBytes32String,
  isBytesLike,
  toUtf8Bytes,
  BytesLike,
} from 'ethers';
import { abi, address } from '../../abis/DataType.json';

@Injectable()
export class EthersService {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private contract: ethers.Contract;

  constructor(private configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('RPC_URL');
    const privateKey = this.configService.get<string>('PRIVATE_KEY');

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.signer = new ethers.Wallet(privateKey!, this.provider);
    this.contract = new ethers.Contract(address, abi, this.signer);
  }

  async zeroPadValue32(data: string) {
    return zeroPadValue(data, 32);
  }

  async encodeBytes32String(data: string) {
    return encodeBytes32String(data);
  }

  async toUtf8Bytes(data: string): Promise<Uint8Array> {
    return toUtf8Bytes(data);
  }

  async isBytesLike(data: string) {
    return isBytesLike(data);
  }

  // 위 코드는 지우지 마세요.

  async positiveNumber() {
    // Todo: positiveNumber의 값을 리턴합니다.
    return await this.contract.positiveNumber();
  }

  async setPositiveNumber(value: number) {
    // Todo: setPositiveNumber의 값을 리턴합니다.
    // ⚠️ setter함수는 tx 확정 후 영수증을 리턴합니다.(wait)

    const tx = await this.contract.setPositiveNumber(value);
    const receipt = await tx.wait();
    return receipt;
  }

  async negativeNumber() {
    // Todo: negativeNumber의 값을 리턴합니다.

    return await this.contract.negativeNumber();
  }

  async setNegativeNumber(value: number) {
    // Todo: setNegativeNumber의 값을 리턴합니다.
    // ⚠️ setter함수는 tx 확정 후 영수증을 리턴합니다.(wait)

    const tx = await this.contract.setNegativeNumber(value);
    const receipt = await tx.wait();
    return receipt;
  }

  async isActive() {
    // Todo: isActive의 값을 리턴합니다.

    return await this.contract.isActive();
  }

  async toggleActive() {
    // Todo: toggleActive의 값을 리턴합니다.
    // ⚠️ setter함수는 tx 확정 후 영수증을 리턴합니다.(wait)

    const tx = await this.contract.toggleActive();
    const receipt = await tx.wait();
    return receipt;
  }

  async wallet() {
    // Todo: wallet의 값을 리턴합니다.

    return await this.contract.wallet();
  }

  async setWallet(address: string) {
    // Todo: setWallet의 값을 리턴합니다.
    // ⚠️ setter함수는 tx 확정 후 영수증을 리턴합니다.(wait)

    const tx = await this.contract.setWallet(address);
    const receipt = await tx.wait();
    return receipt;
  }

  async recipient() {
    // Todo: recipient의 값을 리턴합니다.

    return await this.contract.recipient();
  }

  async fixedData() {
    // Todo: fixedData의 값을 리턴합니다.

    return await this.contract.fixedData();
  }

  async setFixedData(data: string) {
    // Todo: setFixedData의 값을 리턴합니다.
    // ⚠️ setter함수는 tx 확정 후 영수증을 리턴합니다.(wait)

    const tx = await this.contract.setFixedData(data);
    const receipt = await tx.wait();
    return receipt;
  }

  async dynamicData() {
    // Todo: dynamicData의 값을 리턴합니다.

    return await this.contract.dynamicData();
  }

  async setDynamicData(data: BytesLike) {
    // Todo: setDynamicData의 값을 리턴합니다.
    // ⚠️ setter함수는 tx 확정 후 영수증을 리턴합니다.(wait)

    const tx = await this.contract.setDynamicData(data);
    const receipt = await tx.wait();
    return receipt;
  }

  async currentState() {
    // Todo: currentState의 값을 리턴합니다.

    return await this.contract.currentState();
  }

  async setState(state: number) {
    // Todo: setState의 값을 리턴합니다.
    // ⚠️ setter함수는 tx 확정 후 영수증을 리턴합니다.(wait)

    const tx = await this.contract.setState(state);
    const receipt = await tx.wait();
    return receipt;
  }

  async getDynamicDataLength() {
    // Todo: getDynamicDataLength의 값을 리턴합니다.

    return await this.contract.getDynamicDataLength();
  }

  async getDetails() {
    // Todo: getDetails의 값을 리턴합니다.

    return await this.contract.getDetails();
  }
}
