import { CIPHER_METHOD, SUPPORTED_CIPHERS } from "./constants";
import { EncryptionFactory } from "./encryption";

type TestCase = {
  method: CIPHER_METHOD;
  text: string;
  key: string;
  expectedEncrypted: string;
  expectedDecrypted: string;
};

describe("Encryption", () => {
  const testCases: TestCase[] = [
    {
      method: SUPPORTED_CIPHERS.CAESAR,
      text: "юнит тест",
      key: "3",
      expectedEncrypted: "брлх хзфх",
      expectedDecrypted: "юнит тест",
    },
    {
      method: SUPPORTED_CIPHERS.VIGENERE,
      text: "юнит тест",
      key: "тест",
      expectedEncrypted: "ртъе ейге",
      expectedDecrypted: "юнит тест",
    },
  ];

  it.each(testCases)(
    "should properly encrypt and decrypt using $method cipher",
    ({ method, text, key, expectedEncrypted, expectedDecrypted }) => {
      const cipher = EncryptionFactory.createEncryptionMethod(method);

      const encryptedText = cipher.encrypt({ text, key });
      const decryptedText = cipher.decrypt({ text: encryptedText, key });

      expect(encryptedText).toEqual(expectedEncrypted);
      expect(decryptedText).toEqual(expectedDecrypted);
    }
  );

  describe("fail cases", () => {
    it("should throw an error if method is not supported", () => {
      const unknownMethod = "not supported" as CIPHER_METHOD;

      expect(() =>
        EncryptionFactory.createEncryptionMethod(unknownMethod)
      ).toThrow();
    });
  });
});
