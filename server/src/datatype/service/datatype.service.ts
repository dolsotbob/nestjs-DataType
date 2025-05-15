import { Injectable } from '@nestjs/common';
import { EthersService } from '../../ethers/ethers.service';
import { isBytesLike } from 'ethers';

@Injectable()
export class DatatypeService {
  constructor(private readonly ethersService: EthersService) { }

  async positive(value?: number) {
    try {
      // console.log('너 잘 나와??); 
      // Todo: value 유무에 따라 positiveNumber와 setPositiveNumber의 값을 리턴합니다.
      // value가 undefined면 getter 실행
      if (value === undefined) {
        return await this.ethersService.positiveNumber();
      }
      // setter
      return await this.ethersService.setPositiveNumber(value);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async negative(value?: number) {
    try {
      // Todo: value 유무에 따라 negativeNumber와 setNegativeNumber의 값을 리턴합니다.
      if (value !== undefined) {
        return await this.ethersService.setNegativeNumber(value);
      }

      return await this.ethersService.negativeNumber();
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
      if (address !== undefined) {
        return await this.ethersService.setWallet(address);
      }

      return await this.ethersService.wallet();
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

      //
      if (data !== undefined) {
        const isBytes = await this.ethersService.isBytesLike(data);
        let formattedData: string | Uint8Array;

        if (isBytes) {
          formattedData = data;
          formattedData = await this.ethersService.zeroPadValue32(formattedData);
        } else {
          formattedData = await this.ethersService.encodeBytes32String(data);
          formattedData = await this.ethersService.zeroPadValue32(formattedData);
        }

        return await this.ethersService.setFixedData(formattedData);
      }

      return await this.ethersService.fixedData();
    } catch (error) {
      console.log('fixedData error:', error);
      throw error;
    }
  }

  async dynamicData(data?: string) {
    try {
      // Todo: data 유무에 따라 dynamicData와 setDynamicData의 값을 리턴합니다.
      // ⚠️ data가 byte 형의 데이터인지 확인해야 합니다.(isBytesLike)
      // ⚠️ (byte형이 아닐 시) string -> bytes(toUtf8Bytes)
      if (data !== undefined) {
        const isBytes = await this.ethersService.isBytesLike(data);
        let formattedData: string | Uint8Array;

        if (isBytes) {
          formattedData = data;
        } else {
          formattedData = await this.ethersService.toUtf8Bytes(data);
        }

        return await this.ethersService.setDynamicData(formattedData);
      }

      return await this.ethersService.dynamicData();
    } catch (error) {
      console.log('dynamicData error:', error);
      throw error;
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
      if (state !== undefined) {
        return await this.ethersService.setState(state);
      }
      return await this.ethersService.currentState();
    } catch (error) {
      console.log('currentState error:', error);
      throw error;
    }
  }

  async getDetails() {
    try {
      // Todo: getDetails의 값을 리턴해야 합니다.
      // ⚠️ bigint 타입은 JSON으로 변환 시 string으로 변환 필요

      // (아래는 내가 처음 입력한 것; 자꾸 틀려서 지움 )
      // const [
      //   positiveNumber,
      //   negativeNumber,
      //   isActive,
      //   wallet,
      //   recipient,
      //   fixedData,
      //   dynamicData,
      //   currentState,
      // ] = await this.ethersService.getDetails();
      // console.log(positiveNumber);
      // console.log(positiveNumber.toString());
      // return {
      //   positiveNumber: positiveNumber.toString(),
      //   negativeNumber: negativeNumber.toString(),
      //   isActive,
      //   wallet,
      //   recipient,
      //   fixedData,
      //   dynamicData,
      //   currentState,
      // };

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
