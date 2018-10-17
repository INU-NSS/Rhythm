### Rhythm Solar Radiation Information

---

##### 2018.10.17 UPDATE

- Done
    - pi, web, lora 차트 구현 (24시간)
    - pi 실시간 일사량 차트 구현 (1시간)
    - pi, web, lora 실시간 테이블 구현 (현재 값)
    - 코드 통합 및 최적화
    - 페이지 요청 시 즉각 업데이트 반영
    - Map 위치 변경

- To Do
    - 실시간 일사량 차트 인터페이스 변경 여부 확인 (시작 위치)
    - 디버그 및 예외처리
    - Map 페이지 option, refresh 버튼 삭제

---

#### System Structure
이 응용 프로그램은 크게 **웹서버**, **데이터서버** 및 **데이터베이스**로 구성되어있다. 데이터 서버는 다양한 플랫폼으로부터 실시간 일사량을 측정하거나 추정하여 데이터베이스에 저장하고, 웹서버는 이 정보를 그래프 또는 테이블로 제공한다.

> 데이터 서버에 현재 연결된 플랫폼은 *라즈베리 파이*, *웹*, *LoRa 노드* 세 가지 종류로 평균적으로 10초마다 일사량 관련 정보를 데이터베이스로 저장한다. 플랫폼에 따라 측정 주기는 저장 주기보다 짧을 수 있다.

이 응용 프로그램은 아래와 같은 폴더 구조를 갖는다.

```
.
├── dataserver
│   ├── platforms
│   └── REST
├── db
│   ├── collections
│   ├── queries
│   └── utils
└── webserver
    ├── assets
    │   ├── js
    │   └── stylesheets
    ├── interfaces
    ├── keys
    ├── routes
    └── views
        └── contents
```

- dataserver
    - platforms: 위에서 열거한 3개의 플랫폼에 대한 코드 파일이 있으며, 각각의 파일은 해당 플랫폼으로부터 센싱한 정보를 획득하여 데이터베이스에 저장하는 코드를 포함한다.
    - REST: 웹 플랫폼은 일사량을 추정하기 위해 기상청이 제공하는 기상정보와 한국천문학연구원이 제공하는 태양 고도각 정보를 이용한다. 이 정보들을 가져오기 위해 REST API를 사용하여 필요한 정보를 parsing 하는 코드 파일이 존재한다.
- db
    - collections: 각 플랫폼이 제공하는 정보에 대한 스키마를 정의한다.
    - queries: 웹 서버에서 필요로 하는 쿼리를 정의한다.
    - utils: MongoDB는 UTC timezone을 사용하기 때문에 GMT를 기준으로 계산하기 위한 날짜 관련 유틸리티를 제공한다.
- webserver
    - assets: 웹 페이지에서 사용하는 스크립트 파일(*js*) 및 스타일(*stylesheet*)에 대한 정의가 담긴 파일들을 내포한다.
    - interfaces: 웹 페이지에 출력된 그래프 또는 테이블의 값을 실시간으로 제공하기 위한 websocket 인터페이스를 정의한다.
    - keys: 로그인한 사용자에 대한 세션 관리를 위한 키를 저장한다.
    - routes: 사용자가 요청하는 페이지를 라우팅하기 위한 코드가 포함되어있다.
    - views: 실제 사용자에게 보여지는 웹 페이지를 정의한다.

![structure](https://cl.ly/e807e7/Image%202018-10-17%20at%201.16.41%20PM.png)