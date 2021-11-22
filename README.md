<h2 align="center">MT - 원하는 MBTI와 성별을 골라 채팅할 수 있는 서비스</h2>
<br/>
<div align="center">
<img src="https://img.shields.io/badge/react native-000000?style=for-the-badge&logo=react&logoColor=#61DAFB">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=#764ABC">
<img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=#010101">
<img src="https://img.shields.io/badge/FCM-010101?style=for-the-badge&logo=firebase&logoColor=#FFCA28">
</div>
<br/>
<h3>앱 개발 정신</h3>
<h4> - 나도 쓰고 싶은 앱을 만들자.</h4>
<h4> - 랜덤채팅 앱 태생상 음지 분위기가 날수밖에 없다. 이 분위기를 타파하기 위해 디자인에서 최대한 양지 느낌이 나게 노력했다.</h4>
<h4> - 최대한 심플하고 직관적이며, 실용적인 기능들만 담으려고 노력하였다.</h4>
<h4> - 사용자 입장에서 편리하게끔 설계하려고 노력했다.</h4>
<br/>
<div>
  <h2>메인 스크린들( 대상 설정화면, 친구목록 화면 )의 기능</h2>
  <h3>공통 기능</h3>
  <h4> - 메인 스크린에는 터치 시 자신의 MBTI, 닉네임, 캐릭터를 바꿀 수 있는 설정(톱니바퀴) 버튼이 있다.</h4>
  <h4> - 다크모드, 화이트모드를 변경할 수 있다.</h4>
  <h4> - 두 메인 스크린을 왔다 갔다 할 수 있는 바텀탭이 있다.</h4>
  <h4> - 만약 현재 읽지 않은 톡이 있다면 바텀탭의 말풍선 우측상단에 안 읽은 수가 뜬다.</h4>
  <br/>
  <h3>1 . 대상 설정화면</h3>
  <h4> - 자신이 채팅하고 싶은 MBTI 유형들, 성별을 선택하고 매칭 시작을 누르면 채팅방으로 이동한다.</h4>
  <h4> - 단, 만약 자신이 24시간 안에 5번의 신고를 당했다면 3일간 안내 문구와 함께 입구 컷 당한다.</h4>
  <h4> - 아래 사진은 원하는 유형들과 성별을 선택하지 않아 매칭 시작을 누를 수 없게 되어있다.</h4>
  <br/>
  <img width="210" object-fit="contain" src="https://user-images.githubusercontent.com/72787759/142801759-bd41a865-772e-4f19-af30-5a2265f51ddf.jpg">
  <img width="210" object-fit="contain" src="https://user-images.githubusercontent.com/72787759/142801792-8f11db30-07b0-483a-9ba7-a9ef54a9cc8c.jpg">
  <br/><br/>
  <h3>2 . 친구목록 화면</h3>
  <h4> - 유저들에게 가장 친숙한 카카오톡과 유사하게 설계하였다.</h4>
  <h4> - 친구를 길게 누르면 친구의 닉네임 변경, 푸시알림 On/Off, 친구 삭제 기능이 있는 모달창이 뜬다.</h4>
  <h4> - 마지막 채팅이 나오고 옆에 안읽은 개수가 붉은 뱃지안에 표시된다.</h4>
  <h4> - 아래 사진은 따로 안읽은 채팅이 없기 때문에 뱃지가 없다. 실제로 앱으로 사귄 친구들이다.</h4>
  <br/>
  <img width="210" object-fit="contain" src="https://user-images.githubusercontent.com/72787759/142801795-8034dc5d-5e9d-405a-8fc8-44b3c77515da.jpg">
  <img width="210" object-fit="contain" src="https://user-images.githubusercontent.com/72787759/142806424-7f38b1d9-4458-4c88-90d5-133629d8a270.gif">
</div>
<br/><br/>
<div>
  <h2>채팅방들 ( 랜덤방, 친구방 )</h2>
  <h3>공통 기능</h3>
  <h4> - "채팅 인풋이 비어있다면 전송을 할 수 없다…" 와 같은 당연한 것들은 생략하겠다.</h4>
  <h4> - 채팅 세글자 이상 입력시 상대방에게 (...) 애니메이션 말풍선이 뜬다.</h4>
  <h4> - 상대방의 MBTI 유형마다 다른 색으로 상대방 말풍선이 나온다.</h4>
  <h4> - 전송 버튼이 활성화 돼 있을시 버튼이 상대 MBTI 유형 색깔로 채워진다.</h4>
  <br/>
  <h3>1 . 랜덤방</h3>
  <h4> - 기다리는 동안 어디서 많이 봤을 수도 있는 게임을 할 수 있다.</h4>
  <h4> - 불쾌한 유저, 오늘은 그만보고 싶은 유저 등을 앱 종료하기 전까지 차단할 수 있다.</h4>
  <h4> - 하루에 3번 신고를 할 수 있다. 신고하면 차단은 자동으로 된다.</h4>
  <img width="210" object-fit="contain" src="https://user-images.githubusercontent.com/72787759/142801797-d3f8c4be-3884-4b41-9616-c29b43d1cdd2.jpg">
  <img width="210" object-fit="contain" src="https://user-images.githubusercontent.com/72787759/142801799-c0c670e7-7abe-4c73-bfe5-2fbcfe6d74bf.jpg">
  <img width="210" object-fit="contain" src="https://user-images.githubusercontent.com/72787759/142801801-ede01be8-3435-4676-aee4-6e99f32d60ef.jpg">
  <img width="210" object-fit="contain" src="https://user-images.githubusercontent.com/72787759/142801803-e64d94f5-5af0-454a-8de8-334d7d2291e4.jpg">
  <img width="210" object-fit="contain" src="https://user-images.githubusercontent.com/72787759/142801804-37d1f90d-e174-4769-b976-d0ae232e215d.jpg">
  <img width="210" object-fit="contain" src="https://user-images.githubusercontent.com/72787759/142801805-17eccaa9-3fbd-4e98-b706-557353c9da05.jpg">
  <img width="210" object-fit="contain" src="https://user-images.githubusercontent.com/72787759/142801807-61a8fb1f-6270-4c60-9ebc-2fcd2cf1e2c4.jpg">
</div>



