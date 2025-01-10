- @snailuu/base

  > README 每次发包才会更新，如果需要看最新的更新日志或文档，请前往 homepage 查看

  ## 更新日志

  ### 日志标识总览

  - (O) 对象
  - (D) 目录
  - (F) 函数
  - (I) 接口
  - (CV) 常量
  - (T) 类型
  - -> 别名

  

  ## v0.0.8

  新增

  - (F) toSyncFunc
  
  
  
  ### v0.0.7
  
  新增
  
  - (D) verify
    - (D) base
      - (F) isUrl
    - (D) array
      - (F) isArrayLike
      - (F) isArray
    - (D) caniuse
      - (F) caniuseCSSFeature
      - (F) caniuse
    - (D) function
      - (F) isAsyncFunc
      - (F) isConstructor
  
  更新 `verify` 分类下的函数， `isXXX`  等函数能直接断言其数据类型
  
  ### v0.0.6
  
  新增
  
  - (D) func-handle
    - (F) onceFunc
    - (F) memoize
    - (F) cacheByReturn
    - (F) tryCall
    - (F) tryCallFunc
    - (F) completion
    - (F) chunkTask

  修改

  - 修改 `getRandomString` 逻辑
  
  
  
  ### v0.0.5
  
  新增
  
  - （D) types
    - (T) THeadType
    - (T) TLastType
  - (D) utils
    - (T) GCArgs
    - (T) CookieOptions
    - (F) generateClassname
    - (F) generateCokkieInfo
  
  修改
  
  - 将 `any` 类型修改为 `unknown` 类型
  
  
  
  ### v0.0.4
  
  新增
  
  - (D) cirDep
    - (F) getType
  - (D) types
    - (T) TFunc
    - (T) TAnyFunc
    - (T) TArgsType
    - (T) GetArgs
    - (T) GetReturnType
  - (D) utils
    - (F) debounce
    - (F) throttle
    - (F) isTrue
    - (F) isFalse
    - (F) isArray
    - (F) isEmpty
    - (F) isFile
    - (F) isBlob
  
  
  
  ### v0.0.3
  
  新增
  
  - (D) utils
    - (F) isNull
    - (F) isNaN
    - (F) isNumber
    - (F) isPromise
  - (D) commom
    - (F) waring
    - (D) constant
      - (CV) EMPTY
      - (CV) STATIC_TYPE
  - (D) types 
    - (T) TAllType
  
  
  
  ### v0.0.2
  
  新增
  
  - (D) utils
    - (F) getNow
    - (F) getRandomString
    - (F) sleepAsync
  
  ### v0.0.1
  
  新增
  
  - (F) sleep
