## **1. 데모 영상**

![(https://ifh.cc/g/p0k9dY.jpg)]

👉 [영상 보러가기](https://ifh.cc/v/oppC60.mp4)

## **2. 프로젝트 소개**

- [마이라얼트립](https://www.myrealtrip.com/) 사이트 클론 프로젝트
- '국내 숙소' 카테고리를 한정으로 구현하였습니다.
- 배경으로 video태그를 사용하여 동영상 효과를 구현하였습니다.
- querystring을 이용해 필터링기능을 구현하였습니다.
- react library를 사용해 컴포넌트 형태로 다양한 기능(모달창, slider, carousel, calendar, rate 등)을 구현하였습니다.
- 카카오 API를 통한 소셜로그인 기능을 구현하였습니다.

### **1) 프로젝트 선정이유**

- 세세한 기능이 많은 사이트이다.
- 다양한 UI, 기능, 통신 등을 구현할 수 있어 성장에 도움이 될 것이라고 판단했다.

### **2) 개발 인원 및 기간**

- 개발기간 : 2022/07/04 ~ 2022/07/15
- 개발 인원

  - 프론트엔드(4명) : 김인태, 정현준, 조예지 , 장류광
  - 백엔드(2명) : 박민하, 정진관

- 담당파트
  - 김인태 : 로그인 회원가입 / 장바구니
  - 정현준 : 상세페이지
  - 조예지 : 검색 리스트 페이지
  - 장류광 : Nav / footer / Main 페이지
- [백엔드 github 링크](https://github.com/wecode-bootcamp-korea/34-2nd-Fake-Trip-backend)

## **3. 적용 기술 및 구현 기능**

### **적용 기술**

- Front-End : HTML, Styled-component, Javascript , React , React Router, Slider, Carousel, antd, axios, Rangepicker, calender, dropdown

### **구현 기능**

#### productNav

- DeatailHeader의 scrollY 값이 over 됫을때, 나타나게 한다.
- react-scroll 라이브러리의 Link로 클릭시 scrollY 이동 구현

#### DetailHeader

- 구글지도에 링크를 product의 위도,경도 데이터와 함께 걸어둔다.
- 라이브러리 antd의 Carousel, Modal, Rate 를 구현했다.
- MainImage는 백엔드로부터 오는데, SubImage와 함께온다. is_Main=(boolean) 으로 구별하는 로직을 구현했다.
- MainImage, SubImage 합 총 5장만 나타내기위해 overflow:hidden으로 숨긴다.

#### SideBar

- srollY 가 Nav를 over 했을 때, position:fix 를 걸어주고, react-scroll Link로 클릭시 scrollY 이동을 구현하였다.

#### detail Optional

- antd Library 의 DatePicker, Dropdown의 value 값을 state로 저장한 후, 클릭시 navigate로 QueryString값을 담아 이동, Location.search 로 Query 값을 뽑은후에 백엔드와 통신후, 데이터를 받아 새로 랜더링을 하여 조건에 맞는 데이터만 화면에 나타낸다.
- 예약버튼 클릭시, 랜더링 됬을때의 값을 QueryString 값을 담아 Booking page로 이동시킨다.

#### ProductInformation

- 반복되는 태그, 데이터를 줄이기위해 상수데이터를 작성하고 map() 메서드를 사용했다.

#### CustomerReview

- userRating의 키값을 int(1~5)로, Default 값을 0으로 하는 객체를 만든다. 백엔드의 데이터를 userReview state로 저장 후, userReview의 rating(int(1~5)) 와 userRating의 키값과 비교 후, 같은 값이 있다면, value +1 을 해주어 리뷰점수 분포 그래프 기능을 만들었다.
- text, imagefile 통신을 위해 axios, formData 를 활용했다. 백엔드에 Post 할 데이터를 (image, comment, Rating, product_id ) formData 에 append 하고 post 한다.

## **Reference**

- 이 프로젝트는 [마이리얼트립](https://www.myrealtrip.com/) 사이트를 참조하여 학습 목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
