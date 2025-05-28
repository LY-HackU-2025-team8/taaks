import { type ZodErrorMap, ZodIssueCode, ZodParsedType, util, z } from 'zod';

/** bigintまたはnumberをインクリメント */
function addOne(x: number | bigint): number | bigint {
  if (typeof x === 'bigint') {
    return x + 1n; // bigint の場合は 1n を足す
  } else {
    return x + 1; // number の場合は 1 を足す
  }
}

/** bigintまたはnumberをデクリメント */
function subtractOne(x: number | bigint): number | bigint {
  if (typeof x === 'bigint') {
    return x - 1n; // bigint の場合は 1n を引く
  } else {
    return x - 1; // number の場合は 1 を引く
  }
}

/** zodのエラーを日本語化する */
const errorMap: ZodErrorMap = (issue, _ctx) => {
  let message: string;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = 'この項目は必須です。';
      } else {
        message = `期待される型: ${issue.expected}、受け取った型: ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `無効なリテラルです。期待される値: ${JSON.stringify(
        issue.expected,
        util.jsonStringifyReplacer
      )}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `許可されていないキーが含まれています: ${util.joinValues(
        issue.keys,
        ', '
      )}`;
      break;
    case ZodIssueCode.invalid_union:
      message = 'どの型にも一致しません。';
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `無効な識別子です。期待される値: ${util.joinValues(
        issue.options
      )}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `不正な列挙値です。期待される値: ${util.joinValues(
        issue.options
      )}、受け取った値: '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = '関数の引数が無効です。';
      break;
    case ZodIssueCode.invalid_return_type:
      message = '関数の戻り値の型が無効です。';
      break;
    case ZodIssueCode.invalid_date:
      message = '日付の形式が無効です。';
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === 'object') {
        if ('includes' in issue.validation) {
          message = `文字列に "${issue.validation.includes}" を含める必要があります。`;
          if (typeof issue.validation.position === 'number') {
            message = `${message} 位置 ${issue.validation.position} 以降で。`;
          }
        } else if ('startsWith' in issue.validation) {
          message = `文字列は "${issue.validation.startsWith}" で始まる必要があります。`;
        } else if ('endsWith' in issue.validation) {
          message = `文字列は "${issue.validation.endsWith}" で終わる必要があります。`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== 'regex') {
        message = `無効な${issue.validation}です。`;
      } else {
        message = '形式が無効です。';
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === 'array')
        message = `配列の要素数は${
          issue.exact
            ? `ちょうど ${issue.minimum}`
            : issue.inclusive
              ? `最低 ${issue.minimum}`
              : `最低 ${addOne(issue.minimum)}`
        }要素である必要があります。`;
      else if (issue.type === 'string')
        message = `文字列は${
          issue.exact
            ? `ちょうど ${issue.minimum}`
            : issue.inclusive
              ? `最低 ${issue.minimum}`
              : `最低 ${addOne(issue.minimum)}`
        }文字以上である必要があります。`;
      else if (issue.type === 'number')
        message = `数値は${
          issue.exact
            ? `ちょうど ${issue.minimum}`
            : issue.inclusive
              ? `以上 ${issue.minimum}`
              : `より大きい ${issue.minimum}`
        }である必要があります。`;
      else if (issue.type === 'date')
        message = `日付は${
          issue.exact
            ? `ちょうど ${new Date(Number(issue.minimum))}`
            : issue.inclusive
              ? `以上 ${new Date(Number(issue.minimum))}`
              : `より後 ${new Date(Number(issue.minimum))}`
        }である必要があります。`;
      else message = '入力値が小さすぎます。';
      break;
    case ZodIssueCode.too_big:
      if (issue.type === 'array')
        message = `配列の要素数は${
          issue.exact
            ? `ちょうど ${issue.maximum}`
            : issue.inclusive
              ? `最大 ${issue.maximum}`
              : `最大 ${subtractOne(issue.maximum)}`
        }要素である必要があります。`;
      else if (issue.type === 'string')
        message = `文字列は${
          issue.exact
            ? `ちょうど ${issue.maximum}`
            : issue.inclusive
              ? `最大 ${issue.maximum}`
              : `最大 ${subtractOne(issue.maximum)}`
        }文字以下である必要があります。`;
      else if (issue.type === 'number')
        message = `数値は${
          issue.exact
            ? `ちょうど ${issue.maximum}`
            : issue.inclusive
              ? `以下 ${issue.maximum}`
              : `未満 ${issue.maximum}`
        }である必要があります。`;
      else if (issue.type === 'bigint')
        message = `BigIntは${
          issue.exact
            ? `ちょうど ${issue.maximum}`
            : issue.inclusive
              ? `以下 ${issue.maximum}`
              : `未満 ${issue.maximum}`
        }である必要があります。`;
      else if (issue.type === 'date')
        message = `日付は${
          issue.exact
            ? `ちょうど ${new Date(Number(issue.maximum))}`
            : issue.inclusive
              ? `以下 ${new Date(Number(issue.maximum))}`
              : `より前 ${new Date(Number(issue.maximum))}`
        }である必要があります。`;
      else message = '入力値が大きすぎます。';
      break;
    case ZodIssueCode.custom:
      message = '入力が無効です。';
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = '複数の型の交差結果をマージできませんでした。';
      break;
    case ZodIssueCode.not_multiple_of:
      message = `数値は${issue.multipleOf}の倍数でなければなりません。`;
      break;
    case ZodIssueCode.not_finite:
      message = '数値は有限である必要があります。';
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};

/** 呼び出すとZodのエラーメッセージを日本語化する */
export const zodConfig = () => {
  z.setErrorMap(errorMap);
};
