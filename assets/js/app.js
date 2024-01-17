// initialisation de l'instance de vue
var nw = new Vue({
    el: '#formulaire',
    data: {
        // variables qui récupèrent les valeurs des input soit les v-model
        newtasks: "",
        description: "",
        priority: "",
        priority2: "",
        // déclaration d'une liste vide
        taskslist: [],
        // variable qui stocke les v-model dans un objet 
        title: "",
        desc: "",
        priorities: "",
        priorities2: "",
        // autres variables
        completed: false,
        count: 0,
        counttotal: 0,
        isActive: true,
        completedTaskIds : []
    },
    computed: {
        showDoneButton: function () {
            return this.completedTaskIds.length > 0;
        },
        showDeleteButton: function () {
            return this.taskslist.length > 0;
        }
    },
    // ENSEMBLE DES METHODES
    methods: {
        // fonction pour l'ajout des données saisies
        add: function () {
            // condition  pour forcer l'ajout d'une nouvelle tache
            if (this.newtasks === "") {
                alert('Champs requis : le nom de la tâche est obligatoire !');
            } else {
                this.count++;
                this.todoList = true;
                // tableau pour stocker les valeurs renseignées et ...this.taskslist pour copier son contenu dans array
                let array = [
                    ...this.taskslist,
                    {
                        title: this.newtasks,
                        desc: this.description,
                        priorities: this.priority,
                        priorities2: this.priority2,
                        id: this.taskslist.length
                    }
                    
                ];
                // affectation des valeurs de array à taskslist pour pouvoir afficher les valeurs lors de la boucle
                this.taskslist = array;
                console.log(array);
            }
            // réinitialisation des champs après un clic
            this.newtasks = "";
            this.description = "";
            this.priority = "";
            this.priority2 = "";

            this.saveToLocalStorage();
        },

        // Fonction qui va changer la classe d'un élément si une tâche est accomplie : 
        done: function (e) {
            // Déclaration d'une variable qui va stocker notre balise <tr> :
            // le e fait référence à l'événement réalisé; le target renvoie le déclencheur de l'événement ou celui qui le subit
            // le .closest('tr') nous permet de définir l'élément parent du déclencheur
            let row = e.target.closest('tr');
            console.log(row);
            // à cette div <tr> on lui toggle la classe alert-success
            row.classList.toggle('alert-success');
            // CONDITION POUR LE COMPTE DES TÂCHES FAITES 
            // si la row ( <tr> contient ) la classe alert-success (qui signifie que la tâche est accomplie) alors on incrémente le counttotal sinon on le décrémente
            if (row.classList.contains('alert-success')) {
                this.counttotal++;
            } else {
                this.counttotal--;
            }
            this.saveToLocalStorage();
        },
        // fonction pour supprimer une tâche
        deleted: function (e) {
            this.count -= 1;
            // La même sélection comme la variable row
            let del = e.target.closest('tr');
            let index = e.target.closest("tr").id;
            console.log(index);
            let newArray = this.taskslist.slice();
            newArray.splice(index, 1);
            this.taskslist = newArray;
            // si le bouton remove contient la classe alert-success ce qui signifie que les tâches sont accomplies alors lors de la suppression si la classe est présente on décrémente le counttotal
            if (del.classList.contains('alert-success')) {
                this.counttotal--;
            }
            this.saveToLocalStorage();
        },
        // fonction qui va permettre de tout supprimer
        clearAll: function () {
            // on réinitialise tous nos éléments donc la liste car l'affichage dépend du contenu de la liste
            this.taskslist = [];
            this.count = 0;
            this.counttotal = 0;
            this.saveToLocalStorage();
        },
                // fonction pour supprimer les tâches accomplies
                delDone: function () {
                    // création qui va stocker toutes nos tâches accomplies identifiables par la classe alert-success 
                    let list = document.querySelectorAll('.alert-success');
                    console.log(list);
                    // on boucle sur les éléments du tableau et supprime chaque élément
                    for (let i = 0; i < list.length; i++) {
                        if (this.counttotal === 0) {
                            this.counttotal = 0
                        }
                        this.count--;
                        this.counttotal--;
        
                        let doneTarget = list[i].id;
                        console.log(doneTarget);
                        this.completedTaskIds.push(parseInt(doneTarget));
                    }
        
                    // Filtrer les tâches complétées
                    this.taskslist = this.taskslist.filter((task) => !this.completedTaskIds.includes(task.id));
                    
                    // Réinitialiser les IDs des tâches complétées
                    this.completedTaskIds = [];
                    this.saveToLocalStorage();
                },
                // Fonction pour sauvegarder taskslist dans le stockage local
        saveToLocalStorage: function () {
            localStorage.setItem('taskslist', JSON.stringify(this.taskslist));
            localStorage.setItem('completedTaskIds', JSON.stringify(this.completedTaskIds));
        },

        // Fonction pour charger taskslist depuis le stockage local
        loadFromLocalStorage: function () {
            const savedTaskslist = localStorage.getItem('taskslist');
            const savedCompletedTaskIds = localStorage.getItem('completedTaskIds');

            if (savedTaskslist) {
                this.taskslist = JSON.parse(savedTaskslist);
            }

            if (savedCompletedTaskIds) {
                this.completedTaskIds = JSON.parse(savedCompletedTaskIds);
            }
        },
    },

    // Utiliser le hook created pour charger les données depuis le stockage local lors de la création de l'instance Vue
    created: function () {
        this.loadFromLocalStorage();
    },

            },
    
);

// CREATION DES COMPOSANTS

// CREATION D'un composant pour les ACTIONS
Vue.component('btn-done', {
    template: `<button class="btn btn-outline-success" @click="maMethode"> <iconify-icon inline icon="ic:baseline-done-outline" style="color: green;"></iconify-icon> </button>`,
    methods: {
        maMethode(e) {
            // console.log(e,'methode');
            this.$emit('done', e);
        }
    },
});

Vue.component('btn-del', {
    template: `<button class="btn btn-outline-danger" @click="myMethode"> <iconify-icon inline icon="material-symbols:delete-outline-rounded" style="color: red;"></iconify-icon></button>`,
    methods: {
        myMethode(e) {
            // console.log(e,'methode');
            this.$emit('deleted', e);
        }
    },
});
