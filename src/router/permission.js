import router from "./index";
import { useAuthStore } from "@/stores/auth";
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if(to.meta.requireAuth && !authStore.token){//访问受限路由时判断是否带有token
        next('/login')
    }else{
        next()
    }
})