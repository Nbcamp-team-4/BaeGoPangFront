// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  screens/auth/Login.jsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { Phone, Btn, Input, Divider } from "../../shared/components";
import { PRIMARY } from "../../shared/constants";

export default function Login({ go }) {
  return (
    <Phone noNav>
      <div style={{flex:1,padding:"28px 24px",display:"flex",flexDirection:"column",gap:"18px",justifyContent:"center"}}>
        <div style={{textAlign:"center",marginBottom:"4px"}}>
          <div style={{fontSize:"52px"}}>🍽️</div>
          <div style={{fontSize:"22px",fontWeight:900}}>배고팡</div>
        </div>
        <Btn variant="kakao" full><span style={{fontSize:"17px"}}>💬</span>카카오로 시작하기</Btn>
        <Divider label="또는 아이디로 로그인"/>
        <div style={{display:"flex",flexDirection:"column",gap:"9px"}}>
          <Input placeholder="아이디"/>
          <Input placeholder="비밀번호"/>
        </div>
        <Btn variant="primary" full onClick={()=>go("home")}>로그인</Btn>
        <div style={{display:"flex",justifyContent:"center",gap:"16px",fontSize:"12px",color:"#9E9E9E"}}>
          <span style={{cursor:"pointer"}}>아이디 찾기</span>
          <span>|</span>
          <span style={{cursor:"pointer"}}>비밀번호 찾기</span>
          <span>|</span>
          <span onClick={()=>go("signup")} style={{color:PRIMARY,fontWeight:700,cursor:"pointer"}}>회원가입</span>
        </div>
      </div>
    </Phone>
  );
}