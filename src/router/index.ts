import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    // redirect: "/login",
    component: () => import("@/pages/Login.vue"),
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: () => import("@/pages/Login.vue"),
  // },
  {
    path: "/home",
    redirect: "/home/note",
    component: () => import("@/pages/Home.vue"),
    children: [
      {
        path: "note",
        name: "note",
        component: () => import("@/pages/Note.vue"),
      },
      {
        path: "classify",
        name: "classify",
        component: () => import("@/pages/Classify.vue"),
      },
      {
        path: "personal",
        name: "personal",
        component: () => import("@/pages/Personal.vue"),
      },
      {
        path: "search",
        name: "search",
        component: () => import("@/pages/Search.vue"),
      },
      {
        path: "editnote",
        name: "editnote",
        component: () => import("@/pages/EditNote.vue"),
      },
      {
        path: "managenote",
        name: "managenote",
        component: () => import("@/pages/ManageNote.vue"),
      },
    ],
  },
  {
    path: "/view",
    name: "view",
    component: () => import("@/pages/View.vue"),
  },
  {
    path: "/noteview",
    name: "noteview",
    component: () => import("@/pages/NoteView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
