
import Decimal from "decimal.js";


export class MoneyOps {
  /**
   * Converts a value to a clean balance string, with thousands separator and fixed decimals
   * Default locale: 'en-NG', default decimalPlaces: 2
   * Example: 1234567.5 -> "1,234,567.50"
   */
  static toBalance(
    value: Decimal.Value,
    options?: {
      locale?: Locales;
      decimalPlaces?: number;
    }
  ): string {
    const locale = options?.locale ?? 'en-NG';
  const decimalPlaces = options?.decimalPlaces ?? 2;

  const currency: Currency = localeCurrencyMap[locale] ?? 'NGN';

  const amount = new Decimal(value).toNumber();

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(amount);
  }

  /**
   * Converts a number, string, or Decimal to a Decimal instance
   */
  static toDecimal(value: Decimal.Value): Decimal {
    return new Decimal(value);
  }

  /**
   * Adds two values
   */
  static add(a: Decimal.Value, b: Decimal.Value): Decimal {
    return new Decimal(a).add(b);
  }

  /**
   * Subtracts b from a
   */
  static subtract(a: Decimal.Value, b: Decimal.Value): Decimal {
    return new Decimal(a).sub(b);
  }

  /**
   * Multiplies two values
   */
  static multiply(a: Decimal.Value, b: Decimal.Value): Decimal {
    return new Decimal(a).mul(b);
  }

  /**
   * Divides a by b with optional precision
   */
  static divide(
    a: Decimal.Value,
    b: Decimal.Value,
    precision?: number
  ): Decimal {
    const result = new Decimal(a).div(b);
    return precision !== undefined ? result.toDecimalPlaces(precision) : result;
  }

  /**
   * Compares two values
   * Returns: -1 if a < b, 0 if a == b, 1 if a > b
   */
  static compare(a: Decimal.Value, b: Decimal.Value): number {
    return new Decimal(a).cmp(b);
  }

  /**
   * Checks if two values are equal
   */
  static isEqual(a: Decimal.Value, b: Decimal.Value): boolean {
    return new Decimal(a).equals(b);
  }

  /**
   * Formats value to fixed decimal places
   */
  static toFixed(value: Decimal.Value, decimalPlaces = 2): string {
    return new Decimal(value).toFixed(decimalPlaces);
  }

  /**
   * Returns percentage (e.g. 15% of 200)
   */
  static percentOf(percent: Decimal.Value, total: Decimal.Value): Decimal {
    return new Decimal(total).mul(new Decimal(percent).div(100));
  }

  /**
   * Rounds to nearest integer or decimal places
   */
  static round(value: Decimal.Value, decimalPlaces = 0): Decimal {
    return new Decimal(value).toDecimalPlaces(
      decimalPlaces,
      Decimal.ROUND_HALF_UP
    );
  }
}

export type Currency = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AED' | 'CHF' | 'CNY' | 'INR' | 'CAD' | 'QAR' | 'SAR'
export type Locales = 'en-NG' | 'en-US' | 'en-GB' | 'fr-FR' | 'de-DE';

export const localeCurrencyMap: Record<Locales, Currency> = {
    'en-NG': 'NGN',
    'en-US': 'USD',
    'en-GB': 'GBP',
    'fr-FR': 'EUR',
    'de-DE': 'EUR',
};