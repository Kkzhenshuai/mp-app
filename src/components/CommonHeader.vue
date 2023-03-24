<template>
    <div class="header-container">
        <!-- 头部的左边区域 -->
        <div class="l-content">
            <el-button style="margin-right: 20px;" @click="handerMenu" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包削 -->
            <el-breadcrumb separator="/">
                    <el-breadcrumb-item 
                    v-for="item in tags" 
                    :key="item.path" 
                    :to="{ path:item.path }"> {{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 头部的右边区域 -->
        <div class="r-content">
            <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
            <img class="user" src="https://ts3.cn.mm.bing.net/th?id=OIP-C.V7xuh8Em6iJQ3sHi_TTVqgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="">
        </span>
        <!-- 头像的下拉菜单 -->
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
    data() {
        return {

        }
    },
    methods: {
        handerMenu(){
            this.$store.commit('collapseMenu')
        },
        handleClick(command){
            if(command === 'cancel'){
                console.log('退出')
            //清除cookie中的token信息退出
            Cookie.remove('token')
            //跳转到登录页面
            this.$router.push('/login')
            }

        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabList
        })
    }
}
</script>

<style lang="less" scoped>
    .header-container{
        padding:0 20px;
        background-color: #333;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text{
            font-size: 14px;
            color:#fff;
            margin-left: 10px;
        }
        .r-content{
            .user{
                width: 40px;
                height: 40px;
                border-radius: 50px;
            }
        }
        .l-content{
            display: flex;
            align-items: center;
            /deep/.el-breadcrumb__item{
                .el-breadcrumb__inner{
                    font-weight: 900;
                    &.is-link{
                        color:pink;
                    }
                }
                &:last-child{
                    .el-breadcrumb__inner{
                        color: green;
                    }
                }
            }
        }
    }
</style>