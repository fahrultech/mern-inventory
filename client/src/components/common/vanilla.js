const vanilla = () => {
    document.querySelectorAll("#sidebar-menu ul li.has_sub a.waves-effect").forEach(item => {
        item.addEventListener("click", function(){
            document.querySelectorAll("#sidebar-menu ul li.has_sub a.waves-effect").forEach(it => {
                if(it.classList.contains("selectedMenu")){
                    it.classList.remove("selectedMenu")
                    it.querySelector(".mdi").style.color="#4a5869";
                }
            })
            var kk = item.parentNode.querySelectorAll("ul li").length
            if(this.querySelector(".pull-right i").classList.contains("mdi-plus")){
               this.querySelector(".pull-right i").classList.remove("mdi-plus");
               this.querySelector(".pull-right i").classList.add("mdi-minus");
               this.parentNode.querySelector("ul.list-unstyled").style.height=`${38*kk}px`;
               this.parentNode.querySelector("ul.list-unstyled").style.visibility="visible"
            }else{
               this.querySelector(".pull-right i").classList.remove("mdi-minus");
               this.querySelector(".pull-right i").classList.add("mdi-plus");
               this.parentNode.querySelector("ul.list-unstyled").style.height="0px";
               this.parentNode.querySelector("ul.list-unstyled").style.visibility="hidden"
            }
            this.classList.add("selectedMenu")
            this.querySelector(".mdi").style.color="white"
        })
    })
}
export default vanilla;