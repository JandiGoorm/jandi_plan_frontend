import styles from "./MyInfo.module.css";
import { Input, Button } from "@/components";
import {userInfo} from "../constants";
const MyInfo = () => {

    return(
        <div className={styles.container}>
            <div className={styles.basic_info_container}>
                <div className={styles.title_box}>
                    <p className={styles.title}>기본 정보</p>
                </div>
                <div className={styles.info_box}>
                    <div className={styles.user_photo_box}>
                        <img src={userInfo.profile_url} alt="profile_img" className={styles.user_photo}/>
                    </div>
                    <div className={styles.basic_info_box}>
                        <div className={styles.basic_info}>
                            <p className={styles.info_name}>Name</p>
                            <p className={styles.info_value}>{userInfo.name}</p>
                        </div>
                        <div className={styles.basic_info}>
                            <p className={styles.info_name}>email</p>
                            <p className={styles.info_value}>{userInfo.email}</p>
                        </div>
                        <div className={styles.basic_info}>
                            <p className={styles.info_name}>Join Date.</p>
                            <p className={styles.info_value}>{userInfo.joinDate}</p>
                        </div>
                        <div className={styles.basic_info}>
                            <p className={styles.info_name}>NickName</p>
                            <p className={styles.info_value}>{userInfo.nickname}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.pw_info_box}>
                <div className={styles.title_box}>
                    <p className={styles.title}>비밀번호 변경</p>
                </div> 
                <div className={styles.plan_columns}>
                    <div className={styles.input_name}>현재 비밀번호</div>
                    <Input 
                        size="md" 
                        placeholder="New Password"  
                        type="text" style={{ width: '50%' }} 
                    />
                </div>
                <div className={styles.plan_columns}>
                    <div className={styles.input_name}>새 비밀번호</div>
                    <Input 
                        size="md" 
                        placeholder="New Password"  
                        type="text" style={{ width: '50%' }} 
                    />
                </div>
                <div className={styles.plan_columns}>
                    <div className={styles.input_name}>새 비밀번호 재입력</div>
                    <Input 
                        size="md" 
                        placeholder="New Password"  
                        type="text" style={{ width: '50%' }} 
                    />
                </div>
            </div>
            <div className={styles.button_container}>
                <Button size="lg" variant="solid">확인</Button>
            </div>
        </div>
    )
}

export default MyInfo;