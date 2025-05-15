import { Injectable } from '@nestjs/common';
import { EthersService } from '../../ethers/ethers.service';

@Injectable()
export class DatatypeService {
  constructor(private readonly ethersService: EthersService) {}

  async positive(value?: number) {
    try {
      // Todo: value 유무에 따라 positiveNumber와 setPositiveNumber의 값을 리턴합니다.

      if (value) {
        // 있을 때
        return await this.ethersService.setPositiveNumber(value);
      } else {
        // 없을 때
        return await this.ethersService.positiveNumber();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async negative(value?: number) {
    try {
      // Todo: value 유무에 따라 negativeNumber와 setNegativeNumber의 값을 리턴합니다.

      if (value) {
        // 있을 때
        return await this.ethersService.setNegativeNumber(value);
      } else {
        // 없을 때
        return await this.ethersService.negativeNumber();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async isActive() {
    try {
      // Todo: isActive의 값을 리턴합니다.
      return await this.ethersService.isActive();
    } catch (error) {
      console.log(error);
    }
  }

  async toggleActive() {
    try {
      // Todo: toggleActive의 값을 리턴합니다.
      return await this.ethersService.toggleActive();
    } catch (error) {
      console.log(error);
    }
  }

  async recipient() {
    try {
      // Todo: recipient의 값을 리턴합니다.
      return await this.ethersService.recipient();
    } catch (error) {
      console.log(error);
    }
  }

  async wallet(address?: string) {
    try {
      // Todo: address 유무에 따라 wallet과 setWallet의 값을 리턴합니다.

      if (address) {
        // 있을 때
        return await this.ethersService.setWallet(address);
      } else {
        // 없을 때
        return await this.ethersService.wallet();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fixedData(data?: string) {
    try {
      // Todo: data 유무에 따라 fixedData와 setFixedData의 값을 리턴합니다.
      // ⚠️ data가 byte 형의 데이터인지 확인해야 합니다.(isBytesLike)
      // ⚠️ (byte형이 아닐 시) string -> bytes32(encodeBytes32String)
      // ⚠️ data의 길이는 32바이트로 패딩해야 합니다.(zeroPadValue32)

      if (data) {
        // 있을 때

        // data가 byte형인지 확인
        const isByte = await this.ethersService.isBytesLike(data);

        if (isByte) {
          // byte형일 때
          const padded = await this.ethersService.zeroPadValue32(data);
          return await this.ethersService.setFixedData(padded);
        } else {
          // byte형이 아닐 때

          const encoded = await this.ethersService.encodeBytes32String(data);
          const padded = await this.ethersService.zeroPadValue32(encoded);
          return await this.ethersService.setFixedData(padded);
        }
      } else {
        // 없을 때
        return await this.ethersService.fixedData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async dynamicData(data?: string) {
    try {
      // Todo: data 유무에 따라 dynamicData와 setDynamicData의 값을 리턴합니다.
      // ⚠️ data가 byte 형의 데이터인지 확인해야 합니다.(isBytesLike)
      // ⚠️ (byte형이 아닐 시) string -> bytes(toUtf8Bytes)

      if (data) {
        // 있을  => setter

        // data가 byte형인지 확인
        const isByte = await this.ethersService.isBytesLike(data);

        if (isByte) {
          // byte형일 때
          return await this.ethersService.setDynamicData(data);
        } else {
          // byte형이 아닐 때
          const bytes = await this.ethersService.toUtf8Bytes(data);
          return await this.ethersService.setDynamicData(bytes);
        }
      } else {
        // 없을 때
        return await this.ethersService.dynamicData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getDynamicDataLength() {
    try {
      // Todo: getDynamicDataLength의 값을 리턴합니다.
      return await this.ethersService.getDynamicDataLength();
    } catch (error) {
      console.error(error);
    }
  }

  async currentState(state?: number) {
    try {
      // Todo: state 유무에 따라 currentState와 setState의 값을 리턴합니다.

      if (state) {
        // 있을 때
        return await this.ethersService.setState(state);
      } else {
        // 없을 때
        return await this.ethersService.currentState();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getDetails() {
    try {
      // Todo: getDetails의 값을 리턴해야 합니다.
      // ⚠️ bigint 타입은 JSON으로 변환 시 string으로 변환 필요

      const details = await this.ethersService.getDetails();
      // const result = details.map((item) => {
      //   if (typeof item === 'bigint') {
      //     return item.toString();
      //   } else {
      //     return item;
      //   }
      // });
      // return result;

      const parsed = JSON.parse(
        JSON.stringify(details, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value
        )
      );

      return parsed;
    } catch (error) {
      console.error(error);
    }
  }
}
