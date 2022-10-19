import {KakaoService} from 'src/auth/kakao.service';
import {URLSearchParams} from 'url';

describe('test', () => {
  test('getUserProperties', async () => {
    const sut = new KakaoService();

    const form = new URLSearchParams({
      property_keys: ['email_needs_agreement', 'kakao_account.email'],
    }).toString();
    console.log('form', form);

    // 최초 진입할때의 KakaoToken
    const actual = await sut.getUserProperties(
      '6oAQdKvaGtpGNJfFJJnT5rsZl26VcU1PduoMzv1HCilv1AAAAYN95uEz',
    );
    // console.log('actual', actual.kakao_account.email);

    // expect(actual.kakao_account.email).toBe('chl9741@hanmail.net');
  });
});
