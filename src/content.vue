<template>
  <div>
    <div class="navbar">
        <p>{{$route.query.name}}</p>
        <ul class="tagUl">
         <li  @click="routgo(item)" v-for="item in $store.state.pathUl" :key="item[0]">
                <el-tag @close="handleClose(item)" closable :type="$route.path==item[0]?'success':''" >
                 {{item[1]}}
                </el-tag>
         </li>
        </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    mounted () {
        // console.log(this.$route.path)
    },
    computed: {
        pathUl(){
            return this.$store.state.pathUl
        }
    },
    methods: {
        /**关闭标签 */
        handleClose(val) {
            console.log(val,'close')
            let url=this.pathUl.length?this.pathUl[this.pathUl.length-1][0]:"/"
            this.$store.commit('delPath',val)
           this.$router.push({
                 path:url,
                 query:val
             })
        },
        routgo(val){
            console.log(val)
          this.$router.push({
                 path: val[0],
                 query:val
             })
        }
    },
    watch:{
       
        // $route(val){
        //     console.log(val,"route")
        // },
        '$store.state.pathUl'(val){
            // console.log(val)
        }
    }
};
</script>

<style lang="scss">
.navbar{
    height:10%;
    width:100%;
    .tagUl{
        list-style: none;
        height: 5%;
        display: flex;
    }
}
</style>