import { defineStore } from "pinia";
import { showFailToast, showSuccessToast } from "vant";
import { objType } from "@/type";
import { ref } from "vue";
import { Random } from "@/uitls/getRandom";
interface checkType extends objType {
  key: string;
  value: string;
  operate: string;
}
const noteData = defineStore(
  "noteData",
  () => {
    //数据
    const data = ref<Array<any>>([
      {
        id: "1",
        uid: "1",
        title: "敲代码",
        note: `点击视图切换按钮，进⾏视图`,
        classify: "工作",
        time: "8-20",
      },
      {
        id: "2",
        uid: "1",
        title: "坐车",
        note: `点击视图切换按钮，进⾏视图切换。
笔记的录⼊：录⼊笔记标题，内容，选择标签分类（笔记录⼊时间⾃动添加）
笔记的查询：
7. “我的” 模块主要进⾏个⼈信息的修改，如⽤户名和密码的修改 。
8. 笔记的信息通过本地存储进⾏存储 。`,
        classify: "生活",
        time: "7-20",
      },
      {
        id: "3",
        uid: "2",
        title: "你好",
        note: `点击视图切换按钮`,
        classify: "日记",
        time: "8-20",
      },
      {
        id: "4",
        uid: "2",
        title: "睡觉",
        note: `点击视图切换按钮`,
        classify: "作息",
        time: "8-20",
      },
      {
        id: "5",
        uid: "2",
        title: "吃饭",
        note: `点击视图切换按钮`,
        classify: "饮食",
        time: "8-20",
      },
    ]);
    //历史记录
    const history = ref<Array<string>>(["吃饭", "睡觉", "打代码"]);
    const classifyArr = ref<Array<any>>([
      {
        id: "1",
        text: "默认",
        uid: "1",
        class: "blue",
      },
      {
        id: "2",
        text: "默认",
        uid: "2",
        class: "blue",
      },
      {
        id: "3",
        text: "饮食",
        uid: "2",
        class: "green",
      },
      {
        id: "4",
        text: "日记",
        uid: "2",
        class: "red",
      },
      {
        id: "5",
        text: "作息",
        uid: "2",
        class: "green",
      },
      {
        id: "6",
        text: "工作",
        uid: "1",
        class: "pink",
      },
      {
        id: "7",
        text: "生活",
        uid: "1",
        class: "blue",
      },
    ]);

    //标签遍历函数
    function dataCheck({ key, value, operate }: checkType) {
      let check = true;
      const uid = localStorage.getItem("uid");
      data.value.map((item: any) => {
        if (item[key] === value) {
          if (item.uid === uid && operate === "uid") {
            check = false;
          } else if (operate === "edit") {
            check = false;
          }
        }
      });
      return check;
    }
    //对数据进行操作
    function addData(dataitem: any) {
      if (dataCheck({ key: "title", value: dataitem.title, operate: "uid" })) {
        data.value.push(dataitem);
        showSuccessToast("保存成功！！");
        console.log(data.value);
      } else showFailToast("保存失败!!");
    }

    function deleteData(title: string) {
      let id = -1;
      data.value.map((item: any, i: number) => {
        if (item.title === title) {
          id = i;
        }
      });
      if (id !== -1) {
        data.value.splice(id, 1);
      }
    }
    function editData(newItem: objType) {
      const da = new Date();
      let iid = -1;
      data.value.map((item: any, i: number) => {
        if (item.id === newItem.id) iid = i;
      });
      data.value.splice(iid, 1);
      newItem["time"] = da.getMonth() + 1 + "-" + da.getDate();
      data.value.push(newItem);
      console.log(data.value);
    }
    //对历史记录操作
    function deleteHistory(id: number) {
      console.log(id);
      if (id === -2) {
        const len = history.value.length;
        history.value.splice(0, len);
      } else history.value.splice(id, 1);
    }
    function addHistory(str: string) {
      history.value.push(str);
    }

    //对分类标签的类型
    function addClassObj(classitem: objType) {
      const uid = localStorage.getItem("uid") + "";
      let add = false;
      classifyArr.value.map((item: any) => {
        if (item.text === classitem.text && uid === item.uid) {
          showFailToast("该标题已出现！！");
          add = true;
        }
      });
      if (add === false) {
        classitem["uid"] = uid;
        classitem['id']=Random()+''
        classifyArr.value.push(classitem);
        return true;
      } else return false;
    }
    function deleteClassify(iid:string) {
      let id = -1;
      classifyArr.value.map((item: any, i: number) => {
        if (item.id===iid) {
          id = i;
        }
      });
      classifyArr.value.splice(id, 1);
    }
    return {
      data,
      history,
      classifyArr,
      deleteClassify,
      deleteData,
      addData,
      editData,
      addClassObj,
      deleteHistory,
      addHistory,
    };
  },
  {
    persist: true,
  }
);
export default noteData;
