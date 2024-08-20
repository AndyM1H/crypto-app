import { caesarCipher, vigenereCipher } from "./crypto-methods";

describe("crypto methods", () => {
  describe("caesar cipher", () => {
    it("should return properly encrypted text", () => {
      expect(caesarCipher("юнит тест", 3)).toEqual("брлх хзфх");
    });
    it("should return properly decrypted text", () => {
      expect(caesarCipher("брлх хзфх", 3, true)).toEqual("юнит тест");
    });
  });

  describe("vigenere cipher", () => {
    it("should return properly encrypted text", () => {
      expect(vigenereCipher("юнит тест", "тест")).toEqual("ртъе ейге");
    });
    it("should return properly decrypted text", () => {
      expect(vigenereCipher("ртъе ейге", "тест", true)).toEqual("юнит тест");
    });
  });
});
