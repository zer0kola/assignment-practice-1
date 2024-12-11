## 실행 방법

```shell
cd apps
yarn install
yarn start-server
yarn start-client
```
## test 
  ```shell
  yarn test-client:watch
  ```

## 주요 사용 라이브러리

1. tanstack/react-query
2. jotai
3. chakra-ui
4. recharts
5. tanstack/react-table
6. ky

## 구현시 고려한 사항
1. chakra ui를 사용하여 스타일 코드를 최대한 추가하지 않도록 구현하였습니다.
2. 에러 발생시 필요한 부분에서 Error Boundary를 추가하여 유저가 재시도 할 수 있도록 하였습니다.
3. 유저 검색의 경우 SearchInput에서 에러 초기화가 어려워 에러바운더리를 사용하지 않았습니다.
4. 컴포넌트를 작은 단위로 설정하여 유지보수에 용이하도록 구현하였습니다.
5. 로딩 스피너와 skeleton으로 로딩 처리를 시도하였습니다.
6. 유저 동작으로 인해 예외가 발생하거나 클라이언트에서 데이터를 가공하는 부분부터 테스트를 설정하였습니다.


## 특이사항

1. /backend/src/purchaseFrequency.ts 의 8L에서 Math.random()이 항상 1미만을 반환하여 threshold 를 0.5로 설정하였습니다.
2. 기존 README.md의 GET /api/customer/{id}/purchases 경로명이 잘못 설정되어있습니다.