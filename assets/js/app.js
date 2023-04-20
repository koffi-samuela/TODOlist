// initialisation de l'instance de vue
var nw = new Vue({
    el : '#formulaire',
    data : {
        // variables qui recupèrenet les valeurs des input soit les v-model
        newtasks : "",
        description : "",
        priority : "",
        priority2 : "",
        // declaration d'une liste vide
        taskslist : [],
        // variable qui stockent les v-model dans un objet 
        title : "",
        desc :"",
        priorities :"",
        priorities2 : "",
        // autres variables
        completed : false,
        count : 0,
        counttotal : 0,
        isActive : true
    },
                // ENSEMBLE DES METHODES
    methods : {
        // fontion pour l'ajout des données saisies
        add : function(){
            // condition  pour forcer l'ajout d'une nouvelle tache
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
                    priorities2 : this.priority2,
                },
                ...this.taskslist]
                // affectation des valeurs de array a taskslist pou pouvoir affivher les valeurs lors d ela bouclz
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
            //gérer les arrière plans en fonction des urgences des taches 
            // let test = document.querySelector('.High')
            // console.log(test);
            // test.style.backgroundColor = "red"
        },

        // Fonction qui va changer la classe d'un élément si une tache est accomplie
        done : function(e){
            //METHODE POUR AFFICHE LE DECOMPTE DES TACHE FAITES 
            //1 RE  MZTHODE QUI MARCHE APPROXIMATIVEMENT 
            // this.completed = !this.completed
            // if (this.completed == true ) {
            //     this.counttotal++
            // }
            // else{
            //     this.counttotal--

            // }
            //4E METHODE QUI ON ESPERE MARCHERA 

            //2E   MZTHODE QUI MARCHE APPROXIMATIVEMENT 
            // if (this.completed == true ) {
            //     this.counttotal++
            // }
            //3E   MZTHODE QUI MARCHE APPROXIMATIVEMENT 
            // if (!this.completed) {
            //     this.completed = true;
            //     this.counttotal++
            //     // Ajoutez ici le code pour incrémenter l'élément
            //   }
            //   else if (this.completed) {
            //     this.completed = false;
            //     this.counttotal--
            //     // Ajoutez ici le code pour incrémenter l'élément
            //   }
            //   this.completed = false
            // Déclaration d'une variable qui va stocker noutre balise <tr> :
            // le e fait reférence a l'événement  realisé; le target revoie le declencheur de l'évenement ou celui qui le subit
            // le .closest('tr') nous permet de definir l'élément parent du declencheur
            let row = e.target.closest('tr')
            console.log(row);
            // à cette div <tr> on lui toggle la classe alert-success
            row.classList.toggle('alert-success')
            //CONDITION POUR LE COMPTE DES TACHES FAITES 
            //
            //si la row ( <tr> contien ) la classe alert-success (qui signifie que la taches est acommplie) alors on f=incremeente le conttotal sinon on le décremente
            if (row.classList.contains('alert-success')) {
                this.counttotal++
            } else {
                this.counttotal-- 
            }

        },
        // fonction pour supprimer une tache
        deleted : function(e){
            this.count-=1
            // La meme selection comme la variable row
            let del = e.target.closest('tr')
            // console.log(del)
            // si le btn remove continet la classe alert-succes ce qui signifie que les taches sont accomplie alors lors de la suppression si la classe est presente on décrémente le counttotal
            if (del.classList.contains('alert-success')) {
                this.counttotal--
            } 
            // une fois ciblé on le supprime à l'aide de la fonction .remove()
            del.remove()
        },
        // fonction qui va permettre de tout supprimer
        clearAll : function(){
            // on reinitialise tout nos éléménts don a liste car l'affchage depend du contenu de la lite
            this.taskslist = []
            this.count = 0
            this.counttotal = 0
                        },
        // foction pour supprimer les taches accomplies
        delDone : function(){
            //crration qui va stocker toutes  nos taches affectuées qui dont identifialbles par  la classe alert-success 
            list = document.querySelectorAll('.alert-success')
            //on boucle sur les éléménts du tableau et suppprie chaque element
            for (var i = 0; i < list.length; i++) {
                // if (i.classList.contains('alert-success')) {
                // }
                this.count--   
                this.counttotal--
                list[i].remove()
            }

            console.log(list);
        }

    },
})
                // CREATION DES COMPOSANTS

// Vue.component('btn-delete',{
    // template : `<button class="btn btn-outline-danger" @click="clear"> delete All <iconify-icon inline icon="material-symbols:delete-outline-rounded" style="color: red;"></iconify-icon></button>`,
    // methods: {
    //     clear(e) {
    //         // console.log(e,'methode');
    //     this.$emit('deleteAll',e)
    //     }
    //     },
// })


// CREATION D'un composant pour les ACTIONS
// on ajoute à nos composants une méthode qui va prendre en paramètre l'event et qui va emettre ($emit) la fonction done
// au click du bouton template on lui affececte la methode créee
// dans le html on fait @done ="done" en gros l'venement globla déclenche la fonction done
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

test = {'a': 1,
'b':2,
'c':3}
console.log(test);