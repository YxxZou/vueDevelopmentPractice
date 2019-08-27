import Vue from "vue";
import Router from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "./views/404";

Vue.use(Router);
/**
 * 安装 npm i nprogress 库，主要优化用户体验
 * 路由守卫: vue-router 提供在路由切换时的沟子，即切换触发事件
 * 使用路由守卫，不能进行直接导出
 */

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      // // 必须需要挂载，否则下面路径无法访问
      // component: { render: h => h("router-view") },
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout.vue"),
      children: [
        {
          path: "/user",
          // 重定向
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login.vue")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Register.vue")
        }
      ]
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout.vue"),
      children: [
        // dashhoard 仪表盘
        {
          path: "/",
          redirect: "/dashhoard/analysis"
        },
        {
          path: "/dashhoard",
          name: "dashhoard",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashhoard/analysis",
              name: "analysis",
              component: () =>
                import(
                  /* webpackChunkName: "dashhoard" */ "./views/Dashhoard/Analysis.vue"
                )
            }
          ]
        },
        // from 表单
        {
          path: "/form",
          name: "form",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              component: () =>
                import(
                  /* webpackChunkName: "form" */ "./views/Forms/BasicForm.vue"
                )
            },
            {
              path: "/form/step-form",
              name: "stepform",
              component: () =>
                import(
                  /* webpackChunkName: "form" */ "./views/Forms/StepForm/index.vue"
                ),
              children: [
                { path: "/form/step-form", redirect: "/form/step-form/info" },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1.vue"
                    )
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2.vue"
                    )
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3.vue"
                    )
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "*",
      name: "404",
      component: NotFound
    }
  ]
});

// 安装 npm i nprogress 库，主要优化用户体验
/**
 * to 将要到达的路由
 * form 当前的路由
 * next 继续下一步。必须调用才会执行下一步
 */
// 开始执行事件
router.beforeEach((to, form, next) => {
  Nprogress.start();
  next();
});
// 执行完成结束事件
router.afterEach(() => {
  Nprogress.done();
});
export default router;
