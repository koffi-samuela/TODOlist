// initialisation de l'instance de vue
var nw = new Vue({
    el : '#formulaire',
    data : {
        newtasks : "",
        description : "",
        priority : "",
        taskslist : [],
        title : "",
        desc :"",
        completed : false,
        count : 0,
        counttotal : 0,
        isActive : true

    },
    methods : {
        add : function(){
            if (this.newtasks == "") {
                alert('champs requis le nom de la tache est obligatoire !')
            }
            else{
                this.count++
                this.todoList = true
                // tableau pour stocker les valeurs renseignées et ...this.taskslist pour copier son contenu dans array
                let array = [{
                    title : this.newtasks,
                    desc : this.description,
                    priorities : this.priority,
                },
                ...this.taskslist]
                // affectation des valeurs de array a taskslist
                this.taskslist = array

            }
            // if (this.priority === "urgent") {
            //     let test = document.querySelector('td')
            //     test.classList.add('alert-danger')
            // }
            // renitilisation des champs après un clic
            this.newtasks ="",
            this.description ="",
            this.priority = ""
        },


        done : function(e){
            // if (e) {                
            //     this.counttotal++
            // }
            // if (e) {                
            //     this.counttotal-=2
            // }
            this.completed = !this.completed
            if (this.completed == true ) {
                this.counttotal++
            }

            let row = e.target.closest('tr')
            console.log(row);
            row.classList.toggle('alert-success')

        },
        deleted : function(e){
            this.count-=1
            let del = e.target.closest('tr')
            console.log(del)
            del.remove()
        },
        clearAll : function(){
            this.taskslist = []
            this.count = 0
            this.counttotal = 0
                        },

        delDone : function(){
            isActive = false
            list = document.querySelectorAll('.alert alert-success')
            if (isActive===false) {
                this.list=[]
            }
        }
    },
})

Vue.component('btn-delete',{
    template : `<button class="btn btn-outline-danger" @click="clear"> delete All <iconify-icon inline icon="material-symbols:delete-outline-rounded" style="color: red;"></iconify-icon></button>`,
    // methods: {
    //     clear(e) {
    //         // console.log(e,'methode');
    //     this.$emit('deleteAll',e)
    //     }
    //     },
})
// CREATION D'un composant pour les ACTIONS
Vue.component('btn-done',{
    template : `<button class="btn btn-outline-success" @click="maMethode"> <iconify-icon inline icon="ic:baseline-done-outline" style="color: green;"></iconify-icon> </button>`,
    methods: {
        maMethode(e) {
            // console.log(e,'methode');
        this.$emit('done',e)
        }
        },
        
})
Vue.component('btn-del',{
    template : `<button class="btn btn-outline-danger" @click="myMethode"> <iconify-icon inline icon="material-symbols:delete-outline-rounded" style="color: red;"></iconify-icon></button>`,
    methods: {
        myMethode(e) {
            // console.log(e,'methode');
        this.$emit('deleted',e)
        }
        },
})
