export const memoize = <Input, Result>(fn: (input: Input) => Result) => {
  const memoMap = new Map<Input, Result>()
  return function (this: any, input: Input): Result {
    
    if (memoMap.has(input)) return memoMap.get(input)!
    
    const result = fn.call(this, input);
    memoMap.set(input, result)
    return result
  }
}
