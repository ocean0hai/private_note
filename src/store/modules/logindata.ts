import { objType } from "@/type";
import { Random } from "@/uitls/getRandom.ts";
import { defineStore } from "pinia";
import { showSuccessToast, showFailToast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
import noteData from "./notedata.ts";
const { classifyArr } = noteData();
interface loginType {
  username: string;
  password: string;
}
const loginData = defineStore(
  "loginData",
  () => {
    const router = useRouter();
    const userArr = ref<Array<objType>>([
      {
        uid: "1",
        username: "123",
        password: "123",
      },
      {
        uid: "2",
        username: "12",
        password: "12",
      },
    ]);
    function userArrMap({ key, value }: { key: string; value: string }) {
      let check = false;
      userArr.value.map((item: any) => {
        if (item[key] === value) {
          check = true;
        }
      });
      return check;
    }
    function ModifyInfor(obj: objType) {
      const { username, oldpasswd, newpasswd } = obj;
      const uid = localStorage.getItem("uid");
      userArr.value.forEach((item: any) => {
        if (uid === item.uid) {
          if (item.password === oldpasswd) {
            let change = false;
            if (username === undefined) {
              item.password = newpasswd;
              showSuccessToast("修改成功！！");
              router.push({ path: "/login" });
              return;
            } else {
              userArr.value.map((it: any) => {
                if (it.username === username) {
                  change = true;
                  showSuccessToast("该用户名已经被占用！！");
                }
              });
              if (newpasswd !== undefined) item.password === newpasswd;
              if (!change) item.username = username;
            }
            if (!change) {
              showSuccessToast("修改成功！！");
              router.push({ path: "/login" });
            }
          } else showFailToast("原密码不对！！");
        }
      });
    }

    function userRegister({ username, password }: loginType) {
      const uid = Random() + "";
      if (userArrMap({ key: "username", value: username })) {
        showFailToast("该用户名已经被注册!!");
      } else {
        userArr.value.push({
          uid: uid,
          username,
          password,
        });
        showSuccessToast("注册成功！");
        const it = {
          class: "blue",
          uid: uid,
          text: "默认",
        };
        classifyArr.push(it)
      }
    }
    function userLogin({ username, password }: loginType) {
      let login = false;
      userArr.value.map((item: any) => {
        if (item.username === username) {
          if (item.password === password) {
            localStorage.setItem("uid", item.uid);
            login = true;
            console.log(item);
            showSuccessToast("登录成功！！");
            router.push({ path: "/home/note" });
          }
        }
      });
      if (!login) {
        showFailToast("用户名或密码错误！！");
        return false;
      }
    }
    return {
      ModifyInfor,
      userRegister,
      userLogin,
    };
  },
  {
    persist: true,
  }
);
export default loginData;
