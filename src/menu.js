/**
 * author:gaoyanan
 * Tue Jan 22 2019 15: 09: 37 GMT + 0800
 * 
 */
import "./menu.scss";
import Content from "./content.vue";
export default {
     props: {
       menus: {},
       configure:{
           type: Object,
           default:function(){
               return {
                    type: true, //true显示侧边 false顶部菜单
                    activeIdx: '/', //默认选中
                    arrowFlag: true ,//>图标信号
                    logopng:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2230167403,4188800858&fm=27&gp=0.jpg",//logo
                    headpng:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2230167403,4188800858&fm=27&gp=0.jpg",//头像
               }
           }
           
       }
     },
    
     data(){
         return {
            //  activeIdx: '/page1*页面一'
         }
     },
     mounted () {
     },
      render(h) {
          console.log(this.configure.type)
       return (<div class={this.configure.type?'Asihome':'TOPhome'}>
                <div class="nav">
                        <div id="logo">
                         <img src={this.configure.logopng}/>
                        </div>
                <div class="menu">
               { this.menuslist() }
               {this.configure.type ? "":this.topToll() }
                </div>
            </div>
                <Content class="main"/>
            </div>)
       
      },
      methods: {
          menuslist() {
        const menuItme=this.menus.map(menuItme => {
            return this.child(menuItme)
        })
           return this.configure.type?(
              <el-menu class="el-menu-vertical-demo"
                style={{width:'100%',border:'none',position: "absolute",'z-index': 0+':'}}
              on-select = {this.handleSelect} >
                   {menuItme}
                </el-menu>
            ):
            (
                <el-menu class="el-menu-demo"
                mode="horizontal"
                style={{width:'200%',border:'none',position: "absolute",'z-index': 0+':'}}
              on-select = {this.handleSelect} >
                   {menuItme}
                </el-menu>
            )
          },
          //处理分级
          child(menuItme){
            return  menuItme.child.length?
                    <el-submenu index={menuItme.title}><template slot="title"><span slot="title">{menuItme.title}</span></template>
                         {
                             menuItme.child.map(menuItmeChild => {
                                return this.child(menuItmeChild)
                             })
                         }
                    </el-submenu>
                        :
                    <el-menu-item index={menuItme.url+'*'+menuItme.title}> <i class="el-icon-location"></i><span slot="title">{menuItme.title}</span>
                    </el-menu-item>
          },
          topToll(){
              return  <div class="topToll">
                <el-button class={this.configure.arrowFlag?'el-icon-d-arrow-left':'el-icon-d-arrow-right'} size="mini" on-click={this.TopcheacMen}></el-button>
                <img src={this.configure.headpng} class="navPhtot"/>
            </div>
          },
           //选择菜单
           handleSelect(key,keyPath) {
               let parmas= key.split("*")
               parmas = parmas.concat(keyPath)
               this.$router.push({
                   path: parmas[0],
                   query: parmas
                })
             this.$store.commit('addPath',parmas
             )
           },
            //滑动查看隐藏的菜单
            TopcheacMen() {
                console.log(this.configure.arrowFlag)
              this.configure.arrowFlag = !this.configure.arrowFlag
              if (this.configure.arrowFlag) {
                document.getElementsByClassName('el-menu-demo')[0].style.left = "-50%"
              } else {
                document.getElementsByClassName('el-menu-demo')[0].style.left = 0
              }
            },
      },
      watch: {
         
      }
}
